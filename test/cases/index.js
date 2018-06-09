const api = require("../../dist")
const Pi = require("../../dist/pi-sample").Pi
const assert = require("assert")

describe("ack-pi",()=>{
  it("loads",()=>{
    assert.equal(typeof api.pi, "function")
  })

  it('#pi',()=>{
    assert.equal(api.pi().constructor, Pi)
  })
})