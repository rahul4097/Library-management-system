const bookModels = require('../model/bookModels');
const customer = require('../model/bookModels');
const mongoose = require('mongoose');


//homepage
exports.homepage=async(req,res)=>{
    const bookMessages = await req.flash('info');
        
    const locals = {
            title: 'Library books',
            description:'library Management System'
        }

        try {
            const books=await bookModels.find({}).limit(23);
            res.render('book',{locals, bookMessages, books});
        } catch (error) {
            console.log(error);
            
        }
}


// new customer form
exports.addBooks=async(req,res)=>{

    const locals = {
        title: 'Add New Books',
        description:'Library Management System'
    }
    res.render('customer/addbook',locals);
}

//create new customer
exports.postBooks=async(req,res)=>{
    console.log(req.body);

    const newBooks = new bookModels({
        title:req.body.title,
        authorname:req.body.authorname,
        details:req.body.details,
        price:req.body.price,
        category:req.body.category
    });

    const locals = {
        title: 'Added New Book',
        description:'Library Management System'
    }

    try {
        await bookModels.create(newBooks);

        await req.flash('info','New Book has been added.')
        res.redirect('/book');
        
    } catch (error) {
        console.log(error);
        
    }
    
    
}
//customer data
exports.viewBooks = async(req,res)=>{
    try {
        const customer = await bookModels.findOne({ _id: req.params.id })
        
        const locals = {
            title:'View Books Data',
            description: "Library management System",
        };
        res.render('customer/viewBook',{
            locals,
            customer
        });
    } catch (error) {
        console.log(error);
        
    }
}

//edit data
exports.editBooks = async(req,res)=>{
    try {
        const customer = await bookModels.findOne({ _id: req.params.id })
        
        const locals = {
            title:'Edit Books Data',
            description: "Library management System",
        };
        res.render('customer/editBook',{
            locals,
            customer
        });
    } catch (error) {
        console.log(error);
        
    }
}

// Update customer data 

exports.editBooksPost = async(req,res)=>{
    try {
        await bookModels.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            authorname: req.body.authorname,
            category: req.body.category,
            price: req.body.price,
            bookdetails: req.body.bookdetails,
            updatedAt: Date.now()
        });

       await res.redirect(`/book/editBook/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
}

// delete customer data 

exports.deleteBooks = async(req,res)=>{
    try {
        await bookModels.deleteOne({_id: req.params.id});
        res.redirect("/book")
        
    } catch (error) {
        console.log(error);
    }
}


// search customer data 
exports.searchBook = async(req,res)=>{

    const locals = {
        title:'Search books Data',
        description: "Library management System",
    };
    
    try {
        let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const books = await bookModels.find({
        $or:[
            { title: {$regex: new RegExp(searchNoSpecialChar, "i")}},
            { authorname: {$regex: new RegExp(searchNoSpecialChar, "i")}},
        ]
    });

    res.render("search",{
        books,
        locals
    })

        
    } catch (error) {
        console.log(error);
    }
}




