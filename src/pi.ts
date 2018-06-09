declare const require:any
const wpi = require('wiringpi-node')

import { pi as piFunc } from './pi-sample'

export function pi(){
  return piFunc( wpi )
}