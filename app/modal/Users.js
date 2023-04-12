const {pool} = require('../../config/db')
module.exports = class Users {
    static register(input_json) {
        const statement = {
          text: `call develop.users($1, $2)`,
          values: [input_json,'{}'],
        };
        return pool.query(statement);
      }
}
