const {
  ResourceAlreadyExistsException,
  InvalidSequenceTokenException,
  DataAlreadyAcceptedException
} = require('@aws-sdk/client-cloudwatch-logs')
const isAwsError = require('../../lib/aws-error')

describe('isAwsError', () => {
  it('matches AWS SDK v3 exceptions by name', () => {
    const err = new ResourceAlreadyExistsException({
      message: 'exists',
      $metadata: {}
    })
    expect(err.code).to.equal(undefined)
    expect(isAwsError(err, 'ResourceAlreadyExistsException')).to.equal(true)
    expect(isAwsError(err, 'InvalidSequenceTokenException')).to.equal(false)
  })

  it('matches InvalidSequenceTokenException and DataAlreadyAcceptedException', () => {
    const sequenceErr = new InvalidSequenceTokenException({
      message: 'token',
      $metadata: {}
    })
    const acceptedErr = new DataAlreadyAcceptedException({
      message: 'accepted',
      $metadata: {}
    })
    expect(isAwsError(sequenceErr, 'InvalidSequenceTokenException')).to.equal(
      true
    )
    expect(isAwsError(acceptedErr, 'DataAlreadyAcceptedException')).to.equal(
      true
    )
  })

  it('matches AWS SDK v2-style errors by code', () => {
    const err = new Error('exists')
    err.code = 'ResourceAlreadyExistsException'
    expect(isAwsError(err, 'ResourceAlreadyExistsException')).to.equal(true)
  })

  it('returns false for nullish values', () => {
    expect(isAwsError(null, 'ResourceAlreadyExistsException')).to.equal(false)
    expect(isAwsError(undefined, 'ResourceAlreadyExistsException')).to.equal(
      false
    )
  })
})
