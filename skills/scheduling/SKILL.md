---
name: scheduling
description: Use for daily/weekly planning, finding time for activities, or checking schedule conflicts. Integrates calendar, tasks, weather, email, messages, reminders, maps, and fitness tracking. Prompts for personalization on first use.
---

# Scheduling Skill

## Before Starting (Optional)

If you're feeling unclear or have mixed feelings about scheduling:
- **Feeling overwhelmed or anxious about your schedule?** → Try self-connection first to process what's weighing on you
- **Unsure what to prioritize?** → Try design-exploration first to clarify direction
- **Ready to plan your time?** → Continue below

## Overview

A multi-source scheduling assistant that understands your work, activities, and preferences to provide intelligent daily and weekly planning.

## When to Use This Skill

Invoke this skill when the user:
- Asks about their day or schedule ("what's my day look like?", "morning planning")
- Wants to plan the week ("what's my week?", "weekly planning")
- Needs to find time for something ("find time for biking", "schedule X")
- Asks about conflicts or availability ("am I free Thursday?", "any conflicts?")
- Mentions scheduling, planning, or calendar in any context

## Prerequisites

### Required MCP Servers
- **Google Calendar** - Core scheduling data (events, availability)

### Recommended MCP Servers
- **Weather** - For activity planning, outdoor work decisions
- **Google Maps** - For realistic travel time calculations

### Optional MCP Servers (enhance experience)
- **Notion** - Task/work tracking database
- **Gmail** - Communication awareness (flagged emails)
- **iMessage** - Message awareness (unread conversations)
- **Apple Reminders** - Task awareness (due items)
- **Strava** - Activity/recovery tracking for fitness recommendations

The skill gracefully degrades when MCPs aren't available—it notes what's missing and continues with available data.

---

## First-Time Setup

### Check for User Config

Before proceeding, check if personalized config exists:

```bash
ls ~/.claude/scheduling-config/domain-knowledge.md 2>/dev/null && echo "Config exists" || echo "No config"
```

**If config exists:** Read it and proceed to Data Gathering Phase.

**If no config exists:** Run the First-Use Customization Flow below.

### First-Use Customization Flow

"I see this is your first time using the scheduling skill. I need to learn about your schedule and preferences to give you good recommendations. Let me ask a few questions:"

**Questions to ask:**

1. **Basic Info**
   - What's your name?
   - What's your home address? (for travel time calculations)
   - What timezone are you in?

2. **Work Configuration**
   - What type of work do you primarily schedule? (e.g., client work, meetings, creative work, field work)
   - What's your typical work block duration?
   - Any setup/cleanup time needed around work? (e.g., 30 min before, 30 min after)
   - Do you have specific work locations I should know about?

3. **Schedule Preferences**
   - What activities work best in the morning for you?
   - What activities work best in the afternoon?
   - What's your earliest preferred start time?
   - What's your latest preferred end time?

4. **Weather-Dependent Activities**
   - Do you have outdoor activities that depend on weather? (e.g., biking, running, outdoor work)
   - What weather conditions matter for each? (e.g., "no rain in past 48 hours for mountain biking")

5. **Communication Priorities**
   - Any high-priority contacts whose messages should always surface?
   - Any email categories that are high priority?

6. **Fitness Tracking (if Strava available)**
   - Do you track activities on Strava?
   - Should I factor in recovery when suggesting activities?

**After collecting answers:**

Generate `~/.claude/scheduling-config/domain-knowledge.md` with the user's responses, following the template structure.

Confirm: "I've saved your preferences to ~/.claude/scheduling-config/domain-knowledge.md. You can edit this file anytime to update your settings."

---

## Required Reading

Before proceeding with scheduling, read the domain knowledge file:

```bash
cat ~/.claude/scheduling-config/domain-knowledge.md
```

This contains the user's rules for work timing, calendar interpretation, activity requirements, and conflict detection.

---

## Data Gathering Phase

### Step 0: Get Authoritative Date (MANDATORY)

Before doing ANYTHING else, run this command to get the correct day of week:
```bash
date "+%A, %B %d, %Y"
```

**Why:** Claude's mental day-of-week calculation is unreliable. The system clock is the only source of truth. NEVER present a schedule without running this first.

Store this result and use it as the anchor for all date references in the session.

---

### Step 1: Fetch Data Sources IN PARALLEL

Fetch all available sources simultaneously for speed:

### 1. Calendar Events
```
Tool: mcp__calendar__listEvents or mcp__calendar__todayEvents
Params: days=7 for weekly view, or today only for daily
Key field: Check "busy" field — true=blocker, false=awareness only
```

### 2. Task Database (if Notion available)
```
Tool: mcp__notion__queryDatabase
Database: [User's configured task database]
Filter: Due date >= today OR status = in_progress
Fields: Task name, due date, estimated duration, location
```

### 3. Weather (if available)
```
Tools: get_current_weather, get_forecast, get_precipitation_history
Check: Current conditions, 3-day forecast, 48-hour rain history
Use for: Activity scheduling, outdoor work planning
```

### 4. Reminders (if available)
```
Tool: mcp__reminders__todayReminders or mcp__reminders__listReminders
Check: Due dates, overdue items
```

### 5. Gmail (if available)
```
Tool: mcp__gmail__searchMessages
Queries: "is:important is:unread", "is:starred"
Check: Items needing response or action
```

### 6. iMessage (if available)
```
Tool: list_conversations
Check: Unread messages, recent conversations needing response
```

### 7. Travel Times (as needed)
```
Tool: mcp__google-maps__maps_directions
Use: Calculate realistic travel between locations
Always add buffer (per domain knowledge) to estimates
```

### 8. Fitness Activity (if Strava available)
```
Tool: mcp__strava__get_weekly_summary or mcp__strava__get_recent_activities
Check: Recent activities, intensity, recovery needs
Use for: Activity recommendations, avoiding overtraining
```

---

## Analysis Phase

After gathering data, apply domain knowledge rules:

1. **Identify busy blocks** — Calendar events where busy=true
2. **Calculate work windows** — Apply timing rules from domain-knowledge.md
3. **Check weather** — Flag outdoor activities if weather is bad
4. **Find conflicts** — Overlapping events, insufficient travel time
5. **Surface attention items** — Unread messages, due reminders, flagged emails
6. **Assess recovery** — If Strava data available, check recent activity intensity

---

## Presentation Phase

Present the daily overview in this format:

```
Today: [Day], [Date]

COMMITMENTS (busy events):
• [time] — [event name]
• ...

AWARENESS (free events):
• [time] — [event name] (optional)
• ...

PENDING WORK:
• [X items scheduled]: [item names]
• Estimated: [X]h total
• Suggested window: [time range]

NEEDS ATTENTION:
• [X] unread messages ([names])
• [X] emails flagged/important
• Reminders due: [list]

WEATHER:
• [temp]°F, [conditions]
• [Activity-relevant assessment based on domain knowledge]

RECENT ACTIVITY (if Strava available):
• Last activity: [date] — [type], [duration], [intensity]
• Week total: [summary]
• Recovery note: [recommendation based on recent intensity]

CONFLICTS/WARNINGS:
• [Any issues detected, or "None detected"]
```

---

## Request Handling Phase

After the overview, handle follow-up requests:

### "Find time for [activity]"
1. Check activity requirements from domain knowledge (duration, weather, etc.)
2. Check fitness data if available—factor in recovery needs
3. Scan calendar for gaps that fit
4. Consider travel time from/to adjacent commitments
5. Propose specific time slots with relevant context
6. Offer to create calendar event

### "What does [day] look like?"
1. Show that day's schedule in overview format
2. Highlight gaps and opportunities

### "Schedule [X] with [person]"
1. Check availability
2. If contact info needed, check Gmail/iMessage for context
3. Propose times
4. Offer to create event and send invite/message

### "Move [task] to [time]"
1. Verify the time works (conflicts, duration)
2. Propose updated schedule
3. Update Calendar and task database on confirmation

### "Any conflicts this week?"
1. Scan full week for issues
2. Report: double-bookings, travel time problems, weather conflicts
3. Suggest resolutions

---

## Execution Phase

When proposing changes:

1. **Batch related changes** — Group calendar + database updates together
2. **Show full proposal** — List all changes before executing
3. **Single confirmation** — "I'll create these events and update your tasks. Proceed?"
4. **Execute and report** — Do all changes, confirm success

### Allowed Actions (execute on confirmation)
- Create/update calendar events
- Update task database entries
- Create reminders

### Requires Explicit Approval
- Sending emails
- Sending messages
- Deleting events

---

## Error Handling

- If an MCP is unavailable, note it and continue with available data
- If weather check fails, note "weather data unavailable" rather than blocking
- If task database query fails, fall back to calendar-only planning
- Never block on missing data—provide best available information

---

## Tips for Good Scheduling

Apply these general principles (personalized in domain knowledge):

- Physical work often best in morning (energy, conditions)
- Creative/flexible work often better in afternoon
- Don't over-schedule—leave buffer time between commitments
- Group tasks by location to minimize travel
- Check weather before suggesting outdoor activities
- Factor in recovery for physical activities
