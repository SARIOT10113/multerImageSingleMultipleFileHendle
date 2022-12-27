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
        callBack(null,'./multipleFileUpload');
    },
    filename: (req,file,callBack)=> {
       
        console.log("save file ==>",file)
        callBack(null,file.originalname)
    }
   
});

const upload=multer({storage}).array('myfile',3) // input multiple image


app.post('/multipleFileUpload', (req,res)=> {
    upload(req,res, (error)=> {
            if(error){
                res.send("File Upload Fail")
            }
            else{
                res.send("File Upload Success")
            }
    });
});
const PORT =  5000;
app.listen(PORT,()=>{
    console.log(`Multiple file server is runing at http://localhost:${PORT}`)
})