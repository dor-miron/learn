# Plan: Discriminative Correlation Filter tracking (KCF / CSRT)

**Subject.** "Click on an object, follow it across frames" — *single-object, model-free* visual tracking via **discriminative correlation filters (DCF)**. The lineage MOSSE → CSK → KCF → DSST → CSRT, with KCF and CSRT (the two OpenCV workhorses) as the focus. How the correlation-filter trick works, the circulant/FFT magic that makes it fast, why it's robust, where it breaks, and — called out explicitly — how it behaves over *changing backgrounds*.

**Who this is for.** Someone with CV background who can draw a bounding box and wants to track it: knows what convolution/correlation, the FFT, and HOG features are at a sketch level; hasn't read the tracking-filter literature. Pairs with the existing ByteTrack guide (detection-based tracking) — DCF is the other paradigm.

## The arc

- **Motivation.** The "click-to-track" problem: one box on frame 1, no detector, no class label, no training set — follow *that* thing. This is single-object / model-free tracking. Contrast with tracking-by-detection (link to ByteTrack guide). The tracker *learns the target's appearance online* and re-localizes it each frame.
- **Core idea.** A correlation filter is a template that, slid over the search window, yields a sharp **peak at the target's center** and ~zero elsewhere. "Discriminative" = it's trained to tell the target patch apart from its own shifted (background) versions — not just matched. The peak location *is* the new position.
- **The trick that makes it fast.** Training a regressor over *all* circular shifts of a patch sounds expensive; but cyclic shifts form a **circulant matrix**, which diagonalizes under the DFT. So training and detection collapse to **elementwise multiply/divide of FFTs** → hundreds of fps. The single most important idea on the page.
- **The per-frame loop.** Frame 1: cosine-window the click patch, set a Gaussian regression target, solve for the filter. Each frame after: crop search window at last position → correlate (FFT·, IFFT) → peak = new position → re-train at new spot → blend into the running filter (learning rate). SVG of this loop.
- **KCF vs CSRT.** KCF (2015): kernelized ridge regression + HOG, circulant trick survives the kernel, very fast, fixed scale. CSRT / CSR-DCF (2017): adds a **spatial reliability map** (mask the filter to the object → handles non-rectangular targets, kills boundary effects) and **channel reliability** weights; HOG+Colornames; slower, more accurate. Comparison table incl. MOSSE & DSST.
- **Why it works.** FFT speed, online adaptation (no pretraining), discriminative negatives-from-shifts, one-click init, class-agnostic.
- **Where it fails.** Fast motion / leaving the search window; scale change (KCF); occlusion + no re-detection → drift; deformation/rotation; **model contamination** from background inside the box; boundary effects (CSRT mitigates). Each failure motivates a later variant.
- **Changing backgrounds — the explicit question.** Its own anchored section. Short answer: DCF tracks the *target's* appearance, it does **not** assume a static background (unlike background-subtraction), so a moving camera / changing scene is fine *per se*. The real risks are (1) background *inside the box* getting baked into the model, then changing → drift (CSRT's mask is the fix); (2) **distractors** that resemble the target; (3) the object leaving the local search window under fast camera motion. Nuanced "yes, but watch these three things."
- **Going further.** What fixed each failure: DSST (scale), deep-feature DCF (ECO/C-COT), Siamese trackers (SiamFC/SiamRPN — cross-correlation reborn as a learned embedding), transformer trackers (STARK/MixFormer), SAM 2 (click→segment→track). Pointer to combining with a detector for long-term tracking; link back to ByteTrack.

## Structure

**Two pages** (mirrors the ByteTrack guide's mainline + landscape split):

1. `index.html` — the mainline: click-to-track framing → correlation-filter idea → the circulant/FFT trick → per-frame loop → why it works. The "aha".
2. `limits.html` — the variants table (MOSSE/KCF/DSST/CSRT), the failure taxonomy, the dedicated **changing-background** section, and what beats DCF today. The lineage *is* the failure story, so variants + failures belong together.

One page would bury the changing-background answer and the comparison; three would pad.

## Heavy material → collapsibles

- Circulant-matrix derivation: ridge regression over cyclic shifts diagonalizing in the Fourier domain (the actual `\hat{w} = \hat{x}^* \hat{y} / (\hat{x}^*\hat{x}+\lambda)`).
- KCF kernel trick: kernelized ridge regression + kernel correlation staying circulant.
- MOSSE closed-form filter (the original 2010 objective).
- CSRT's spatial reliability map (foreground mask + constrained ADMM) and channel-reliability weights.
- OpenCV snippet: `cv2.TrackerKCF_create()` / `cv2.TrackerCSRT_create()` init + update loop.
- Per-frame pseudocode.

## Running example: tracking a maneuvering drone

Use a **moving drone whose cross-section changes with the camera** as the concrete thread (the user asked about this directly). It cleanly exercises almost every DCF failure mode at once, and the answer is genuinely mixed:

- **Scale change** — drone flies toward/away from camera → apparent size changes. KCF's base form has *no* scale estimation (box stays fixed-size → model gets polluted or target shrinks out of it); DSST/CSRT estimate scale. First real problem.
- **Aspect-ratio / cross-section change** — drone banks, yaws, or pitches → its silhouette goes from a fat quad-X to a thin line, and the *aspect ratio* of the true box changes. This is the hard one: DCF estimates translation (and at best a single scale factor), **not** aspect ratio or out-of-plane rotation. A rigid rectangular filter learned on the head-on view correlates poorly with the edge-on view → drift or loss. CSRT's spatial-reliability mask helps a little (re-masks each frame) but does not solve aspect change.
- **Fast/erratic motion + camera motion** — drone darts; if it leaves the local search window between frames, the tracker is blind to it. Mitigations: larger search region (slower), higher frame rate.
- **Background** — drone against clean sky is *easy* (great target/background contrast, few distractors); against tree-line/ground clutter or a second drone is *hard* (distractors). The changing-background section covers this directly.

Verdict to land: KCF/CSRT can hold a drone for short, smooth, roughly-constant-aspect segments, but the changing cross-section + agility is exactly where pure DCF struggles — point toward scale-adaptive (CSRT/DSST) as the floor, and re-detection / a small detector + tracker combo (or a learned tracker / SAM 2) for a real system. Weave this through both pages; give it a clear summary callout.

## Notable design choices

- The circulant/FFT diagonalization gets the marquee SVG/equation — it's *why* this family exists.
- The changing-background section is anchored and linked from page 1, since the user asked it directly.
- One comparison table (MOSSE/KCF/DSST/CSRT: features, scale, speed fps, headline strength/weakness).
- Restrained callouts: one "key insight" (the FFT trick), one "gotcha" (model contamination / drift), one "historical detour" (MOSSE 2010).
