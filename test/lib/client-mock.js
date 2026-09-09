class MockClient {
  constructor (failures = []) {
    this._submitted = []
    this._failures = failures.slice()
  }

  submit (batch) {
    if (this._failures.length === 0) {
      this._submitted = this._submitted.concat(batch)
      return Promise.resolve()
    } else {
      const name = this._failures.shift()
      const error = new Error(name)
      error.name = name
      return Promise.reject(error)
    }
  }

  get submitted () {
    return this._submitted
  }
}

module.exports = MockClient
