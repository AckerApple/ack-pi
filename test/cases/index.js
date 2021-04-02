const api = require("../../dist")
const Pi = require("../../dist/pi-sample").Pi
const assert = require("assert")

describe("ack-pi",()=>{
  it("loads",()=>{
    assert.equal(typeof api.pi, "function")
  })

  it('#pi',()=>{
    const object = api.pi()
    assert.equal(object.constructor, Pi)
    const driver = object.driver
    assert.equal(driver && true, true)
    assert.equal(driver.wiringPiSetup && true, true)
    assert.equal(driver.pinMode && true, true)``
  })
})