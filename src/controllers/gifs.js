import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db/db';

const Gifs = {
  /**
   * Create A Gif
   * @param {object} req 
   * @param {object} res
   * @returns {object} gif object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      gifs(id, message, title, imageUrl, createdOn, modifiedOn)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      uuidv4(),
      req.body.message,
      req.body.title,
      req.body.imageUrl,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const rows = await db.query(text, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get All Gifs
   * @param {object} req 
   * @param {object} res 
   * @returns {object} gifs array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM Gifs';
    try {
      const rows = await db.query(findAllQuery);
      const rowCount = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get A gif
   * @param {object} req 
   * @param {object} res
   * @returns {object} gif object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM gif WHERE id = $1';
    try {
      const rows = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'gif not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Update A Gif
   * @param {object} req 
   * @param {object} res 
   * @returns {object} update gif
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM gifs WHERE id=$1';
    const updateOneQuery =`UPDATE gifs
      SET message=$1,title=$2,imageUrl=$3,modifiedOn=$4
      WHERE id=$5 returning *`;
    try {
      const rows = await db.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'gif not found'});
      }
      const values = [
        req.body.message || rows[0].message,
        req.body.title || rows[0].title,
        req.body.imageUrl || rows[0].imageUrl,
        moment(new Date()),
        req.params.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete A Gif
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM gifs WHERE id=$1 returning *';
    try {
      const rows = await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'gif not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Gifs;