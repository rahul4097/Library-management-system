const express = require('express');
const router= express.Router();
const bookManagementController = require('../controller/bookManagementController')

//home
router.get('/',bookManagementController.homepage);

router.get('/addBook',bookManagementController.addBooks);
router.post('/addBook',bookManagementController.postBooks);

router.get('/viewBook/:id',bookManagementController.viewBooks);

router.get('/editBook/:id',bookManagementController.editBooks);
router.put('/editBook/:id',bookManagementController.editBooksPost);
router.delete('/editBook/:id',bookManagementController.deleteBooks);

router.post('/search',bookManagementController.searchBook);



module.exports=router;