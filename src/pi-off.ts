/*
All Outputs use this file to turn off when app over.

Prevents light from staying on
*/

import { Subject } from 'rxjs'
export const emitter = new Subject()

process.once('SIGINT', ()=>{
  emitter.next()
  // emitter.emit('exit')
  process.exit()
})
