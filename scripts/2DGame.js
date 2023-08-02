h = window.innerHeight
w = window.innerWidth
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
eq = ''
x = Array.from(Array(w).keys())
x = x.map(point => { return point -= w / 2 })
y = Array.from(Array(h).keys())
y = y.map(point => { return point -= h / 2 })
bodies = []
let scale_factor = 70
let points = []
let lines = []
const equations = []

function equation(x, eq) {
  return eval(eq)
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
  x.forEach(point => {
    p.push(Matter.Bodies.rectangle(point + w / 2, h - equation(point/scale_factor, eq)*scale_factor - h/2, 1, 1,{ 
      isStatic: true,
      render: {
        strokeStyle: 'blue'
      } 
    }))
  })
  lines.push(p)
  return p
}

let ball = Matter.Bodies.circle(100,100,20)
let platform = Matter.Bodies.rectangle(100, 120, 50, 5, { isStatic: true })

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
  Matter.World.remove(engine.world, linesX)
  Matter.World.remove(engine.world, linesY)
  lines.forEach(line => {
    Matter.World.remove(engine.world, line)
  })
  console.log(lines)
  scale_factor+=1
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
})
 
bodies.push(ball)
bodies.push(platform)
bodies.push(xAxis)
bodies.push(yAxis)

Matter.World.add(engine.world, bodies)

Matter.Runner.run(engine)
Matter.Render.run(render)

document.querySelector('#submit').addEventListener("click", function () {
  eq = `(${document.querySelector('#equation').value})`
  equations.push(eq)
  lines.push(plot(eq))
  Matter.World.add(engine.world, lines[lines.length - 1])
  Matter.World.remove(engine.world, platform)
})