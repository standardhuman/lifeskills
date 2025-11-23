---
name: creating-superskills
description: Use when writing new superskills or updating existing skills
---

# Creating Superskills

Guide for writing new skills that follow the Superskills Framework standards.

## When to Create a New Skill

Create a skill when you have:

1. **Repeatable workflow**: A process you follow more than once for similar situations
2. **Proven approach**: Based on established framework (GTD, NVC, etc.) or validated through personal use
3. **Common failure mode**: Prevents a mistake you or others make regularly
4. **Clear trigger**: Can identify when this skill should be used

**Don't create a skill for:**
- One-off situations
- Purely informational content (make it documentation instead)
- Unproven ideas (test them first, then codify)
- Overly specific scenarios (make it more general or skip it)

## Skill Template

Every skill MUST follow this structure:

```markdown
---
name: domain:skill-name
description: Brief trigger description (when AI should suggest this)
---

# [Skill Title]

## Overview
- What this skill does (1-2 sentences)
- Core principle it implements
- When to use it

## Quick Reference
[Table or checklist showing workflow at a glance]

## The Process

[Detailed step-by-step workflow]

□ Phase 1: [Phase Name]
  - Specific actionable step
  - Another step with guidance
  - Tool usage (AskUserQuestion, TodoWrite, etc.)

□ Phase 2: [Phase Name]
  - Continue workflow...

## Key Principles

[The "why" - underlying theory/framework]
- **Source**: [Framework name and author]
- **Why it works**: [Explanation]
- **Core insight**: [Key concept]

## Common Pitfalls

[Anti-patterns to avoid]
- Rationalization 1 and why it fails
- Rationalization 2 and why it fails
- Domain-specific pitfalls

## Examples

[Concrete examples of skill in use]
- Example scenario 1 with outcome
- Example scenario 2 with outcome
```

## Domain Selection

Choose the appropriate domain namespace:

- **business**: Planning, strategy, decision-making, meetings
- **creative**: Ideation, design, creative work, feedback
- **research**: Investigation, analysis, synthesis, evaluation
- **productivity**: Time management, habits, energy, focus
- **inner**: Emotions, self-connection, values, spiritual practice
- **communication**: Conversations, conflict, boundaries, listening

**If skill spans multiple domains**: Choose primary domain or create variants

## Naming Conventions

**Skill names:**
- Lowercase with hyphens: `weekly-review`, `nvc-conversation`
- Descriptive and specific: `emotion-processing` not `feelings`
- Action-oriented when possible: `decision-making` not `decisions`

**File structure:**
```
skills/
  domain/
    skill-name/
      SKILL.md
```

## Writing the Workflow

### Make It Actionable

**Good** (specific action):
```markdown
□ Phase 1: Notice (what's here right now?)
  - Name the emotion specifically (frustrated, disappointed, anxious)
  - Locate the sensation in your body (chest, throat, stomach)
  - Rate intensity 1-10
```

**Bad** (vague principle):
```markdown
□ Phase 1: Be aware of your emotions
  - Notice what you're feeling
  - Pay attention to your body
```

### Use TodoWrite for Multi-Phase Skills

If skill has 3+ phases, include TodoWrite instruction:

```markdown
## The Process

Copy this checklist using TodoWrite to track progress:

```
□ Phase 1: [Name]
□ Phase 2: [Name]
□ Phase 3: [Name]
```

Then work through each phase...
```

### Use AskUserQuestion for Reflection Points

When user needs to make a choice or reflect:

```markdown
□ Phase 2: Choose approach
  - Use AskUserQuestion to present options:
    - Option A (pro, con)
    - Option B (pro, con)
  - Wait for user selection before proceeding
```

### Include Tool Invocations

Be explicit about when to use Claude Code tools:

- **TodoWrite**: Multi-phase workflows (track progress)
- **AskUserQuestion**: Structured choices or reflection prompts
- **Skill**: Sub-skills (if this skill calls other skills)

## Grounding in Established Frameworks

Every skill should reference its source:

**Examples:**
- GTD (Getting Things Done) - David Allen
- NVC (Nonviolent Communication) - Marshall Rosenberg
- Atomic Habits - James Clear
- The Artist's Way - Julia Cameron
- IFS (Internal Family Systems) - Richard Schwartz

**Why this matters:**
- Builds on proven approaches (not invented)
- Gives users path to learn more
- Provides theoretical grounding
- Establishes credibility

**Format:**
```markdown
## Key Principles

**Source**: [Framework Name] by [Author]

**Why it works**: [2-3 sentences explaining mechanism]

**Core insight**: [Key concept in one sentence]
```

## Common Pitfalls Section

Every skill needs anti-patterns and rationalizations:

**Structure:**
```markdown
## Common Pitfalls

- **"[Rationalization]"**: [Why this fails and what to do instead]
- **[Anti-pattern]**: [Consequence and correct approach]
```

**Examples:**
```markdown
- **"I'm too busy for this"**: Exactly when it's most valuable. The 1 hour invested saves 5+ hours of thrashing
- **Skipping self-connection**: Jumping into difficult conversation while reactive creates more conflict
- **Processing while collecting**: Mind keeps generating. Collect everything first, then process
```

## Examples Section

Provide 2-3 concrete examples showing:
- Situation/context
- Application of workflow
- Outcome/result

**Format:**
```markdown
## Examples

**Example 1: [Scenario title]**
- Context: [Situation]
- Applied workflow: [How skill was used]
- Outcome: [Result]

**Example 2: [Scenario title]**
- Context: [Situation]
- Applied workflow: [How skill was used]
- Outcome: [Result]
```

## Testing Your Skill

Before considering a skill complete:

1. **Use it yourself** in real situation (not hypothetical)
2. **Does it help?** Did following the workflow produce better outcome than ad-hoc approach?
3. **Is it specific enough?** Can someone follow it without guessing?
4. **Is it general enough?** Does it work for multiple situations in this domain?
5. **Can AI detect when to use it?** Is the trigger description clear?

## Length Guidelines

- **Minimum**: 100 lines (less means it's probably too shallow)
- **Target**: 150-300 lines (most skills)
- **Maximum**: 400 lines (if longer, consider splitting)

Count includes all sections (overview, workflow, principles, pitfalls, examples).

## Checklist: New Skill

Use this before committing a new skill:

```
□ Follows standard template (all sections present)
□ Workflow is actionable (specific steps, not vague principles)
□ Grounded in established framework (source cited)
□ Common pitfalls documented (anti-patterns and rationalizations)
□ 2-3 concrete examples included
□ Clear trigger description in frontmatter
□ Tested in real use (not just theoretical)
□ Length 100-400 lines
□ Named following conventions (lowercase-with-hyphens)
□ Placed in correct domain directory
```

## Summary

**Creating a new skill:**
1. Identify repeatable workflow grounded in proven framework
2. Follow the standard template exactly
3. Make workflow actionable and specific
4. Document pitfalls and rationalizations
5. Provide concrete examples
6. Test in real use before considering complete
7. Place in appropriate domain directory

**Quality over quantity**: One excellent skill that you actually use > three mediocre skills that gather dust.
