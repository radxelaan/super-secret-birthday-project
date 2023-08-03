h = window.innerHeight - 40
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
const colors = ['#20bda8', '#8b20bd', '#8b20bd', '#bd3520', '#b8bd20', '#38bd20', '#bd208e', '#4520bd']

function equation(x, eq) {
  try {
    return eval(eq); 
} catch (e) {}
  
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
  for (let i = 1; i < x.length; i++){
    const x1 = x[i-1] + w / 2
    const x2 = x[i] + w / 2
    const y1 = h - equation(x[i-1]/scale_factor, eq)*scale_factor - h / 2
    const y2 = h - equation(x[i]/scale_factor, eq)*scale_factor - h / 2
    const c = Math.floor(Math.random() * colors.length)
    const point = Matter.Bodies.rectangle(x1, y1, Math.sqrt((x2-x1)**2 + (y2-y1)**2), 1,{ 
      isStatic: true,
      render: {
        fillStyle: 'blue',
        strokeStyle: 'blue'
      } 
    })
    Matter.Body.rotate(point, Math.atan((y2-y1)/(x2-x1)))

    p.push(point)
  }
  lines.push(p)
  return p
}

function parseEquation (str) {
  let equation = str.toLowerCase()
  equation = equation.replace('sin', 'Math.sin')
  equation = equation.replace('cos', 'Math.cos')
  equation = equation.replace('arctan', 'Math.atan')
  equation = equation.replace('tan', 'Math.tan')
  equation = equation.replace('math', 'Math')
  equation = equation.replace('pi', 'Math.PI')
  equation = equation.replace('^', '**')
  return equation
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
 
bodies.push(platform)
bodies.push(xAxis)
bodies.push(yAxis)
bodies.push(ball)

Matter.World.add(engine.world, bodies)

Matter.Runner.run(engine)
Matter.Render.run(render)

document.querySelector('#submit').addEventListener("click", function () {
  eq = `(${parseEquation(document.querySelector('#equation').value)})`
  equations.push(eq)
  lines.push(plot(eq))
  Matter.World.add(engine.world, lines[lines.length - 1])
  Matter.World.remove(engine.world, platform)
})