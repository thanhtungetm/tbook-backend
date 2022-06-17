const { con } = require('../config/db')
const querySql = async (q) => new Promise(
    (resolve, reject) => {
        const handler = (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        }
        con.query(q, handler);
    });

module.exports = querySql