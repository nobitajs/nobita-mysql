module.exports = app => {
  if (app.config.mysql) {
    const mysql = require('./lib/nobita-mysql');
    mysql(app);
  }
}