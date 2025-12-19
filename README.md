# LifeSkills

**[View Landing Page](https://landing-page-delta-amber.vercel.app)** | **[GitHub](https://github.com/standardhuman/lifeskills)**

Workflow-based practices for all domains of life and work.

## Inspired by Superpowers

This project is inspired by [Superpowers](https://github.com/cldcvr/superpowers), a collection of engineering workflow skills for AI coding assistants. Superpowers provides rigorous, discipline-enforcing processes for software development tasks like test-driven development, debugging, and code review.

**LifeSkills extends this approach beyond engineering** to cover the full spectrum of life domains: business planning, creative work, productivity, emotional processing, interpersonal communication, and physical health. Same philosophy—structured workflows grounded in proven frameworks—applied to everything else.

## What This Is

A collection of actionable, step-by-step workflows (called "skills") that help you navigate common situations across different life domains:

- **Business**: Planning, pricing, revenue growth, client management, sales
- **Finance**: Budgeting, investing, retirement, taxes, debt elimination
- **Creative**: Ideation, feedback, creative blocks
- **Productivity**: Daily routines, weekly review, prioritization
- **Inner**: Emotion processing, self-connection, values clarification
- **Communication**: NVC, conflict resolution, boundary setting
- **Health**: Sleep, strength training, nutrition

Each skill provides a structured process to follow, preventing common failure modes and codifying best practices from established frameworks (GTD, NVC, etc.).

## Installation

### For AI Coding Assistants

1. Clone to your AI assistant's config directory (e.g., for Claude Code):
   ```bash
   git clone https://github.com/standardhuman/lifeskills.git ~/.claude/lifeskills
   ```

2. Skills will be auto-discovered by your assistant's skill system

3. The `using-lifeskills` meta-skill will suggest relevant skills based on context

### Standalone Use

Read skill files directly from `skills/[domain]/[skill-name]/SKILL.md` and follow the workflows manually.

## Quick Start

The framework includes two meta-skills:

- **using-lifeskills**: Discovery system that suggests relevant skills based on conversation context
- **creating-lifeskills**: Guide for writing new skills following the framework

## Structure

```
lifeskills/
├── skills/
│   ├── [23 skill directories]  # Organized by topic
│   ├── using-lifeskills/       # Meta-skill: discovery system
│   └── creating-lifeskills/    # Meta-skill: writing guide
├── landing-page/               # Website (Vite + React + Tailwind)
├── examples/                   # Example walkthroughs
├── docs/                       # Additional documentation
└── README.md
```

## Core Principles

1. **Workflow-based**: Actionable steps, not just principles
2. **Grounded in proven frameworks**: GTD, NVC, etc.
3. **AI-friendly**: Structured for AI assistants to invoke and guide
4. **YAGNI ruthlessly**: Start small, grow based on real needs
5. **Test in real life**: Use skills yourself before considering them done

## Status

✅ **Phase 1: Foundation** (Complete)
- ✓ Repository structure
- ✓ Meta-skills (using-superskills, creating-superskills)
- ✓ Documentation

✅ **Phase 2: Core Skills** (Complete)

**23 implemented skills across 7 domains:**

*Business (5):*
- `business-planning` - Business goal setting and strategic planning
- `client-management` - Client relationships and retention
- `pricing-strategy` - Product/service pricing optimization
- `revenue-growth` - Systematic business revenue growth
- `sales-proposals` - Consultative selling and proposal writing

*Finance (7):*
- `big-purchases` - Major purchase decision framework
- `budgeting` - Zero-based monthly budgeting
- `debt-payoff` - Debt elimination strategy
- `financial-review` - Periodic financial health check
- `portfolio-assessment` - Investment portfolio evaluation
- `retirement-planning` - Retirement savings strategy
- `tax-mitigation` - Legal tax reduction strategies

*Productivity (4):*
- `scheduling` - Multi-source daily/weekly planning with calendar, tasks, weather, fitness integration
- `weekly-review` - GTD-based weekly planning and reflection
- `daily-shutdown` - End-of-day shutdown ritual
- `daily-startup` - Beginning-of-day startup ritual

*Health (3):*
- `sleep-routine` - Evidence-based sleep optimization
- `strength-program` - Progressive overload strength training
- `nutrition-planning` - Sustainable nutrition and meal prep

*Communication (1):*
- `nvc-conversation` - Nonviolent Communication framework

*Inner (1):*
- `self-connection` - NVC/Focusing-based emotional processing

*Creative (1):*
- `brainstorming` - Structured creative ideation process

*Decision-Making (1):*
- `decision-making` - Strategic decision-making with pre-mortem analysis

All skills are grounded in established frameworks (GTD, NVC, SCAMPER, First Principles Thinking, Matthew Walker, 5/3/1, ISSN, etc.) and include actionable workflows with examples.

🧪 **Phase 3: Testing** (In Progress)
- Real-world usage validation
- Refinement based on actual use

🌍 **Phase 4: Open Source** (Planned)
- Public launch
- Community contributions

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on writing new skills.

## License

[To be determined - likely MIT or CC BY-SA]

## Related Projects

- [Superpowers](https://github.com/cldcvr/superpowers) - Engineering workflow skills for AI coding assistants (the inspiration for this framework)

---

**Created**: November 2025
**Status**: Active Development
