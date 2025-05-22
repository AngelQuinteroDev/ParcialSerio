const mysql = require('mysql2');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'Dulc3.8150eñ',
  database: 'mintransp'
};

class SqlConnection {
  constructor() {
    this.connection = null;
  }

  connectToDb() {
    if (this.connection) return Promise.resolve();

    this.connection = mysql.createConnection(config);

    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          this.connection = null;
          return reject(err);
        }
        console.log('Conexión exitosa a MySQL');
        resolve();
      });
    });
  }

  async query(sql, args) {
    if (!this.connection) {
      await this.connectToDb();
    }
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  closeConnection() {
    return new Promise((resolve, reject) => {
      if (!this.connection) return resolve();

      this.connection.end((err) => {
        if (err) return reject(err);
        this.connection = null;
        resolve();
      });
    });
  }
}

module.exports = new SqlConnection();
