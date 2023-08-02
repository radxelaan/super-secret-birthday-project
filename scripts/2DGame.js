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
bodies = []

function equation(x) {
  return h - (eval(eq) * h/100 + h / 2)
}

let ball = Matter.Bodies.circle(700,100,20)

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
 
bodies.push(ball)
bodies.push(xAxis)
bodies.push(yAxis)

Matter.World.add(engine.world, bodies)

Matter.Runner.run(engine)
Matter.Render.run(render)

document.querySelector('#submit').addEventListener("click", function () {
  eq = `(${document.querySelector('#equation').value})`
  const points = []
  x.forEach(point => {
    points.push(Matter.Bodies.rectangle(point + w / 2, equation((point + 5) / 10 ), 1, 1,{ 
      isStatic: true,
      render: {
        strokeStyle: 'blue'
      } 
    }))
  })
  console.log(points)
  Matter.World.add(engine.world, points)
})