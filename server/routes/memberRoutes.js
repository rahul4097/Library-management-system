const express = require('express');
const router= express.Router();
const libraryMemberController = require('../controller/libraryMemberController')

//home
router.get('/',libraryMemberController.homepage);
router.get('/about',libraryMemberController.about);

router.get('/add',libraryMemberController.addCustomer);
router.post('/add',libraryMemberController.postCustomer);

router.get('/view/:id',libraryMemberController.view);

router.get('/edit/:id',libraryMemberController.edit);
router.put('/edit/:id',libraryMemberController.editPost);
router.delete('/edit/:id',libraryMemberController.deleteCustomer);

router.post('/search',libraryMemberController.searchCustomer);



module.exports=router;