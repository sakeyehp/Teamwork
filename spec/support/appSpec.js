const request = require('supertest');
const app = require('../../app.js');


describe('sever', () => {
  // eslint-disable-next-line no-unused-vars
  const server = app.listen();
  afterAll(() => {
    server.close();
  });
});

describe('POST /auth/create-user', () => {
  const url = "/api/v2/auth/create-user";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 201", () => {
    request(server).post(url, (response) => {
      expect(response.statusCode).toBe(201);
    });
  });
  it("body", () => {
    request(server).post(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          message: response.body.message,
          articleId: response.body.articleId,
          createdOn: response.body.createdOn,
          articleTitle: response.body.articleTitle
        }
      });
    });
  });
});
describe('POST /auth/signin', () => {
  const url = "/api/v2/auth/signin";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 200", () => {
    request(server).post(url, (response) => {
      expect(response.statusCode).toBe(200);
    });
  });
  it("should have response spec json", () => {
    request(server).post(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          token: response.body.token,
          userId: response.body.userid
        }
      });
    });
  });
});

describe('POST /gifs', () => {
  const url = "/api/v2/gifs";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 201", () => {
    request(server).post(url, (response) => {
      expect(response.statusCode).toBe(201);
    });
  });
  it("should have response spec", () => {
    request(server).post(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          gifId: response.body.gifId,
          message: response.body.message,
          createdOn: response.body.createdOn,
          title: response.body.title,
          imageUrl: response.body.imageUrl
        }
      });
    });
  });
});

describe('POST /articles', () => {
  const url = "/api/v2/articles";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 201", () => {
    request(server).post(url, (response) => {
      expect(response.statusCode).toBe(201);
    });
  });
  it("should have response spec", () => {
    request(server).post(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          message: response.body.message,
          articleId: response.body.articleId,
          createdOn: response.body.createdOn,
          articleTitle: response.body.articleTitle
        }
      });
    });
  });
});

describe('PATCh /articles/:id', () => {
  const url = "/api/v2/articles/:id";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 201", () => {
    request(server).patch(url, (error, response) => {
      expect(response.statusCode).toBe(201);
    });
  });
  it("should have response spec", () => {
    request(server).patch(url, (error, response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          massage: response.body.message,
          articleTitle: response.body.articleTitle,
          articleBody: response.body.articleBody
        }
      });
    });
  });
});

describe('DELETE /articles/:id', () => {
  const url = "/api/v2/articles/:id";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 200", () => {
    request(server).delete(url, (response) => {
      expect(response.statusCode).toBe(200);
    });
  });
  it("should have response spec", () => {
    request(server).patch(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          message: response.body.message,
        }
      });
    });
  });
});
describe('DELETE /gifs/:id', () => {
  const url = "/api/v2/gifs/:id";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 200", () => {
    request(server).delete(url, (response) => {
      expect(response.statusCode).toBe(200);
    });
  });
  it("should have response spec", () => {
    request(server).patch(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          message: response.body.message,
        }
      });
    });
  });
});
describe('POST /articles/:id/comment', () => {
  const url = "/api/v2/articles/:id/comment";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 201", () => {
    request(server).delete(url, (response) => {
      expect(response.statusCode).toBe(201);
    });
  });
  it("should have response spec", () => {
    request(server).patch(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          message: response.body.message,
          createdOn: response.body.createdOn,
          articleTitle: response.body.articleTitle,
          articleBody: response.body.articleBody,
          comment: response.body.comment
        }
      });
    });
  });
});
describe('POST /gifss/:id/comment', () => {
  const url = "/api/v2/gifs/:id/comment";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 201", () => {
    request(server).delete(url, (response) => {
      expect(response.statusCode).toBe(201);
    });
  });
  it("should have response spec", () => {
    request(server).patch(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          message: response.body.message,
          createdOn: response.body.createdOn,
          gifTitle: response.body.gifTitle,
          comment: response.body.comment
        }
      });
    });
  });
});
describe('GET /feed', () => {
  const url = "/api/v2/feed";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 200", () => {
    request(server).delete(url, (response) => {
      expect(response.statusCode).toBe(200);
    });
  });
  it("should have response spec", () => {
    request(server).patch(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: [response.body.data]
      });
    });
  });
});
describe('GET /articles/:id', () => {
  const url = "/api/v2/articles/:id";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 200", () => {
    request(server).delete(url, (response) => {
      expect(response.statusCode).toBe(200);
    });
  });
  it("should have response spec", () => {
    request(server).patch(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          id: response.body.id,
          createdOn: response.body.createdon,
          title: response.body.title,
          article: response.body.article,
          comments: [
            response.body.comment
          ]
        }
      });
    });
  });
});
describe('GET /gifs/:id', () => {
  const url = "/api/v2/gifs/:id";
  const server = app.listen();
  afterAll(() => {
    server.close();
  });

  it("should return status 200", () => {
    request(server).delete(url, (response) => {
      expect(response.statusCode).toBe(200);
    });
  });
  it("should have response spec", () => {
    request(server).patch(url, (response) => {
      expect(response.body).toEqual({
        status: response.body.status,
        data: {
          id: response.body.id,
          createdOn: response.body.createdon,
          title: response.body.title,
          url: response.body.url,
          comments: [
            response.body.comment
          ]
        }
      });
    });
  });
});