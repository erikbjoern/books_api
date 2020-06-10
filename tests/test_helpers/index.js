const factoryGirl = require('factory-girl')
const adapter = new factoryGirl.SequelizeAdapter()
const factory = factoryGirl.factory
const chai = require("chai");
const expect = chai.expect;
const sinonChai = require("sinon-chai")
const chaiSubset = require("chai-subset")

chai.use(sinonChai)
chai.use(chaiSubset)

factory.setAdapter(adapter)
factory.cleanUp()
factory.factories = []

const Models = require("../../models");

require('../factories')(factory, Models)

beforeEach((done) => {
  Models.sequelize.sync({ force: true })
    .then(() => {
      done();
  });
});

module.exports = { factory, Models, expect };
