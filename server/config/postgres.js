const { Pool } = require('pg');

module.exports = (app) => {
 
  return new Pool({
    host: app.get('PG_HOST'),
    users: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 2000
  });
};
