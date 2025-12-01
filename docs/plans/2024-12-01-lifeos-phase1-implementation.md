# LifeOS Phase 1: Foundation - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the foundation for Guide - the `guide-memory` MCP server with Supabase backend, enabling persistent context across Claude Code sessions.

**Architecture:** MCP server connects to user's Supabase instance. Skills call MCP tools to read/write context. Data persists across sessions, enabling "the companion knows you" experience.

**Tech Stack:** TypeScript, MCP SDK, Supabase (Postgres + Auth), Node.js

**Design Doc:** `docs/plans/2024-12-01-lifeos-guide-design.md`

---

## Prerequisites

Before starting:
- [ ] Supabase account (free tier works)
- [ ] Node.js 18+ installed
- [ ] Claude Code with MCP support

---

## Task 1: Create Supabase Project

**Goal:** Set up the database that will store all Guide data.

**Step 1: Create project in Supabase dashboard**

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: `lifeos-guide` (or your preference)
4. Generate a strong database password (save to 1Password)
5. Region: Choose closest to you
6. Wait for project to provision (~2 minutes)

**Step 2: Get connection credentials**

1. Go to Project Settings → API
2. Copy and save:
   - Project URL: `https://xxxxx.supabase.co`
   - `anon` public key
   - `service_role` secret key (for MCP server)

**Step 3: Create environment file**

Create: `~/.claude/lifeskills/mcp-servers/guide-memory/.env`

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
```

**Step 4: Add .env to gitignore**

Modify: `~/.claude/lifeskills/.gitignore`

Add:
```
# Environment files
.env
*.env.local
mcp-servers/*/.env
```

**Step 5: Commit gitignore**

```bash
cd ~/.claude/lifeskills
git add .gitignore
git commit -m "chore: add .env to gitignore for MCP servers"
```

---

## Task 2: Create Database Schema

**Goal:** Set up all tables for Guide's memory.

**Step 1: Open SQL Editor in Supabase**

1. Go to your Supabase project
2. Click "SQL Editor" in sidebar
3. Click "New Query"

**Step 2: Run schema creation SQL**

Copy and run this entire SQL block:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table: Who the user is
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users DEFAULT auth.uid(),
  display_name TEXT,
  core_values TEXT[] DEFAULT '{}',
  constraints JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{
    "communication_style": "direct",
    "detail_level": "balanced"
  }',
  timezone TEXT DEFAULT 'America/Los_Angeles',
  active_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Goals table: What user is working toward
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users DEFAULT auth.uid(),
  domain TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target JSONB,
  current JSONB,
  deadline DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'achieved', 'paused', 'abandoned')),
  progress_log JSONB[] DEFAULT '{}',
  connected_patterns UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patterns table: Observed correlations
CREATE TABLE patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users DEFAULT auth.uid(),
  trigger_condition TEXT NOT NULL,
  outcome TEXT NOT NULL,
  confidence FLOAT DEFAULT 0.5 CHECK (confidence >= 0 AND confidence <= 1),
  evidence_count INT DEFAULT 1,
  first_observed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_confirmed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'hypothesized' CHECK (status IN ('hypothesized', 'confirmed', 'disproven'))
);

-- Sessions table: Interaction history
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users DEFAULT auth.uid(),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  domain TEXT,
  skill_used TEXT,
  summary TEXT,
  context_loaded JSONB DEFAULT '{}',
  outcomes JSONB DEFAULT '{}',
  follow_ups TEXT[] DEFAULT '{}'
);

-- Insights table: Guide's observations
CREATE TABLE insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users DEFAULT auth.uid(),
  type TEXT NOT NULL CHECK (type IN ('observation', 'recommendation', 'celebration', 'concern', 'question')),
  content TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  priority INT DEFAULT 3 CHECK (priority >= 1 AND priority <= 5),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'acknowledged', 'acted_on', 'dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  surfaced_at TIMESTAMP WITH TIME ZONE,
  response JSONB
);

-- Domain logs table: Structured tracking data
CREATE TABLE domain_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users DEFAULT auth.uid(),
  domain TEXT NOT NULL,
  log_type TEXT,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data JSONB NOT NULL,
  source TEXT DEFAULT 'manual',
  notes TEXT
);

-- Create indexes for common queries
CREATE INDEX idx_goals_user_status ON goals(user_id, status);
CREATE INDEX idx_goals_domain ON goals(user_id, domain);
CREATE INDEX idx_sessions_user_date ON sessions(user_id, started_at DESC);
CREATE INDEX idx_insights_user_status ON insights(user_id, status);
CREATE INDEX idx_domain_logs_user_domain ON domain_logs(user_id, domain, logged_at DESC);
CREATE INDEX idx_patterns_user_status ON patterns(user_id, status);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (service role bypasses these, but good for future multi-user)
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own goals" ON goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own patterns" ON patterns FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own sessions" ON sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own insights" ON insights FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own logs" ON domain_logs FOR ALL USING (auth.uid() = user_id);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER goals_updated_at BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

**Step 3: Verify tables created**

Run this query to confirm:

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

Expected output: `domain_logs`, `goals`, `insights`, `patterns`, `profiles`, `sessions`

**Step 4: Document completion**

No commit needed (database is external), but note that schema is ready.

---

## Task 3: Scaffold MCP Server

**Goal:** Create the basic MCP server structure.

**Step 1: Create directory structure**

```bash
mkdir -p ~/.claude/lifeskills/mcp-servers/guide-memory/src/{tools,db}
cd ~/.claude/lifeskills/mcp-servers/guide-memory
```

**Step 2: Initialize npm project**

```bash
cd ~/.claude/lifeskills/mcp-servers/guide-memory
npm init -y
```

**Step 3: Update package.json**

Modify: `~/.claude/lifeskills/mcp-servers/guide-memory/package.json`

```json
{
  "name": "guide-memory",
  "version": "0.1.0",
  "description": "MCP server for Guide's persistent memory (LifeOS)",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc --watch"
  },
  "keywords": ["mcp", "lifeos", "guide"],
  "author": "Brian",
  "license": "MIT"
}
```

**Step 4: Install dependencies**

```bash
cd ~/.claude/lifeskills/mcp-servers/guide-memory
npm install @modelcontextprotocol/sdk @supabase/supabase-js dotenv zod
npm install -D typescript @types/node
```

**Step 5: Create tsconfig.json**

Create: `~/.claude/lifeskills/mcp-servers/guide-memory/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Step 6: Create Supabase client**

Create: `~/.claude/lifeskills/mcp-servers/guide-memory/src/db/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
```

**Step 7: Commit scaffold**

```bash
cd ~/.claude/lifeskills
git add mcp-servers/guide-memory
git commit -m "feat(guide-memory): scaffold MCP server with Supabase client"
```

---

## Task 4: Implement MCP Server Entry Point

**Goal:** Create the main MCP server that exposes tools.

**Step 1: Create index.ts**

Create: `~/.claude/lifeskills/mcp-servers/guide-memory/src/index.ts`

```typescript
#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { profileTools, handleProfileTool } from './tools/profile.js';
import { goalTools, handleGoalTool } from './tools/goals.js';
import { sessionTools, handleSessionTool } from './tools/sessions.js';
import { insightTools, handleInsightTool } from './tools/insights.js';
import { logTools, handleLogTool } from './tools/logs.js';

const server = new Server(
  {
    name: 'guide-memory',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List all available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      ...profileTools,
      ...goalTools,
      ...sessionTools,
      ...insightTools,
      ...logTools,
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Route to appropriate handler based on tool name prefix
    if (name.startsWith('guide_profile_')) {
      return await handleProfileTool(name, args);
    }
    if (name.startsWith('guide_goal_')) {
      return await handleGoalTool(name, args);
    }
    if (name.startsWith('guide_session_')) {
      return await handleSessionTool(name, args);
    }
    if (name.startsWith('guide_insight_')) {
      return await handleInsightTool(name, args);
    }
    if (name.startsWith('guide_log_')) {
      return await handleLogTool(name, args);
    }

    return {
      content: [{ type: 'text', text: `Unknown tool: ${name}` }],
      isError: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [{ type: 'text', text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Guide Memory MCP server running');
}

main().catch(console.error);
```

**Step 2: Commit entry point**

```bash
cd ~/.claude/lifeskills
git add mcp-servers/guide-memory/src/index.ts
git commit -m "feat(guide-memory): add MCP server entry point with tool routing"
```

---

## Task 5: Implement Profile Tools

**Goal:** Create tools for reading/writing user profile.

**Step 1: Create profile tools**

Create: `~/.claude/lifeskills/mcp-servers/guide-memory/src/tools/profile.ts`

```typescript
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { supabase } from '../db/supabase.js';

export const profileTools: Tool[] = [
  {
    name: 'guide_profile_get',
    description: 'Get the user profile including values, constraints, and preferences',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'guide_profile_update',
    description: 'Update user profile fields (core_values, constraints, preferences)',
    inputSchema: {
      type: 'object',
      properties: {
        display_name: { type: 'string', description: 'User display name' },
        core_values: {
          type: 'array',
          items: { type: 'string' },
          description: 'Core values like ["health", "growth", "connection"]'
        },
        constraints: {
          type: 'object',
          description: 'Physical/life constraints like {"bad_knee": true, "vegetarian": true}'
        },
        preferences: {
          type: 'object',
          description: 'Interaction preferences like {"communication_style": "direct"}'
        },
        timezone: { type: 'string', description: 'Timezone like "America/Los_Angeles"' },
      },
      required: [],
    },
  },
  {
    name: 'guide_profile_create',
    description: 'Create initial user profile (only needed once)',
    inputSchema: {
      type: 'object',
      properties: {
        display_name: { type: 'string', description: 'User display name' },
        core_values: { type: 'array', items: { type: 'string' } },
        timezone: { type: 'string' },
      },
      required: ['display_name'],
    },
  },
];

export async function handleProfileTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'guide_profile_get': {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(`Failed to get profile: ${error.message}`);
      }

      if (!data) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ exists: false, message: 'No profile found. Use guide_profile_create to set up.' }),
          }],
        };
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ exists: true, profile: data }),
        }],
      };
    }

    case 'guide_profile_create': {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          display_name: args.display_name as string,
          core_values: (args.core_values as string[]) || [],
          timezone: (args.timezone as string) || 'America/Los_Angeles',
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create profile: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, profile: data }),
        }],
      };
    }

    case 'guide_profile_update': {
      const updates: Record<string, unknown> = {};
      if (args.display_name) updates.display_name = args.display_name;
      if (args.core_values) updates.core_values = args.core_values;
      if (args.constraints) updates.constraints = args.constraints;
      if (args.preferences) updates.preferences = args.preferences;
      if (args.timezone) updates.timezone = args.timezone;

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update profile: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, profile: data }),
        }],
      };
    }

    default:
      throw new Error(`Unknown profile tool: ${name}`);
  }
}
```

**Step 2: Commit profile tools**

```bash
cd ~/.claude/lifeskills
git add mcp-servers/guide-memory/src/tools/profile.ts
git commit -m "feat(guide-memory): add profile tools (get, create, update)"
```

---

## Task 6: Implement Goal Tools

**Goal:** Create tools for managing goals.

**Step 1: Create goal tools**

Create: `~/.claude/lifeskills/mcp-servers/guide-memory/src/tools/goals.ts`

```typescript
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { supabase } from '../db/supabase.js';

export const goalTools: Tool[] = [
  {
    name: 'guide_goal_list',
    description: 'List all goals, optionally filtered by domain or status',
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', description: 'Filter by domain (health, productivity, etc.)' },
        status: { type: 'string', enum: ['active', 'achieved', 'paused', 'abandoned'] },
      },
      required: [],
    },
  },
  {
    name: 'guide_goal_get',
    description: 'Get a specific goal by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Goal UUID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'guide_goal_create',
    description: 'Create a new goal',
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', description: 'Domain (health, productivity, inner, etc.)' },
        title: { type: 'string', description: 'Goal title' },
        description: { type: 'string', description: 'Detailed description' },
        target: { type: 'object', description: 'Target value like {"value": 225, "unit": "lbs"}' },
        deadline: { type: 'string', description: 'Deadline date (YYYY-MM-DD)' },
      },
      required: ['domain', 'title'],
    },
  },
  {
    name: 'guide_goal_update',
    description: 'Update a goal (status, current progress, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Goal UUID' },
        status: { type: 'string', enum: ['active', 'achieved', 'paused', 'abandoned'] },
        current: { type: 'object', description: 'Current value like {"value": 185, "unit": "lbs"}' },
        description: { type: 'string' },
        deadline: { type: 'string' },
      },
      required: ['id'],
    },
  },
  {
    name: 'guide_goal_log_progress',
    description: 'Log progress toward a goal',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Goal UUID' },
        value: { type: 'number', description: 'Progress value' },
        note: { type: 'string', description: 'Optional note about this progress' },
      },
      required: ['id', 'value'],
    },
  },
];

export async function handleGoalTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'guide_goal_list': {
      let query = supabase.from('goals').select('*').order('created_at', { ascending: false });

      if (args.domain) {
        query = query.eq('domain', args.domain);
      }
      if (args.status) {
        query = query.eq('status', args.status);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to list goals: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ goals: data, count: data?.length || 0 }),
        }],
      };
    }

    case 'guide_goal_get': {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('id', args.id)
        .single();

      if (error) {
        throw new Error(`Failed to get goal: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ goal: data }),
        }],
      };
    }

    case 'guide_goal_create': {
      const { data, error } = await supabase
        .from('goals')
        .insert({
          domain: args.domain as string,
          title: args.title as string,
          description: args.description as string | undefined,
          target: args.target as object | undefined,
          deadline: args.deadline as string | undefined,
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create goal: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, goal: data }),
        }],
      };
    }

    case 'guide_goal_update': {
      const updates: Record<string, unknown> = {};
      if (args.status) updates.status = args.status;
      if (args.current) updates.current = args.current;
      if (args.description) updates.description = args.description;
      if (args.deadline) updates.deadline = args.deadline;

      const { data, error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', args.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update goal: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, goal: data }),
        }],
      };
    }

    case 'guide_goal_log_progress': {
      // First get current goal to append to progress_log
      const { data: goal, error: getError } = await supabase
        .from('goals')
        .select('progress_log, current')
        .eq('id', args.id)
        .single();

      if (getError) {
        throw new Error(`Failed to get goal: ${getError.message}`);
      }

      const progressLog = (goal?.progress_log as object[]) || [];
      progressLog.push({
        date: new Date().toISOString(),
        value: args.value,
        note: args.note || null,
      });

      const { data, error } = await supabase
        .from('goals')
        .update({
          progress_log: progressLog,
          current: { value: args.value },
        })
        .eq('id', args.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to log progress: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, goal: data }),
        }],
      };
    }

    default:
      throw new Error(`Unknown goal tool: ${name}`);
  }
}
```

**Step 2: Commit goal tools**

```bash
cd ~/.claude/lifeskills
git add mcp-servers/guide-memory/src/tools/goals.ts
git commit -m "feat(guide-memory): add goal tools (list, get, create, update, log_progress)"
```

---

## Task 7: Implement Session Tools

**Goal:** Create tools for tracking interaction sessions.

**Step 1: Create session tools**

Create: `~/.claude/lifeskills/mcp-servers/guide-memory/src/tools/sessions.ts`

```typescript
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { supabase } from '../db/supabase.js';

export const sessionTools: Tool[] = [
  {
    name: 'guide_session_start',
    description: 'Start a new interaction session (call at beginning of relevant conversations)',
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', description: 'Primary domain (health, productivity, etc.)' },
        skill_used: { type: 'string', description: 'Skill being used if any' },
        context_loaded: { type: 'object', description: 'What context was loaded for this session' },
      },
      required: [],
    },
  },
  {
    name: 'guide_session_end',
    description: 'End the current session with summary and outcomes',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Session UUID' },
        summary: { type: 'string', description: 'Brief summary of what happened' },
        outcomes: { type: 'object', description: 'What was decided/accomplished' },
        follow_ups: { type: 'array', items: { type: 'string' }, description: 'Things to follow up on' },
      },
      required: ['id', 'summary'],
    },
  },
  {
    name: 'guide_session_recent',
    description: 'Get recent sessions for context',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Number of sessions to return (default 5)' },
        domain: { type: 'string', description: 'Filter by domain' },
      },
      required: [],
    },
  },
  {
    name: 'guide_session_get',
    description: 'Get a specific session by ID',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Session UUID' },
      },
      required: ['id'],
    },
  },
];

export async function handleSessionTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'guide_session_start': {
      const { data, error } = await supabase
        .from('sessions')
        .insert({
          domain: args.domain as string | undefined,
          skill_used: args.skill_used as string | undefined,
          context_loaded: args.context_loaded as object || {},
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to start session: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, session: data }),
        }],
      };
    }

    case 'guide_session_end': {
      const { data, error } = await supabase
        .from('sessions')
        .update({
          ended_at: new Date().toISOString(),
          summary: args.summary as string,
          outcomes: args.outcomes as object || {},
          follow_ups: args.follow_ups as string[] || [],
        })
        .eq('id', args.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to end session: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, session: data }),
        }],
      };
    }

    case 'guide_session_recent': {
      const limit = (args.limit as number) || 5;
      let query = supabase
        .from('sessions')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(limit);

      if (args.domain) {
        query = query.eq('domain', args.domain);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to get recent sessions: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ sessions: data, count: data?.length || 0 }),
        }],
      };
    }

    case 'guide_session_get': {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', args.id)
        .single();

      if (error) {
        throw new Error(`Failed to get session: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ session: data }),
        }],
      };
    }

    default:
      throw new Error(`Unknown session tool: ${name}`);
  }
}
```

**Step 2: Commit session tools**

```bash
cd ~/.claude/lifeskills
git add mcp-servers/guide-memory/src/tools/sessions.ts
git commit -m "feat(guide-memory): add session tools (start, end, recent, get)"
```

---

## Task 8: Implement Insight Tools

**Goal:** Create tools for managing Guide's insights.

**Step 1: Create insight tools**

Create: `~/.claude/lifeskills/mcp-servers/guide-memory/src/tools/insights.ts`

```typescript
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { supabase } from '../db/supabase.js';

export const insightTools: Tool[] = [
  {
    name: 'guide_insight_create',
    description: 'Create a new insight (observation, recommendation, celebration, concern)',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['observation', 'recommendation', 'celebration', 'concern', 'question'],
          description: 'Type of insight'
        },
        content: { type: 'string', description: 'The insight content' },
        context: { type: 'object', description: 'What triggered this insight' },
        priority: { type: 'number', description: 'Priority 1-5 (5 is highest)' },
      },
      required: ['type', 'content'],
    },
  },
  {
    name: 'guide_insight_pending',
    description: 'Get pending insights to surface to user',
    inputSchema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Number of insights (default 5)' },
      },
      required: [],
    },
  },
  {
    name: 'guide_insight_deliver',
    description: 'Mark an insight as delivered',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Insight UUID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'guide_insight_respond',
    description: 'Record user response to an insight',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Insight UUID' },
        status: {
          type: 'string',
          enum: ['acknowledged', 'acted_on', 'dismissed'],
          description: 'User response status'
        },
        response: { type: 'object', description: 'Details of user response' },
      },
      required: ['id', 'status'],
    },
  },
];

export async function handleInsightTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'guide_insight_create': {
      const { data, error } = await supabase
        .from('insights')
        .insert({
          type: args.type as string,
          content: args.content as string,
          context: args.context as object || {},
          priority: (args.priority as number) || 3,
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create insight: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, insight: data }),
        }],
      };
    }

    case 'guide_insight_pending': {
      const limit = (args.limit as number) || 5;
      const { data, error } = await supabase
        .from('insights')
        .select('*')
        .eq('status', 'pending')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) {
        throw new Error(`Failed to get pending insights: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ insights: data, count: data?.length || 0 }),
        }],
      };
    }

    case 'guide_insight_deliver': {
      const { data, error } = await supabase
        .from('insights')
        .update({
          status: 'delivered',
          surfaced_at: new Date().toISOString(),
        })
        .eq('id', args.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to deliver insight: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, insight: data }),
        }],
      };
    }

    case 'guide_insight_respond': {
      const { data, error } = await supabase
        .from('insights')
        .update({
          status: args.status as string,
          response: args.response as object || {},
        })
        .eq('id', args.id)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update insight: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, insight: data }),
        }],
      };
    }

    default:
      throw new Error(`Unknown insight tool: ${name}`);
  }
}
```

**Step 2: Commit insight tools**

```bash
cd ~/.claude/lifeskills
git add mcp-servers/guide-memory/src/tools/insights.ts
git commit -m "feat(guide-memory): add insight tools (create, pending, deliver, respond)"
```

---

## Task 9: Implement Domain Log Tools

**Goal:** Create tools for structured domain tracking (workouts, nutrition, sleep, mood).

**Step 1: Create log tools**

Create: `~/.claude/lifeskills/mcp-servers/guide-memory/src/tools/logs.ts`

```typescript
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { supabase } from '../db/supabase.js';

export const logTools: Tool[] = [
  {
    name: 'guide_log_create',
    description: 'Log domain-specific data (workout, nutrition, sleep, mood, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain: strength, nutrition, sleep, mood, energy, etc.'
        },
        log_type: { type: 'string', description: 'Specific type within domain (e.g., "workout", "meal")' },
        data: {
          type: 'object',
          description: 'Structured data. Examples: {"exercise": "squat", "sets": [...]} for strength'
        },
        source: { type: 'string', description: 'Data source: manual, apple_health, strong_app, etc.' },
        notes: { type: 'string', description: 'Optional notes' },
        logged_at: { type: 'string', description: 'ISO timestamp (defaults to now)' },
      },
      required: ['domain', 'data'],
    },
  },
  {
    name: 'guide_log_query',
    description: 'Query domain logs with filters',
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', description: 'Domain to query' },
        log_type: { type: 'string', description: 'Filter by log type' },
        since: { type: 'string', description: 'ISO date - only logs after this date' },
        until: { type: 'string', description: 'ISO date - only logs before this date' },
        limit: { type: 'number', description: 'Max results (default 20)' },
      },
      required: ['domain'],
    },
  },
  {
    name: 'guide_log_latest',
    description: 'Get the most recent log entry for a domain',
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', description: 'Domain to query' },
        log_type: { type: 'string', description: 'Optional filter by log type' },
      },
      required: ['domain'],
    },
  },
  {
    name: 'guide_log_summary',
    description: 'Get summary statistics for a domain over a time period',
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', description: 'Domain to summarize' },
        days: { type: 'number', description: 'Number of days to look back (default 7)' },
      },
      required: ['domain'],
    },
  },
];

export async function handleLogTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'guide_log_create': {
      const { data, error } = await supabase
        .from('domain_logs')
        .insert({
          domain: args.domain as string,
          log_type: args.log_type as string | undefined,
          data: args.data as object,
          source: (args.source as string) || 'manual',
          notes: args.notes as string | undefined,
          logged_at: (args.logged_at as string) || new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create log: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ success: true, log: data }),
        }],
      };
    }

    case 'guide_log_query': {
      const limit = (args.limit as number) || 20;
      let query = supabase
        .from('domain_logs')
        .select('*')
        .eq('domain', args.domain)
        .order('logged_at', { ascending: false })
        .limit(limit);

      if (args.log_type) {
        query = query.eq('log_type', args.log_type);
      }
      if (args.since) {
        query = query.gte('logged_at', args.since);
      }
      if (args.until) {
        query = query.lte('logged_at', args.until);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to query logs: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ logs: data, count: data?.length || 0 }),
        }],
      };
    }

    case 'guide_log_latest': {
      let query = supabase
        .from('domain_logs')
        .select('*')
        .eq('domain', args.domain)
        .order('logged_at', { ascending: false })
        .limit(1);

      if (args.log_type) {
        query = query.eq('log_type', args.log_type);
      }

      const { data, error } = await query.single();

      if (error && error.code !== 'PGRST116') {
        throw new Error(`Failed to get latest log: ${error.message}`);
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ log: data || null }),
        }],
      };
    }

    case 'guide_log_summary': {
      const days = (args.days as number) || 7;
      const since = new Date();
      since.setDate(since.getDate() - days);

      const { data, error } = await supabase
        .from('domain_logs')
        .select('*')
        .eq('domain', args.domain)
        .gte('logged_at', since.toISOString())
        .order('logged_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to get summary: ${error.message}`);
      }

      // Basic summary - count and date range
      const summary = {
        domain: args.domain,
        days,
        total_entries: data?.length || 0,
        first_entry: data?.[data.length - 1]?.logged_at || null,
        last_entry: data?.[0]?.logged_at || null,
        entries: data,
      };

      return {
        content: [{
          type: 'text',
          text: JSON.stringify(summary),
        }],
      };
    }

    default:
      throw new Error(`Unknown log tool: ${name}`);
  }
}
```

**Step 2: Commit log tools**

```bash
cd ~/.claude/lifeskills
git add mcp-servers/guide-memory/src/tools/logs.ts
git commit -m "feat(guide-memory): add domain log tools (create, query, latest, summary)"
```

---

## Task 10: Build and Test MCP Server

**Goal:** Compile TypeScript and verify server starts.

**Step 1: Build the server**

```bash
cd ~/.claude/lifeskills/mcp-servers/guide-memory
npm run build
```

Expected: No errors, `dist/` directory created with compiled JavaScript.

**Step 2: Test server starts**

```bash
cd ~/.claude/lifeskills/mcp-servers/guide-memory
node dist/index.js
```

Expected: Hangs waiting for stdio input (this is correct for MCP). Press Ctrl+C to exit.

**Step 3: Commit build artifacts config**

Add to `.gitignore`:

```bash
echo "mcp-servers/*/dist/" >> ~/.claude/lifeskills/.gitignore
echo "mcp-servers/*/node_modules/" >> ~/.claude/lifeskills/.gitignore
```

```bash
cd ~/.claude/lifeskills
git add .gitignore
git commit -m "chore: ignore MCP server build artifacts and node_modules"
```

---

## Task 11: Configure MCP Server in Claude Code

**Goal:** Register the MCP server so Claude Code can use it.

**Step 1: Add to Claude Code MCP settings**

The MCP server needs to be registered. Add to your Claude Code configuration:

**Option A: Project-level** (recommended for lifeskills)

Create: `~/.claude/lifeskills/.mcp.json`

```json
{
  "mcpServers": {
    "guide-memory": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/.claude/lifeskills/mcp-servers/guide-memory/dist/index.js"],
      "env": {
        "SUPABASE_URL": "your-supabase-url",
        "SUPABASE_SERVICE_KEY": "your-service-key"
      }
    }
  }
}
```

**Note:** Replace `YOUR_USERNAME` and Supabase credentials.

**Option B: Global** (if you want it everywhere)

Add to `~/.claude/settings.json` in the mcpServers section.

**Step 2: Restart Claude Code**

Close and reopen Claude Code terminal to load new MCP configuration.

**Step 3: Verify MCP is available**

In Claude Code, the guide-memory tools should now be available. Test by asking:
"What guide memory tools do you have access to?"

**Step 4: Commit MCP config template**

Create: `~/.claude/lifeskills/.mcp.json.example`

```json
{
  "mcpServers": {
    "guide-memory": {
      "command": "node",
      "args": ["FULL_PATH_TO/.claude/lifeskills/mcp-servers/guide-memory/dist/index.js"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_SERVICE_KEY": "your-service-role-key"
      }
    }
  }
}
```

```bash
cd ~/.claude/lifeskills
git add .mcp.json.example
git commit -m "docs: add MCP configuration example"
```

---

## Task 12: End-to-End Test

**Goal:** Verify the full flow works.

**Step 1: Create a profile**

In Claude Code, run:
```
Use the guide_profile_create tool to create my profile with display_name "Brian"
```

**Step 2: Get the profile**

```
Use guide_profile_get to retrieve my profile
```

Expected: Returns the profile you just created.

**Step 3: Create a goal**

```
Use guide_goal_create to create a health goal titled "Squat 225 lbs" with target {"value": 225, "unit": "lbs"}
```

**Step 4: Log a workout**

```
Use guide_log_create with domain "strength" and data {"exercise": "squat", "sets": [{"reps": 5, "weight": 185}], "rpe": 7}
```

**Step 5: Start and end a session**

```
Use guide_session_start with domain "health" and skill_used "strength-program"
```

Then:
```
Use guide_session_end with the session ID, summary "Tested the Guide memory system", and outcomes {"result": "success"}
```

**Step 6: Verify data persists**

Close Claude Code, reopen, and run:
```
Use guide_profile_get and guide_goal_list to see my data
```

Expected: All data persists across sessions.

---

## Task 13: Final Commit

**Goal:** Commit any remaining changes and tag the release.

**Step 1: Final commit**

```bash
cd ~/.claude/lifeskills
git add -A
git status
# If there are changes:
git commit -m "feat(guide-memory): complete Phase 1 foundation MCP server"
```

**Step 2: Push to remote**

```bash
git push
```

**Step 3: Create release tag**

```bash
git tag -a v0.2.0 -m "LifeOS Phase 1: Guide Memory MCP Server"
git push origin v0.2.0
```

---

## Phase 1 Complete Checklist

- [ ] Supabase project created with schema
- [ ] `guide-memory` MCP server implemented
- [ ] Profile tools working (get, create, update)
- [ ] Goal tools working (list, get, create, update, log_progress)
- [ ] Session tools working (start, end, recent, get)
- [ ] Insight tools working (create, pending, deliver, respond)
- [ ] Log tools working (create, query, latest, summary)
- [ ] MCP server registered in Claude Code
- [ ] End-to-end test passing
- [ ] All code committed and pushed

---

## Next Steps (Phase 1.5)

After completing this foundation:

1. **Profile onboarding skill** - Guided setup of user profile
2. **Enhance strength-program skill** - Add context load/save
3. **Session continuity** - Auto-start sessions, reference previous
4. **Basic pattern detection** - Correlate sleep → energy, etc.

These will be planned in a separate document after Phase 1 is validated.
