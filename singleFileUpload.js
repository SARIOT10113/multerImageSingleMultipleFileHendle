// Single file upload using DiskStorage engine (multer.single)
const express = require('express');
const app = express();
const helmet = require('helmet');
const multer = require('multer');

app.use(helmet())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const storage=multer.diskStorage({
    destination: (req,file,callBack)=> {
        console.log("file location ==>",file)
        callBack(null,'./singleFileUpload');
    },
    filename: (req,file,callBack)=> {
       
        console.log("save file ==>",file)
        callBack(null,file.originalname)
    }
});

const upload=multer({storage}).single('myfile') // input single image 

app.post('/singleFile', (req,res)=> {
    upload(req,res, (error)=> {
            if(error){
                res.send("Single File Upload Fail")
            }
            else{
                res.send("Single File Upload Success")
            }
    });
});
const PORT =  5000;
app.listen(PORT,()=>{
    console.log(`Single file server is runing at http://localhost:${PORT}`)
})