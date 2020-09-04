//IMPORTING THE PACKAGES WE HAVE INSTALLED INTO OUR PROJECT
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');

/*
  Connecting the Mongoose Schema. This is the file which contains the collection information for the database.
*/
const Post = require('../models/Post');

// Express body parser - MIDDLEWARE
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}));

//For using Layouts=>Common parts of a website

//GET REQUEST ON HOMEPAGE -> CALLING LIST.EJS
router.get('/',async (req, res) => {   
    res.render('layout');
  //POSTS DATA ARE PASSED INTO THE LIST.EJS ON RUNTIME ASYNCHRONOUSLY
});



//POST REQUEST 
/* 
    The form which is filled up, dumps its data into the url below. The post request is made on this url, which posts the dumped data into the database.
*/
router.post('/posts/store', (req, res) => {

  //Recapcha Interface
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
        res.render('captcha',{message:"Captcha Verification Failed. Retry filling the form."});        
  }

  const secretKey = "6Ld5qccZAAAAAGScipF-I8i4oFPBoksXDc3_uhB-";

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) 
    {
      res.render('captcha',{message:"Captcha Verification Failed. Retry filling the form."});      
    }
  });


  console.log(req.body)
  Post.create(req.body, (error, post) => {
      res.render('captcha',{message:"We have received your application. You will be contacted soon."})
  })
});




//For exporting these settings. VERY IMPORTANT LINE. PEOPLE TEND TO MISS IT. Program wont run without this line.
module.exports = router;