const express = require('express');
const router = express.Router();
var multer = require('multer');

const { Preview } = require("../models/Preview");

var storage = multer.diskStorage({
    // ファイルの保存先を指定
    destination: function (req, file, cb) {
      cb(null, '../uploads/')
    },
    // ファイル名を指定(オリジナルのファイル名を指定)
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })


router.post("/getVrmfiles", (req, res) => {
    console.log("get vrm files")
})


router.post("/uploadfiles", upload.single("file"), (req, res) => {
    console.log("uploaded")
    console.log(req.file);

    let vrmurl = `http://localhost:5000/uploads/${req.file.filename}`

    let variables = {
        url: vrmurl
    }

    const preview = new Preview(variables);

    // file download


    preview.save((err, pre) => {
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({
            success: true ,
            url: vrmurl
        })
    })

});

module.exports = router;