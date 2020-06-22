const app = require("../app");
const supertest = require("supertest");
const { factory, expect } = require("./test_helpers");
const jsonResponse = require("./jsonResponse");

let server, request, response, token;

before((done) => {
  server = app.listen(done);
  request = supertest.agent(server);
});

after((done) => {
  server.close(done);
});

beforeEach(async () => {
  const Author = await factory.create("Author",
    { id: 1, name: "Erik", email: "erik@mail.com", password: "password" }
  );
  
  await factory.createMany("Book", 2, [
    { id: 1, title: "Nice book", authorId: Author.id },
    { id: 2, title: "Fine book", authorId: Author.id },
  ]);
});

afterEach(async () => {
  await factory.cleanUp()
})

describe("GET /api/v1/books", () => {
  describe.only("for non-authenticated users", () => {
    beforeEach(async () => {
      response = await request.get("/api/v1/books")
    });

    it("should respond with 401", () => {
      expect(response.status).to.equal(401)
    })
  })

  describe("for authenticated users", () => {
    beforeEach(async () => {
      await request
        .post("/api/v1/auth/login")
        .send({ name: "Erik" })
        .then((response) => {
          token = response.body.token
        })

      response = await request
        .get("/api/v1/books")
        .set("Authentication", token);
    });
    
    it("responds with status 200", () => {
      expect(response.status).to.equal(200);
    });
    
    it("responds with a collection of books", () => {
      const expectedBody = {
        books: [
          { id: 1, title: "Nice book", author: { name: "Erik" } },
          { id: 2, title: "Fine book", author: { name: "Erik" } },
        ],
      };
      expect(jsonResponse(response)).to.equal(JSON.stringify(expectedBody));
    });
  })
});
