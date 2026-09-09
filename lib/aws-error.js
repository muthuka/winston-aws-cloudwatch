function isAwsError (err, type) {
  return err != null && (err.name === type || err.code === type)
}

module.exports = isAwsError
