/* Shared 3D scene + pinhole projection for the camera-intrinsics guide.
   Camera-frame convention: X right, Y down, Z forward (OpenCV style).
   A box sits on a ground grid in front of the camera. */
const Scene = (function () {
  // ground plane at Y = 1.0 (below the camera, since Y points down)
  const GY = 1.0;

  // box: 1.4 wide/deep, 1.4 tall, resting on the ground, centred ~Z=5
  const x0 = -0.7, x1 = 0.7, zf = 4.3, zb = 5.7;
  const yb = GY, yt = GY - 1.4;           // bottom on ground, top above it
  const V = [
    [x0, yb, zf], [x1, yb, zf], [x1, yb, zb], [x0, yb, zb], // bottom face
    [x0, yt, zf], [x1, yt, zf], [x1, yt, zb], [x0, yt, zb], // top face
  ];
  const E = [
    [0,1],[1,2],[2,3],[3,0],   // bottom
    [4,5],[5,6],[6,7],[7,4],   // top
    [0,4],[1,5],[2,6],[3,7],   // verticals
  ];

  // ground grid lines
  const grid = [];
  const Xs = [-4,-3,-2,-1,0,1,2,3,4];
  const Zs = [2,3,4,5,6,7,8,9,10,12];
  Xs.forEach(X => grid.push([[X, GY, Zs[0]], [X, GY, Zs[Zs.length-1]]]));   // parallel to Z
  Zs.forEach(Z => grid.push([[Xs[0], GY, Z], [Xs[Xs.length-1], GY, Z]]));   // parallel to X

  // project a single 3D camera-frame point through K -> pixel {u,v}
  function project(p, K) {
    const x = p[0] / p[2], y = p[1] / p[2];
    return {
      u: K.fx * x + (K.s || 0) * y + K.cx,
      v: K.fy * y + K.cy,
    };
  }

  return {
    project,
    boxEdges: () => E.map(([a, b]) => [V[a], V[b]]),
    gridLines: () => grid.slice(),
  };
})();
