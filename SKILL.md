---
name: prototype-tredence
description: Tredence prototypes. Build clickable "art of the possible" HTML prototypes that a Tredence team shows a customer, with realistic Microsoft product screens (the Microsoft Copilot app as home, with Teams, Outlook, Dynamics 365 and Power BI as supporting screens, plus the customer's own systems) framed in the Tredence 2026 brand (Bright Orange, Poppins, official logos and template chrome, #BeyondPossible), so the room sees how an agent or AI scenario could change the way their business works and the last-mile decisions people make every day. Nothing works for real; all data is fictitious; everything ships as one self-contained HTML file. Use for any request to prototype, mock up, storyboard, demo, or visualise an AI, agent, or Copilot scenario or workflow for a Tredence customer meeting; to turn a scenario description, notes, or a whiteboard into a clickable Tredence concept; or to change, fix, restyle, or repackage an existing prototype.
---

# Tredence prototypes

**The test that matters most: does the room leave saying "we could run our business differently", and would a
Tredence lead show it to them with a straight face?**  Not "nice tool", and not "that's a nice AI mock-up".  Before
you show any scene, picture it on the meeting-room screen with the customer's business leader and data or IT lead
watching.  If it only makes one person's task faster, think bigger.  If anything looks generic, fake-shiny, off-brand,
or promises more than a concept can, fix it.

What you build is a **concept, not a product**: scripted, fictitious, offline, and always labelled.  It shows how
work *could* feel.  It never calls a real system, never uses real customer data, and never implies something ships.

**You design it.**  The plumbing is fixed (kit, engine, Tredence frame, label, packing) and so is the quality bar
below.  The story, the screens, their order and their layout come from this customer.  Two prototypes for different
customers should never look like the same demo with the names swapped.

## Think big: the business, not the task

A prototype that shows one person getting through a task faster is a productivity demo.  The room nods and moves
on.  Aim for the business working differently because people and agents now work together, and show what that is
worth.  → `references/story-and-data.md` §Start with the business shift

| Ambition | What the room sees | What they say |
|---|---|---|
| Faster task | The same work, done quicker with Copilot | "Nice tool" |
| Work taken off | Agents gather, check and draft; people decide | "That would save us time" |
| **Business rethought** | Because that work is now fast and cheap, the business does what it couldn't: serves every customer like its best ones, acts before the customer asks, checks every case instead of a sample, offers something new | "We could run this differently" |

Aim for the third.  The first two are how you get there, not the point.

- **Tredence's point of view is the last mile**: insight matters when it changes a decision someone makes every
  day.  Most customers already have the data and the dashboards; look for the decision that still doesn't change,
  and show the agent putting the answer in front of the person who makes it, while the person still decides.
- **Find the shift before the screens**: the constraint the business lives with today, how it could work instead
  (from → to, in operating terms: who is served, how often, how fast, by whom), the measure that moves, and the
  leader who owns that measure.
- **Show it at two heights**: on the ground (one person, one case, the moment the decision changes, a human
  decision) and from above (what that means across the whole business: the book, the region, the network, the
  measure moving).  The person's day is the proof; the business shift is why the room cares.
- **A list of capabilities is not a storyline.**  If the notes list features or areas to cover, don't build a
  scene per item or tick them off at the end.  Ask what business result the list is for, tell that story, and let
  each capability appear where it matters.  Map items to scenes in `brief.md`, not on screen.
- **Cover and close carry the shift.**  The cover names the business change in the customer's words; the close
  says how the business could work, what it could be worth, and one ask.  Never a product tagline, and never a
  recap of what the room just saw.
- **Think big, claim small.**  Ambitious about the change; modest and honest about the numbers.  Impact is rounded,
  labelled "Illustrative" on screen, with its basis in `brief.md` and the presenter notes.  Time freed is capacity
  for more or better work, never a cut in staff.  For a full value case or a proposal, hand over to the
  `pptx-tredence` skill: same brand, same story, as an editable deck.

## Find the skill folder

Everything ships next to this SKILL.md.  Call that folder `<skill>` (it may have a suffix such as `-2`; use the
newest).  If you need to find it:

```powershell
Get-ChildItem C:\ -Recurse -Filter frames.html -ErrorAction SilentlyContinue | Where-Object FullName -match 'prototype-tredence' | Select-Object -ExpandProperty FullName
```

```bash
find / -path '*prototype-tredence*/assets/frames.html' 2>/dev/null
```

## What's in this skill

- `assets/starter.html`: the kit wiring, the concept label, and four starter scenes (a Tredence cover, a Copilot
  conversation with work steps and an approval card, a Tredence close, the #beyondpossible sign-off), every word a
  `[[placeholder]]`.  Copy it to start.  **The starter scenes show the styles and the code, not a story or layouts
  to reuse.**  Delete any you don't need; design the rest.
- `assets/shells.html`: each Microsoft product's chrome as an outline, every word a `[[placeholder]]`: Copilot
  Home, a Power BI answer, a Cowork plan, proof in the browser pane, Teams, Autopilot, Outlook mail and calendar,
  Dynamics 365, a Word draft, a Power BI report, and the customer's own business app.
- `assets/frames.html`: each Tredence frame layout as an outline: cover, their world, a from → to matrix, where
  we'd start, the #BeyondPossible chapter break, the solid orange divider, the ask on a photo, the closing.
- `assets/kit/`: the shared kit every prototype uses, unchanged: `proto-style.js` (Fluent 2 tokens and product
  shells, the Tredence frame and its chrome), `proto.js` (scene engine, presenter controls), `icons.js` (Fluent
  System Icons), `brand/` (official Tredence logos and template chrome), `fonts/` (Poppins), `photos/` (the brand
  photo set, 1920 px).
- `assets/check_prototype.py`: steps through the prototype like a presenter, screenshots every stop, makes contact
  sheets and flags problems, including Tredence brand violations on frame scenes and leftover placeholders.
  `check_prototype.mjs` is its Node runner, used automatically when Python Playwright is missing.
- `assets/pack_prototype.py`: turns the prototype into one self-contained HTML file (fonts, logos and photos
  inlined) and blocks network use.
- `references/`: `story-and-data.md`, `look-and-feel.md` (product scenes), `tredence-frame.md` (frame scenes,
  palette, logos, photos, voice), `engine.md`, `qa-and-feedback.md`.

No finished prototype ships with this skill, on purpose: with one in the skill, agents copied its scenes, order and
layouts.  Find the story first; then choose the screens.

## How you work

- **Folder per prototype**: `working/<short-name>/` in the user's workspace (not inside the skill), holding
  `brief.md`, `prototype.html` (a copy of `assets/starter.html`) and `kit/` (a copy of `assets/kit/`).
- **Fixed plumbing, open design.**  `prototype.html` holds the scenes and its own `<style>` block; never edit
  `kit/`.  No frameworks, CDNs, web fonts or network calls, so every prototype packs into one file.  On top of that,
  design freely: combine the kit's parts, restyle them in `<style>`, or build views the kit doesn't have from its
  tokens (Fluent tokens in product scenes, `--td-*` tokens in frame scenes).
- **Work in small, visible turns.**  Show the storyboard before building scenes; show screenshots after building.
- **Edit in place.**  Later changes go into the same `prototype.html`, then check and pack again.
- **Do the review yourself**, never with a subagent.

## The loop

1. **Brief** (`brief.md`).  Who is in the room (industry, roles), the problem in their words, the one moment that
   should make them lean in, what they should believe afterwards, the one ask, whether the customer's name may go
   on the cover, and length (as long as the story needs to be shown: often 5–8 scenes, more for an end-to-end
   process).
   **Design-thinking card: one stop, before building.**  Don't ask open questions.  Write your best answer to each
   line from what the user gave, and send it as one message: "Before I build, here's my read.  Reply **go**, or
   change any line."
   1. **The business shift:** how the business works today → how it could work, the measure that moves (roughly,
      illustrative), and the leader who owns it.
   2. **Who and the decision:** the person whose work shows the shift, the everyday decision that doesn't change
      today (the last mile), and what is slow or hard about it.
   3. **The moment to land:** the one thing Copilot or the agent does that makes the room lean in.
   4. **Who does what:** which steps the agent does on its own, and which need the person's input or approval.
   5. **What we want to learn from them:** the one guess about how the customer works that the demo tests.
   Make every line specific to this customer and industry, and mark anything you guessed "(my guess)".  If line 1
   reads like a faster task, it isn't a shift yet: rewrite it before you send the card.  Use the form tool if you
   have one (answers filled in), otherwise plain text.  Skip the card if the user says "just build it" or has
   already given all five.  One round only: if the reply leaves something open, or the user skips the card, don't
   ask again.  Build with the defaults: one person and one case on the ground, the business from above, safe to
   show the customer, Microsoft's fictitious names, "Concept" on the cover tag unless the user says the customer's
   name is allowed.  Put the card in `brief.md` and list every default in your reply.
2. **Storyboard** (in `brief.md`; show it in your reply, but don't stop for approval: the card was the stop).  The
   shift in one sentence; the beats the room must see happen, on the ground and from above; then, for each beat,
   the screen that shows it best.  A table: scene, screen, what the presenter says (one spoken line), what happens
   on screen, what the presenter clicks.  → `references/story-and-data.md`, `references/look-and-feel.md` §What
   screens mean
3. **Cast and data sheet** (in `brief.md`).  The fictional company, people, records, dates and numbers, written once
   and reused identically in every scene.  **Charts are Power BI**: a trend, gap or breakdown is a Power BI visual
   (`figure.pbi[data-chart]`) from a named report, cited as the source, never a hand-made chart.
   → `references/story-and-data.md`, `references/look-and-feel.md` §Power BI
4. **Build scenes** in `prototype.html`, each one for its beat.  Compose product scenes from the starter, the
   outlines in `shells.html` and the kit's building blocks, or build what the kit doesn't have from its tokens.
   Give the signature moment a view designed for it.  Product scenes use `class="scene zoom"`.  Frame scenes
   (`class="scene frame td-…"`, from the starter and `frames.html`) are for the cover, an optional chapter break,
   at most one scene that names the tension or shows the business from above, and the close.
   → `references/look-and-feel.md` §Components you can draw, `references/tredence-frame.md`, `references/engine.md`
5. **Check.**  `python <skill>/assets/check_prototype.py working/<name>/prototype.html`.  Fix every finding.  Then
   review the contact sheets against the checklist in `references/qa-and-feedback.md`.  After an edit, recheck that
   scene with `--scene <id>`; finish with one full pass that finds nothing new, then one `--motion` pass, and fix
   anything that jumps.  Delete `renders/` when done.  **In Copilot Cowork, never run `pip install` or
   `npm install`**; if the check can't find Playwright or a browser, see `qa-and-feedback.md` §Running the check.
   If the check can't run at all, say so; never pass off a code read as a visual check.
6. **Pack.**  `python <skill>/assets/pack_prototype.py working/<name>/prototype.html` →
   `working/<name>/dist/<name>.html`.  Run the check once more on the packed file: it also plays it inside the
   sandbox OneDrive and SharePoint use to preview a shared file, and reports any script error there.
7. **Deliver.**  The packed file path, the run order (click Next at the bottom right, or the highlighted control;
   N for notes), the business shift in
   one line, what's illustrative and its basis, and open questions (`qa-and-feedback.md` §Delivery note).  Give the
   card's line 5 as the question to ask in the room, put it in the presenter notes of the scene it tests, and leave
   a "What we learned" line in `brief.md` for the answer after the meeting.  If the user also needs slides, offer a
   `pptx-tredence` deck built from the same brief.

## Where the agent shows up

Tredence builds on Microsoft's AI stack (Microsoft Copilot, Copilot Studio, Microsoft Fabric, Power BI), and
Microsoft positions the Microsoft Copilot app as the place work starts for employees: Home (Chat, and Cowork for
multi-step work), and Autopilot for agents that keep working on their own.  Prototypes respect that positioning.
They don't follow a fixed route through it.

- **Employees meet Copilot in the Copilot app**, not in a Copilot pane inside every other app (no Copilot sidebar in
  Outlook, Teams or Dynamics 365; the checker flags it).  Business data comes to them there (Work IQ, Dynamics 365,
  Fabric and Power BI, the customer's own systems), with sources.
- **The story opens where the work starts.**  That may be Copilot Home, or the trigger itself: an alert on a phone
  in the field, an email arriving, a live Teams meeting, a record in the customer's own app, or the customer's own
  customer on a website talking to the company's agent (built in Copilot Studio).  Pick what's true for this person.
- **Other apps appear when the story needs them**: where the work begins, people reached (Teams, Outlook), or proof
  in a system of record (often in Copilot's browser pane).  Business apps come to the person; the person doesn't
  tour the apps.  No Code-mode scenes for business audiences.
- **The customer's own systems and other platforms** (an ERP, a planning tool, a data platform that isn't
  Microsoft's) appear as an unbranded business app (`.lob`) reached through a connector.  Never imitate a real
  non-Microsoft product, including Tredence's partners' products.
- **Label preview features** where they appear, in the scene and in the presenter notes: Autopilot, and the in-app
  browser (rolling out; admins turn it on).  Don't show features that haven't been announced.
- Never copy Microsoft's or Tredence's marketing characters, or any internal or confidential material, into a
  prototype.

## Design for this story

The guardrails keep it credible.  Inside them, the design is yours.

- **Beats first, screens second.**  Write what the room must see happen, then choose the screen that says it best.
  An approval card says a person is in control; a record in the browser pane says it really happened; an Autopilot
  feed says it kept working while you were away; a phone says this happens in the field; two views side by side say
  before and after, or two people in one moment.
- **Outlines are parts, not plots.**  Take the chrome you need from the starter, `shells.html` and `frames.html`;
  the content, the layout inside it, and the order of scenes are yours.  There is no default scene list.
- **Design the signature moment.**  The one moment only this story has gets a view made for it: the recommendation
  beside the decision it changes, a timeline that shows the clash, a map of who's affected, the plan before and
  after.  A stock chat answer is rarely enough.
- **Build what the kit lacks.**  A phone, a public website, a shift board, a map, a form: build it in `<style>` from
  the tokens, following the real conventions (Fluent for Microsoft products; plain and neutral for the customer's
  own systems).
- **Vary the rhythm.**  Not every scene needs a typed prompt and a streamed answer.  Open one on a notification, one
  on a finished result, one on two people at once.
- **The tests:** if this prototype's scene list could be swapped with another customer's, it isn't designed for
  this story yet.  If its close could be a list of features, it's a tool demo, not a business story.

## Two looks, kept apart

**Product scenes look like Microsoft, not like AI**: the difference is specificity and restraint.
→ `references/look-and-feel.md`

- **Real product layouts, real density.**  Use the kit's shells.  Product scenes are mostly neutral greys and
  white; the brand blue appears only where it has a job (primary button, selection, link).
- **One AI accent.**  The teal→purple gradient marks the agent and what it touched.  Nowhere else.
- **Fluent icons only** (`<i class="ic" data-icon="...">`).  Never emoji, never icons from other sets.
- **Plausible, specific content.**  Real counts, names, dates and sources from the data sheet, never "Complete key
  tasks".  Every agent claim shows where it came from (cite chips, references).
- **The agent behaves like a careful colleague.**  It shows its work, asks before acting, admits gaps, and the
  human confirms.  No magic, no "100% accuracy", no instant everything.
- **When the agent acts, say who acts.**  Each step is *Done for you*, *Needs your input* or *Needs your approval*.
  Routine internal steps run on their own; money, trades, orders, anything sent to a customer, or anything hard to
  undo always waits for approval, with pre-checks and the policy reason.  Then show proof in the system of record.
  → `look-and-feel.md` §Who acts
- **No Tredence styling inside a product**: no Poppins, Bright Orange or Tredence logos in Copilot, Teams, Outlook,
  Dynamics 365, Power BI or the customer's app.

**Frame scenes look like Tredence**: the 2026 template, nothing invented.  → `references/tredence-frame.md`

- **The template's chrome, untouched**: the kit draws the top rule, brand squares, footer, T, cover band, wordmark,
  client tag, #BeyondPossible banner and closing photo.  Never draw them, never put content over them.
- **Poppins only, the closed palette only**, led by Bright Orange, with Orange Tint and Teal Tint as backgrounds.
  Flat colour on white: no gradients (the photo shade excepted), glows, glass or shadows.
- **Titles are sentences you'd say**, with the key phrase in Bright Orange (`.td-hl`).  Never open a title with a
  number or a count.
- **Official logos and brand photos** from `kit/brand/` and `kit/photos/`, unrecoloured.  White text on a photo only
  over the Charcoal shade.
- **The Tredence voice**: start in the customer's world, say what changes in someone's day, "we" and "you"
  together, confident but never promotional.  Sound out every word.

No AI-default design anywhere: no glassmorphism, neon glows, purple-gradient hero sections, card grids of
"features", giant stat counters, rocket/brain/sparkle-everywhere, or lorem-ipsum-grade copy.

## Non-negotiables

- **Nothing works for real.**  No network calls, APIs, logins or live data.  The packer refuses external URLs.
- **Fictitious data only.**  Microsoft's fictitious companies and demo personas (`story-and-data.md`).  Never a
  real customer's data, a real person (other than the presenter if the user asks), a real deal, a real internal
  system record, or a Tredence client, client result, quote or award.  The customer you're presenting *to* can be
  named on the cover tag only when the user confirms it's allowed; their data inside the scenes is still invented
  and labelled.
- **Always labelled.**  `<body data-concept="Concept demo · Fictitious data">` stays on, on every scene.
- **No promises.**  Real product names, used accurately ("Microsoft Copilot", "Dynamics 365 Sales", "Microsoft
  Teams", "Copilot Studio", "Microsoft Fabric").  Don't invent product names, SKUs, prices, roadmap dates, scope,
  timelines or capability claims; describe the agent by what it does.  Tredence products and accelerators appear
  only if the user asks, described by what they do, never as a working product.
- **Brand.**  "Tredence" in text, never "TREDENCE".  Frame scenes use the Tredence template, Poppins and the palette
  only; the check blocks violations.  Product scenes stay Microsoft.
- **Accessible enough to present.**  Text at least 11 px at the 1920 stage (18 px on frame scenes), real contrast
  (orange text and white on orange only at 24 px and up), works with keyboard, and `prefers-reduced-motion` shows
  the final state.
- **Stay in scope.**  "Change scene 3" means scene 3.  Don't reopen approved scenes.

Feedback ("looks fake", "doesn't look like Tredence", "they all look the same", "too slow", "it just stopped"):
`references/qa-and-feedback.md` §Feedback playbook.

## Human authority

You draft, build and check.  The user owns the story, the claims, and the decision to show it.  Never present a
prototype as a working product, send it externally, or claim approval that wasn't given.  The Tredence voice guide
is a draft pending review by a Tredence brand or communications owner.

Built on Harrison's `prototype-frontier` skill (engine, Fluent kit, checker and story method) and the
`pptx-tredence` skill (Tredence 2026 template, brand and voice).
