# Plan: ByteTrack guide

**Subject.** ByteTrack — the 2022 multi-object tracking (MOT) method whose central trick is to *keep* the low-confidence detections instead of throwing them away, and use them in a second-pass association. The guide also covers the surrounding landscape: the tracking-by-detection paradigm, the older SORT/DeepSORT line, and what's appeared since (OC-SORT, BoT-SORT, StrongSORT).

**Who this is for.** Someone with ML / computer vision background — knows what a bounding box detector is, understands IoU and Kalman filters at a sketch level, hasn't necessarily read the MOT literature.

## The arc

- **Motivation.** What "multi-object tracking" actually is (give every object a stable ID across frames), why tracking-by-detection beat end-to-end methods for years, and the specific pain point ByteTrack addresses — detectors output a score for every box, and the standard pipeline drops everything below ~0.5, which throws away most of the *occluded and partially-visible* objects you actually care about tracking.
- **Core idea.** "BYTE" association: keep all detections, do two matching passes — first match high-score detections to existing tracks, then match the remaining unmatched tracks against the *low-score* detections. The low-score ones save tracks during occlusion.
- **How it works.** The full pipeline: detector → Kalman prediction per track → first IoU matching (high-score vs all tracks) → second IoU matching (low-score vs surviving unmatched tracks) → track birth / death rules. Nothing about appearance embeddings — that's the surprise.
- **Alternatives.** Where ByteTrack sits relative to SORT (2016), DeepSORT (2017, adds appearance), FairMOT (2020, joint detection + embedding), OC-SORT (2023, fixes motion under occlusion), BoT-SORT and StrongSORT (2022+, ByteTrack-style + appearance + better Kalman). Compact comparison table.
- **Pros and cons.** Pros: simple, fast, near-SOTA on MOT17/20 in 2022, no appearance net. Cons: motion-only fails under heavy occlusion + camera motion, ID switches in crowded scenes, totally dependent on detector quality, no re-identification after long disappearance.
- **Going further.** Transformer MOT (MOTR, TrackFormer), 3D MOT for autonomous driving, the HOTA metric and why MOTA is a misleading benchmark.

## Structure

**Two pages.**

1. `index.html` — motivation + ByteTrack algorithm in detail. The mainline. Includes a small SVG diagram of the two-pass association.
2. `alternatives.html` — the surrounding landscape, comparison table, when-to-use-what. Pros/cons live here because they're best framed *against* the alternatives.

Three pages would be padding; one page would bury the comparison.

## Heavy material → collapsibles

- The exact pseudocode (Algorithm 1 from the paper) — accurate but visually heavy.
- The Kalman state vector and prediction step used by ByteTrack (constant-velocity, 8D state).
- DeepSORT's appearance embedding details (only relevant if the reader wants to understand the appearance line).
- Definitions of MOTA / IDF1 / HOTA — most readers can skim past, the curious can expand.

## Notable design choices

- The two-pass association deserves its own SVG. Boxes-and-arrows showing "high-score detections → first match → unmatched tracks → second match against low-score detections" is *the* visual.
- Comparison table on the alternatives page: columns for "year", "uses appearance?", "motion model", "headline strength", "headline weakness".
- One callout per page is enough; don't over-callout.
