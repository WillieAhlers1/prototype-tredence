# Look and feel

Two design languages, each with one job:

- **Fluent 2** for product scenes.  This is where "that looks like Microsoft" comes from.  Tredence builds on
  Microsoft Copilot, Copilot Studio, Microsoft Fabric and Power BI, so the products look exactly like the real ones.
- **The Tredence 2026 frame** for the cover, an optional chapter break, a scene that names the tension or shows the
  business from above, and the close.  This is where the story and the ask live.  → `tredence-frame.md`

The two never mix: no Poppins, Bright Orange or Tredence logos inside a product, and no Fluent chrome, Copilot
gradient or product UI on a frame scene.

All sizes are CSS px on the 1920 × 1080 stage.  Product scenes use `class="scene zoom"`, which lays the UI out at
1536 × 864 and shows it at 125%, the way a laptop shows it, readable from the back of a room.

## Fluent 2 product scenes

**Type** (Segoe UI): caption 12/16, body 14/20, body-large 16/22, subtitle 20/28 semibold, title 24–32 semibold.
Weights 400 and 600 only.  Sentence case for everything, including buttons and headers.

**Colour.**  Neutrals do most of the work: page `--bg3` #f5f5f5, surfaces `--bg1` white, text `--fg1` #242424,
secondary `--fg3` #616161, strokes `--stroke2` #e0e0e0.  Brand blue `--brand` #0f6cbd only for the primary button,
selection, links and the active tab.  Teams uses `--teams` #5b5fc7 in the same places.  Status colours (success,
warning, danger) only for status.

**Shape and depth.**  Radius 4 for controls, 8 for cards; the Copilot app is rounder (18 for chat bubbles, 22–26
for the prompt box, 14 for side panes) and greets in a serif (Sitka), as the product does.  Shadows are soft
(`--sh2`, `--sh4`); only toasts and dialogs float (`--sh28`).

**Density.**  Real apps are dense and calm: lists of 3–6 items, 32 px controls, 8–16 px gaps.  Fill the shell the
way the product does (folder pane, list, reading pane) instead of leaving big empty areas.  If a pane would be
empty, add realistic secondary content (older mail, timeline items) or remove the pane.

**Icons.**  `<i class="ic" data-icon="mail"></i>` (20 px; `s16`, `s24`, `s28`, `s32`, `s48` for other sizes).
The kit has 99 Fluent System Icons; `icons.js` lists them.  Need another?  Add it to the prototype's own copy of
`kit/icons.js` from github.com/microsoft/fluentui-system-icons (20 px regular SVG path) and note it in `brief.md`.

**People.**  `<span class="avatar" data-name="Adele Vance"></span>` gives initials and a stable colour.  Sizes
`xs sm md lg xl`; `org` for a square company/team avatar; add `<i class="pres"></i>` (`away`, `busy`) for presence.

### What screens mean

Pick screens from the story's beats, not from this list.  Each kind of screen tells the room something; choose
the one that says what this beat needs to say, and switch screens only when the beat needs it.

| Screen | What it tells the room | Good for |
|---|---|---|
| Copilot Home, or a Today briefing | Work starts here; Copilot already knows what matters | An opening ask, a morning catch-up |
| The business from above (a Power BI page, or a view you design: the whole book, a map, coverage before and after) | This isn't one faster day; the business works differently | The shift at scale, the measure that moves, the leader's view |
| Copilot answer with sources | It read the right things and shows where | A question answered, a gap found |
| Cowork plan (Workspace pane) | Multi-step work you can watch, with who acts on each step | A process run end to end |
| Approval card (checks, policy reason) | A person stays in control of what matters | Money, anything sent to a customer, anything hard to undo |
| Power BI visual | The number is governed and traceable | A trend, a gap, a breakdown |
| The record in the browser pane, or the system itself | It really happened | Proof after an action |
| Teams chat or meeting | People are pulled in where they already work | A hand-off, a live meeting, a team reply |
| Outlook mail or calendar | It reached someone; time was booked | A sent note, a meeting set up |
| Autopilot feed, a notification | It kept working while you were away | Watching, overnight work, a nudge |
| A phone | This happens away from a desk | Field, frontline, travel |
| The customer's own app or website | The agent meets people where they already are | End customers, line-of-business work |
| Two views side by side | Before and after, or two sides of one moment | The change itself, a hand-off between people |
| A view you design (timeline, map, comparison, board) | The thing only this story has | The signature moment |

### Components you can draw

Compose these to fit each beat.  Only the starter scenes exist as working code, and `assets/shells.html` holds
each product's chrome as an outline (every word a `[[placeholder]]`, numbers only so charts draw).  Copy the
chrome, write your own content, and design the rest for your story.  The outlines show how a product is built,
not what to put in it or in what order.

- Tredence cover, with the title as the business change (starter, first scene)
- Copilot conversation: work steps, an answer with citations and source chips, an approval card with checks and
  the policy reason, a hand-off chip (starter, second scene)
- Tredence close: the shift from → to, what it could be worth, and the ask (starter, third scene); more frame
  layouts (their world, a from → to matrix, where we'd start, chapter breaks, the ask on a photo) in `frames.html`
- The business from above: a full Power BI report (`shells.html` `report`), or a view you design
- Copilot Home with a typed prompt (`shells.html` `home`)
- A Power BI answer, and the report in the browser pane (`pbi-answer`)
- A Cowork plan in the Workspace pane, with an input card (`cowork`)
- Proof in the browser pane: a business app row and a Dynamics 365 record change (`proof`)
- A Teams chat with a post sent with Copilot (`teams`)
- An Autopilot agent's feed with an item that needs the person (`autopilot`)
- Outlook mail (`mail`) and calendar (`calendar`)
- A full Dynamics 365 record (`record`), Copilot drafting a Word file (`doc`), a full Power BI report (`report`),
  the customer's own back-office system (`business-app`)
- No code, design it: a phone in someone's hand, the customer's own website, two views side by side, a timeline,
  a map, a comparison, a board, a notification arriving (see *Need a view the kit doesn't have?* below)

**The Microsoft Copilot app is where employees meet Copilot.**  Most stories spend their agent moments here; the
other screens show where the work starts, people reached, and proof.

| Copilot app view | Root | Parts | Use when |
|---|---|---|---|
| Window and left panel | `.cpa` (`.nav-off` hides the panel) | `.cpa-title` (`.cpa-win`), `.cpa-side` > `.cpa-brand`, `.cpa-modes` (Home, Code, Autopilot; `on`), `.cpa-nav` (`on`, `hdr`, `sub`, `.lbl`, `.plus`), `.cpa-me`; `.cpa-main` > `.cpa-top` (`.pick`, `.ttl`, `.end`) | Every Copilot scene |
| Home | `.cpa-home` | `.cpa-hello` (serif greeting), `.cpa-prompt` (`.ph`, `.txt`, `.tools` with `.cpa-switch` Chat/Cowork and `.cpa-send`), `.cpa-chips` | The person asks; the story's first click |
| Conversation | `.cpa-work` > `.cpa-conv` | `.cpa-chat` > `.cp-user`, `.work-box`, `.cp-turn` > `.cp-resp`, `.refs`, `.chips`, `.acard`; a docked `.cpa-prompt` | Copilot answers with sources, asks for input or approval |
| Cowork Workspace pane | `.cpa-pane` (width `--pane`, default 560) beside `.cpa-conv` | `.cpa-pane-head`, `.cpa-pane-body` > `.ws-sec` (`h4` with `.n`) holding `.steps`, `.ws-item` (one line), `.ws-perm` (with a `.badge`) | Copilot runs a multi-step process: steps, who acts, outputs, permissions |
| Browser pane | `.cpa-pane` with `.cpa-tabs` (`.tab`, `.fav`), `.cpa-url` (`.addr`), `.cpa-page` | Put a `.lob` or `.m365.d3` shell inside `.cpa-page`, without its left nav.  Use `.nav-off` and `--pane:1000px` | Proof: the system of record that changed, without leaving Copilot.  A preview feature: label it in the notes |
| Document pane | `.cpa-pane` with `.cpa-pane-head` (`.oi.word`, `.oi.excel`, `.oi.powerpoint` file marks) and `.cpa-doc` > `.page` | Copilot drafts a Word, Excel or PowerPoint file next to the chat |
| Autopilot | `.cpa-over` | `.ap-hello` (`.ap-av` + `.cpa-hello`), `.cpa-prompt`, `.feed` > `.feed-head`, a `<div>` per day with `.feed-day` and `.feed-item` (`.t`, `.dot`, text, `.det`; `need`) | An agent with its own identity keeps working and comes back when it needs the person.  Preview: show a "Preview" badge |

Supporting screens: use one when the story needs it, never with a Copilot pane inside.

| Shell | Root | Parts | Use when |
|---|---|---|---|
| Teams | `.tm` | `.tm-bar`, `.tm-rail`, `.tm-list` > `.tm-item`, `.tm-main` > `.tm-head`, `.tm-chat` > `.tm-msg` (`me`), `.tm-compose` | People reached where they work: a plan posted for the person, the team replying |
| Outlook (web) | `.m365.ol` | `.m365-bar`, `.app-rail`, `.ol-ribbon`, `.ol-folders`, `.ol-list` > `.ol-mail` (`unread`, `sel`), `.ol-read` | A message that reached someone, or a reply coming back |
| Outlook calendar | `.m365.ol` with `.cal-main` | `.cal-side` (`.sw` swatches), `.cal` > `.cal-bar`, `.cal-days` (`.today`), `.cal-grid` > `.cal-h`, `.ev` (`c2`–`c5`, `ai`) | Proof that a meeting was booked.  Grid starts 8 AM; `grid-row: (hour − 8) × 2 + 1`; column 2 = Monday.  Events under an hour: title only |
| Dynamics 365 (model-driven, new look) | `.m365.d3` | `.d3-bar`, `.d3-nav`, `.d3-page` > `.d3-cmd`, `.d3-head`, `.bpf`, `.d3-content` > `.section` | The record itself is the point and the browser pane is too small |
| Business app (customer's own system) | `.lob` | `.lob-bar` (`.glyph`, `.name`, `.search`), `.lob-body` > `.lob-nav`, `.lob-page` > `.lob-head`, `.section`, `table.grid` (`tr.new`) | A system that isn't Microsoft's (orders, contracts, claims, core banking), reached through a connector |
| Adaptive Card | `.acard` | `.acard-head`, `.acard-body` > `.item`, `.acard-foot` | Anything a person acts on: in Copilot, Teams or Outlook |
| Windows notification | `.toast` | `.t-app` | Background work finished |

Building blocks for any shell: `.btn` (`primary`, `subtle`, `icon`, `sm`, `lg`), `.input`, `.search`, `.tabs`,
`.badge` (`brand success warning danger solid count`), `.tag`, `.card`, `.field`, `.kv`, `table.grid` (`compact`),
`.timeline` > `.tl-item`, `.kpi`, `.progress`, `.spinner`, `.check`/`.radio` (`on`), `.chips` > `.chip`,
`.seg` (toggle group such as "Mine / Reassign"; `on` marks the choice), and `.diff` (a before → after value:
`<span class="diff"><span class="old">11/27/2026</span><i class="ic" data-icon="arrow_right"></i><span class="new">12/11/2026</span></span>`).

Agent-action blocks: `.steps` > `.step` (see `engine.md` §Process steps), `.mode` badges, `.run` (steps beside the
card being acted on), `.opt` (a choice row; `on` marks it), `.checks` (pre-checks; `li.warn` for a flag), `.policy`
(why this needs a person) and `.log` (activity: time, actor, what happened, mode badge; `.by` for a second line).

**Microsoft product icons.**  The kit carries the official icons.  Put one on an empty `<span>`: `.oi` (20 px app or
file mark: Copilot sources, chips, pane heads) or `.fav` (16 px browser-tab favicon), plus the product key:
`copilot cstudio automate dataverse d365 sales ado fabric powerbi onelake lakehouse teams outlook word excel
powerpoint sharepoint onedrive loop`.  Markup: `<span class="ref"><span class="oi teams"></span>[chat name] ·
Teams</span>`.  Rules (Microsoft's icon terms): only for the Microsoft product it belongs to; never cropped,
stretched, rotated or recoloured; the product name nearby.  Product headers (Outlook, Teams, Dynamics 365) show the
app name, as the real ones do, not an icon.  Customer and third-party systems get no icon (see below).

### Power BI: how numbers are shown

Numbers shown as a chart come from Power BI, wherever they appear.  In Copilot: Copilot finds the report, queries
its semantic model, answers in a line or two, shows the visual under the answer and cites the report (a `.ref`
with the `.oi.powerbi` icon); "Open in Power BI" opens the report in Copilot's browser pane.  See `shells.html`
`pbi-answer`; `report` there is the full screen version.  A visual can also sit on a Teams card or a
view you design, still titled and cited to its report.

| Part | Markup | Notes |
|---|---|---|
| Chart visual | `figure.pbi[data-chart]` with `figcaption.pbi-head` (`b` title, `span` subtitle) | Syntax in `engine.md` §Power BI visuals |
| Card | `.pbi.card` > `.l` label, `.v` value (`data-count` to count up), `.r` reference line (`b`, `.up`, `.down`) | 3–4 in a row |
| Table | `.pbi` > `.pbi-head` + `table` (`th.n`/`td.n` for numbers, `tr.tot` total, `.up`/`.down`) | No gridlines, as Power BI |
| Slicer | `.pbi-slicer` > `b` + `span` | Top of the page |
| Report in the service | `.pbi-app` > `.pbi-bar` (`.crumb`), `.pbi-act`, `.pbi-main` > `.pbi-canvas` > `.pbi-page` (12-column grid; `grid-column:span n`), `.pbi-filters`; pages as `.pbi-tabs` (browser pane) or `.pbi-pages` (full screen) | Fill the page; check nothing runs off the bottom |

Fluent 2 base theme (Power BI's default base theme): data colours in order `#118DFF #12239E #E66C37 #6B007B
#E044A7 #744EC2`, titles and subtitles on, axis titles off, smooth lines, light gridlines, rounded visuals on a grey
canvas.  The kit applies all of this; don't restyle visuals.  Waterfalls use blue up, orange down, navy total.
Every number in the answer, the visual and the report agrees with the data sheet.

**Need a view the kit doesn't have?**  Build it in the prototype's `<style>` block from the same tokens and
building blocks.  For a Microsoft product (SharePoint, Excel, Teams on a phone), match the real product's layout:
top bar height 48, left navigation, command bar, content on `--bg3` with white surfaces.  For a phone, draw a
plain device outline (no maker's branding) around an app at phone scale, with large touch targets; put it beside
other content rather than alone on a big empty stage.  For a website the customer's own customers use, give the
fictitious company a simple, believable site (its name, one brand colour, plain navigation) with the agent as a
chat panel or card on it.  For the signature moment, design what explains it best (a timeline, a comparison, a
map, a board) with Fluent type, neutrals and one agent accent.  A line-of-business app built on Power Apps should
reuse `.d3`; the customer's own back-office system uses `.lob`.

**Customer and third-party systems.**  Never imitate a real non-Microsoft product (its name, logo, colours or
layout): no fake Salesforce, SAP, Aladdin, Bloomberg, Epic.  Show it as `.lob` with a plain functional name
("Order management", "Contract management"), and say the agent reached it through a connector.  The `.lob` bar
colour can change (`style="--lob:#..."`) but stays neutral.

### Who acts: done for you, needs input, needs approval

When the agent carries out a process, every step says who acts, with one of three `.mode` badges:

| Badge | Use for | Examples |
|---|---|---|
| `.mode.auto` *Done for you* | Internal, low-risk, reversible, or already agreed | Calendar holds, reminders, logging an activity in the CRM, pulling data, drafting |
| `.mode.input` *Needs your input* | A judgement only the person can make | Which discount, which option, what the client said |
| `.mode.approval` *Needs your approval* | Money, trades, orders, binding commitments, anything sent to a customer, anything hard to undo | Place an order, send a quote, move funds, change a policy |

- Never show an approval-class action as *Done for you*, even if a customer asks for "full automation".  Show the
  approval, and make it fast.
- Every approval card shows what will happen (`.kv`), the pre-checks the agent ran (`.checks`, with at least one
  honest flag when there is one), the policy reason (`.policy`), and Approve / Edit / Decline.
- After the run, show proof: the `.log`, and the change in the system of record, usually in Copilot's browser
  pane (a `tr.new` row in the business app, a `.diff` on the record, an `.ev.ai` event in the calendar).  "It says
  it did it" is weaker than "there it is".

### The agent's look

- In the Copilot app, Copilot speaks without an avatar, as the product does.  Elsewhere (logs, records, cards),
  the agent's mark is the gradient sparkle: `<span class="cp-mark"><i class="ic grad" data-icon="sparkle_filled"></i></span>`.
  An Autopilot agent gets the `.ap-av` avatar.  Give an agent a plain job name (what it does, then "agent").  No
  mascot, no robot, no Microsoft marketing characters.
- When Copilot acts as the person (a Teams post, a sent mail), show it as the person's own message with a small
  "Sent with Copilot" caption, not as a bot.
- `.work-box` + `.work` shows the steps it's taking, with real counts and sources ("Reading 6 emails and 2
  meetings, since 28 Oct").  3–5 steps.
- `.ai-touched` puts the gradient border on the one thing the agent created or changed; `.ai-flag` says so in
  words ("Added by [agent name]").  One per scene.  On a list row (`.tl-item`, `.acard .item`, `.log` row) it
  adds its own side padding and keeps all four edges, even as the first row; don't add inline padding.
- Answers are short, specific, and cite sources (`.cite` numbers, `.ref` chips).

## Tredence frame scenes

`class="scene frame td-cover|td-content|td-section|td-divider|td-ask|td-closing"`.  The kit draws the Tredence 2026
template's chrome; you place Poppins text and flat Tredence-palette shapes absolutely on top.  Layouts, zones, the
type scale, the palette, contrast, logos, photos and components: `tredence-frame.md`.  Outlines: `assets/frames.html`.

**Readable on a photo.**  Only the cover title, its subtitle, the ask's one line and the ask pill sit on a photo,
over the Charcoal `.td-shade`.  Everything else goes on a white content scene.  The check measures the contrast
behind every line of text on a frame scene and flags anything under 4.5:1 (3:1 for text 24 px and up, or 18.66 px
bold), and flags any colour, font, gradient or shadow that isn't Tredence's.

Keep the frame short, and let it carry the business shift (`story-and-data.md` §Start with the business shift):

- **The cover** names the change for the business, in the customer's words: the tension they live with, or what
  becomes possible.  Not a product tagline ("insights and actions in one place", "your AI assistant for X"), and
  not a list of what the demo will show.
- **The close** says how the business could work (from → to), what it could be worth (rounded, labelled
  "Illustrative", basis in the notes), and makes one ask.  Never a recap of the scenes, a checklist against the
  brief or the customer's notes, or a list of features.  If the close would still make sense with "What you saw"
  above it, rewrite it.

Shape both for this story (one from → to, the measure before and after, the first move and the ask); neither has
to be numbered cards.  The product scenes are the proof.

## AI tells and what to do instead

| AI tell | Do this instead |
|---|---|
| Gradient hero sections, glassmorphism, neon glows, blobs | Product chrome on neutral surfaces; the gradient only on the agent; the Tredence frame in flat brand colour |
| Emoji or mixed icon styles | Fluent icons only, 20 px, `currentColor` |
| A grid of identical feature cards | The real place the work happens (the Copilot conversation, the record) |
| Big unlabelled claims ("Save 10 hours a week!", "99.9%") | The business measure, rounded and labelled "Illustrative", with its basis in the notes; record data specific and from the data sheet |
| "Acme", "John Doe", "Lorem ipsum", "Task 1" | Microsoft fictitious companies and demo personas, specific tasks |
| Marketing words: unlock, seamless, leverage, supercharge, revolutionise, empower, game-changing, flywheel, journey, best-in-class | Plain verbs that say what happens |
| The agent knows everything instantly | Visible steps, sources, a gap it admits, a person who confirms |
| Everything centred and floating | Product grid alignment: left-aligned, edge-to-edge panes |
| Inter, system-rounded or mixed fonts | Segoe UI in product scenes, Poppins in the Tredence frame, never the other way round |
| Dark mode "AI dashboard" | Light theme product UI, as customers see it at work |
| Every prototype in the same scene order, the agent moment always a chat answer | Screens chosen for this story's beats; a view designed for the signature moment |
| One person's task done faster, and nothing more | The business shift: what the business can do now, shown from above, with the measure that moves |
| A close that recaps the demo or ticks off the brief ("What you saw", "in one place", "single pane of glass") | How the business could work, what it could be worth (illustrative), and one ask |

## Motion

Motion explains, it doesn't decorate: things arrive when the agent produces them.  Default beat transition is a
short rise-in; `.fade`, `.slide-r` (toasts), `.pop` (cards) are alternatives.  The engine makes every change
graceful on its own (content glides, exits fade, panes push in, answers stream word by word, scenes crossfade);
see `engine.md` §Motion.  Typing is for the user's prompt or the agent's streamed answer only.  Keep a whole
scene's auto sequence under about 6 seconds, and let the agent's work feel deliberate rather than instant.
