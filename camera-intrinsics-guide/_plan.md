# Plan: Camera Intrinsics (the linear model)

## Subject
The pinhole camera **intrinsic matrix K** — the 3×3 upper-triangular matrix that
turns a point in the camera's own 3D coordinate frame into a pixel location. What
each entry means, an interactive way to *feel* the parameters, and — the part you
really asked about — how everyday image operations (crop, rescale, rotate/flip)
transform K, versus operations that quietly *break* the matrix model entirely.

## Who this is for
Someone comfortable with matrices and 3D geometry who wants a *working* mental
model of intrinsics — not a derivation-heavy textbook. You've seen K before; you
want to truly understand it and know exactly what happens to it when you crop,
resize, or warp an image.

## Your questions, answered directly
- **"Does the matrix move from XYZ in space into pixel space?"** → Yes, essentially
  — with one crucial subtlety (the perspective divide). Answered head-on on the
  index page; it's the spine of the whole guide.
- **Show the matrix + visualize changing each value** → dedicated page with a live
  interactive: drag sliders for fx, fy, cx, cy, skew and watch a projected 3D scene
  respond in real time.
- **Cropping & rescaling (very general)** → their own section, with the exact K′.
- **A "classical operation" and its effect** → the general 2D affine warp
  (rotate / flip / shear) — the umbrella that *contains* crop and scale — and the
  one clean rule: **K′ = A · K**.
- **Functions that ruin the matrix representation** → lens distortion, fisheye,
  rolling shutter, and other nonlinear warps that cannot be folded into any K.

## The arc
1. **Motivation & the pipeline** — world → camera → image plane → pixels; where K
   sits, and the direct answer to the "XYZ → pixels" question (incl. the divide-by-Z).
2. **The matrix itself** — every entry of K (fx, fy, cx, cy, skew), units, what each
   physically means, plus the live slider visualizer.
3. **Transformations that keep K a matrix** — crop, rescale, and the general affine
   (rotate/flip/shear) unified under K′ = A·K, with worked formulas and a visual.
4. **Transformations that break K** — radial/tangential distortion, fisheye, rolling
   shutter; *why* they can't be a 3×3 matrix, and how practice copes (distortion
   coeffs, undistort-then-K).

## Structure — 4 pages
- `index.html` — **Overview**: the projection pipeline + the "yes, but…" answer.
- `matrix.html` — **The K matrix**: anatomy of every entry + interactive slider demo.
- `transformations.html` — **Crop, scale, warp**: the K′ = A·K rule and its instances.
- `breaking.html` — **Breaking the model**: nonlinear ops that no K can represent.

## Heavy material (collapsible deep-dives)
- Full world→pixel derivation with homogeneous coordinates and the perspective divide.
- Why K is upper-triangular (QR / RQ decomposition of a projection matrix).
- Exact crop+resize formula in pixel-corner vs pixel-center conventions (off-by-half
  pitfalls when resizing).
- The Brown–Conrady radial-tangential distortion model, written out.
- "Where focal length in mm becomes fx, fy in pixels" (sensor size & pixel pitch).

## Interactive pieces (vanilla JS + canvas/SVG, no libraries)
- **K visualizer** (matrix page): sliders fx, fy, cx, cy, s → live re-projection of a
  small 3D wireframe (cube + ground grid), with the numeric K updating alongside.
- **Transform demo** (transformations page): pick crop / resize / rotate / flip →
  show the before/after image frame *and* the updated K side by side.
