const model = require("../models/taskModel.js");


module.exports.createNewTask = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined || req.body.points == undefined)//check for missing value
    {
        res.status(400).send("Error");
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            const insertedData = {
                task_id: results.insertId, 
                title: data.title,
                description: data.description,
                points: data.points
                
            };

            res.status(201).json(insertedData);
        }
    }

    model.insertSingle(data, callback);
}



module.exports.readAllTask = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPlayer:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}


module.exports.readTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayerById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

module.exports.updateTaskById = (req, res, next) =>
{
    if(req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) //check for missing value
    {
        res.status(400).json({
            message: "Error: name or level is undefined"
        });
        return;
    }

    const data = {
        task_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatetaskById:", error);
            res.status(500).json(error);
        } else {
            if(req.params.id == undefined) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else {
                const insertedData = {
                    task_id: data.task_id, 
                    title: data.title,
                    description: data.description,
                    points: data.points
                    
                };
    
                res.status(200).json(insertedData);
            }
        }
    }

    model.updateById(data, callback);
}



module.exports.deleteTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(204).send();         
        }
    }

    model.deleteById(data, callback);
}

module.exports.addPoints = (req, res, next) => {
    const data = {
        taskId: req.body.taskid,
        user_id: req.body.user_id
    };
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error adding points:", error);
            res.status(500).json(error);
        } else {
            console.log("Points added successfully");
            res.status(200).json({ message: "Points added successfully" });
        }
    };

    model.addpoints(data, callback);
};
