import { hello } from './index'

describe('greeter function', () => {
  it('greets a user with `Hello, {name}` message', () => {
    const result = hello()

    expect(result).toBe(`hello`)
  })
})
