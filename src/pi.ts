declare const require:any
let wpi

try {
  wpi = require('node-wiring-pi')
} catch (err) {
  wpi = require('wiringpi-node')
  try {
  } catch (err) {
    throw 'Cannot load node-wiring-pi nor wiringpi-node'
  }
}


import { pi as piFunc } from './pi-sample'

export function pi(){
  return piFunc( wpi )
}