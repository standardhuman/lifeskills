# LifeSkills Landing Page - Design Brief

## Project Overview

**LifeSkills** is a collection of structured, step-by-step workflows ("skills") for life and work domains. Skills are designed for use with AI assistants (Claude) but also work standalone. Each skill is a downloadable ZIP file.

**Live URL**: https://lifeskills.vercel.app (or similar)
**Tech Stack**: React + Vite + Tailwind CSS
**Current Design**: Dark theme (slate-900 to slate-800 gradient), minimal, functional

---

## Site Structure

### 1. Hero Section
- **Title**: "LifeSkills" (large, gradient text: blue-400 to purple-500)
- **Tagline**: "Workflow-based practices for all domains of life and work. Structured processes grounded in proven frameworks."
- **CTAs**: "View on GitHub" (primary), "Explore Skills" (secondary/outline)

### 2. "What is LifeSkills?" Section
- Brief explanation paragraph
- Three feature cards:
  - **Actionable Steps**: "Not vague principles, but concrete phases with specific actions and time estimates."
  - **Research-Backed**: "Every skill is grounded in established frameworks with proper citations."
  - **AI-Friendly**: "Designed for AI assistants like Claude Code to invoke and guide you through."

### 3. Skills Section (Main Content)
- **Header**: "Available Skills" with count ("23 skills across 7 domains")
- **Domain Filter Tabs**: Clickable tabs to filter by domain
  - All (23), Productivity (4), Business (5), Finance (7), Health (3), Inner (1), Communication (1), Creative (1)
- **When "All" selected**: Skills grouped by domain with section headers
- **When domain selected**: Flat grid of that domain's skills

### 4. Skill Cards (the core UI element)
Each card displays:
- **Icon** (emoji)
- **Domain badge** (colored pill)
- **Duration** (top right, e.g., "30-60 min")
- **Skill name** (e.g., "weekly-review")
- **Description** (1-2 sentences)
- **"When to use"** field
- **Workflow phases** (horizontal flow: Phase1 → Phase2 → Phase3...)
- **Framework attribution** (e.g., "Based on: Getting Things Done")
- **Download button** (for Claude Desktop ZIP)

### 5. "How to Use" Section
Three numbered steps:
1. **For Claude Code Users**: Git clone instructions
2. **Standalone Use**: Read SKILL.md files directly
3. **Invoke a Skill**: Example of asking Claude

### 6. Footer
- Attribution ("Inspired by Superpowers")
- GitHub and Contributing links

---

## Complete Skill Data (23 skills)

### Productivity (4 skills) - Green
| Skill | Icon | Duration | Framework |
|-------|------|----------|-----------|
| weekly-review | 📋 | 60-90 min | Getting Things Done |
| daily-shutdown | 🌅 | 10-15 min | Deep Work |
| daily-startup | 🌄 | 15-20 min | Deep Work + Atomic Habits |
| decision-making | 🎯 | 30-60 min | First Principles + OODA Loop |

### Business (5 skills) - Blue
| Skill | Icon | Duration | Framework |
|-------|------|----------|-----------|
| business-planning | 📈 | 2-3 hrs quarterly | EOS + OKRs |
| pricing-strategy | 💰 | 60-75 min | Value-Based Pricing |
| client-management | 🤝 | Ongoing | Customer Success |
| sales-proposals | 📝 | 30-60 min/proposal | SPIN Selling + MEDDIC |
| revenue-growth | 🚀 | 1-2 hrs planning | Growth Levers |

### Finance (7 skills) - Emerald
| Skill | Icon | Duration | Framework |
|-------|------|----------|-----------|
| budgeting | 💵 | 30-45 min initial | Zero-Based Budgeting + YNAB |
| financial-review | 📊 | 30-60 min monthly | Personal CFO |
| big-purchases | 🛒 | 30-45 min | Value-Based Spending |
| debt-payoff | 🎯 | 45-60 min planning | Debt Snowball/Avalanche |
| retirement-planning | 🏖️ | 45-60 min | 4% Rule + Tax Optimization |
| tax-mitigation | 📋 | 30-60 min | Tax-Advantaged Strategies |
| portfolio-assessment | ⚖️ | 45-60 min | Modern Portfolio Theory |

### Health (3 skills) - Teal
| Skill | Icon | Duration | Framework |
|-------|------|----------|-----------|
| sleep-routine | 😴 | 90 min wind-down | Matthew Walker + Huberman |
| strength-program | 🏋️ | 45-75 min/session | 5/3/1 + Starting Strength |
| nutrition-planning | 🥗 | 2 hrs/week prep | ISSN + Precision Nutrition |

### Inner (1 skill) - Purple
| Skill | Icon | Duration | Framework |
|-------|------|----------|-----------|
| self-connection | 💜 | 15-30 min | NVC + Focusing |

### Communication (1 skill) - Orange
| Skill | Icon | Duration | Framework |
|-------|------|----------|-----------|
| nvc-conversation | 💬 | 20-45 min | NVC |

### Creative (1 skill) - Pink
| Skill | Icon | Duration | Framework |
|-------|------|----------|-----------|
| brainstorming | 💡 | 30-60 min | SCAMPER + Design Thinking |

---

## Current Color Palette (Tailwind)

| Element | Color |
|---------|-------|
| Background | slate-900 → slate-800 gradient |
| Card background | slate-800/50 |
| Card border | slate-700 |
| Primary text | white |
| Secondary text | slate-300 |
| Muted text | slate-400, slate-500 |
| Productivity domain | green-500 |
| Business domain | blue-500 |
| Finance domain | emerald-500 |
| Health domain | teal-500 |
| Inner domain | purple-500 |
| Communication domain | orange-500 |
| Creative domain | pink-500 |

---

## Design Goals for Redesign

1. **Better visual hierarchy** - Make the domain tabs more discoverable
2. **Improved scannability** - Users should quickly find relevant skills
3. **Clearer skill cards** - Information density is high; consider progressive disclosure
4. **Maintain dark theme** - Fits developer/productivity tool aesthetic
5. **Mobile responsive** - Works well on all screen sizes
6. **Download prominence** - Make ZIP download more visible (for Claude Desktop users)

---

## Constraints

- Must remain a single-page React app
- Tailwind CSS for styling
- Keep existing skill data structure
- ZIP download functionality must remain
- GitHub link required

---

## Inspiration

- Developer tool landing pages (Linear, Raycast, Notion)
- Documentation sites with good filtering (Tailwind, shadcn/ui)
- Dashboard UIs with card grids

---

## Deliverables Requested

Please provide:
1. A redesigned App.jsx with improved UI/UX
2. Explanation of design decisions
3. Any recommended Tailwind config additions

Feel free to restructure components, add animations, or suggest alternative layouts while maintaining the existing functionality.
