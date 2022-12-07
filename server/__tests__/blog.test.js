const app = require("../app");
const request = require("supertest");
const { User, Comment, Blog, sequelize } = require("../models");
const { payloadToToken } = require("../helper/secure");
const { queryInterface } = sequelize;

jest.setTimeout(1000)

let validToken, validToken2, userId

let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb25hdGhhbkBtYWlsLmNvbSIsInVzZXJuYW1lIjoiSm9uYXRoYW4iLCJpYXQiOjE2NzA0MjA1NzAsImV4cCI6MTY3MDQyMDYzMH0.aNfJ-JYjZyhCRtx8cOpLRCTse9oHkwOTa-BLf32jHwE"

let blog = {
  "title": "ini title",
  "description": "ini desc",
  image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
}

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


describe("GET /blogs", () => {
  test("200 success get blog", (done) => {
    request(app)
      .get("/blogs")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(Array.isArray(body.rows)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("200 success get blog with search feature", (done) => {
    request(app)
      .get("/blogs?title='asd'")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(Array.isArray(body.rows)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("200 success get blog with search feature", (done) => {
    request(app)
      .get("/blogs?page=2")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("count", expect.any(Number));
        expect(Array.isArray(body.rows)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /blogs", () => {
  describe("Create new blog", () => {
    test("201 Success create new blog - should create new blog", (done) => {
      request(app)
        .post(`/blogs`)
        .set('Content-type', 'application/json')
        .set("token", validToken)
        .send(blog)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toHaveProperty("count", expect.any(Number));
          return done();
        });
    });
    test("400 bad request when add blogs", (done) => {
      request(app)
        .post(`/blogs`)
        .set('Content-type', 'application/json')
        .set("token", validToken)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          return done();
        });
    });
  });
});

describe("PUT /blogs", () => {
  test("200 Success update blog", (done) => {
    request(app)
      .put(`/blogs/1`)
      .set('Content-type', 'application/json')
      .set("token", validToken)
      .send(blog)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200)
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("createdAt")
        expect(body[0]).toHaveProperty("description")
        expect(body[0]).toHaveProperty("id")
        expect(body[0]).toHaveProperty("image")
        expect(body[0]).toHaveProperty("title")
        expect(body[0]).toHaveProperty("updatedAt")
        expect(body[0]).toHaveProperty("userId")
        return done();
      });
  });
  test("403 failed when update blog due to unauthorized", (done) => {
    request(app)
      .put(`/blogs/1`)
      .set('Content-type', 'application/json')
      .set("token", validToken2)
      .send(blog)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(403)
        return done();
      });
  });
  test("403 failed due to need login", (done) => {
    request(app)
      .put(`/blogs/1`)
      .set('Content-type', 'application/json')
      .send(blog)
      .end((err, res) => {
        if (err) return done(err);
        const { status } = res;
        expect(status).toBe(401)
        return done();
      });
  });
  test("400 failed when update blog", (done) => {
    request(app)
      .put(`/blogs/1`)
      .set('Content-type', 'application/json')
      .set("token", validToken)
      .send({
        "title": null,
        "description": null,
        image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
      }
      )
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400)
        expect(body).toHaveProperty("message", expect.any(Array))
        return done();
      });
  });
  test("404 blog not found", (done) => {
    request(app)
      .put(`/blogs/1000`)
      .set('Content-type', 'application/json')
      .set("token", validToken)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "blog not found");
        return done();
      });
  });
});

describe("Delete /blogs", () => {
  test("200 Success delete blog", (done) => {
    request(app)
      .delete(`/blogs/1`)
      .set('Content-type', 'application/json')
      .set("token", validToken)
      .send(blog)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200)
        expect(body).toBe("Delete successfully")
        return done();
      });
  });
  test("404 failed delete due to blog not found", (done) => {
    request(app)
      .delete(`/blogs/100000`)
      .set('Content-type', 'application/json')
      .set("token", validToken)
      .send(blog)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(404)
        expect(body).toHaveProperty("message", "blog not found");
        return done();
      });
  });

});

describe("GET /blogs/:id", () => {
  test("200 success get blog by id", (done) => {
    request(app)
      .get("/blogs/2")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("createdAt")
        expect(body).toHaveProperty("description")
        expect(body).toHaveProperty("id")
        expect(body).toHaveProperty("image")
        expect(body).toHaveProperty("title")
        expect(body).toHaveProperty("updatedAt")
        expect(body).toHaveProperty("userId")
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("404 failed when get blog by id", (done) => {
    request(app)
      .get("/blogs/20000")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "blog not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});