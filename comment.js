//create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const { auth } = require('../middleware/auth');

//=================================
//             Comment
//=================================

router.post('/saveComment', auth, (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err });
        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({ success: true, result });
            })
    })
});

router.post('/getComments', (req, res) => {
    Comment.find({ 'postId': req.body.videoId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, comments });
        })
});

router.post('/deleteComment', auth, (req, res) => {
    Comment.findOneAndDelete({ '_id': req.body.commentId, 'writer': req.body.userId })
        .exec((err, result) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, result });
        })
});

router.post('/updateComment', auth, (req, res) => {
    Comment.findOneAndUpdate({ '_id': req.body.commentId, 'writer': req.body.userId }, { 'content': req.body.content })
        .exec((err, result) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, result });
        })
});

module.exports = router;