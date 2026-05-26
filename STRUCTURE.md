# learn

## Top-level entries

- `CLAUDE.md` — entry point for AI agents: project purpose + pointer to STRUCTURE.md.
- `STRUCTURE.md` — this file: the file/folder map with a one-line purpose per entry.
- `bytetrack-guide/` — Interactive HTML study guide on ByteTrack and the multi-object-tracking landscape.
- `transformers-guide/` — Interactive HTML study guide ("A Visual Guide to Transformers").

## `bytetrack-guide/`

ByteTrack study guide — motivation + algorithm on the mainline page, surrounding landscape on a second page. Produced via the `learn-html` skill.

- `bytetrack-guide/index.html` — mainline page: tracking-by-detection motivation + the two-pass BYTE association algorithm (with an SVG diagram).
- `bytetrack-guide/alternatives.html` — "What ByteTrack is competing with": SORT, DeepSORT, FairMOT, OC-SORT, BoT-SORT, StrongSORT, plus comparison table.
- `bytetrack-guide/styles.css` — shared stylesheet for the guide's pages.
- `bytetrack-guide/_manifest.json` — page manifest (title + per-page slug, nav label, eyebrow, h1, lead) driving the guide's navigation.
- `bytetrack-guide/_plan.md` — authoring plan: subject, audience, page arc, and design choices for the guide.

## `transformers-guide/`

"A Visual Guide to Transformers" — multi-page guide on attention, ViT/DINO, and decoder LLMs. Produced via the `learn-html` skill.

- `transformers-guide/index.html` — landing page: "Transformers, attention, and what makes DINO see objects."
- `transformers-guide/attention.html` — the attention mechanism explained visually.
- `transformers-guide/dino.html` — ViT & DINO: vision transformers and self-supervised features.
- `transformers-guide/llms.html` — LLMs & decoders: decoder-only transformer language models.
- `transformers-guide/styles.css` — shared stylesheet for the guide's pages.
