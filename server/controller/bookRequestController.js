const mongoose = require('mongoose');
const customer = require('../model/bookRequestModels');
const bookRequestModels = require('../model/bookRequestModels');


//homepage
exports.homepage=async(req,res)=>{
    const bookMessages = await req.flash('info');
        
    const locals = {
            title: 'Requested books',
            description:'library Management System'
        }

        try {
            const bookrequests=await bookRequestModels.find({}).limit(23);
            res.render('bookRequest',{locals, bookMessages, bookrequests});
        } catch (error) {
            console.log(error);
            
        }
}
// new customer form
exports.bookRequests=async(req,res)=>{

    const locals = {
        title: 'Add New Member Issued Book',
        description:'Library Management System'
    }
    res.render('customer/requesterBook',locals);
}

//create new customer
exports.postRequestBook=async(req,res)=>{
    console.log(req.body);

    const newBooks = new bookRequestModels({
        title:req.body.title,
        requester:req.body.requester,
        bookReturned: false,
        requestedDate:req.body.requestedDate,
        returnedDate:req.body.returnedDate
    });

    const locals = {
        title: 'Added New Book Issued',
        description:'Library Management System'
    }

    try {
        await bookRequestModels.create(newBooks);

        await req.flash('info','New Book has been issued.')
        res.redirect('/bookRequest');
        
    } catch (error) {
        console.log(error);
        
    }
    
    
}
//view books 
exports.viewBooksRequest = async(req,res)=>{
    try {
        const customer = await bookRequestModels.findOne({ _id: req.params.id })
        
        const locals = {
            title:'View Issued Books Data',
            description: "Library management System",
        };
        res.render('customer/viewBookRequest',{
            locals,
            customer
        });
    } catch (error) {
        console.log(error);
        
    }
}

// edit book and return a book 
exports.editBooksRequest = async(req,res)=>{
    try {
        const customer = await bookRequestModels.findOne({ _id: req.params.id })
        
        const locals = {
            title:'Retrun Books ',
            description: "Library management System",
        };
        res.render('customer/editBookRequest',{
            locals,
            customer
        });
    } catch (error) {
        console.log(error);
        
    }
}

// Update customer data 

exports.editBooksPostRequest = async(req,res)=>{
    try {
        await bookRequestModels.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            requester: req.body.requester,
            bookReturned: true,
            returnedDate: req.body.returnedDate,
            updatedAt: Date.now()
        });

       await res.redirect(`/bookRequest/editBookRequest/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
}
 
