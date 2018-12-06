const mysql = require('mysql');


module.exports = app => {
  const connection = mysql.createConnection(app.config.mysql);

  connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('mysql connected as id: ' + connection.threadId);
  });

  connection.sql = ($sql) => {
    return new Promise((resolve, reject) => {
      connection.query($sql, (err, res) => {
        if (err) { reject(err); }
        resolve(res);
      });
    });
  };

  return connection;
}