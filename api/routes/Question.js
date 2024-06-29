const express = require("express");
const router = express.Router();

const questionDB = require("../models/Question");


router.post("/", async (req, res) => {
    // console.log(req.body);
    try {
        await questionDB.create({
            questionName: req.body.questionName,
            questionUrl: req.body.questionUrl,
            user: req.body.user,
        }).then(() => {
            res.status(201).send({
                status: true,
                message: "Question added successfully"
            })
        }).catch((err) => {
            res.status(400).send({
                status: false,
                message: "Bad request"

            })
        })
    } catch (e) {
        res.status(500).send({
            status: false,
            message: "error while adding question"
        })
    }
})

router.get("/", async (req, res) => {
    try {
        await questionDB.aggregate([
            {
                $lookup: {
                    from: "answers",  // Collection to join
                    localField: "_id", //field from input document
                    foreignField: "questionId",
                    as: "allAnswers", //output array field
                }
            }
        ]).exec().then((doc) => {
            res.status(200).send(doc);
        }).catch((e) => {
            res.status(500).send({
                status: false,
                message: "Unable to get the Question Details"
            })
        })
    } catch (e) {
        res.status(500).send({
            status: false,
            message: "unexpexted Error"
        })
    }
})

router.put("/like", (req, res) => {
    // console.log("hi",req.body)
    questionDB.findByIdAndUpdate(req.body.pos._id, {
        $push: { like: req.body.user.uid }
    },
        {
            new: true
        },(err, result) => {
            if (err) {
                return res.status(422).json(err);
            } else {
                res.json(result);
                console.log(result+"1")
            }
        })

})

router.put("/unlike", (req, res) => {
    // console.log(req.body.user.uid)
    console.log(req.body.pos._id)
    questionDB.findByIdAndUpdate(req.body.pos._id, {
        $pull: { like: req.body.user.uid }
    },
        {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json(err);
            } else {
                res.json(result);
                console.log(result+"2")
            }
        })
})

module.exports = router;