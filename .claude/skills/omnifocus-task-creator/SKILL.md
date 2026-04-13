---
name: omnifocus-task-creator
description: >
  Creates OmniFocus tasks via the Drafts app whenever human action is required.
  This skill should be used PROACTIVELY — whenever Claude identifies a task, deliverable,
  or action item that requires human intervention (account signups, content reviews,
  publishing steps, approvals, phone calls, meetings, purchases, manual configurations,
  anything Claude cannot do itself), it should create an OmniFocus task automatically
  without being asked. Also triggers when the user says "track this", "remind me",
  "add to OmniFocus", "create a task", "I need to do", "follow up on", or any phrasing
  that implies a task the human needs to complete. Use this skill liberally — if in doubt
  about whether something needs human follow-through, create the task. It's better to
  over-capture than to let something slip through the cracks.
---

# OmniFocus Task Creator

## Purpose

You are Claude working in Cowork mode, helping Kody with Patina — a designer-curated furniture platform. Throughout your work sessions, you will frequently identify things that require human action: signing up for a service, reviewing a draft, publishing content, making a phone call, sending an email from a personal account, configuring an external tool, etc.

This skill exists because **Claude's work is only valuable if the human follow-through actually happens.** Every time you identify a human action item, you create an OmniFocus task so it doesn't get lost. This is especially important during long planning or implementation sessions where dozens of action items can surface.

## How It Works

You use the **Drafts app** as a bridge to OmniFocus. The flow is:

1. Create a draft via `mcp__Drafts__drafts_create_draft` with a structured format
2. Run the `mcp__Drafts__drafts_run_action` with action name `"Task in OmniFocus"` on that draft
3. The task appears in OmniFocus

## Draft Format

The **first line** of the draft becomes the task title in OmniFocus. Everything after becomes the note. Structure it like this:

```
[Clear, actionable task title]

Project: [OmniFocus project name or "Inbox" if unknown]
Due: [YYYY-MM-DD if there's a hard deadline, or omit]
Defer: [YYYY-MM-DD if there's a planned start date, or omit]
Context: [Brief context — why this task exists, what it unblocks]
Source: [What Claude session/workflow generated this task]
```

### Task Title Guidelines

Write titles as clear, actionable imperatives. The person reading this in OmniFocus should immediately understand what to do without opening the note.

**Good titles:**
- "Sign up for PostHog Cloud and copy API key to .env.local"
- "Review draft: 'How to Tell If Furniture Will Last 20 Years'"
- "Create Crunchbase profile for Patina with prepared copy"
- "Ask Leah for bullet points on furniture quality indicators"
- "Submit sitemap to Google Search Console"

**Bad titles:**
- "PostHog" (what about it?)
- "Review content" (which content?)
- "Do the thing we discussed" (useless without context)

### Project Routing

The primary project is **"Patina"**. Use these guidelines:

- If the task is clearly related to Patina work (website, marketing, launch, content, tracking, design services, app), use project `Patina`
- If the task is about Middlewest Studio specifically, use project `Middlewest Studio` (if it exists) or leave blank
- If you're unsure what project it belongs to, **leave the Project line as "Inbox"** — the task will land in OmniFocus inbox for manual filing
- Never guess at project names you haven't been told about

### Date Guidelines

Use the **flexible** approach:

- **Due date**: Only set this for genuine deadlines — things that must happen by a specific date or something breaks, expires, or is missed. Most tasks don't have hard due dates.
- **Defer date**: Set this when the task shouldn't be started until a certain date (e.g., "review analytics after 30 days of data collection" → defer 30 days out). This is the "don't think about this until" date.
- **No dates**: If timing is uncertain or the task is "whenever you get to it," skip both dates. That's fine — it'll sit in the project list until addressed.

Date format: Always use `YYYY-MM-DD` (e.g., `2026-04-18`).

## When to Create Tasks

### Always create a task when:

- You recommend the user sign up for a service or create an account
- Content needs human review before publishing (Leah's expertise check, Kody's final approval)
- Something needs to be done in an external tool you don't have access to (App Store Connect, Google Search Console, social media accounts, email platforms)
- A workflow has a step that requires human judgment or physical presence (podcast interviews, photography, Reddit posting, networking)
- You've created a draft or deliverable that needs review and action
- There's a deadline or time-sensitive item in a plan
- The user mentions something they need to do ("I should probably..." / "I need to..." / "remind me to...")
- A configuration requires credentials or access you don't have

### Don't create a task when:

- You can do it yourself right now (code changes, file creation, analysis)
- It's a decision the user needs to make in this conversation (ask them directly instead)
- The item is purely informational with no action required

## Batching

If a workflow produces multiple tasks at once (e.g., building an implementation plan with 8 human action items), create them all. But create each as a **separate draft → separate OmniFocus action call**. Don't try to batch multiple tasks into one draft.

When batching, briefly tell the user what you're creating: "I'm adding 5 tasks to your OmniFocus for the items that need your hands..."

## Example

During a session about implementing PostHog tracking, Claude identifies that the user needs to create a PostHog Cloud account:

**Step 1:** Create draft:
```
Sign up for PostHog Cloud and create "Patina" project

Project: Patina
Due: 2026-04-19
Context: Required before PostHog integration can go live on patina.cloud. Go to app.posthog.com, create account, create project named "Patina", copy the API key from Project Settings. Claude needs the key added to .env.local as NEXT_PUBLIC_POSTHOG_KEY.
Source: Cowork session — Technical Foundation Sprint
```

**Step 2:** Run "Task in OmniFocus" action on the draft.

**Step 3:** Confirm to user: "I've added 'Sign up for PostHog Cloud' to your OmniFocus with a due date of April 19th."

## Confirmation

After creating each task (or batch), briefly confirm what was added. Keep it concise — one line per task is plenty. Don't over-explain. Example:

> "Added to OmniFocus: 'Sign up for PostHog Cloud and create Patina project' (due Apr 19)"

Or for a batch:

> "Added 4 tasks to your OmniFocus:
> - Sign up for PostHog Cloud (due Apr 19)
> - Create Crunchbase profile with prepared copy
> - Review journal article draft with Leah
> - Submit sitemap to Google Search Console"

## Error Handling

If the Drafts MCP tools aren't available or fail:
1. Don't silently skip the task — tell the user
2. List the tasks that need to be created manually
3. Offer to try again or suggest they add the tasks themselves
