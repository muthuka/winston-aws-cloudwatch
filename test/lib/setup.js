const chai = require("chai");
const chaiAsPromised = require("chai-as-promised").default;
const sinonChai = require("sinon-chai").default;
const sinon = require("sinon");

chai.use(chaiAsPromised);
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;
