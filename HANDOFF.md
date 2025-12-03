# Lifeskills Plugin Troubleshooting Handoff

## Current State (2025-12-01)

The lifeskills plugin has been configured but skills are not appearing in Claude Code's available skills list.

## What Was Done

### 1. Fixed Skill Names (Session 1)
- Removed colons from skill names in SKILL.md frontmatter
- Changed `health:nutrition-planning` → `nutrition-planning`, etc.
- All 12 skills now have valid names (lowercase, hyphens only)

### 2. Fixed marketplace.json (Session 2)
- Added explicit `skills` array listing all skill paths
- Added `strict: false` flag
- Format now matches working plugins (anthropic-agent-skills)

## Current Configuration

### File Locations
```
/Users/brian/.claude/lifeskills/
├── .claude-plugin/
│   ├── marketplace.json    # Plugin manifest with skills array
│   └── plugin.json         # Plugin metadata
├── skills/
│   ├── using-lifeskills/SKILL.md
│   ├── creating-lifeskills/SKILL.md
│   ├── productivity/
│   │   ├── daily-startup/SKILL.md
│   │   └── daily-shutdown/SKILL.md
│   ├── health/
│   │   ├── nutrition-planning/SKILL.md
│   │   ├── strength-program/SKILL.md
│   │   └── sleep-routine/SKILL.md
│   ├── business/
│   │   ├── decision-making/SKILL.md
│   │   └── weekly-review/SKILL.md
│   ├── creative/
│   │   └── brainstorming/SKILL.md
│   ├── communication/
│   │   └── nvc-conversation/SKILL.md
│   └── inner/
│       └── self-connection/SKILL.md
└── README.md
```

### Symlink
```
/Users/brian/.claude/plugins/marketplaces/lifeskills → /Users/brian/.claude/lifeskills
```

### installed_plugins.json Entry
```json
"lifeskills@lifeskills": {
  "version": "1.0.0",
  "installedAt": "2025-12-01T00:00:00.000Z",
  "lastUpdated": "2025-12-01T00:00:00.000Z",
  "installPath": "/Users/brian/.claude/plugins/marketplaces/lifeskills",
  "gitCommitSha": "",
  "isLocal": true
}
```

### marketplace.json Content
```json
{
  "name": "lifeskills",
  "owner": { "name": "Brian", "email": "" },
  "metadata": {
    "description": "Personal life skills for productivity, health, communication, and growth",
    "version": "1.0.0"
  },
  "plugins": [
    {
      "name": "lifeskills",
      "description": "Personal life skills covering productivity, health, business, communication, creativity, and inner work",
      "source": "./",
      "strict": false,
      "skills": [
        "./skills/using-lifeskills",
        "./skills/creating-lifeskills",
        "./skills/productivity/daily-startup",
        "./skills/productivity/daily-shutdown",
        "./skills/health/nutrition-planning",
        "./skills/health/strength-program",
        "./skills/health/sleep-routine",
        "./skills/business/decision-making",
        "./skills/business/weekly-review",
        "./skills/creative/brainstorming",
        "./skills/communication/nvc-conversation",
        "./skills/inner/self-connection"
      ]
    }
  ]
}
```

## If Skills Still Don't Appear

### Debug Steps

1. **Check Claude Code loads the plugin at all**
   ```bash
   # Look for any plugin loading errors in Claude Code output
   # Try running with verbose mode if available
   ```

2. **Compare with working plugin structure**
   ```bash
   # anthropic-agent-skills works - compare structures
   diff -r /Users/brian/.claude/plugins/marketplaces/anthropic-agent-skills/.claude-plugin \
          /Users/brian/.claude/lifeskills/.claude-plugin
   ```

3. **Try simplifying the structure**
   - Move all skills to root level (no subdirectories)
   - Update marketplace.json paths accordingly

4. **Check if symlink is the issue**
   ```bash
   # Try copying instead of symlinking
   rm /Users/brian/.claude/plugins/marketplaces/lifeskills
   cp -r /Users/brian/.claude/lifeskills /Users/brian/.claude/plugins/marketplaces/lifeskills
   ```

5. **Verify plugin.json format matches working plugins**
   ```bash
   cat /Users/brian/.claude/plugins/marketplaces/anthropic-agent-skills/.claude-plugin/plugin.json
   ```

### Possible Issues to Investigate

1. **Path resolution**: The `./skills/` prefix may need to be relative to a different directory
2. **Plugin naming**: The marketplace name and plugin name being the same (`lifeskills`) might cause issues
3. **Missing fields**: Compare all fields in working marketplace.json vs ours
4. **Cache**: Claude Code might cache plugin info - check for cache clearing options

### Nuclear Option: Reinstall

```bash
# Remove all traces
rm /Users/brian/.claude/plugins/marketplaces/lifeskills
# Edit installed_plugins.json to remove lifeskills@lifeskills entry

# Reinstall following official plugin installation docs
# (Check Claude Code documentation for correct installation method)
```

## Verification Commands

```bash
# Check symlink
ls -la /Users/brian/.claude/plugins/marketplaces/lifeskills

# Verify all skills exist
for skill in ./skills/using-lifeskills ./skills/creating-lifeskills ./skills/productivity/daily-startup ./skills/productivity/daily-shutdown ./skills/health/nutrition-planning ./skills/health/strength-program ./skills/health/sleep-routine ./skills/business/decision-making ./skills/business/weekly-review ./skills/creative/brainstorming ./skills/communication/nvc-conversation ./skills/inner/self-connection; do
  if [ -f "/Users/brian/.claude/lifeskills/$skill/SKILL.md" ]; then
    echo "✓ $skill"
  else
    echo "✗ $skill (MISSING)"
  fi
done

# Validate JSON
cat /Users/brian/.claude/lifeskills/.claude-plugin/marketplace.json | python3 -m json.tool

# Check skill names have no colons
for file in /Users/brian/.claude/lifeskills/skills/*/SKILL.md /Users/brian/.claude/lifeskills/skills/*/*/SKILL.md; do
  sed -n '2p' "$file"
done
```

## Expected Result After Fix

Skills should appear in Claude Code as:
- `lifeskills:using-lifeskills`
- `lifeskills:creating-lifeskills`
- `lifeskills:daily-startup`
- `lifeskills:daily-shutdown`
- `lifeskills:nutrition-planning`
- `lifeskills:strength-program`
- `lifeskills:sleep-routine`
- `lifeskills:decision-making`
- `lifeskills:weekly-review`
- `lifeskills:brainstorming`
- `lifeskills:nvc-conversation`
- `lifeskills:self-connection`

## Reference: Working Plugin Comparison

The `anthropic-agent-skills` plugin works. Key differences to check:
- Has multiple plugins in one marketplace (document-skills, example-skills)
- Uses same `./` source with explicit skills array
- Has `strict: false`

The `superpowers` plugin uses remote git sources, so less useful for comparison.
