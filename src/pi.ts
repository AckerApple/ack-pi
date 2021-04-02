declare const require:any
let wpi

try {
  wpi = require('node-wiring-pi')
} catch (err) {
  wpi = require('wiringpi-node')
  try {
  } catch (err) {
    throw err
  }
}


import { pi as piFunc } from './pi-sample'

export function pi(){
  return piFunc( wpi )
}