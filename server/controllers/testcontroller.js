var express = require('express');// import express
var router = express.Router(); // created variable router accessed and use express variable to access Router() method
var sequelize = require('../db');
var TestModel = sequelize.import('../models/test')


// Test Route
router.get('/', function(req, res){
  res.send("test route")
})
//About Route
router.get('/about', function (req, res){
  res.send('About route')
})


//mycontacts
router.get('/mycontacts', function(req, res){
  res.send([{'user': "ken", "email": "bone@email.com"},
           {"user":"branden", "email": "roxi@email.com"}])
})

// Controller Method 
router.post('/one', function(req, res){
  res.send("test one")
})

//Perisiting Data
router.post('/two', function(req,res){
  let testData = "Test data for endpoint two"
  
  TestModel
  .create({
    testdata: testData 
  }).then( dataFromDataBase => {
    res.send("Test two went through")
  })
})

// req.body (add app.use(expess.json() middleware to use req.body))
router.post('/three', function(req, res){
  
  var testData = req.body.testdata.item;

  TestModel
  .create({
    testdata: testData
 })
 res.send("Test three went through")
 console.log('Test went through')
})

//crafting response
router.post('/four', function(req, res){
  var testData = req.body.testdata.item

  TestModel
  .create({
    testdata: testData
  })
  .then(
    function message() {
      res.send("Test 4")
    }
  );
});

//returning data in promise
router.post('/five', function(req, res){
  var testData = req.body.testdata.item;

  TestModel
  .create({
    testdata: testData
  })
  .then(
    function message(data){
    res.send(data)
    }
  );
});

//return response a json
router.post('/six', function(req,res){
  var testData = req.body.testdata.item

  TestModel.create({
    testdata: testData
  })
  .then(
    function message(testdata) {
      res.json({
        testdata: testdata
      });
    }
  );
});
// error handling
// router.post('/seven', function(req,res){
//   var testData = req.body.testdata.item;

//   TestModel
//   .create({
//     testdata: testData
//   })
//   .then(
//     function createSuccess(testdata) {
//       res.json({
//         testdata: testdata
//       })
//     },
//     function createError(err) {
//       res.send(500, err.message);
//     }
//   );
// });

//refactoring


module.exports = router;