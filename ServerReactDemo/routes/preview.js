const express = require('express');
const router = express.Router();

const { Preview } = require("../models/Preview");


router.post("/getVrmfiles", (req, res) => {

})


router.post("/uploadfiles", (req, res) => {

    const preview = new Preview(req.body);

    // file download
    

    preview.save((err, pre) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true ,
            url: req.body.url
        })
    })

});

module.exports = router;