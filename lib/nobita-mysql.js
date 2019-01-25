module.exports = app => {
  if (app.config.mysql) {
    let { option = {}, host, database, user, password, tables = {} } = app.config.mysql;
    option.dialect = 'mysql';
    option.logging = app.config.env == 'local';
    option.host = host;
    const sequelize = new app.Sequelize(database, user, password, option);
    let mysql = {};

    for (const table in tables) {
      mysql[table] = sequelize.define(table, tables[table], { freezeTableName: true });
    }

    sequelize.sync();
    app.mysql = app.context.mysql = mysql;
  }

}