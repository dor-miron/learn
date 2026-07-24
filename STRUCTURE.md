# learn

## Top-level entries

- `CLAUDE.md` — entry point for AI agents: project purpose + pointer to STRUCTURE.md.
- `STRUCTURE.md` — this file: the file/folder map with a one-line purpose per entry.
- `bytetrack-guide/` — Interactive HTML study guide on ByteTrack and the multi-object-tracking landscape.
- `camera-intrinsics-guide/` — Interactive HTML study guide on the camera intrinsic matrix K ("Camera Intrinsics, the Linear Model").
- `dcf-tracking-guide/` — Interactive HTML study guide on discriminative correlation-filter tracking ("Click-to-Track: Correlation Filters").
- `transformers-guide/` — Interactive HTML study guide ("A Visual Guide to Transformers").
- `vibe-guide/` — Interactive HTML study guide on the ViBe background-subtraction algorithm ("ViBe: Background as a Bag of Samples").
- `otd-verified.jpeg` — loose top-level JPEG (857×806); not referenced by any guide page.

## `bytetrack-guide/`

ByteTrack study guide — motivation + algorithm on the mainline page, surrounding landscape on a second page. Produced via the `learn-html` skill.

- `bytetrack-guide/index.html` — mainline page: tracking-by-detection motivation + the two-pass BYTE association algorithm (with an SVG diagram).
- `bytetrack-guide/alternatives.html` — "What ByteTrack is competing with": SORT, DeepSORT, FairMOT, OC-SORT, BoT-SORT, StrongSORT, plus comparison table.
- `bytetrack-guide/styles.css` — shared stylesheet for the guide's pages.
- `bytetrack-guide/_manifest.json` — page manifest (title + per-page slug, nav label, eyebrow, h1, lead) driving the guide's navigation.
- `bytetrack-guide/_plan.md` — authoring plan: subject, audience, page arc, and design choices for the guide.

## `camera-intrinsics-guide/`

"Camera Intrinsics, the Linear Model" — four-page interactive textbook on the intrinsic matrix K: what each entry means, how affine image edits left-multiply K, and which operations break the matrix model entirely. Produced via the `learn-html` skill.

- `camera-intrinsics-guide/index.html` — overview: K as the camera's own fingerprint, turning world rays into pixels.
- `camera-intrinsics-guide/matrix.html` — the K matrix: every entry (fx, fy, cx, cy, skew) with a live 3D re-projection demo.
- `camera-intrinsics-guide/transformations.html` — crop/scale/flip/rotate as the rule K′ = A·K, with worked formulas and a before/after.
- `camera-intrinsics-guide/breaking.html` — operations no K can capture (lens/fisheye distortion, rolling shutter, panoramas) and the straight-lines litmus test.
- `camera-intrinsics-guide/proj.js` — shared 3D scene + pinhole projection (OpenCV X-right/Y-down/Z-forward convention) driving the interactive demos.
- `camera-intrinsics-guide/styles.css` — shared stylesheet for the guide's pages.
- `camera-intrinsics-guide/_manifest.json` — page manifest (title + per-page slug, nav label, eyebrow, h1, lead) driving the guide's navigation.
- `camera-intrinsics-guide/_plan.md` — authoring plan: subject, audience, page arc, and design choices for the guide.

## `dcf-tracking-guide/`

"Click-to-Track: Correlation Filters" — guide on discriminative correlation-filter tracking (KCF, CSRT): the FFT trick that makes click-to-track fast, and where it breaks. Produced via the `learn-html` skill.

- `dcf-tracking-guide/index.html` — how it works: a single click teaches a correlation filter to re-find a patch every frame at hundreds of fps.
- `dcf-tracking-guide/limits.html` — limits & frontier: failure taxonomy, changing backgrounds, the maneuvering-drone verdict, and trackers that fixed each weakness.
- `dcf-tracking-guide/styles.css` — shared stylesheet for the guide's pages.
- `dcf-tracking-guide/_manifest.json` — page manifest (title + per-page slug, nav label, eyebrow, h1, lead) driving the guide's navigation.
- `dcf-tracking-guide/_plan.md` — authoring plan: subject, audience, page arc, and design choices for the guide.

## `transformers-guide/`

"A Visual Guide to Transformers" — multi-page guide on attention, ViT/DINO, and decoder LLMs. Produced via the `learn-html` skill.

- `transformers-guide/index.html` — landing page: "Transformers, attention, and what makes DINO see objects."
- `transformers-guide/attention.html` — the attention mechanism explained visually.
- `transformers-guide/dino.html` — ViT & DINO: vision transformers and self-supervised features.
- `transformers-guide/llms.html` — LLMs & decoders: decoder-only transformer language models.
- `transformers-guide/styles.css` — shared stylesheet for the guide's pages.

## `vibe-guide/`

"ViBe: Background as a Bag of Samples" — three-page interactive textbook on the ViBe background-subtraction algorithm (Barnich & Van Droogenbroeck): the per-pixel sample model, the random/conservative/spatial update policy, and where it breaks. Produced via the `learn-html` skill.

- `vibe-guide/index.html` — the idea: why per-pixel densities fail, and how twenty raw samples plus a "count matches within radius R" test replace them.
- `vibe-guide/update.html` — the update policy: conservative updating and its deadlock, memoryless random replacement, time subsampling φ, spatial propagation, and the ghost vs. stopped-object asymmetry.
- `vibe-guide/practice.html` — in practice: the four parameters, six failure modes, ViBe+/PBAS/SuBSENSE, CDnet numbers, a runnable NumPy implementation, and the Apache-2.0 relicensing (Jan 2026).
- `vibe-guide/styles.css` — shared stylesheet for the guide's pages.
- `vibe-guide/_manifest.json` — page manifest (title + per-page slug, nav label, eyebrow, h1, lead) driving the guide's navigation.
- `vibe-guide/_plan.md` — authoring plan: subject, audience, page arc, and design choices for the guide.
