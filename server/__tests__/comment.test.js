const app = require("../app");
const request = require("supertest");
const { User, Comment, Blog, sequelize } = require("../models");
const { payloadToToken } = require("../helper/secure");
const { queryInterface } = sequelize;

jest.setTimeout(1000)

let validToken, validToken2, userId, invalidToken

const comment = { "text": "sample text" }

const userTest1 = {
  email: "user.test1@mail.com",
  username: "UserTest1",
  password: "usertest1",
};

const userTest2 = {
  email: "user.test2@mail.com",
  username: "UserTest2",
  password: "usertest2",
};

beforeAll((done) => {
  User.create(userTest1)
    .then((registeredUser) => {
      userId = registeredUser.id
      validToken = payloadToToken({
        id: registeredUser.id,
        email: registeredUser.email,
        username: registeredUser.username
      })

      invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxMDAsImlhdCI6MTYyMjYwOTY1MX0.WvYFlI7rEqdFPuebYJeHtpjerBcE_c-WDMdXkoynKKY";
      return User.create(userTest2);
    })
    .then((registeredUser2) => {
      validToken2 = payloadToToken({
        id: registeredUser2.id,
        email: registeredUser2.email,
      });
      return queryInterface.bulkInsert('Blogs',
        [
          {
            title: "Intro Vue",
            description: "Arnold Therigan",
            userId: userId,
            image: "https://docs.vuejs.id/images/logo.png",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "REST API",
            description: "Edison",
            userId: userId,
            image: "https://billwerk.io/wp-content/uploads/sites/2/2019/05/icons-restapi-350x350.png",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "JQuery & Bootstrap",
            description: "Rifki Fauzi",
            userId: userId,
            image: "https://www.kindpng.com/picc/m/445-4450455_css-logo-jquery-html-css-and-jquery-hd.png",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Vue Component",
            description: "Samuel Aditia",
            userId: userId,
            image: "https://docs.vuejs.id/images/logo.png",
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {}
      );
    })
    .then(() => {
      return queryInterface.bulkInsert('Comments', [
        {
          text: "text",
          blogId: 1,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date()
        }

      ])
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll(done => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(_ => {
      return Comment.destroy({ truncate: true, cascade: true, restartIdentity: true })
    })
    .then(_ => {
      return Blog.destroy({ truncate: true, cascade: true, restartIdentity: true })
    })
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("GET /comments/:blogId", () => {
  test("200 success get list comment by blog id", (done) => {
    request(app)
      .get("/comments/1")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body[0]).toHaveProperty("createdAt")
        expect(body[0]).toHaveProperty("id")
        expect(body[0]).toHaveProperty("blogId")
        expect(body[0]).toHaveProperty("text")
        expect(body[0]).toHaveProperty("updatedAt")
        expect(body[0]).toHaveProperty("userId")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
describe("Post /comments", () => {
  test("200 success add a new comment", (done) => {
    request(app)
      .post("/comments/1")
      .set('Content-type', 'application/json')
      .set("token", validToken)
      .send(comment)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("createdAt")
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("blogId")
        expect(body).toHaveProperty("text")
        expect(body).toHaveProperty("updatedAt")
        expect(body).toHaveProperty("userId")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("400 bad request when add a new comment", (done) => {
    request(app)
      .post("/comments/1")
      .set('Content-type', 'application/json')
      .set("token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message")

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Delete /comments/:id", () => {
  test("200 success delete a comment", (done) => {
    request(app)
      .delete("/comments/1")
      .set('Content-type', 'application/json')
      .set("token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toBe("delete successfully")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("403 failed update a comment due to unauthorized", (done) => {
    request(app)
      .delete("/comments/2")
      .set('Content-type', 'application/json')
      .set("token", validToken2)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "USER UNAUTHORIZED")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("404 comment not found", (done) => {
    request(app)
      .delete("/comments/1000000")
      .set('Content-type', 'application/json')
      .set("token", validToken)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
