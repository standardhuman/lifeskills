---
name: skill-navigator
description: Use at conversation start to intelligently route requests to the right skill. Provides exploration-first routing and skill chaining.
---

# Skill Navigator

## Purpose

Route user requests to the most appropriate skill(s), using exploration-first routing for ambiguous requests and skill chaining for complex needs.

**Core principle:** When in doubt, explore before executing.

## Skill Families

### Socratic (Exploratory) - Use When Intent is Unclear

| Skill | Triggers | Purpose |
|-------|----------|---------|
| design-exploration | "options", "approaches", "how should I", "not sure" | Explore solutions through iterative questioning |
| brainstorming | "ideas", "creative", "possibilities", "what could" | Generate many options (SCAMPER) |
| decision-making | "decide", "choose", "which option", "should I" | Structured decision with pre-mortem |
| self-connection | "feeling", "stuck", "overwhelmed", "frustrated" | Process emotions before action |
| problem-solving | "not working", "issue", "why", "broken", "failing" | Root cause analysis |

### Procedural (Execution) - Use When Intent is Clear

| Skill | Triggers | Purpose |
|-------|----------|---------|
| project-planning | "plan", "break down", "steps", "how to" | Create bite-sized task breakdown |
| plan-execution | "execute", "work through", "do the plan" | Checkpoint-based execution |
| verification | "done", "complete", "finished", "achieved" | Evidence before claims |
| weekly-review | "week", "review", "GTD", "planning" | Weekly planning ritual |
| scheduling | "calendar", "schedule", "time", "when" | Daily/weekly organization |

### Domain-Specific

| Domain | Skills |
|--------|--------|
| Business | business-planning, pricing-strategy, revenue-growth, sales-proposals, client-management |
| Finance | budgeting, debt-payoff, tax-mitigation, retirement-planning, financial-review, portfolio-assessment, big-purchases |
| Health | sleep-routine, nutrition-planning, strength-program |
| Research | deep-research |
| Software | superpowers:* skills, landing-page-builder |
| Communication | nvc-conversation |

## Routing Logic

### Step 1: Detect Emotional Undertone

**Keywords:** "overwhelmed", "frustrated", "stuck", "anxious", "confused", "struggling", "feeling"

**If detected:** Suggest self-connection before procedural work.

> "It sounds like there might be some feelings to process here. Would you like to start with self-connection to explore what's coming up, or jump straight into [practical skill]?"

### Step 2: Classify Intent

| Intent Type | Indicators | Route To |
|-------------|------------|----------|
| **Clear + Specific** | Knows what they want, asks for specific action | Matching domain skill directly |
| **Vague + Exploratory** | "I'm thinking about...", "Not sure how to...", "What should I..." | design-exploration first |
| **Problem-focused** | "Not working", "Can't figure out", "Why is..." | problem-solving first |
| **Need ideas** | "Ideas for...", "Options for...", "What could..." | brainstorming first |
| **Need to decide** | "Should I...", "Which is better...", "Choosing between..." | decision-making |
| **Multiple domains** | Request spans several areas | Ask clarifying question |

### Step 3: Offer Skill or Ask

| Confidence | Action |
|------------|--------|
| High | "I'll use [skill] for this..." |
| Medium | "This sounds like [A] or [B]. Which fits better?" |
| Low | "Tell me more about what you're trying to accomplish" |

## Skill Chaining

After completing a skill, suggest the natural next step:

| After | Suggest |
|-------|---------|
| self-connection | "Ready to tackle the practical side? → scheduling, project-planning, or domain skill" |
| design-exploration | "Want me to create a plan? → project-planning" |
| brainstorming | "Ready to decide? → decision-making" |
| decision-making | "Want to plan execution? → project-planning" |
| problem-solving | "Found the cause. Ready to fix? → project-planning or domain skill" |
| project-planning | "Plan ready. Execute now? → plan-execution" |
| plan-execution | "Work complete. Verify? → verification" |

## Socratic Preamble (When to Offer)

For procedural skills, offer optional exploration when request seems conflicted:

> "Before we dive into [weekly-review], is there anything you want to explore or process first? Or are you ready to jump into the workflow?"

**Skip if:** User's request is clearly action-oriented and unconflicted.

## Example Routing

### Example 1: Emotional + Vague
**User:** "I'm feeling stuck about my business direction"

**Detection:** "feeling" + "stuck" → emotional undertone
**Route:** Suggest self-connection first

> "It sounds like there might be some feelings to process here before diving into business strategy. Would you like to start with self-connection to explore what's coming up, or jump straight into business-planning?"

### Example 2: Clear + Specific
**User:** "Help me create a budget for January"

**Detection:** Clear request, specific domain
**Route:** Directly to budgeting skill

> "I'll use the budgeting skill to help you create your January budget."

### Example 3: Vague + Exploratory
**User:** "I'm thinking about changing careers"

**Detection:** "thinking about" → exploratory
**Route:** design-exploration first

> "Let's explore this together. I'll use design-exploration to help you think through the options and what matters most to you."

### Example 4: Problem-focused
**User:** "My sleep has been terrible lately and I can't figure out why"

**Detection:** "can't figure out why" → problem-solving
**Route:** problem-solving, then potentially sleep-routine

> "Let's figure out what's going on. I'll use problem-solving to help identify the root cause, and then we can look at the sleep-routine skill if needed."

## Key Principles

- **Exploration before execution** when intent is unclear
- **One skill at a time** - don't overwhelm with options
- **Natural chaining** - suggest next skill after completion
- **Emotional awareness** - process feelings before forcing action
- **User choice** - offer options, don't dictate
