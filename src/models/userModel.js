const { errorMonitor } = require('supertest/lib/test');
const pool = require('../services/db');
const bcrypt = require("bcrypt");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User;
    `;

    pool.query(SQLSTATEMENT, callback);
}
// This is to check if it is working
/* module.exports.selectAll ((err, result)=>{
    console.log(result);
})*/
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?,?,?);
    `;
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET username = ?, email = ?, password = ?, points = ?
    WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.email, data.password, data.points, data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM User
    WHERE user_id = ?;
    
    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.registerUser = (data, res, callback) => {
    bcrypt.hash(data.password, 10, (hashError, hashedPassword) => {
        if (hashError) {
            console.error("Error hashing password:", hashError);
            return callback(hashError, null);
        }

        // Set the hashed password in res.locals.hash
        res.locals.hash = hashedPassword;

        const SQLSTATEMENT = `
            INSERT INTO User (username, email, password)
            VALUES (?,?,?);
        `;
        const VALUES = [data.username, data.email, hashedPassword];

        pool.query(SQLSTATEMENT, VALUES, callback);
    });
};


module.exports.checkUniqueCredentials = (email, username, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE email = ? AND username = ?;
    `;
    const VALUES = [email, username];

    pool.query(SQLSTATEMENT, VALUES, (error, results, fields) => {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results[0] || null);
        }
    })
}

module.exports.loginCheck = (data, req, res, next, callback) => {
    const SQLSTATEMENT = `
        SELECT * FROM User
        WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATEMENT, VALUES, (error, results, fields) => {
        if (error) {
            callback(error, null);
        } else {
            if (results.length == 0) {
                callback(null, false); // This means no user found
            } else {
                const user = results[0]; // All row will be in here, including username & passwords from DB
                const hashedPasswordInDB = user.password;
                console.log("hashed", hashedPasswordInDB);

                bcrypt.compare(data.password, hashedPasswordInDB, (bcryptError, isMatch) => {
                    if (bcryptError) {
                        callback(bcryptError, null);
                    } else {
                        if (isMatch) {
                            // Set the hashed password in res.locals.hash
                            res.locals.hash = hashedPasswordInDB;
                            res.locals.userid = user.user_id
                            console.log("Ml", res.locals.userid)
                            // Use jwtMiddleware to generate and send token
                            jwtMiddleware.generateToken(req, res, next);
                        } else {
                            callback(null, false); // Passwords do not match
                        }
                    }
                });
            }
        }
    });
};

module.exports.username = (callback) => {
    const SQLSTATEMENT = `
    SELECT username FROM user WHERE user_id=?;
    `;
    pool.query(SQLSTATEMENT, callback);
}