---
name: using-superskills
description: Use when starting any conversation - establishes discovery system for superskills across all domains
---

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a superskill might apply to what you are doing, you ABSOLUTELY MUST check for it.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

# Using Superskills

## MANDATORY FIRST RESPONSE PROTOCOL

Before responding to ANY user message about life/work (non-code topics), you MUST complete this checklist:

1. ☐ Scan available superskills
2. ☐ Ask yourself: "Does ANY skill match this situation?"
3. ☐ If yes → Use the Skill tool to load and run the skill
4. ☐ Announce which skill you're using
5. ☐ Follow the skill exactly

**Responding WITHOUT completing this checklist = automatic failure.**

## Skill Discovery System

### Context Detection Patterns

Monitor conversation for these triggers and suggest appropriate skills:

| Trigger Pattern | Suggested Skill | Rationale |
|----------------|-----------------|-----------|
| Emotional language (overwhelm, anxiety, frustration, anger, sadness) | `inner:emotion-processing` | Strong emotions need processing |
| Conflict/disagreement mentioned | `communication:nvc-conversation` | NVC framework for difficult conversations |
| Decision paralysis ("should I...", "can't decide", comparing options) | `business:decision-making` | Structured decision framework helps |
| Creative frustration ("stuck", "blocked", "can't think of ideas") | `creative:creative-block` | Unsticking creative process |
| "I should..." statements | `productivity:priority-setting` | Distinguishing real priorities |
| End-of-week timing (Friday afternoon) | `business:weekly-review` | Weekly reflection and planning |
| Planning discussions ("next quarter", "goals", "strategy") | `business:strategic-planning` | Strategic thinking workflow |
| Feeling scattered or overwhelmed | `productivity:daily-shutdown` | End-of-day closure |
| "How do I tell them..." | `communication:boundary-setting` | Setting boundaries skillfully |
| Research project mentioned | `research:question-formulation` | Defining good research questions |
| Values confusion or drift | `inner:values-clarification` | Reconnecting with what matters |

### Suggestion Format

When you detect a trigger pattern:

```
I notice [specific context]. Would you like to use the [skill-name] skill?

This will [brief outcome - what the skill accomplishes].
```

**Example:**
```
I notice you're expressing frustration about being stuck on this design.
Would you like to use the creative:creative-block skill?

This will walk you through a structured process for unsticking creative work.
```

### User Acceptance

If user accepts (any affirmative response):
1. Load the skill using Skill tool
2. Follow the skill's workflow exactly
3. Use TodoWrite to track progress if skill has phases

If user declines:
- Continue conversation without skill
- Don't suggest again for same topic in this session

## Invocation Methods

### 1. AI Suggestion (Primary)
AI detects context and suggests skill (described above)

### 2. Explicit Call
User directly requests: "use inner:self-connection"
→ Load and execute that skill immediately

### 3. Slash Command
User types: `/review`
→ Maps to `business:weekly-review` skill

**Common mappings:**
- `/review` → `business:weekly-review`
- `/nvc` → `communication:nvc-conversation`
- `/decide` → `business:decision-making`
- `/shutdown` → `productivity:daily-shutdown`

### 4. Silent Mode (Advanced)
User adds skill rules to system prompt directly
→ No announcement, just follow the workflow

## Opt-Out

User can disable suggestions:
- "Skip skills for this conversation" → No suggestions this session
- "Don't suggest [skill-name]" → Block specific skill

## Common Rationalizations That Mean You're About To Fail

If you catch yourself thinking ANY of these thoughts, STOP. You are rationalizing. Check for and use the skill.

- "This is just a simple question" → WRONG. Questions often need structured approaches
- "Let me answer quickly first" → WRONG. Skills provide better answers
- "This doesn't need a formal skill" → WRONG. If a skill exists for it, use it
- "I remember the skill content" → WRONG. Skills evolve. Run the current version
- "The skill is overkill for this" → WRONG. Skills exist because simple things become complex
- "I'll suggest it later if needed" → WRONG. Suggest BEFORE giving advice
- "User just wants a quick answer" → WRONG. Better process = better answer

**Why:** Skills document proven techniques that save time and prevent mistakes. Not using available skills means repeating solved problems and making known errors.

## Integration with Superpowers

If both superskills and superpowers are available:

**Domain separation:**
- Superpowers handles: Code, engineering, testing, git, technical workflows
- Superskills handles: Everything else (business, creative, inner, communication, etc.)

**No conflicts:** Domains don't overlap, clear boundaries

**Shared patterns:**
- Both use TodoWrite for phase tracking
- Both use AskUserQuestion for structured input
- Both follow checklist-based workflows
- Both announce skill usage

## Available Skill Domains

- **business:*** - Business operations, planning, decision-making
- **creative:*** - Creative work, ideation, feedback integration
- **research:*** - Research, analysis, synthesis
- **productivity:*** - Personal productivity, habits, time management
- **inner:*** - Emotional processing, self-connection, spiritual practice
- **communication:*** - NVC, conflict resolution, boundaries, listening

## Skill Discovery Commands

**List all skills:**
```bash
ls -la ~/.claude/superskills/skills/*/SKILL.md
```

**Search for skill by keyword:**
```bash
grep -r "description.*[keyword]" ~/.claude/superskills/skills/
```

**Read specific skill:**
Use Skill tool: `skill: "domain:skill-name"`

## Summary

**Starting any non-code conversation:**
1. Check if any superskill matches context
2. If yes → Suggest the skill
3. If accepted → Load and follow it
4. Announce you're using it

**Finding a relevant skill = mandatory to suggest it. Not optional.**

Skills exist to help. Use them.
