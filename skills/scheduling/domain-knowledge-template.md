# Domain Knowledge Template

This template defines your personal scheduling rules and preferences. Copy this to `~/.claude/scheduling-config/domain-knowledge.md` and customize for your situation.

The scheduling skill reads this file to understand your work patterns, activity requirements, and preferences.

---

## Your Information

| Field | Value | Notes |
|-------|-------|-------|
| Name | [YOUR_NAME] | Used in communication |
| Home address | [ADDRESS] | For travel time calculations |
| Timezone | [TIMEZONE] | e.g., America/Los_Angeles |

---

## Work Configuration

### Primary Work Type

Describe your main work that gets scheduled:
- **Type:** [DESCRIPTION - e.g., "client consulting", "field service", "creative work"]
- **Typical duration:** [MINUTES per session]
- **Setup time:** [MINUTES before work]
- **Cleanup time:** [MINUTES after work]

### Work Locations

| Location | Address | Notes |
|----------|---------|-------|
| [Location 1] | [Address] | [When you work here] |
| [Location 2] | [Address] | [When you work here] |

### Work Day Preferences

- **Preferred days:** [e.g., "Weekdays", "Mon-Thu", "Flexible"]
- **Best time of day:** [e.g., "Mornings for focused work"]
- **Earliest start:** [TIME - e.g., "9:00 AM"]
- **Latest end:** [TIME - e.g., "6:00 PM"]

---

## Calendar Interpretation

### Busy vs Free Events

- **Busy events** = Hard conflicts, cannot double-book
- **Free events** = Awareness/reminders, CAN schedule over them

The skill checks the `busy` field on calendar events automatically.

### Examples of Free Events (customize for your calendar)

- Optional social events
- "Consider doing X" type reminders
- Soft holds for potential activities

### Buffer Time

- **After meetings/calls:** [MINUTES - e.g., "15 min"]
- **Travel buffer:** [MINUTES beyond Google estimate - e.g., "10 min"]

---

## Activity-Specific Rules

### [Activity 1 - e.g., "Mountain Biking"]

| Requirement | Value |
|-------------|-------|
| Minimum duration | [TIME - e.g., "1 hour"] |
| Total time needed | [TIME including prep/travel - e.g., "2 hours"] |
| Weather requirements | [e.g., "No rain in previous 48 hours"] |
| Preferred time | [e.g., "Afternoon/evening"] |
| Location/trailhead | [ADDRESS for travel calculation] |

### [Activity 2 - e.g., "Gym/Strength Training"]

| Requirement | Value |
|-------------|-------|
| Minimum duration | [TIME] |
| Total time needed | [TIME] |
| Weather requirements | [e.g., "None - indoor"] |
| Preferred time | [e.g., "Morning"] |
| Location | [ADDRESS] |

### Meetings/Calls

- Respect stated duration
- Add buffer after for notes/transition
- Prefer video calls in [LOCATION - e.g., "quiet location at home"]

---

## Recovery & Training Load (if using Strava)

| Recent Activity | Recommendation |
|-----------------|----------------|
| Hard workout yesterday | Rest or easy day |
| Back-to-back active days | Consider rest |
| No activity in 3+ days | Good day for activity |
| Light activity yesterday | Can go harder today |

**Intensity indicators (customize thresholds):**
- High intensity: [YOUR_DEFINITION - e.g., ">1000 ft elevation gain"]
- Moderate intensity: [YOUR_DEFINITION]
- Light intensity: [YOUR_DEFINITION]

---

## Communication Priorities

### High Priority (Surface Immediately)

- [Contact/category 1 - e.g., "Family messages"]
- [Contact/category 2 - e.g., "Client emails about scheduled work"]
- [Contact/category 3]

### Medium Priority

- [Category - e.g., "Business inquiries"]
- [Category - e.g., "Scheduling requests"]

### Can Wait

- Newsletters, promotions
- Non-urgent notifications

---

## Conflict Detection

Flag these situations automatically:

1. **Double-booking** — Two busy events overlap
2. **Insufficient travel time** — Not enough time between locations
3. **Weather conflicts** — Outdoor activity scheduled on bad weather day
4. **Overloaded day** — More than [X hours - e.g., "6 hours"] of commitments
5. **Missing buffer** — Back-to-back events with no transition time

---

## Batch Execution Rules

When proposing changes:

1. Group related changes together
2. Show all proposed changes before executing
3. Wait for single confirmation
4. Execute all changes, then report results

**Allowed actions:**
- Create/update calendar events
- Update task database entries
- Create reminders
- Draft messages (require explicit approval before sending)

---

## Example: Brian's Configuration

Here's a real-world example for reference:

```markdown
## Your Information
- Name: Brian
- Home: 7125 Westmoorland Dr, Berkeley, CA 94705
- Timezone: America/Los_Angeles

## Work Configuration
- Type: Hull cleaning / boat diving (SailorSkills)
- Duration: 30 min average per boat
- Setup: 30 min (gear prep, travel to first boat)
- Cleanup: 30 min (gear cleanup, return home)
- Total daily window: 4 hours

## Work Locations
- Berkeley Marina
- Emeryville Marina
- Oakland Yacht Club

## Activity Rules
### Mountain Biking
- Minimum: 1 hour ride time
- Total: 2 hours with travel/prep
- Weather: No rain in 48 hours (trails need to be dry)
- Also: 20-30 min sunset runs with dog possible

### Recovery (Strava)
- Hard ride (>1000 ft): Rest next day
- Light ride (<500 ft): Can go harder

## Communication Priorities
- High: TMC emails (personal), client work emails
- Medium: Business inquiries
```

---

**After customizing:** Save this file to `~/.claude/scheduling-config/domain-knowledge.md`
