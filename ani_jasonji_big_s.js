//find the div with id 'app' this will be the actual main page
//this will be hidden until the animation is completed
let app = document.getElementById("app");
// app.style.display = "none";

//Define canvas and attach it to Body
function createCanvas(backgroundColor) {
  let canvas = document.createElement("canvas");
  // canvas.style.width = "100%";
  // canvas.style.height = "100%";
  let ctx = canvas.getContext("2d");
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  document.body.appendChild(canvas);
  return { ctx, canvas };
}

//setting animating parameters
const params = {
    J: {
      j_index: 1,
      offsetX: 0,
      offsetY: 0,
      speed: 2,
      color: "red",
      coords: { x: [], y: [] },
    },
    J2: {
      j2_index: 1,
      offsetX: 14 + 0.5,
      offsetY: 0,
      speed: 2,
      color: "blue",
    },
    A: {
      a_index: 1,
      a_ellipse: 0,
      offsetX: 2.75,
      offsetY: 0,
      speed: 2,
      color: "green",
      coords: { x: [], y: [] },
    },
    S: {
      s_arc: -Math.PI / 8,
      s_arc2: -Math.PI / 2 + 0.1,
      offsetX: 5.5,
      offsetY: 0,
      speed: 30,
      color: "blue",
    },
    O: { o_arc: Math.PI, offsetX: 8 + 0.5, offsetY: 0, speed: 2, color: "red" },
    N: {
      n_index: 1,
      n_line: 1,
      n_line2: 2,
      n_arc: Math.PI,
      offsetX: 10.5 + 0.5,
      offsetY: 0,
      speed: 2,
      color: "green",
      coords: { x: [], y: [] },
    },
    I: {
      i_index: 1,
      offsetX: 16.75 + 0.5,
      offsetY: -0.1,
      speed: 2,
      color: "coral",
      rotation: 0,
      coords: { x: [], y: [] },
    },
    pass: 0,
    opacity: 1,
    DOT: {
      color: "coral",
      offsetX: 18.8 + 0.5,
      offsetY: 0,
    },
  },
  canvasBackgroundColor = "white",
  functions = {
    J1: (x) => -(Math.pow(x + 0.5, 2) / 9 + 1),
    J2: (x) => -(Math.abs(Math.pow(x - 0.5, 2)) * 5) / 4 + 3,
    J3: (x) => -Math.abs(Math.pow(x - 0.5, 3)) + 3,
    A: (x) => -10.4 * Math.abs(Math.pow(x - 4.75, 3)) + 3,
    N: (x) => 2 * Math.pow(x - 0.5, 14) + 1,
    I: (x) => -Math.pow(x, 2) + 2.95,
  },
  animate = {
    J: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      ctx.moveTo(
        params.J.coords.x[animatingParams.j_index - 1],
        params.J.coords.y[animatingParams.j_index - 1]
      );
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.lineTo(
          params.J.coords.x[animatingParams.j_index],
          params.J.coords.y[animatingParams.j_index++]
        );
      }
      ctx.stroke();
      ctx.restore();
    },
    A_ellipse: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.ellipse(
          0.5,
          2,
          0.9,
          1.1,
          Math.PI / 4,
          animatingParams.a_ellipse - (Math.PI / 30) * 1.2,
          animatingParams.a_ellipse
        );
        animatingParams.a_ellipse += Math.PI / 30;
      }

      ctx.stroke();
      ctx.restore();
    },
    A_coords: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      ctx.moveTo(
        params.A.coords.x[animatingParams.a_index - 1],
        params.A.coords.y[animatingParams.a_index - 1]
      );
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.lineTo(
          params.A.coords.x[animatingParams.a_index],
          params.A.coords.y[animatingParams.a_index++]
        );
      }

      ctx.stroke();
      ctx.restore();
    },
    S_arc: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;

      let dif = Math.PI / 512;
      ctx.beginPath();
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.arc(
          0.5 + 0.25,
          0 - 1 + 0.25,
          5 / 4,
          animatingParams.s_arc,
          animatingParams.s_arc - dif,
          1
        );
        animatingParams.s_arc -= dif;
      }
      ctx.stroke();
      ctx.restore();
    },
    S_arc2: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;

      let dif = Math.PI / 512;
      ctx.beginPath();
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.arc(
          0.5 + 0.25,
          2 - 0.25,
          5 / 4,
          animatingParams.s_arc2 - 0.1,
          animatingParams.s_arc2 + dif
        );
        animatingParams.s_arc2 += dif;
      }
      ctx.stroke();
      ctx.restore();
    },
    O: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.arc(
          0.5,
          2,
          1,
          animatingParams.o_arc - 0.1,
          animatingParams.o_arc + Math.PI / 30
        );
        animatingParams.o_arc += Math.PI / 30;
      }

      ctx.stroke();

      ctx.restore();
    },
    N_line: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      ctx.moveTo(-0.5, animatingParams.n_line);
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.lineTo(-0.5, animatingParams.n_line + 0.1);
        animatingParams.n_line += 0.1;
      }
      ctx.stroke();
      ctx.restore();
    },
    N_coords: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      ctx.moveTo(
        params.N.coords.x[animatingParams.n_index - 1],
        params.N.coords.y[animatingParams.n_index - 1]
      );

      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.lineTo(
          params.N.coords.x[animatingParams.n_index],
          params.N.coords.y[animatingParams.n_index++]
        );
      }

      ctx.stroke();
      ctx.restore();
    },
    N_arc: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;

      let dif = Math.PI / 64;
      ctx.beginPath();
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.arc(
          0.5,
          2,
          1,
          animatingParams.n_arc - 0.1,
          animatingParams.n_arc + dif
        );
        animatingParams.n_arc += dif;
      }
      ctx.stroke();
      ctx.restore();
    },
    N_line2: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      ctx.moveTo(1.5, animatingParams.n_line2);
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.lineTo(1.5, animatingParams.n_line2 + 0.1);
        animatingParams.n_line2 += 0.1;
      }
      ctx.stroke();
      ctx.restore();
    },
    J2: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      ctx.moveTo(
        params.J.coords.x[animatingParams.j2_index - 1],
        params.J.coords.y[animatingParams.j2_index - 1]
      );
      for (let i = 0; i < animatingParams.speed; i++) {
        ctx.lineTo(
          params.J.coords.x[animatingParams.j2_index],
          params.J.coords.y[animatingParams.j2_index++]
        );
      }
      ctx.stroke();
      ctx.restore();
    },

    I: function (animatingParams) {
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      ctx.moveTo(
        params.I.coords.x[animatingParams.i_index - 1],
        params.I.coords.y[animatingParams.i_index - 1]
      );
      ctx.lineTo(
        params.I.coords.x[animatingParams.i_index],
        params.I.coords.y[animatingParams.i_index++]
      );
      ctx.stroke();
      ctx.restore();
    },
    rotateI: function (animatingParams, fullRotation = false) {
      blank(false, false, ctx);
      if (fullRotation) animatingParams.rotation = 0.5;
      ctx.save();
      ctx.translate(animatingParams.offsetX, animatingParams.offsetY + 3); //17.7, 3
      ctx.rotate(animatingParams.rotation);
      ctx.strokeStyle = animatingParams.color;
      ctx.beginPath();
      for (let x = -1.5; x <= 1; x += 0.05)
        ctx.lineTo(x, -Math.pow(x, 2) - 0.05);
      ctx.stroke();

      ctx.restore();
    },
    drawDotOnI: function () {
      ctx.fillStyle = params.I.color;
      ctx.strokeStyle = params.I.color;
      ctx.beginPath();
      ctx.arc(
        params.I.offsetX + 0.46,
        params.I.offsetY - 0.2,
        0.08,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.fill();
    },
  };
//getting the coordinates
(function () {
  for (let x = 0.5; x < 2.5; x += 0.1) {
    params.J.coords.x.push(x);
    params.J.coords.y.push(functions.J1(x));
  }
  for (let x = 2.5; x > 0.5; x -= 0.1) {
    params.J.coords.x.push(x);
    params.J.coords.y.push(functions.J2(x));
  }
  for (let x = 0.5; x >= -0.5; x -= 0.1) {
    params.J.coords.x.push(x);
    params.J.coords.y.push(functions.J3(x));
  }

  for (let x = 1.5; x <= 4.8 - 2.75; x += 0.05) {
    params.A.coords.x.push(x);
    params.A.coords.y.push(functions.A(x + 2.75));
  }
  for (let x = -0.5; x <= 1.55; x += 0.05) {
    params.N.coords.x.push(x);
    params.N.coords.y.push(functions.N(x));
  }
  for (let x = -1.5; x <= 1; x += 0.05) {
    params.I.coords.x.push(x);
    params.I.coords.y.push(functions.I(x));
  }
})();

function startAnimation(t) {
  if (params.J.j_index < params.J.coords.x.length) {
    animate.J(params.J);
  } else if (params.A.a_ellipse <= Math.PI * 2.2) {
    animate.A_ellipse(params.A);
  } else if (params.A.a_index < params.A.coords.x.length) {
    animate.A_coords(params.A);
  } else if (params.S.s_arc >= (-Math.PI * 3) / 2) {
    animate.S_arc(params.S);
  } else if (params.S.s_arc2 <= (Math.PI / 8) * 7) {
    animate.S_arc2(params.S);
  } else if (params.O.o_arc <= 3 * Math.PI) {
    animate.O(params.O);
  } else if (params.N.n_line <= 3) {
    animate.N_line(params.N);
    // } else if (params.N.n_index <= params.N.coords.x.length) {
    //   animate.N_coords(params.N);
    // }
  } else if (params.N.n_arc <= 2 * Math.PI) {
    animate.N_arc(params.N);
  } else if (params.N.n_line2 <= 3) {
    animate.N_line2(params.N);
  } else if (params.J2.j2_index < params.J.coords.x.length) {
    animate.J2(params.J2);
  } else if (params.I.i_index < params.I.coords.x.length) {
    animate.I(params.I);
  } else if (params.I.rotation <= 0.7) {
    animate.rotateI(params.I);
    params.I.rotation += 0.01;
  } else if (params.pass === 0) {
    if (!time) time = t;
    if (t - time > 500) {
      params.pass++;
      time = 0;
    }
  } else if (params.pass === 1) {
    animate.drawDotOnI();
    params.pass++;
  } else if (params.pass === 2) {
    if (!time) time = t;
    if (t - time > 500) {
      params.pass++;
      time = 0;
    }
  } else if (params.pass === 3) {
    // period.
    ctx.strokeStyle = params.DOT.color;
    ctx.beginPath();
    ctx.arc(
      params.DOT.offsetX,
      3 - 0.08 + params.DOT.offsetY,
      0.08,
      0,
      Math.PI * 2
    );
    ctx.stroke();
    params.pass++;
  } else if (params.pass === 4) {
    if (!time) time = t;
    if (t - time > 1000000000) {
      params.pass++;
      time = 0;
    }
  } else if (params.opacity >= 0) {
    canvas.style.opacity = params.opacity;
    if (params.opacity > 0.8) params.opacity -= 0.01;
    else if (params.opacity > 0.6) params.opacity -= 0.02;
    else params.opacity -= 0.03;
  } else if (params.pass === 5) {
    if (canvas.parentNode) {
      document.body.removeChild(canvas);
    }
    if (!time) time = t;
    if (t - time > 1000) {
      params.pass++;
      time = 0;
    }
  } else {
    app.style.display = "flex";
    params.pass++;
  }

  if (params.pass < 7) requestAnimationFrame(startAnimation);
}

function tracer({ points, x = 0, y = 0, color = "black" }) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(points.x[0], points.y[0]);
  for (let i = 0; i < points.x.length; i++) {
    ctx.lineTo(points.x[i + 1], points.y[i + 1]);
  }
  ctx.stroke();
  ctx.restore();
}
function blank(withI = false, withDot = false, ctx) {
  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(-50, -200, ctx.canvas.width, ctx.canvas.height);
  //J
  tracer({
    points: params.J.coords,
    color: params.J.color,
    x: params.J.offsetX,
    y: params.J.offsetY,
  });
  //A
  ctx.save();
  ctx.translate(params.A.offsetX, params.A.offsetY);
  ctx.strokeStyle = params.A.color;
  ctx.beginPath();
  ctx.ellipse(0.5, 2, 0.9, 1.1, Math.PI / 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  tracer({
    points: params.A.coords,
    color: params.A.color,
    x: params.A.offsetX,
    y: params.A.offsetY,
  });

  //S
  ctx.save();
  ctx.translate(params.S.offsetX, params.S.offsetY);
  ctx.strokeStyle = params.S.color;
  ctx.beginPath();
  ctx.arc(0.5 + 0.25, -1 + 0.25, 5 / 4, -Math.PI / 8, (-Math.PI * 3) / 2, 1);
  ctx.arc(0.5 + 0.25, 2 - 0.25, 5 / 4, -Math.PI / 2 + 0.1, (Math.PI / 8) * 7);
  ctx.stroke();
  ctx.restore();
  //O
  ctx.save();
  ctx.translate(params.O.offsetX, params.O.offsetY);
  ctx.strokeStyle = params.O.color;
  ctx.beginPath();
  ctx.arc(0.5, 2, 1, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();
  //N
  // ctx.save();
  // ctx.translate(params.N.offsetX, params.N.offsetY);
  // ctx.strokeStyle = params.N.color;
  // ctx.beginPath();
  // ctx.moveTo(-0.5, 1);
  // ctx.lineTo(-0.5, 3);
  // ctx.stroke();
  // ctx.restore();
  // tracer({
  //   points: params.N.coords,
  //   color: params.N.color,
  //   x: params.N.offsetX,
  //   y: params.N.offsetY,
  // });
  //N
  ctx.save();
  ctx.translate(params.N.offsetX, params.N.offsetY);
  ctx.strokeStyle = params.N.color;
  ctx.beginPath();
  ctx.moveTo(-0.5, 1);
  ctx.lineTo(-0.5, 3);
  ctx.moveTo(1.5, 2);
  ctx.lineTo(1.5, 3);
  ctx.stroke();
  ctx.beginPath();
  ctx.translate(0.5, 2);
  ctx.arc(0, 0, 1, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  // tracer({
  //   points: params.N.coords,
  //   color: params.N.color,
  //   x: params.N.offsetX,
  //   y: params.N.offsetY,
  // });
  //J
  tracer({
    points: params.J.coords,
    color: params.J2.color,
    x: params.J2.offsetX,
    y: params.J2.offsetY,
  });

  if (withI) {
    animate.rotateI(params.I, true);
    animate.drawDotOnI();
    // period.
    ctx.strokeStyle = params.DOT.color;
    ctx.beginPath();
    ctx.arc(
      params.DOT.offsetX,
      3 - 0.08 + params.DOT.offsetY,
      0.08,
      0,
      Math.PI * 2
    );
    ctx.stroke();
  }
  if (drawIt) drawBackLine();
}

function drawPointAt(x, y) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1 / 50;
  ctx.beginPath();
  ctx.moveTo(x, y - 1 / 100);
  ctx.lineTo(x, y + 1 / 100);
  ctx.stroke();
}
function drawBackLine() {
  ctx.save();
  ctx.strokeStyle = "grey";
  ctx.lineWidth = 1 / 100;
  ctx.beginPath();

  // draw Vertical lines
  for (let i = -10; i < 31; i += 1) {
    ctx.moveTo(i, -20);
    ctx.lineTo(i, 20);
    ctx.moveTo(i, -20);
    ctx.lineTo(i, 20);
    ctx.moveTo(i, -20);
    ctx.lineTo(i, 20);
    ctx.moveTo(i, -20);
    ctx.lineTo(i, 20);
    ctx.moveTo(i, -20);
    ctx.lineTo(i, 20);
    ctx.moveTo(i, -20);
    ctx.lineTo(i, 20);
  }
  for (let i = -10; i < 31; i += 0.5) {
    ctx.moveTo(i, -20);
    ctx.lineTo(i, 20);
  }

  // draw horizontal lines
  for (let i = -10; i < 50; i++) {
    ctx.moveTo(-50, i);
    ctx.lineTo(100, i);
  }
  ctx.moveTo(0, 3);
  ctx.lineTo(100, 3);
  ctx.stroke();
  ctx.restore();
}
if (drawIt) drawBackLine();

let w = document.body.clientWidth,
  h = document.body.clientHeight,
  time = 0;
let { ctx, canvas } = createCanvas(canvasBackgroundColor);

let jasonjiWidth = w >= h ? 0.5 : 0.95; // 50% of the width
let scale = (w * jasonjiWidth) / 21; //21 is a fixed length

//translate to the center
// ctx.translate((w - 21 * scale) / 2 + scale, (h - 5 * scale) / 2 + 2 * scale);
//translate to 1/3 point from the top
ctx.translate((w - 21 * scale) / 2 + scale, (h - 5 * scale) / 3 + 2 * scale);
ctx.scale(scale, scale);
ctx.lineWidth = 1 / ((scale * 2) / 5);

// var drawIt = 0;
var drawIt = 1;

if (drawIt) drawBackLine();
requestAnimationFrame(startAnimation);

// let canvas = document.getElementById("jasonji");
// let ctx = canvas.getContext("2d");

// let jasonjiWidth = canvas.width;
// let scale = jasonjiWidth / 21;
// ctx.translate(
//   scale + (jasonjiWidth - 21 * scale) / 2,
//   2 * scale + (canvas.height - 5 * scale) / 2
// );
// ctx.scale(scale, scale);
// ctx.lineWidth = 1 / ((scale * 2) / 5);
// canvas.style.backgroundColor = "beige";
// blank(true, true, ctx);
