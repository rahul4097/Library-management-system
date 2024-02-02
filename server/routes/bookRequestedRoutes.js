const express = require('express');
const router= express.Router();
const bookRequestController = require('../controller/bookRequestController')

//home
router.get('/',bookRequestController.homepage);

// router.get('/addBook',bookManagementController.addBooks);
// router.post('/addBook',bookManagementController.postBooks);

router.get('/viewBookRequest/:id',bookRequestController.viewBooksRequest);

router.get('/editBookRequest/:id',bookRequestController.editBooksRequest);
router.put('/editBookRequest/:id',bookRequestController.editBooksPostRequest);


// router.delete('/editBook/:id',bookManagementController.deleteBooks);

router.get('/requesterBook',bookRequestController.bookRequests);
router.post('/requesterBook',bookRequestController.postRequestBook)

// router.post('/search',bookRequestController.searchBook);



module.exports=router;