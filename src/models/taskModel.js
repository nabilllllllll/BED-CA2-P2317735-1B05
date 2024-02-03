const pool = require('../services/db');


module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.title, data.description, data.points];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task;
    `;

pool.query(SQLSTATMENT, callback);  
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM task
    WHERE task_id = ?;
    `;
const VALUES = [data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Task 
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?;
    `;
const VALUES = [data.title, data.description, data.points, data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);
}



module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Task
    WHERE task_id = ?;
    ALTER TABLE Task AUTO_INCREMENT = 1;
    `;
const VALUES = [data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.addpoints = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE User 
    SET points = points + (SELECT points FROM Task where task_id = ?)
    WHERE user_id = ?;
    `

const VALUES = [data.taskId, data.user_id];
pool.query(SQLSTATMENT, VALUES, callback);
}