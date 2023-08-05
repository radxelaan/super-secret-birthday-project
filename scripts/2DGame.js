h = window.innerHeight - 60
w = window.innerWidth - 20
engine = Matter.Engine.create()
render = Matter.Render.create({
  element: document.body,
  engine:engine,
  options: {
      height: h,
      width: w
  }
})
render.options.wireframes = false
detector = Matter.Detector.create()
eq = ''
x = Array.from(Array(w).keys())
x = x.map(point => { return point -= w / 2 })
y = Array.from(Array(h).keys())
y = y.map(point => { return point -= h / 2 })
let bodies = []
let scale_factor = 70
let sampling_rate = 4
let points = []
let lines = []
let equations = []
let level = 0
let ball
let platform
let goal
let movement = false
let grounded = false



function loadLevel(lvl) {
  lines.forEach(line => {
    Matter.World.remove(engine.world, line)
  })
  bodies.forEach(body => {
    Matter.World.remove(engine.world, body)
  })
  switch (lvl) {
    case 0:
      equations = []
      movement = false
      ball = createBall(100, 100) 
      ball.isStatic = true
      platform = Matter.Bodies.rectangle(100, 125, 50, 5, { isStatic: true })
      goal = Matter.Bodies.circle(1100, 500, 15, { isStatic: true, render: { fillStyle: 'red' } })
      bodies = [ball, platform, goal]
      Matter.World.add(engine.world,bodies)
      break;
    case 1:
      equations = []
      movement = false
      ball = createBall(100, h/2) 
      ball.isStatic = true
      platform = Matter.Bodies.rectangle(100, h/2 + 25, 50, 5, { isStatic: true })
      goal = Matter.Bodies.circle(1100, h/2, 15, { isStatic: true, render: { fillStyle: 'red' } })
      barrier = Matter.Bodies.rectangle(w/2, h/2, 350, 350, { isStatic: true })
      bodies = [ball, platform, goal, barrier]
      Matter.World.add(engine.world,bodies)
      break;
    case 2:
      equations = []
      movement = false
      ball = createBall(100, 550)
      platform = Matter.Bodies.rectangle(100, 550 + 25, 50, 5, { isStatic: true })
      goal = Matter.Bodies.circle(1300, 550, 15, { isStatic: true, render: { fillStyle: 'red' } })
      barrier1 = Matter.Bodies.rectangle(550, h, 200, 700, { isStatic: true })
      barrier2 = Matter.Bodies.rectangle(950, 0, 200, 700, { isStatic: true })
      bodies = [ball, platform, goal, barrier1, barrier2]
      Matter.World.add(engine.world,bodies)

  }

}

function equation(x, eq) {
  try {
    return eval(eq); 
} catch (e) {
  console.log(eq)
}
  
}

function scaleLinesX(){
  let scaleLines = []
  x.forEach(point => {
    if (!(Math.round(point) % scale_factor)) {
      const l = Matter.Bodies.rectangle(point + w/2, h / 2, 1, 10, { isStatic: true })
      l.collisionFilter = {
        'group': -1,
        'category': 2,
        'mask': 0,
        }
      scaleLines.push(l)
    }
  })
  return scaleLines
}

function scaleLinesY(){
  let scaleLines = []
  x.forEach(point => {
    if (!(Math.round(point) % scale_factor)) {
      const l = Matter.Bodies.rectangle(w / 2, point + h / 2, 10, 1, { isStatic: true })
      l.collisionFilter = {
        'group': -1,
        'category': 2,
        'mask': 0,
        }
      scaleLines.push(l)
    }
  })
  return scaleLines
}

function plot(eq) {
  const p = []
  for (let i = Math.round((eq.minX*scale_factor) + w/2 + sampling_rate); i < (eq.maxX*scale_factor) + w/2; i += sampling_rate){
    const x1 = x[i-sampling_rate] + w / 2
    const x2 = x[i] + w / 2
    const y1 = h - equation(x[i-sampling_rate]/scale_factor, eq.equation)*scale_factor - h / 2
    const y2 = h - equation(x[i]/scale_factor, eq.equation)*scale_factor - h / 2
    const point = Matter.Bodies.rectangle(x1, y1, Math.sqrt((x2-x1)**2 + (y2-y1)**2), 1,{ 
      isStatic: true,
      render: {
        fillStyle: 'blue',
        strokeStyle: 'blue'
      } 
    })
    point.friction = 0.1
    Matter.Body.rotate(point, Math.atan((y2-y1)/(x2-x1)))
    p.push(point)
  }
  return p
}

function rerender() {
  Matter.World.remove(engine.world, linesX)
  Matter.World.remove(engine.world, linesY)
  lines.forEach(line => {
    Matter.World.remove(engine.world, line)
  })
  linesX = scaleLinesX()
  linesY = scaleLinesY()
  lines = []
  equations.forEach(equation => {
    lines.push(plot(equation))
  })
  Matter.World.add(engine.world, linesX)
  Matter.World.add(engine.world, linesY)
  lines.forEach(line => {
    Matter.World.add(engine.world, line)
  })
}

function parseEquation (str) {
  let equation = str.toLowerCase()
  equation = equation.replaceAll('sin', 'Math.sin')
  equation = equation.replaceAll('cos', 'Math.cos')
  equation = equation.replaceAll('arctan', 'Math.atan')
  equation = equation.replaceAll('math', 'Math')
  equation = equation.replaceAll('pi', 'Math.PI')
  equation = equation.replaceAll('^', '**')
  return equation
}

function createBall(x, y) {
  let ball = Matter.Bodies.circle(x, y, 25,{
    density: 0.001,
    friction: 0.7,
    frictionStatic: 0,
    frictionAir: 0.005,
    restitution: 0.1,
    collisionFilter:{
      category: 1,
      group: 1,
      mask: 1
    },
    render:{
      sprite:{
        texture: 'images/hamsterMike.png',
        xScale: 0.15,
        yScale: 0.15
      }
    },
  })
  ball.collisionFilter.group = -1
  return ball
}

function playerGroundCheck(event, ground) { 
  const pairs = event.pairs
  for (let i = 0, j = pairs.length; i != j; ++i) {
    let pair = pairs[i];
    if (pair.bodyA === ball) {
      grounded = ground;
    } else if (pair.bodyB === ball) {
      grounded = ground;
    }
  }
}



const xAxis = Matter.Bodies.rectangle(w / 2, h / 2, h, 1, { isStatic: true })
xAxis.collisionFilter = {
'group': -1,
'category': 2,
'mask': 0,
}
Matter.Body.rotate(xAxis, Math.PI/2)

const yAxis = Matter.Bodies.rectangle(w / 2, h / 2, w, 1, { isStatic: true })
yAxis.collisionFilter = {
'group': -1,
'category': 2,
'mask': 0,
}

let linesX = scaleLinesX()
Matter.World.add(engine.world, linesX)

let linesY = scaleLinesY()
Matter.World.add(engine.world, linesY)

document.querySelector('#zoom').addEventListener("click", function () {
  scale_factor+=2
  rerender()
})
 
document.querySelector('#unzoom').addEventListener("click", function () {
  scale_factor-=2
  rerender()
})


Matter.World.add(engine.world, [xAxis, yAxis])
loadLevel(level)
Matter.Runner.run(engine)
Matter.Render.run(render)

Matter.Events.on(engine, 'afterUpdate', function(){
  if (ball.position.x > w + 30|| ball.position.y > h + 30|| ball.position.x < - 30|| ball.position.y < -30) loadLevel(level)
  if (Matter.Collision.collides(ball, goal) != null){
    loadLevel(++level)
  }
})

document.querySelector('#submit').addEventListener("click", function () {
  const input = parseEquation(document.querySelector('#equation').value)
  if (!equations.some(eq => eq.equation === input)){
    const eq = {
      equation: input,
      minX: document.querySelector('#minX').value  ? document.querySelector('#minX').value : - w / scale_factor,
      maxX: document.querySelector('#maxX').value  ? document.querySelector('#maxX').value : w / scale_factor,
    }
    equations.push(eq)
    lines.push(plot(eq))
    Matter.World.add(engine.world, lines[lines.length - 1])
  }
})

document.querySelector('#start').addEventListener("click", function () {
  Matter.World.remove(engine.world, platform)
  ball.isStatic = false
  movement = true
})

document.querySelector('#clear').addEventListener("click", function () {
  lines.forEach(line => {
    Matter.World.remove(engine.world, line)
  })
  lines = []
  equations = []
})

document.querySelector('#undo').addEventListener("click", function () {
  if(lines.length){
    Matter.World.remove(engine.world, lines.pop())
    equations.pop()
  }
})

const keyHandlers = {
  KeyD: () => {
    Matter.Body.applyForce(ball, {
      x: ball.position.x,
      y: ball.position.y
    }, {x: 0.0015, y: 0})
  },
  KeyA: () => {
    Matter.Body.applyForce(ball, {
      x: ball.position.x,
      y: ball.position.y
    }, {x: -0.0015, y: 0})
  },
  Space: () => {
    Matter.Body.applyForce(ball, {
      x: ball.position.x,
      y: ball.position.y
    }, {x: 0, y: -0.05})
  }
}

const keysDown = new Set();
document.addEventListener("keydown", event => {
  if (event.code !== 'Space' || grounded) keysDown.add(event.code);
});
document.addEventListener("keyup", event => {
  keysDown.delete(event.code)
});

Matter.Events.on(engine, "beforeUpdate", event => {
  [...keysDown].forEach(k => {
    if (movement) keyHandlers[k]?.()
    if (k === 'Space') keysDown.delete(k)
  })
})

Matter.Events.on(engine, "collisionStart", function(event) {
  playerGroundCheck(event, true)
})

Matter.Events.on(engine, "collisionActive", function(event) {
  playerGroundCheck(event, true)
})

Matter.Events.on(engine, 'collisionEnd', function(event) {
  playerGroundCheck(event, false);
})

