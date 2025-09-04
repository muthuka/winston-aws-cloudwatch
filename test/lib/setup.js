const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')

chai.use(chaiAsPromised)
chai.use(sinonChai.default || sinonChai)

global.expect = chai.expect
global.sinon = sinon
