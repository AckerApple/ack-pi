import { Pi } from "./pi-sample"

declare const require:any

function foo():Pi{
  return require('./pi-sample').pi()
}

function live():Pi{
  return require('./pi').pi()
}

export function pi( liveMode:boolean ):Pi{
  return liveMode ? live() : foo()
}

export { op, OrdinalProcessor } from "./OrdinalProcessor"
export * from "./types"