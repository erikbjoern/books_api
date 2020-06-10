const app = require("../app");
const supertest = require("supertest");
// const expect = require("chai").expect;
const { factory, expect } = require("./test_helpers");
const jsonResponse = require("./jsonResponse");

let server, request, response;

before((done) => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after((done) => {
  server.close(done);
});

beforeEach(async () => {
  await factory.createMany("Book", 2, [
    { id: 1, title: "Nice book" },
    { id: 2, title: "Fine book" },
  ]);
});

afterEach(async () => {
  await factory.cleanUp()
})

describe("GET /api/v1/books", () => {
  beforeEach(async () => {
    response = await request.get("/api/v1/books");
  });

  it("responds with status 200", () => {
    expect(response.status).to.equal(200);
  });

  it("responds with a collection of books", () => {
    const expectedBody = {
      books: [
        { id: 1, title: "Nice book" },
        { id: 2, title: "Fine book" },
      ],
    };
    expect(jsonResponse(response)).to.equal(JSON.stringify(expectedBody));
  });
});
