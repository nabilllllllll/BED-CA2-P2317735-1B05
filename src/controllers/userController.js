const model = require("../models/userModel.js");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware.js");
const jwtMiddleware = require("../middlewares/jwtMiddleware.js");

module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}

module.exports.readUserById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error readUserById", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0)
            {
                res.status(404).json({
                    message: "User not found"
                });
            } else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

module.exports.createNewUser = (req, res, next) =>
{
    if(req.body.username == undefined)
    {
        res.status(400).send("Error: username is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }
    
    model.insertSingle(data, callback);
}

module.exports.updateUserById = (req, res, next) =>
{
    if(req.body.username == undefined || req.body.email == undefined || req.body.password == undefined)
    {
        res.status(400).json({
            message: "Error: Username, Email or Password undefined"
        });
        return;
    }

    const data = {
        id: req.params.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0)
        {
            res.status(404).json({
                message: "User not found"
            });
        }
        else res.status(204).json(results[0]);
        }
    }

    model.updateById(data, callback);
}

module.exports.deleteUserById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0)
            {
                res.status(400).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); 
        }
    }

    model.deleteById(data, callback);
}
module.exports.register = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;

    if (req.body.email == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.status(400).send("Error: username, email or password is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    model.checkUniqueCredentials(email, username, (error, notUniqueCredentials) => {
        if (error) {
            console.error ("Username or Email not found:", error);
            res.status(500).json({
                message: "Internal Server Error."
            })
        } else if (notUniqueCredentials) {
            res.status(409).json({
                message: "Username or email already exists"
            });
        } else {
            const callback = (error, results, fields) => {
                if (error) {
                    console.error("Error register:", error);
                    res.status(500).json(error);
                } else {
                    res.status(200).json({
                        "message": `User ${req.body.username} created successfully.`
                    })
                }
            }

            model.registerUser(data, res, callback);
        }
    });
}

module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).json({
            message: "Username or Password undefined"
        });
    }

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        console.log(results);
        if (error) {
            console.log("Error login", error);
            res.status(500).json(error);
        } else {
            if (!results) {
                res.status(404).json({
                    message: "User not found"
                })
            } else 
            jwtMiddleware.generateToken(req, res, next)
         
           
        }
    }

    model.loginCheck(data, req, res, next, callback);
}

module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;

    if (username === undefined || email === undefined) {
        res.status(400).json({
            message: "Error: Username or email is undefined",
        });
        return;
    }

    model.checkUniqueCredentials(email, username, (error, notUniqueCredentials) => {
        if (error) {
            console.error("Error checking username or email:", error);
            res.status(500).json({
                message: "Internal Server Error.",
            });
        } else {
            next();
        }
    });
};

module.exports.getusername = async (req, res, next) => {
    const userId = res.locals.userId;

    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error readUserById", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else res.status(200).json(results[0]);
        }
    };

    // Assuming `model` is your user model that has a method like `selectById`
    // You might need to adjust this part according to your actual model and method
    model.username({ id: userId }, callback);
};
