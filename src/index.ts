
declare const require:any

function foo(){
  return require('./pi-sample').pi()
}

function live(){
  return require('./pi').pi()
}

export function pi( liveMode:boolean ){
  return liveMode ? live() : foo()
}