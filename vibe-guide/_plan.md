# Plan — ViBe guide

**Subject.** ViBe (Visual Background Extractor): a per-pixel, sample-based background-subtraction
algorithm that models each pixel's background as a small *set of previously observed values* and
updates it with a deliberately random, conservative, spatially-diffusing policy.

**Who this is for.** Someone comfortable with images-as-arrays and basic probability, who has met
frame differencing or MOG2 and wants to know why a technique with no density estimate, no Gaussians
and no learning rate beats them — and where it breaks. Practitioner level, not survey level.

**The arc.**

1. *Motivation* — background subtraction as "which pixels are new?"; why running-average and
   Mixture-of-Gaussians models are the obvious answer, and the three things they get wrong
   (parametric assumption, fixed-length memory, slow adaptation from a single frame).
2. *Core mechanism* — the model is N=20 raw samples per pixel; classification is "are at least
   #min=2 of them within radius R=20 of what I see now?". No PDF, no sorting, no ranking.
   This is the thing to remember and it belongs in the first 30% of page 1.
3. *The update policy is the actual invention* — conservative (only background pixels update),
   memoryless random replacement (exponential-decay lifespan, no fixed window), time subsampling
   (1/φ, φ=16) and **spatial diffusion** into a random 8-neighbour. Plus single-frame
   initialisation from the neighbourhood. Ghost dissolution falls out of this.
4. *Adjacent ideas / confusions* — ViBe vs MOG/MOG2 vs KDE vs SACON vs PBAS vs SuBSENSE;
   ViBe vs ViBe+; "conservative vs blind update" and the deadlock it creates; the patent.
5. *Going further* — parameter sensitivity, failure modes (camera motion, camouflage, sudden
   illumination change, moving-object-at-init), post-processing, where to get code.

**Structure.** Three pages:

- `index.html` — *The idea*: motivation, the sample model, the classification rule, why it works.
- `update.html` — *The update policy*: conservative + random + spatial, memoryless lifespan proof,
  initialisation, ghosts.
- `practice.html` — *In practice*: parameters, failure taxonomy, variants & lineage, patent, code.

**Heavy material → collapsibles.**

- The exponential/memoryless lifespan derivation (`((N−1)/N)^{dt}` → `e^{−ln(N/(N−1))·dt}`).
- Why a naive "keep the last N frames" buffer needs orders of magnitude more memory for the same
  time coverage.
- A ~40-line NumPy reference implementation.
- The blind-vs-conservative update deadlock discussion.
- Distance metrics in colour space (L2 sphere vs per-channel box) and what implementations differ on.
