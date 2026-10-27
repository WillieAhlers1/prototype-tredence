# QA and feedback

Assume there are problems and go looking for them.  The first render is rarely right.

## Every time you show the user something

- [ ] You ran the check on what you changed and looked at the screenshots yourself.
- [ ] Every visible word and every presenter line passes the out-loud test (`story-and-data.md`).
- [ ] The check finds nothing.  You fixed every finding or can explain why it stays.
- [ ] Only the scenes the user asked about changed.
- [ ] You built and edited in `working/<name>/`, and packed only at the end.

## Review checklist (every screenshot)

Do this yourself, never with a subagent.  Look at each contact sheet (`renders/sheet-N.png`, 12 screenshots each,
in order), then open single screenshots where something looks off.

1. **Would a Tredence lead show it?**  Nothing generic, silly or overclaimed.  Read every word aloud as the
   presenter, across a table, in the Tredence voice (`tredence-frame.md` §Voice).
2. **Looks like the real product?**  Chrome, spacing, type sizes, icon style and colours match the product.
   Employees meet Copilot in the Copilot app; other apps appear where the work starts, as proof, or to show
   people reached.
3. **One idea per scene, obvious in 3 seconds.**  The eye lands on the agent's moment first.
4. **Consistent data.**  Same names, amounts, dates and counts everywhere (check against the data sheet).
5. **The human is in control** somewhere visible: confirm, edit, approve or undo.  Nothing approval-class is
   marked *Done for you*; every approval shows checks and the policy reason.
6. **Sources shown** for anything the agent claims.
7. **Nothing clipped, overlapping or empty-looking**; no stray placeholder text; the concept label is visible.
   Frame scenes look like the Tredence template: chrome untouched, nothing over the footer, top rule, brand squares
   or cover band, Poppins and flat brand colour only, the key phrase of each title in Bright Orange.
8. **Flow works**: every beat reveals in reading order; the cue ring lands on the thing to click, and clicking it
   does what it says; scenes end on an in-product bridge where the story has one (otherwise the Next pill shows);
   → and the Next button always advance, and nothing the presenter must click sits under the Back/Next buttons.
9. **Made for this story?**  The scenes, their order, the screens and the signature moment come from this
   customer's story, not from the starter, the outlines, or the last prototype you built.  If the scene list could
   be swapped with another customer's, it isn't designed yet.
10. **Does the business change, not just the task?**  The cover names the business shift in the customer's words;
    the room sees it on the ground and from above; the close says how the business could work, what it could be
    worth (rounded, "Illustrative", basis in the notes) and one ask.  Nothing on screen recaps the scenes or ticks
    off the brief.  Ask: would the leader who owns the measure say "we could run this differently"?

## Running the check

`python <skill>/assets/check_prototype.py working/<name>/prototype.html`, then `--scene <id>` after an edit,
one full pass that finds nothing new, and one `--motion` pass.  Details: `engine.md` §Check and pack.

**If the check can't run**, never fall back to reading the code alone without telling the user that the
screenshots and layout checks didn't run.  If you have a browser that can open local files, step through every
beat yourself with the checklist above.

**In Copilot Cowork** (and other sandboxes without a package source):
- Don't run `pip install` or `npm install`.  There's no package source; the calls hang for about a minute, then
  fail.  Python Playwright is missing, so the checker hands over to Node and looks for Playwright inside the
  global packages (`docgen-utils`) and for the browser in `/opt/docgen-browsers`.  If it still reports that
  Playwright or a browser wasn't found, point it at them (the folder names can change; list them first):
  ```
  NODE_PATH=/usr/local/lib/node_modules/docgen-utils/node_modules \
  PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/docgen-browsers/chromium_headless_shell-1208/chrome-headless-shell-linux64/chrome-headless-shell \
  python <skill>/assets/check_prototype.py working/<name>/prototype.html
  ```
- Don't link a `node_modules` folder into the workspace; the workspace refuses links.
- The browser tool there needs a web address and can't open workspace files, so it can't check a prototype.
- Segoe fonts aren't installed, so screenshots use a fallback font with different text widths.  If a label is
  only just clipped, ask the user to check it on Windows before cutting the wording.

## Feedback playbook

Users often give one-line feedback.  Read the intent, fix the cause, and show the result.

| They say | What it usually means | Do this |
|---|---|---|
| "Looks fake", "too AI" | Decoration and generic content | Remove gradients and decoration outside the agent moments, add real product detail and specific content, cut marketing words.  `look-and-feel.md` §AI tells |
| "Too busy" | Too much competing for the eye | Hide non-essential panes, fewer list rows, one agent moment per scene |
| "Too many apps" | A tour, not a story | Keep the employee's agent work in Copilot; show other apps only where the work starts, in the browser pane, or as one proof scene |
| "They all look the same" | Screens chosen before the story | Go back to the beats.  Open where this person's work really starts, replace stock scenes with views designed for this story, and give the signature moment its own view |
| "So what?", "think bigger", "it's just a productivity tool", "where's the business impact?" | The story stops at one person's task, or ticks off a feature list | Go back to `story-and-data.md` §Start with the business shift: the constraint, from → to, the measure and who owns it.  Add the view from above, rewrite the cover and close around the shift, and fold the feature list into one story |
| "Too slow" | Pacing | Shorten `data-auto` delays and work steps; cut a scene |
| "Jumpy", "not smooth" | Content snapping into place | Run `--motion`; reveal content where it stays, pair replaced elements with `data-morph`, give the warm-up a few seconds on the cover.  `engine.md` §Motion |
| "I clicked and then it just stopped" | A cue fired one beat early, or nothing to click | Make the beats before the named thing automatic, or add an in-product bridge if the story has one.  `engine.md` §Clicks |
| "Make it ours" | Not specific enough | Put the customer's industry, roles and real-world artefacts (fictional) into the data sheet, and rebuild the signature moment around their problem |
| "Can it do X for real?" | A question for the Tredence team | Note it in `brief.md`; don't make the prototype claim it |
| "Doesn't look like Tredence" | The frame drifted, or product styling leaked into it | Use the `td-` layouts and classes from `frames.html`; Poppins and the palette only; the orange key phrase in titles; a brand photo on the cover.  Leave the Microsoft product scenes as they are |
| "Doesn't look like Microsoft" | Tredence styling leaked into a product scene | Take Poppins, orange and logos out of the product scenes; use the kit's shells as they are |
| "Sounds like a brochure" | Marketing words, slogans, no "we" or "you" | Rewrite every line out loud in the Tredence voice: their world first, what changes in someone's day, one ask |
| "That's wrong", "take a step back" | You are patching symptoms | Stop.  Name the root cause in one line and offer 2–4 genuinely different directions with a recommendation |

- **Match the scope of the feedback.**  "The subtitle is too long" is not permission to restyle the scene.
- **When the user settles** ("leave it", "perfect"), stop iterating on that scene.
- **When the user asks why**, explain your reasoning honestly, including its weaknesses, then offer options.

## Delivery note (keep it short)

```
The prototype is ready: <path to dist/<name>.html>  (source: <path to prototype.html>)
- Run it: click Next at the bottom right (or the highlighted control in a scene); N for presenter notes
- Illustrative: <what's invented, what's labelled Preview>
- Business shift: <from → to, in one line>; <the measure that moves, rounded> (illustrative; basis in brief.md)
- Question to ask in the room: <the card's line 5>, also in the notes of scene <n>
- Checked: every stop screenshotted and reviewed; motion pass clean; packed file plays in the preview sandbox
```

Then log decisions in `brief.md`, leave a "What we learned" line for after the meeting, and delete `renders/`.
