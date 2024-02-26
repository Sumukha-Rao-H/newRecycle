const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')

app.use(express.static('./public'))

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,'Images')
    },
    filename: (req,file,cb) => {
        console.log(file)
        cb(null, Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({storage})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public','homepage.html'));
});
app.get("/page1", (req, res) => {
    res.sendFile(path.join(__dirname, 'public','page1.html'));
});
app.get("/page2", (req, res) => {
    res.sendFile(path.join(__dirname, 'public','page2.html'));
});
app.get("/page3", (req, res) => {
    res.sendFile(path.join(__dirname, 'public','page3.html'));
});

app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname,'public ', 'upload.html'));
});

app.post("/upload", upload.single("image"), (req,res) =>{
    res.send("uploaded")
})

const port = 5000
app.listen(port, () =>{
    console.log(`Server running on port ${port} . . .`)
})