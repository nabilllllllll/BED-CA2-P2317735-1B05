const model = require("../models/taskProgressModel.js");



module.exports.createNewProgress = (req, res, next) =>
{
    if(req.body.user_id == undefined || req.body.user_id == undefined)
    {
        res.status(400).send("Error: task_id or user_id is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            const insertedData = {
                progress_id: results.insertId,
                user_id: data.user_id,
                task_id: data.task_id, 
                compltetion_date: data.completion_date,
            };

            res.status(201).json(insertedData);
        }
    }

    model.insertSingle(data, callback);
}


module.exports.readProgressById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "progress id not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}


// module.exports.updateProgressById = (req, res, next) =>
// {
//     if(req.body.notes == undefined)
//     {
//         res.status(400).json({
//             message: "Error: notes is undefined"
//         });
//         return;
//     }

//     const data = {
//         id: req.params.id,
//         notes: req.body.notes
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error updateNotesById:", error);
//             res.status(500).json(error);
//         } else {
//             if(results.affectedRows == 0) 
//             {
//                 res.status(404).json({
//                     message: "Notes not found"
//                 });
//             }
//             else {
//                 const updatedData = {
//                     progress_id: data.id,
//                     user_id: results[0].user_id,
//                     task_id: results[0].task_id, // gets data from the result itself
//                     completion_date: results[0].completion_date,
//                     notes: data.notes
//                 };

//                 res.status(200).json(updatedData);
//             }
//         }
//     }

//     model.updateById(data, callback);
// }

module.exports.readAllProgress = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllcompletedtask:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

module.exports.deleteProgressById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteProgressById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Progress not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}