const app = require("../app");
const supertest = require("supertest");
const expect = require("chai").expect;

let server, request, response;

before((done) => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after((done) => {
  server.close(done);
});

