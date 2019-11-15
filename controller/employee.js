const jwt = require('jsonwebtoken');
const pool = require('../services/dbconfig');
const cloudinary = require('../services/cloudinary_config');
const { dataUri } = require('../middleware/multer');

exports.createGifs = (req, res) => {
  const image = dataUri(req).content;
  const { title } = req.body;
  const createdOn = new Date();
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'AM-HAPPY');
  const { userId } = decodedToken;
  cloudinary.upload(image).then((gif) => {
    const imageUrl = gif.secure_url;
    pool.query('INSERT INTO gifstb(title, imageurl, createdon, authorid)VALUES($1,$2,$3,$4) RETURNING gifid As id', [title, imageUrl, createdOn, userId]).then((results) => {
      res.status(201).json({
        status: "success",
        data: {
          gifId: results.rows[0].id,
          message: "GIF image successfully posted",
          createdOn,
          title,
          imageUrl
        }
      });
    }).catch(() => {
      res.status(400).json({
        status: "error",
        error: "Gif was not saved successfully"
      });
    });
  }).catch(() => {
    res.status(400).json({
      status: "error",
      error: "cloudinary connection failed"
    });
  });
};
exports.createArticle = (req, res) => {
  const { title, article } = req.body;
  const dateCreated = new Date();
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'AM-HAPPY');
  const { userId } = decodedToken;
  pool.query('INSERT INTO articletb(article_title,article_body, date_created, authorid)VALUES($1,$2,$3,$4)RETURNING article_id As id',
    [title, article, dateCreated, userId]).then((data) => {
    res.status(201).json({
      status: "success",
      data: {
        message: "article successfully posted",
        articleId: data.rows[0].id,
        createdOn: dateCreated,
        title,
        authorId: userId
      }
    });
  }).catch(() => {
    res.status(400).json({
      status: "error",
      error: "there is a problem posting your article"
    });
  });
};
exports.editArticle = (req, res) => {
  const { title, article } = req.body;
  const id = req.params.articleId;
  const dateModified = new Date();
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'AM-HAPPY');
  const { userId } = decodedToken;
  pool.query('SELECT authorid FROM articletb WHERE article_id = $1', [id]).then((data) => {
    if (data.rows[0].authorid == userId) {
      pool.query('UPDATE articletb SET article_title=$1, article_body=$2, date_modified = $3 WHERE article_id=$4', [title, article, dateModified, id])
        .then(() => {
          res.status(201).json({
            status: "success",
            data: {
              massage: "article successfully updated",
              title,
              article
            }
          });
        }).catch(() => {
          res.status(400).json({
            status: "error",
            error: "Unable to edit article we are working to fix it..try again later"
          });
        });
    } else {
      res.status(400).json({
        status: "error",
        error: "You can't update this article. Maybe you are not the author"
      });
    }
  }).catch(() => {
    res.status(400).json({
      status: "error",
      error: "article does not exist"
    });
  });
};
exports.deleteArticle = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'AM-HAPPY');
  const { userId } = decodedToken;
  pool.query('SELECT authorid FROM articletb WHERE article_id = $1', [id]).then((data) => {
    if (data.rows[0].authorid == userId) {
      pool.query('DELETE FROM articletb WHERE article_id =$1', [id]).then(() => {
        res.status(200).json({
          status: 'success',
          data: {
            message: "Article Successfully deleted"
          }
        });
      }).catch(() => {
        res.status(400).json({
          status: "error",
          error: "Article unable to delete"
        });
      });
    } else {
      res.status(400).json({
        status: "error",
        error: "You can't delete this article. Maybe you are not the author"
      });
    }
  }).catch(() => {
    res.status(400).json({
      status: "error",
      error: "article does not exist"
    });
  });
};
exports.deleteGif = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'AM-HAPPY');
  const { userId } = decodedToken;
  pool.query('SELECT authorid FROM gifstb WHERE gifid = $1', [id]).then((data) => {
    if (data.rows[0].authorid == userId) {
      pool.query('DELETE FROM gifstb WHERE gifId = $1', [id]).then(() => {
        res.status(200).json({
          status: "success",
          data: {
            message: "gif post successfully deleted"
          }
        });
      }).catch(() => {
        res.status(400).json({
          Error: "gif post was not deleted"
        });
      });
    } else {
      res.status(400).json({
        status: "error",
        error: "You can't delete this gif. Maybe you are not the author"
      });
    }
  }).catch(() => {
    res.status(400).json({
      status: "error",
      error: "gif does not exist"
    });
  });
};
exports.createCommentArticle = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const createdOn = new Date();

  pool.query('SELECT * FROM articletb WHERE article_id = $1', [id]).then((data) => {
    const articleId = data.rows[0].article_id;
    const articleTitle = data.rows[0].article_title;
    const articleBody = data.rows[0].article_body;
    pool.query('INSERT INTO commenttb(commentId, comment, createdOn)VALUES($1,$2,$3)', [articleId, comment, createdOn]).then(() => {
      res.status(201).json({
        status: "success",
        data: {
          message: "Comment successfully created",
          createdOn,
          articleTitle,
          articleBody,
          comment
        }
      });
    }).catch(() => {
      res.status(400).json({
        Error: " comment not created"
      });
    });
  }).catch(() => {
    res.status(400).json({
      Error: "Failed to select article id"
    });
  });
};
exports.gifCreateComment = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const createdOn = new Date();

  pool.query('SELECT * FROM gifstb WHERE gifid = $1', [id]).then((data) => {
    // eslint-disable-next-line radix
    const gifsId = data.rows[0].gifid;
    const gifTitle = data.rows[0].title;
    pool.query('INSERT INTO gifcommenttb(commentId, comment, createdOn)VALUES($1,$2,$3)', [gifsId, comment, createdOn]).then(() => {
      res.status(201).json({
        status: "success",
        data: {
          message: "Comment successfully created",
          createdOn,
          gifTitle,
          comment
        }
      });
    }).catch(() => {
      res.status(400).json({
        Error: " comment not created"
      });
    });
  }).catch(() => {
    res.status(400).json({
      Error: "Failed to select gif id"
    });
  });
};
exports.newsFeed = (req, res) => {
  pool.query('SELECT * FROM gifstb ORDER BY gifid DESC').then((data) => {
    pool.query('SELECT * FROM articletb ORDER BY article_id DESC').then((result) => {
      res.status(200).json({
        status: "success",
        data: [data.rows, result.rows]

      });
    }).catch(() => {
      res.status(400).json({
        Error: "unable to display articles"
      });
    });
  }).catch(() => {
    res.status(400).json({
      Error: " Unable to display gifs"
    });
  });
};
exports.viewArticle = (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM articletb WHERE article_id = $1', [id]).then((data) => {
    pool.query(`SELECT * FROM commenttb where ${data.rows[0].article_id} = commentid`).then((result) => {
      res.status(200).json({
        status: 'success',
        data: {
          id: data.rows[0].article_id,
          createdOn: data.rows[0].createdon,
          title: data.rows[0].article_title,
          article: data.rows[0].article_body,
          comments: [
            result.rows
          ]
        }

      });
    }).catch(() => {
      res.status(400).json({
        message: "unable to return comments"
      });
    });
  }).catch(() => {
    res.status(400).json({
      message: "unable to return article"
    });
  });
};
exports.viewgif = (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM gifstb WHERE gifid = $1', [id]).then((data) => {
    pool.query(`SELECT * FROM gifcommenttb where ${data.rows[0].gifid} = commentid`).then((result) => {
      res.status(200).json({
        status: 'success',
        data: {
          id: data.rows[0].gifid,
          createdOn: data.rows[0].createdon,
          title: data.rows[0].title,
          url: data.rows[0].imageurl,
          comments: [
            result.rows
          ]
        }

      });
    }).catch(() => {
      res.status(400).json({
        Error: "Gifcomments was not selected successfully"
      });
    });
  }).catch(() => {
    res.status(400).json({
      Error: "gifs are not selected from the database"
    });
  });
};