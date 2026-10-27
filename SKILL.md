---
name: prototype-tredence
description: Tredence prototypes. Build clickable "art of the possible" HTML prototypes that a Tredence team shows a customer, with realistic Microsoft product screens (the Microsoft Copilot app as home, with Teams, Outlook, Dynamics 365 and Power BI as supporting screens, plus the customer's own systems) framed in the Tredence 2026 brand (Bright Orange, Poppins, official logos and template chrome, #BeyondPossible), so the room sees how an agent or AI scenario could change the way their business works and the last-mile decisions people make every day. Nothing works for real; all data is fictitious; everything ships as one self-contained HTML file. Use for any request to prototype, mock up, storyboard, demo, or visualise an AI, agent, or Copilot scenario or workflow for a Tredence customer meeting; to turn a scenario description, notes, or a whiteboard into a clickable Tredence concept; or to change, fix, restyle, or repackage an existing prototype.
---

# Tredence prototypes

**The test that matters most: does the room leave saying "we have to do this", because they've seen their
business work in a way they hadn't pictured, and would a Tredence lead show it to them with a
straight face?**  Not "nice tool", not "that would save us time".  Before you show any scene, picture it on the
meeting-room screen with the customer's business leader and IT lead watching.  If it only makes today's work
faster or wider, think bigger.  If anything looks generic, fake-shiny, or promises more than a concept can, fix it.

**You bring the idea.**  You know this industry: how it makes money, what its customers want and can't get, what
its regulators watch, where its best people lose their days, and what agents now make cheap.  Use all of it.  The
room didn't come to see its process a little faster; it came to see a future it hadn't pictured, made concrete
enough to believe.  Don't hold back, and don't settle for your first idea: every competitor has that one too.
Tell the fullest version of the story, not the smallest: real work has friction, judgement and people on the
other side.  The rules in this skill keep the demo honest and well made.  None of them asks you to think small.

What you build is a **concept, not a product**: scripted, fictitious, offline, and always labelled.  It shows how
the business *could* work.  It never calls a real system, never uses real customer data, and never implies
something ships.

**You design it.**  The plumbing is fixed (kit, engine, label, packing) and so is the quality bar below.  The
story, the screens, their order and their layout come from this customer.  Two prototypes for different customers
should never look like the same demo with the names swapped.

## Think big: reimagine the business

A prototype that shows one person getting through a task faster is a productivity demo; one that shows the same
business covering more is an operations upgrade.  The room nods and moves on.  Aim for the business itself
changing because people and agents now work together, and show what that is worth.
→ `references/story-and-data.md` §Start with the business shift

| Ambition | What the room sees | What they say |
|---|---|---|
| Faster task | The same work, done quicker with Copilot | "Nice tool" |
| Work taken off | Agents gather, check and draft; people decide | "That would save us time" |
| Same business, run better | The rationing stops: everyone covered, every case checked, ahead of the request | "We could do more of what we do" |
| **Business reimagined** | Because the work is now fast and cheap, the business becomes what it couldn't be: perhaps it sells what it couldn't deliver, changes its relationship with its customers, redesigns jobs around judgment, or competes on new ground | "We have to do this" |

Aim for the fourth.  The first three are how you get there and how you prove it, not the point.  If it's the same
business doing the same things earlier, faster or for more people, it's the third.  The fourth row gives
directions, not a list to pick from: the right idea belongs to this customer.  If the user asks for something
smaller (one task, one workflow), build what they asked, and offer the bigger idea in one line.

- **Tredence's point of view is the last mile**: insight matters when it changes a decision someone makes every
  day.  Most customers already have the data and the dashboards; look for the decision that still doesn't change,
  and show the agent putting the answer in front of the person who makes it, while the person still decides.
- **Go wide before you choose.**  In `brief.md`, write at least three ideas for this customer: the one they'd
  expect, one that stretches them, and one that changes what the business is (what it sells, who it serves, how
  it earns, what its people do).  Then argue with your pick as their CEO would: "Isn't that what we do now, just
  sooner or for more clients?"  If the honest answer is yes, take the bolder idea and make it believable.  The
  room can always dial an idea down; it can't imagine one it wasn't shown.
  → `references/story-and-data.md` §Questions that break the frame
- **Then pin it down before the screens**: the constraint the business lives with today, how it could work
  instead (what it offers, who it serves, how, by whom), the measure that moves and the leader who owns it, and
  the work before and after: steps that disappear, hand-offs that collapse, who owns what now, where people
  decide.  → `references/story-and-data.md` §Start with the business shift
- **Make it real at two heights**: the room should see real work change, with someone deciding (one person, a
  team, their customer, whoever shows it best), and grasp what that means across the business (the book, the
  region, the network, the measure).  That's what they understand, not two scenes: one moment can carry both,
  and a leader's report is only one way to show scale.
- **Show it, don't just say it.**  The new business and the redesigned work happen on screen somewhere, in
  whatever way suits this story.  If the only place you can point to is the close, it's a claim, not a demo.
- **A list of capabilities is not a storyline.**  Tell the story the list is for, and let each capability appear
  where it matters; map items to scenes in `brief.md`, not on screen.
- **Cover and close, if you use them, carry the idea**: the business change in the customer's words; what it
  could become and be worth; an ask only if the meeting needs one.  Never a product tagline, a recap, or a
  fill-in of the starter's placeholders.
- **Bold idea, honest labels.**  The caution in this skill is about numbers, labels and what the agent may do
  without a person; it never limits the idea.  Don't shrink the vision to make the numbers easy.  Numbers are
  rounded, labelled "Illustrative", with their basis in `brief.md` and the presenter notes.  Time freed is
  capacity for more or better work, never a cut in staff.  For a full value case or proposal, use `pptx-tredence`: the same brand and story as an editable deck.

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

- `assets/starter.html`: the kit wiring, the concept label, and frame examples (a Tredence cover, a close, and an
  optional #beyondpossible sign-off), every word a
  `[[placeholder]]`.  Copy it to start.  **The starter scenes show the styles and the code, not a story or layouts
  to reuse.**  Delete any you don't need; design the rest.
- `assets/shells.html`: each Microsoft product's chrome as an outline, every word a `[[placeholder]]`: Copilot
  Home, a chat with a work trace and approval card, a Power BI answer, a Cowork plan, proof in the browser pane, Teams, Autopilot, Outlook mail and calendar,
  Dynamics 365, a Word draft, a Power BI report, and the customer's own business app.
- `assets/frames.html`: each Tredence frame layout as an outline: cover, their world, a from → to matrix, where
  we'd start, the #BeyondPossible chapter break, the solid orange divider, the ask on a photo, the closing.
- `assets/kit/`: the shared kit every prototype uses, unchanged: `proto-style.js` (Fluent 2 tokens and product
  shells, the Tredence frame and its chrome), `proto.js` (upstream 1.14.8 scene engine, play/pause, reading floor, driven API and presenter controls), `icons.js` (Fluent
  System Icons), `brand/` (official Tredence logos and template chrome), `fonts/` (Poppins), `photos/` (the brand
  photo set, 1920 px).
- `assets/check_prototype.py`: steps through the prototype like a presenter, screenshots every stop, makes contact
  sheets and flags problems, including Tredence brand violations on frame scenes and leftover placeholders.
  `check_prototype.mjs` is its Node runner, used automatically when Python Playwright is missing.
- `assets/pack_prototype.py`: turns the prototype into one self-contained HTML file (fonts, logos and photos
  inlined) and blocks network use.
- `references/`: `story-and-data.md`, `look-and-feel.md` (product scenes), `tredence-frame.md` (frame scenes,
  palette, logos, photos, voice), `engine.md`, `qa-and-feedback.md`.

Read references progressively: `story-and-data.md` before the card and storyboard; only the product and engine
sections needed while building; `tredence-frame.md` for frames; `qa-and-feedback.md` before showing anything.
Use `check_prototype.py <html> --outline [file.json]` to export the scene and beat outline for another tool.

No finished prototype ships with this skill, on purpose: with one in the skill, agents copied its scenes, order and
layouts.  Find the story first; then choose the screens.

## How you work

- **Folder per prototype**: `working/<short-name>/` in the user's workspace (not inside the skill), holding
  `brief.md`, `prototype.html` (a copy of `assets/starter.html`) and `kit/` (a copy of `assets/kit/`).
- **Fixed plumbing, open design.**  `prototype.html` holds the scenes and its own `<style>` block; never edit
  `kit/`.  No frameworks, CDNs, web fonts or network calls, so every prototype packs into one file.  On top of
  that, design freely: combine the kit's parts, restyle them in `<style>`, or build views the kit doesn't have
  from its tokens (Fluent in products, `--td-*` on frames).
- **Work in small, visible turns.**  Show the storyboard before building scenes; show screenshots after building.
- **Edit in place.**  Later changes go into the same `prototype.html`, then check and pack again.
- **Do the review yourself**, never with a subagent.

## The loop

1. **Brief** (`brief.md`).  Who is in the room (industry, roles), the problem in their words, the one moment that
   should make them lean in, what they should believe afterwards, the ask if there is one, and how long they have.
   **Design-thinking card: one stop, before building.**  Don't ask open questions.  Write your best answer to each
   line from what the user gave, and send it as one message: "Before I build, here's my read.  Reply **go**, or
   change any line."
   1. **The big idea:** what this business could become or do that it can't today, why agents make it possible
      now, the measure that moves (roughly, illustrative), and the leader who owns it.  Then one line: "Also
      considered: <the safer idea> · <the wilder one>", so the user can turn it down or up.
   2. **Whose work shows it:** the people whose work shows the shift, the everyday decision that still
      doesn't change (the last mile), and what's hard for them.
   3. **The moment to land:** the one thing Copilot or the agent does that makes the room lean in.
   4. **How the work changes:** what disappears or merges, what the agent does on its own, where a person decides.
   5. **What we want to learn from them:** the one guess about how the customer works that the demo tests.
   Make every line specific to this customer and industry, and mark guesses "(my guess)".  If line 1 is the same
   business doing more of the same, it isn't big enough: go back to your ideas first.  Use the form tool if you
   have one (answers filled in), otherwise plain text.  Skip the card if the user says "just build it" or has
   already given all five: that skips the stop, not the thinking.  One round only; never ask again.  Decide
   anything still open yourself, safe to show the customer, with Microsoft's fictitious names, and 'Concept' on the cover tag unless the user confirms their customer's name is allowed.  Put the card in
   `brief.md` and list what you decided in your reply.
2. **Storyboard** (in `brief.md`; show it in your reply, but don't stop for approval: the card was the stop).
   The shift in one sentence; the beats the room must see happen; then, for each beat, the screen that shows it
   best.  A table: scene, screen, what the presenter says (one spoken line), what happens on screen, what the
   presenter clicks.  → `references/story-and-data.md`, `references/look-and-feel.md` §What screens mean
3. **Cast and data sheet** (in `brief.md`).  The fictional company, people, records, dates and numbers, written
   once and reused identically in every scene.  **Their data looks like Power BI**: when a scene shows a trend,
   gap or breakdown from data the customer would really have, draw it as a Power BI visual
   (`figure.pbi[data-chart]`) from a named report, never a hand-made chart.  Projections and "with agents"
   what-ifs aren't report data: show them, labelled "Illustrative", in a view you design or on a frame scene.
   No scene needs a chart.  → `references/story-and-data.md`, `references/look-and-feel.md` §Power BI
4. **Build scenes** in `prototype.html`, each one for its beat.  Compose from the outlines in `shells.html` and
   the kit's building blocks, or build what the kit doesn't have from its tokens (Fluent in products, `--td-*` on frames).  Give the signature moment a
   view designed for it.  Copilot's work trace (steps, thinking, status line) and the Cowork Workspace must look
   exactly like the product's; the words are this story's.  Product scenes use `class="scene zoom"`; the Tredence
   frame (`td-` layouts from `frames.html`, Poppins and the closed palette) is for frame scenes (a cover, a chapter break, a close), if the story uses them.
   → `references/tredence-frame.md`, `references/look-and-feel.md` §Components you can draw, §Copilot's work, `references/engine.md`
5. **Check.**  `python <skill>/assets/check_prototype.py working/<name>/prototype.html`.  Fix each finding, or say
   why it stays.  Then review the contact sheets against the checklist in `references/qa-and-feedback.md`.  After
   an edit, recheck that scene with `--scene <id>`; finish with one full pass that finds nothing new, then one
   `--motion` pass, and fix anything that jumps.  Delete `renders/` when done.  **In Copilot Cowork, never run
   `pip install` or `npm install`**; if the check can't find Playwright or a browser, see `qa-and-feedback.md`
   §Running the check.  If the check can't run at all, say so; never pass off a code read as a visual check.
6. **Pack.**  `python <skill>/assets/pack_prototype.py working/<name>/prototype.html` →
   `working/<name>/dist/<name>.html`.  Check the packed file once more (it also plays it in the OneDrive/SharePoint
   preview sandbox).
7. **Deliver.**  The packed file path, how to run it (Space plays and pauses, → steps, N notes), the big idea in one
   line, what's illustrative and its basis, and open questions (`qa-and-feedback.md` §Delivery note).  Give
   the card's line 5 as the question to ask in the room, put it in the presenter notes of the scene it tests, and
   leave a "What we learned" line in `brief.md` for the answer after the meeting.

## Where the agent shows up

Tredence builds on Microsoft's AI stack (Microsoft Copilot, Copilot Studio, Microsoft Fabric, Power BI), and
Microsoft positions the Microsoft Copilot app as the place work starts for employees: Home (Chat, and Cowork for
multi-step work), and Autopilot for agents that keep working on their own.  Prototypes respect that positioning.
They don't follow a fixed route through it.

- **Employees meet Copilot in the Copilot app**, not in a Copilot pane inside Outlook or Teams. Dynamics 365's own
  pane is appropriate when the work happens there. Business data comes to Copilot (Work IQ, Dynamics 365, Fabric
  and Power BI, the customer's own systems), with sources.
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

**Lean into Autopilot as a teammate, with people in the loop.**  Microsoft describes it as a digital teammate with
its own identity, working for one person, that colleagues can @mention in Teams and Outlook like a colleague; it
keeps going on a goal for days while its owner sets the objective and boundaries and stays in control.  That's
often how the business changes shape: work runs while people sleep, colleagues work with it directly, people keep
the decisions.  Show it working with the team.  Preview: label it.  → `look-and-feel.md` §Where the agent shows up

## Design for this story

The guardrails keep it credible.  Inside them, the design is yours.

**Nothing in this skill is a scene list.**  Its rules say what must be true *if* something appears (an action
that needs approval waits for a person; their data looks like Power BI; a number is labelled) and what the room
should come away understanding.  None of them requires a screen, a scene or an order: not an approval, a proof
scene, a report, a leader's view, or even a cover and close.  If someone could guess your scene list from this
skill, you've followed it too literally.

- **Beats first, screens second.**  Write what the room must see happen, then choose the screen that says it
  best (`look-and-feel.md` §What screens mean).  Often the best one is a view the kit doesn't have.
- **Outlines are parts, not plots.**  Take the chrome you need from `shells.html`; the content, the layout inside
  it, and the order of scenes are yours.  There is no default scene list.
- **Design the signature moment.**  The one moment only this story has gets a view made for it: a timeline that
  shows the clash, the clause beside the record it contradicts, a map of who's affected, the plan before and
  after.  A stock chat answer is rarely enough.
- **Build what the kit lacks.**  A phone, a public website, a shift board, a map, a form: build it in `<style>`
  from the tokens, following the real conventions (Fluent for Microsoft products; plain and neutral for the
  customer's own systems).
- **Vary the rhythm.**  Not every scene needs a typed prompt and a streamed answer.  Open one on a notification,
  one on a finished result, one on two people at once.
- **The tests:** if this prototype's scene list could be swapped with another customer's, it isn't designed for
  this story yet.  Depth beats novelty: a full story in a familiar shape beats a thin one in a new shape.  If its
  close could be a list of features, or a fill-in of the starter's close, think again.

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
  undo always waits for approval, with pre-checks and the policy reason. When the room needs to believe something
  happened, show where it landed; this does not require a separate proof scene.
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
