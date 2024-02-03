const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO TaskProgress (user_id, task_id, completion_date)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.user_id, data.task_id, data.completion_date];

pool.query(SQLSTATMENT, VALUES, callback);
}




module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}


// module.exports.updateById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     UPDATE TaskProgress 
//     SET notes = ?
//     WHERE progress_id = ?;
//     `;
// const VALUES = [data.notes, data.id];

// pool.query(SQLSTATMENT, VALUES, (error, results, fields) => {
//     if (error) {
//         callback(error, null, fields);
//     } else {
//         const fetchSQL = `
//             SELECT progress_id, user_id, task_id, completion_date, notes
//             FROM TaskProgress
//             WHERE progress_id = ?;
//         `;
//         const fetchValues = [data.id];
 
//         pool.query(fetchSQL, fetchValues, callback);// just to get the expected outcome
//     }
// });
// }
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM taskprogress;
    `;

pool.query(SQLSTATMENT, callback);  
}

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM TaskProgress
    WHERE progress_id = ?;
    ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}