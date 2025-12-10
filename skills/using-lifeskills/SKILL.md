---
name: using-lifeskills
description: Use when starting any conversation - establishes discovery system for lifeskills across all domains
---

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a lifeskill might apply to what you are doing, you ABSOLUTELY MUST check for it.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

# Using LifeSkills

## MANDATORY FIRST RESPONSE PROTOCOL

Before responding to ANY user message about life/work (non-code topics), you MUST complete this checklist:

1. ☐ Scan available lifeskills
2. ☐ Ask yourself: "Does ANY skill match this situation?"
3. ☐ If yes → Use the Skill tool to load and run the skill
4. ☐ Announce which skill you're using
5. ☐ Follow the skill exactly

**Responding WITHOUT completing this checklist = automatic failure.**

## Skill Discovery System

### Context Detection Patterns

Monitor conversation for these triggers and suggest appropriate skills:

**Business (5 skills):**
| Trigger Pattern | Suggested Skill | Rationale |
|----------------|-----------------|-----------|
| Business goals, quarterly planning, strategy | `business-planning` | Strategic planning framework |
| Client issues, onboarding, retention | `client-management` | Client relationship management |
| Pricing decisions, what to charge | `pricing-strategy` | Value-based pricing framework |
| Growing revenue, sales, scaling | `revenue-growth` | Revenue growth levers |
| Writing proposals, closing deals | `sales-proposals` | Consultative selling process |

**Finance (7 skills):**
| Trigger Pattern | Suggested Skill | Rationale |
|----------------|-----------------|-----------|
| Major purchase (car, house, expensive item) | `big-purchases` | Major purchase decision framework |
| Budgeting, monthly spending, expense tracking | `budgeting` | Zero-based budgeting system |
| Debt, paying off loans, credit cards | `debt-payoff` | Debt elimination strategy |
| Net worth, financial health check | `financial-review` | Periodic financial review |
| Investments, portfolio, rebalancing | `portfolio-assessment` | Portfolio evaluation |
| Retirement, 401k, IRA, FIRE | `retirement-planning` | Retirement planning framework |
| Taxes, deductions, tax planning | `tax-mitigation` | Legal tax reduction strategies |

**Productivity (4 skills):**
| Trigger Pattern | Suggested Skill | Rationale |
|----------------|-----------------|-----------|
| Schedule, calendar, "what's my day", planning, availability | `scheduling` | Multi-source daily/weekly planning |
| End-of-week timing (Friday afternoon) | `weekly-review` | Weekly reflection and planning |
| Feeling scattered or overwhelmed at end of day | `daily-shutdown` | End-of-day closure |
| Starting the workday, morning routine | `daily-startup` | Beginning-of-day ritual |

**Health (3 skills):**
| Trigger Pattern | Suggested Skill | Rationale |
|----------------|-----------------|-----------|
| Sleep issues, tiredness, evening routine | `sleep-routine` | Sleep optimization |
| Gym, lifting, strength training | `strength-program` | Progressive overload training |
| Diet, nutrition, meal prep, macros | `nutrition-planning` | Sustainable nutrition system |

**Communication (1 skill):**
| Trigger Pattern | Suggested Skill | Rationale |
|----------------|-----------------|-----------|
| Conflict/disagreement, difficult conversation | `nvc-conversation` | Nonviolent Communication framework |

**Inner (1 skill):**
| Trigger Pattern | Suggested Skill | Rationale |
|----------------|-----------------|-----------|
| Emotional language (overwhelm, anxiety, frustration) | `self-connection` | Emotional processing |

**Creative (1 skill):**
| Trigger Pattern | Suggested Skill | Rationale |
|----------------|-----------------|-----------|
| Creative frustration ("stuck", "blocked", "no ideas") | `brainstorming` | Structured creative ideation |

**Decision-Making (1 skill):**
| Trigger Pattern | Suggested Skill | Rationale |
|----------------|-----------------|-----------|
| Decision paralysis ("should I...", "can't decide") | `decision-making` | Strategic decision framework |

### Suggestion Format

When you detect a trigger pattern:

```
I notice [specific context]. Would you like to use the [skill-name] skill?

This will [brief outcome - what the skill accomplishes].
```

**Example:**
```
I notice you're expressing frustration about being stuck on this design.
Would you like to use the creative:brainstorming skill?

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
User directly requests: "use self-connection" or "lifeskills:self-connection"
→ Load and execute that skill immediately

### 3. Slash Command
User types: `/review`
→ Maps to `weekly-review` skill

**Common mappings:**
- `/schedule` → `scheduling`
- `/review` → `weekly-review`
- `/nvc` → `nvc-conversation`
- `/decide` → `decision-making`
- `/shutdown` → `daily-shutdown`
- `/startup` → `daily-startup`
- `/budget` → `budgeting`
- `/taxes` → `tax-mitigation`

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

If both lifeskills and superpowers are available:

**Domain separation:**
- Superpowers handles: Code, engineering, testing, git, technical workflows
- LifeSkills handles: Everything else (business, creative, inner, communication, health, etc.)

**No conflicts:** Domains don't overlap, clear boundaries

**Shared patterns:**
- Both use TodoWrite for phase tracking
- Both use AskUserQuestion for structured input
- Both follow checklist-based workflows
- Both announce skill usage

## Available Skills (23 total)

**Business (5):**
- `business-planning` - Business goal setting and strategic planning
- `client-management` - Client relationships and retention
- `pricing-strategy` - Product/service pricing optimization
- `revenue-growth` - Systematic business revenue growth
- `sales-proposals` - Consultative selling and proposal writing

**Finance (7):**
- `big-purchases` - Major purchase decision framework
- `budgeting` - Zero-based monthly budgeting
- `debt-payoff` - Debt elimination strategy
- `financial-review` - Periodic financial health check
- `portfolio-assessment` - Investment portfolio evaluation
- `retirement-planning` - Retirement savings strategy
- `tax-mitigation` - Legal tax reduction strategies

**Productivity (4):**
- `scheduling` - Multi-source daily/weekly planning with calendar, tasks, weather, fitness integration
- `weekly-review` - GTD-based weekly planning and reflection
- `daily-shutdown` - End-of-day shutdown ritual
- `daily-startup` - Beginning-of-day startup ritual

**Health (3):**
- `sleep-routine` - Evidence-based sleep optimization
- `strength-program` - Progressive overload strength training
- `nutrition-planning` - Sustainable nutrition and meal prep

**Communication (1):**
- `nvc-conversation` - Nonviolent Communication framework

**Inner (1):**
- `self-connection` - NVC/Focusing-based emotional processing

**Creative (1):**
- `brainstorming` - Structured creative ideation process

**Decision-Making (1):**
- `decision-making` - Strategic decision-making with pre-mortem analysis

## Skill Discovery Commands

**List all skills:**
```bash
ls ~/.claude/lifeskills/skills/
```

**Search for skill by keyword:**
```bash
grep -r "description.*[keyword]" ~/.claude/lifeskills/skills/
```

**Read specific skill:**
Use Skill tool: `skill: "lifeskills:skill-name"` (e.g., `skill: "lifeskills:budgeting"`)

## Summary

**Starting any non-code conversation:**
1. Check if any lifeskill matches context
2. If yes → Suggest the skill
3. If accepted → Load and follow it
4. Announce you're using it

**Finding a relevant skill = mandatory to suggest it. Not optional.**

Skills exist to help. Use them.
