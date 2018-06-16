/*
All Outputs use this file to turn off when app over.

Prevents light from staying on
*/

import * as events from 'events'

export const emitter = new events()

process.once('SIGINT', ()=>{
  emitter.emit('exit')
  process.exit()
})
