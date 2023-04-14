const {pool} = require('../../config/db')
module.exports = class Role {
    static findAllRole() {
        const statement = {
          text: `select id, name from develop.role where name not in ('ADMIN') and enabled ='1'`,
        };
        return pool.query(statement);
      }
}
