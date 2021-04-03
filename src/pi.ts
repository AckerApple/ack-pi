declare const require:any
let wpi

try {
  wpi = require('node-wiring-pi')
} catch (err) {
  console.warn('Could not load node-wiring-pi, trying wiringpi-node', err)
  try {
    wpi = require('wiringpi-node')
  } catch (err) {
    throw 'Cannot load node-wiring-pi nor wiringpi-node'
  }
}


import { pi as piFunc } from './pi-sample'

export function pi(){
  return piFunc( wpi )
}