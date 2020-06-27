const randomColor = () => '#' + Math.random().toString(16).slice(-6)

const createRect = args => {
  if (args.length !== 4) return 'Rectangle requires 4 parameters.'
  if (args.reduce((a, c) => a || isNaN(c), false)) return 'At least one of the parameters is not a valid number.'
  const values = args.map(v => parseInt(v))
  return {
    component: "SvgRect",
    x: values[0],
    y: values[1],
    width: values[2],
    height: values[3],
    fill: randomColor(),
  }
} 

const createCircle = args => {
  if (args.length !== 3) return 'Circle requires 3 parameters.'
  if (args.reduce((a, c) => a || isNaN(c), false)) return 'At least one of the parameters is not a valid number.'
  const values = args.map(v => parseInt(v))
  return {
    component: "SvgCircle",
    cx: values[0],
    cy: values[1],
    r: values[2],
    fill: randomColor(),
  }
}

const createPolygon = args => {
  if (args.length < 3) return 'Polygon requires at least 3 parameters.'
  if (args.reduce((a, c) => a || !/\d+,\d+/.test(c), false)) return 'At least one of the parameters is not a valid number.'
  return {
    component: "SvgPolygon",
    points: args.join(' '),
    fill: randomColor(),
  }
}

const parseCommand = line => {
  const tokens = line.trim().split(/\s+/)
  const args = tokens.slice(1)
  switch (tokens[0].toLowerCase()) {
    case 'r': return createRect(args)
    case 'c': return createCircle(args)
    case 'p': return createPolygon(args)
    case '': return ''
    default: return 'Command is invalid.'
  }
}

export default parseCommand