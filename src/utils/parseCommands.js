const randomColor = () => '#' + Math.random().toString(16).slice(-6)

const createRect = args => {
  if (args.length !== 4) return 'Rectangle requires 4 parameters.'
  if (args.reduce((a, c) => a || isNaN(c), false)) return 'At least one of the parameters is not a valid number.'
  const values = args.map(v => parseInt(v))
  return {
    component: "SvgRect",
    fill: randomColor(),
    x: values[0],
    y: values[1],
    width: values[2],
    height: values[3]
  }
} 

const createCircle = args => {
  if (args.length !== 3) return 'Circle requires 3 parameters.'
  if (args.reduce((a, c) => a || isNaN(c), false)) return 'At least one of the parameters is not a valid number.'
  const values = args.map(v => parseInt(v))
  return {
    component: "SvgCircle",
    fill: randomColor(),
    cx: values[0],
    cy: values[1],
    r: values[2],
  }
}

const createPolygon = args => {
  if (args.length < 3) return 'Polygon requires at least 3 parameters.'
  if (args.reduce((a, c) => a || !/\d+,\d+/.test(c), false)) return 'At least one of the parameters is not a valid number.'
  return {
    component: "SvgPolygon",
    fill: randomColor(),
    points: args.join(' ')
  }
}

const parseCommand = line => {
  const tokens = line.trim().split(/\s+/)
  switch (tokens[0].toLowerCase()) {
    case 'r': return createRect(tokens.slice(1))
    case 'c': return createCircle(tokens.slice(1))
    case 'p': return createPolygon(tokens.slice(1))
    case '': return ''
    default: return 'Command is invalid.'
  }
}

export default parseCommand