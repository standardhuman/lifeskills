---
name: decision-making
description: Use when facing important decisions, tradeoffs, unclear paths, or when stakes are high and you need structured thinking
---

# Strategic Decision Making

## Overview

Systematic decision-making framework combining First Principles Thinking, Pre-mortem Analysis, and OODA Loop to make high-quality decisions under uncertainty. Moves beyond gut feelings and analysis paralysis to structured evaluation that reduces blind spots and increases confidence.

**When to use**: Major business decisions, technical architecture choices, resource allocation, hiring, strategic pivots, tradeoffs with no clear winner, decisions with irreversible consequences, when team is split on direction

## Quick Reference

| Phase | Action | Time |
|-------|--------|------|
| 1. Frame | Define decision and success criteria | 10 min |
| 2. Gather | Collect information and constraints | 15 min |
| 3. Generate | Create options using first principles | 20 min |
| 4. Evaluate | Score options against criteria | 15 min |
| 5. Test | Pre-mortem and scenario planning | 15 min |
| 6. Decide | Choose and commit with exit criteria | 10 min |

**Total time**: ~75-90 minutes for major decisions

## The Process

Copy this checklist using TodoWrite to track progress:

```
□ Phase 1: Frame (define decision)
□ Phase 2: Gather (collect information)
□ Phase 3: Generate (create options)
□ Phase 4: Evaluate (score options)
□ Phase 5: Test (pre-mortem)
□ Phase 6: Decide (choose and commit)
```

### Phase 1: Frame (10 minutes)

Define what you're actually deciding. Poor decisions often result from solving the wrong problem.

**Actions**:
1. Write the decision in one sentence
2. Ask: "What is this decision really about?" (go deeper 2-3 times)
3. Define success: What does a good outcome look like in 6 months? 2 years?
4. Identify decision type:
   - **Type 1** (irreversible, high stakes) → Need deeper analysis
   - **Type 2** (reversible, low stakes) → Decide faster, learn from results
5. Set timeline: When must this decision be made? What happens if delayed?

**AskUserQuestion**: "What decision are you facing? What makes this decision important or difficult?"

**Why this matters**: Jeff Bezos distinguishes Type 1 (one-way door) from Type 2 (two-way door) decisions. Type 2 decisions should be made quickly by individuals or small teams. Type 1 decisions deserve this full process.

**Example reframing**:
- "Should we build feature X?" → "How do we maximize user value with our next 3 months of development time?"
- "Should I hire this candidate?" → "What does our team need most to achieve our Q2 goals?"
- "Which technology should we use?" → "What technical foundation will serve us best over the next 2-3 years given our constraints?"

### Phase 2: Gather (15 minutes)

Collect relevant information without falling into analysis paralysis. OODA Loop: Observe.

**Actions**:
1. **Facts**: What do we know for certain?
   - Data, metrics, constraints (budget, time, people)
   - Previous similar decisions and their outcomes
   - Market/competitive information
2. **Unknowns**: What don't we know? Can we learn it quickly?
   - Assumptions we're making
   - Information we could gather (and how long it would take)
3. **Constraints**: What are our real limitations?
   - Budget, timeline, team capacity, technical constraints
   - Non-negotiable requirements
4. **Stakeholders**: Who is affected? Who has input?
   - Decision maker (ultimate authority)
   - Consulted (provide input)
   - Informed (need to know outcome)

**AskUserQuestion**: "What facts do you have? What are your constraints? What key information are you missing?"

**80/20 rule**: Gather the 20% of information that gives you 80% of clarity. Don't wait for perfect information - it doesn't exist.

**Charlie Munger's mental model**: "I never allow myself to have an opinion on anything that I don't know the other side's argument better than they do."

### Phase 3: Generate (20 minutes)

Create options using first principles thinking. Don't accept the obvious choices as the only choices.

**First Principles Approach**:
1. Break decision down to fundamental truths (what MUST be true?)
2. Remove assumptions ("we've always done it this way" is not a principle)
3. Rebuild from fundamentals to generate novel options

**Actions**:
1. List the obvious options (usually 2-3)
2. Apply first principles:
   - "If we had to achieve this goal without [typical resource], how would we do it?"
   - "What would this look like if it were easy?"
   - "What would we do if our budget was 10x smaller? 10x larger?"
3. Generate creative options:
   - Hybrid approaches (combine elements of different options)
   - Phased approaches (sequence options over time)
   - Minimum viable versions (what's the smallest test we could run?)
4. Include "do nothing" option (often forgotten, sometimes best)

**Aim for 4-6 options**: Too few = false dichotomy, too many = analysis paralysis

**AskUserQuestion**: "What are your initial options? What would you do if you had 10x more budget? What would you do if you had to decide today?"

**Example - Hiring decision broken to first principles**:
- Typical: "Should we hire candidate A or B?"
- First principles: "What capability do we need? When? How permanent?"
- Novel options: Hire both part-time, contract for 3 months then decide, promote internally and hire junior, split role into two different hires

### Phase 4: Evaluate (15 minutes)

Score options against clear criteria using a weighted decision matrix. OODA Loop: Orient.

**Define criteria** (3-5 most important factors):
1. **Impact**: Does this move us toward goals?
2. **Feasibility**: Can we actually execute this?
3. **Cost**: Time, money, opportunity cost
4. **Risk**: What could go wrong? How bad?
5. **Reversibility**: Can we undo this if it doesn't work?

**Weight criteria** (assign importance 1-5):
- Not all criteria are equally important
- Must-haves get higher weight than nice-to-haves

**Score each option**:
1. Rate each option on each criterion (1-10 scale)
2. Multiply by weight
3. Sum total scores
4. Note: Highest score is input to decision, not the decision itself

**Example matrix**:

| Option | Impact (5x) | Feasibility (3x) | Cost (4x) | Risk (3x) | Total |
|--------|-------------|------------------|-----------|-----------|-------|
| A      | 8 (40)      | 6 (18)           | 7 (28)    | 5 (15)    | 101   |
| B      | 9 (45)      | 4 (12)           | 5 (20)    | 7 (21)    | 98    |
| C      | 6 (30)      | 9 (27)           | 8 (32)    | 8 (24)    | 113   |

**AskUserQuestion with structured evaluation**: "Let's define your criteria and weights, then score each option."

**Why this works**: Forces explicit thinking about tradeoffs. The process of scoring reveals assumptions and forces you to articulate why you prefer one option.

### Phase 5: Test (15 minutes)

Pre-mortem analysis to identify blind spots and failure modes. OODA Loop: Orient (continued).

**Pre-mortem technique** (Gary Klein):
For your top-ranked option, imagine it's one year later and the decision was a complete disaster.

**Actions**:
1. Set the scene: "It's [date one year from now]. We chose [option]. It failed spectacularly."
2. Generate failure stories: "What went wrong?" (be specific)
   - Team/individual failures
   - External factors
   - Hidden assumptions that proved false
   - Second-order effects we didn't anticipate
3. Assess likelihood: Which failure modes are most plausible?
4. Identify mitigations: How could we prevent or detect these failures early?
5. Define early warning signals: What metrics/signs indicate we're heading toward failure?

**Second-order thinking**:
- First order: "If we do X, Y happens"
- Second order: "Then what? What happens after Y?"
- Example: "If we lower prices, we get more customers (first order), but we need more support staff and infrastructure (second order), and customers may perceive lower quality (third order)"

**Stress test top options**:
- Best case scenario: What if everything goes right?
- Worst case scenario: What if everything goes wrong?
- Most likely scenario: What realistically happens?
- Black swan: What extremely unlikely event would destroy this option?

**AskUserQuestion**: "Imagine your chosen option failed. What went wrong? What early warning signs should you watch for?"

**Why pre-mortem works**: Prospective hindsight (imagining something has happened) produces 30% more potential problems than asking "what could go wrong?" People are better at explaining past events than predicting future ones.

### Phase 6: Decide (10 minutes)

Make the decision, commit fully, and define exit criteria. OODA Loop: Decide and Act.

**Actions**:
1. **Choose**: Based on analysis, intuition, and judgment, what's the decision?
2. **Commit**: Decide with conviction
   - Set implementation date/timeline
   - Assign owner (who drives this forward?)
   - Allocate resources
3. **Define success metrics**: How will we know this was right?
   - Quantitative: Revenue, users, time saved, cost reduction
   - Qualitative: Team morale, customer feedback, strategic position
4. **Set exit criteria**: When would we reverse this decision?
   - Specific conditions that trigger reconsideration
   - Timeline for first review
   - Example: "If we don't see 20% improvement in metric X within 3 months, we reconsider"
5. **Plan communication**: Who needs to know? What's the message?
   - Explain the why, not just the what
   - Acknowledge alternatives considered
   - Show the thinking process

**Jeff Bezos principle**: "Disagree and commit" - once decided, everyone commits fully even if they disagreed during evaluation.

**AskUserQuestion**: "What's your decision? What are your success metrics? When will you review this decision?"

**Document the decision**:
- What we decided
- Why we decided it (key factors)
- What we considered and rejected (prevents relitigating)
- Exit criteria and review date

**Completion checklist**:
- Decision is clear ✓
- Owner is assigned ✓
- Success metrics defined ✓
- Exit criteria set ✓
- Communication plan ready ✓

## Key Principles

**Source**: Combined framework drawing from:
- **First Principles Thinking** (Elon Musk, Aristotle) - Break down to fundamental truths
- **Pre-mortem Analysis** (Gary Klein, 1989) - Prospective hindsight reveals blind spots
- **OODA Loop** (John Boyd, 1960s) - Observe, Orient, Decide, Act - rapid decision cycles
- **Type 1/Type 2 Decisions** (Jeff Bezos, Amazon) - Match decision process to reversibility
- **Second-Order Thinking** (Howard Marks) - Consider consequences of consequences
- **Mental Models** (Charlie Munger) - Multiple frameworks reduce cognitive biases

**Why it works**:
- **Structured thinking overcomes cognitive biases**: Our brains use shortcuts (heuristics) that often fail for complex decisions. Structure forces slower, more accurate thinking.
- **Pre-mortem reveals blind spots**: We naturally overweight positive outcomes. Imagining failure activates different neural pathways that spot problems we'd otherwise miss.
- **First principles prevent false constraints**: "We can't because..." is often assumption, not fact. Rebuilding from fundamentals reveals options you wouldn't see otherwise.
- **Explicit criteria make tradeoffs visible**: When you can't decide between options, it's usually because you haven't made your criteria explicit. Matrix forces clarity.
- **Exit criteria enable commitment**: "Disagree and commit" only works if you define when you'll reconsider. Otherwise people silently wait for failure.

**The decision quality equation**: Good decision = (Clear criteria) × (Multiple options) × (Tested assumptions) ÷ (Cognitive biases)

**Annie Duke principle** (Thinking in Bets): "Resulting" is when we judge decision quality by outcome rather than process. Good process + bad luck = still a good decision. Focus on repeatable process.

## Common Pitfalls

- **False dichotomy**: "Should we do A or B?" Often the best answer is C, D, or some hybrid. Force yourself to generate at least 4 options. If you only see two choices, you haven't thought deeply enough.

- **Analysis paralysis**: Waiting for perfect information guarantees you'll be late. Jeff Bezos: "Most decisions should be made with 70% of the information you wish you had. If you wait for 90%, you're probably being slow."

- **Sunk cost fallacy**: "We've already invested so much in X" - past costs are irrelevant to future decisions. Only future costs and benefits matter. The right question: "Knowing what I know now, what would I do?"

- **Overconfidence in outcome predictions**: You're terrible at predicting the future (everyone is). Instead of asking "will this work?", ask "how will we know early if it's not working?" Focus on learning rate over accuracy.

- **Deciding alone when you need diverse perspectives**: Your blind spots are invisible to you (that's why they're blind spots). Other people see different risks and opportunities. Important decisions benefit from at least 2-3 perspectives from different backgrounds.

- **Not writing down the decision logic**: Six months later, when results are mixed, people will propose relitigating the decision. "But we already considered and rejected that option because [reason]." Document prevents endless reconsideration.

- **Confusing motion with progress**: Doing more analysis feels productive but often isn't. If you have enough information to make a decision with 70% confidence, make it. You learn more from action than analysis.

- **Ignoring "do nothing" option**: Sometimes the right decision is to not decide yet, or to explicitly maintain status quo. Not deciding is itself a decision - make it explicitly rather than by default.

## Examples

**Example 1: SaaS startup deciding on pricing model**

**Phase 1 - Frame**:
- Initial: "Should we charge $29/mo or $49/mo?"
- Reframe: "What pricing model maximizes customer lifetime value while remaining competitive?"
- Decision type: Type 2 (reversible) but with high testing cost
- Timeline: Need to decide before next funding round (6 weeks)

**Phase 2 - Gather**:
- Facts: Current customers pay $29, 15% conversion rate, $8K MRR, competitor range $19-99
- Unknowns: Price sensitivity, willingness to pay for specific features
- Constraints: Need $50K MRR for next raise, current burn rate 12 months
- Stakeholders: CEO decides, sales/marketing consulted, existing customers informed

**Phase 3 - Generate**:
- Option A: $29/mo (status quo)
- Option B: $49/mo (simple increase)
- Option C: Tiered pricing ($29 basic, $79 pro)
- Option D: Usage-based pricing ($20 + per-use fees)
- Option E: Annual pricing ($299/year = $25/mo, 16% discount)
- Option F: Value metric pricing (charge by seats/data/API calls)

**Phase 4 - Evaluate**:

Criteria weights: Impact on revenue (5), Customer acceptance (4), Implementation complexity (2), Competitive position (3)

Top scorers:
- Option C (Tiered): Impact 8×5=40, Acceptance 7×4=28, Complexity 6×2=12, Competition 8×3=24 = **104**
- Option E (Annual): Impact 7×5=35, Acceptance 8×4=32, Complexity 9×2=18, Competition 6×3=18 = **103**
- Option B (Simple increase): Impact 6×5=30, Acceptance 5×4=20, Complexity 10×2=20, Competition 7×3=21 = **91**

**Phase 5 - Test (Pre-mortem on tiered pricing)**:
- Failure scenario: "It's 6 months later. Tiered pricing failed."
- What went wrong?
  - Customers confused about which tier they need (complexity killed conversions)
  - Existing customers angry about "losing features" they had before
  - Sales team struggled to explain value difference between tiers
  - Most customers stayed on basic tier (didn't increase revenue)
- Mitigations:
  - Clear feature differentiation (hire copywriter for comparison page)
  - Grandfather existing customers (all features at $29 forever)
  - Sales enablement training (run before launch)
  - Monitor upgrade rate (if <10% after 30 days, reconsider)
- Early warning signals: Low tier-upgrade rate, high support tickets about "what tier do I need?", negative customer feedback

**Phase 6 - Decide**:
- Decision: Launch tiered pricing ($29 basic, $79 pro) with grandfathering for existing customers
- Owner: CEO owns decision, Product Manager drives implementation
- Success metrics:
  - 25% of new customers choose pro tier within 3 months
  - Revenue increases 40% within 6 months
  - Customer satisfaction stays above 8/10
- Exit criteria:
  - If <10% choose pro tier after 2 months, collapse to single tier
  - If churn increases >5%, reconsider grandfather policy
  - Review at 3-month and 6-month marks
- Communication: Email to customers (you're grandfathered), blog post (why we're doing this), sales team training session

**Outcome**: After 3 months, 31% chose pro tier, revenue up 47%, customer satisfaction 8.4/10. Decision validated.

---

**Example 2: Engineering leader deciding on technical architecture**

**Phase 1 - Frame**:
- Initial: "Should we use microservices or monolith?"
- Reframe: "What architecture best serves our needs for the next 2-3 years given team size and growth projections?"
- Decision type: Type 1 (high migration cost if wrong)
- Timeline: Must decide before hiring next 3 engineers (4 weeks)

**Phase 2 - Gather**:
- Facts: Team of 5 engineers, growing to 15 in 12 months, current monolith has 200K lines
- Unknowns: Actual scaling needs (traffic projections are guesses), team's distributed systems experience
- Constraints: 6-month runway, can't afford downtime, team unfamiliar with K8s
- Stakeholders: CTO decides, senior engineers consulted, CEO informed

**Phase 3 - Generate**:
- Option A: Keep monolith (status quo)
- Option B: Full microservices (15+ services)
- Option C: Modular monolith (clear module boundaries, could extract later)
- Option D: Hybrid (2-3 services for specific needs, rest monolith)
- Option E: Wait and see (decide when team reaches 10 engineers)

**Phase 4 - Evaluate**:

Criteria: Development velocity (5), Scalability (4), Team capability (5), Risk (4), Cost (3)

Winner: Option C (Modular monolith) scored 112 vs Option B (Full microservices) 87

**Phase 5 - Test**:
- Pre-mortem: "Modular monolith failed"
- What went wrong?
  - Module boundaries were poorly defined (became "modular" in name only)
  - Team reverted to coupling modules together (no enforcement)
  - When we needed to extract service, modules weren't actually separable
- Mitigations:
  - Document module boundaries and dependencies in ADR (Architecture Decision Record)
  - Add automated tests for dependency violations
  - Quarterly architecture reviews
  - Build first extracted service at 10-engineer mark as forcing function
- Early warning: Cross-module database queries, circular dependencies, complaints about "can't change X without touching Y"

**Phase 6 - Decide**:
- Decision: Refactor to modular monolith with clear boundaries, extract first service at 10-engineer milestone
- Success metrics: Deploy velocity stays same or improves, successful service extraction under 2 weeks
- Exit criteria: If refactor takes >3 months or deploy velocity drops >20%, reconsider
- Review: 3 months (refactor progress), 9 months (first extraction)

**Outcome**: Refactor completed in 2.5 months, at 10 engineers extracted authentication service in 1 week, validated approach.

---

**Example 3: Founder deciding whether to pivot**

**Phase 1 - Frame**:
- Initial: "Should we pivot?"
- Reframe: "Do we have sufficient evidence that our current direction won't reach product-market fit within our runway?"
- Decision type: Type 1 (pivot is expensive and disruptive)
- Timeline: 8 months runway, need 4 months to execute pivot

**Phase 2 - Gather**:
- Facts: 1200 signups, 140 paying customers, 8% conversion, $18K MRR, need $100K MRR for sustainability
- Unknowns: Would different customer segment convert better? Is it product or go-to-market problem?
- Constraints: 8 months runway, team of 8, can't fund another pivot
- Customer feedback: "We like it but don't need it enough to pay more" (weak value proposition)

**Phase 3 - Generate**:
- Option A: Continue current path (improve product)
- Option B: Pivot to different customer segment (same product)
- Option C: Pivot to different problem (new product)
- Option D: Narrow focus (serve one specific niche extremely well)
- Option E: Shut down and return remaining capital

**Phase 4 - Evaluate**:
- Option D (narrow focus) scored highest: Could reach $100K MRR with existing product by targeting one vertical with specific workflow

**Phase 5 - Test**:
- Pre-mortem on narrowing: "We narrowed to healthcare vertical, it failed"
- Failures: Market smaller than thought, buying cycle longer than runway, regulatory complexity blocked sales
- Mitigations: Talk to 10 healthcare companies before committing, understand buying process, get pilot commitment from 2 customers
- Early warning: If can't get pilot commitments within 4 weeks, vertical might be wrong

**Phase 6 - Decide**:
- Decision: Narrow to healthcare vertical, 4-week validation sprint
- Exit criteria:
  - If get 2+ pilot commitments in 4 weeks → proceed
  - If <2 commitments → consider Option E (shutdown) or reassess
- Success: 4-month timeline to $40K MRR in healthcare

**Outcome**: Got 3 pilot commitments in 3 weeks, proceeded with focus, hit $45K MRR at 4 months, validated decision to narrow rather than pivot completely.

