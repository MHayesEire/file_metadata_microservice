//FCC API Basejump: File Metadata Microservice
'use strict';
var ejs = require('ejs');

var express = require('express');

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var fs = require('fs');

var app = express();

app.set('view engine', 'ejs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use('/', express.static(process.cwd() + '/')); 
      
var port = process.env.PORT || 8080; 

app.get('/uploads', function(req, res) {
    
    var tagline = "File Query information: ";
    
    res.render('pages/uploads', {
        file2: "", 
        "error": "File not correct, please check again!",
        tagline: tagline
   });
    
});

app.get('/', function(req, res) {
    //res.sendFile(process.cwd() + '/index.html');
    
var tagline = "File Query information: ";

var qTermObj = {};

    qTermObj = { 
        file2: "",
         "error": "File not correct, please check again!" 
       }; 
       
      // res.send(qTermObj); 
       
        res.render('pages/index', {
        file2: "",
        "error": "File not correct, please check again!",
        tagline: tagline
    });
    
});

app.post('/uploads', upload.single('file1'), function (req, res, next) {
    console.log("File " + req);
    if(req.file != undefined)
    {
   console.log("File loaded: " + req.file.filename);
    var file2 = req.file.size;
    console.log("size: " + file2);
    var tagline = "File Query information: ";

    var qTermObj = {};
if (file2 != 0) { 
    
       qTermObj = {"file2": file2}; 
     
      res.send(qTermObj); 
      
      /* res.render('pages/uploads', {
        file2: file2, 
        "error": "",
        tagline: tagline
    }); */
    
    
    fs.unlink('uploads/' + req.file.filename, function() {
	    console.log("Removed file: " + req.file.filename + ".");
    });
    
    
       
     } else { 
       qTermObj = { 
           file2: "error",
         "error": "File not correct, please check again!" 
       }; 
      // res.send(qTermObj); 
       
    
     } 
    }
 else{
         res.render('pages/uploads', {
        file2: "", 
        "error": "File not correct, please check again!",
        tagline: tagline
   });
 }
 
});

app.listen(port,  function () 
{
	
console.log('Node.js ... HERE ... listening on port ' + port + '...');

});