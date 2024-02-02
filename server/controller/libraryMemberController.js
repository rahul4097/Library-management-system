const Customer = require('../model/memberModels');
const customer = require('../model/memberModels');
const mongoose = require('mongoose');


//homepage
exports.homepage=async(req,res)=>{
    const messages = await req.flash('info');
        
    const locals = {
            title: 'Library Member',
            description:'library Management System'
        }

        try {
            const customers=await Customer.find({}).limit(23);
            res.render('index',{locals, messages, customers});
        } catch (error) {
            console.log(error);
            
        }
}


// aboupage
exports.about=async(req,res)=>{
        
    const locals = {
            title: 'About',
            description:'Library Management System'
        }

        try {
            res.render('about',locals);
        } catch (error) {
            console.log(error);
            
        }
}

// new customer form
exports.addCustomer=async(req,res)=>{
    const locals = {
        title: 'Add New Library Member',
        description:'Library Management System'
    }
    res.render('customer/add',locals);
}
//create new customer
exports.postCustomer=async(req,res)=>{
    console.log(req.body);

    const newCustomer = new Customer({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        details:req.body.details,
        email:req.body.email,
        tel:req.body.tel
    });

    const locals = {
        title: 'Added New Library Member',
        description:'Library Management System'
    }

    try {
        await Customer.create(newCustomer);

        await req.flash('info','New Member has been added.')
        res.redirect('/');
        
    } catch (error) {
        console.log(error);
        
    }
    
    
}
//customer data
exports.view = async(req,res)=>{
    try {
        const customer = await Customer.findOne({ _id: req.params.id })
        
        const locals = {
            title:'View Member Data',
            description: "Library management System",
        };
        res.render('customer/view',{
            locals,
            customer
        });
    } catch (error) {
        console.log(error);
        
    }
}

//edit data
exports.edit = async(req,res)=>{
    try {
        const customer = await Customer.findOne({ _id: req.params.id })
        
        const locals = {
            title:'Edit Member Data',
            description: "Library management System",
        };
        res.render('customer/edit',{
            locals,
            customer
        });
    } catch (error) {
        console.log(error);
        
    }
}

// Update customer data 

exports.editPost = async(req,res)=>{
    try {
        await Customer.findByIdAndUpdate(req.params.id,{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            updatedAt: Date.now()
        });

       await res.redirect(`/edit/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
}

// delete customer data 

exports.deleteCustomer = async(req,res)=>{
    try {
        await Customer.deleteOne({_id: req.params.id});
        res.redirect("/")
        
    } catch (error) {
        console.log(error);
    }
}


// search customer data 

exports.searchCustomer = async(req,res)=>{

    const locals = {
        title:'Search Member Data',
        description: "Library management System",
    };
    
    try {
        let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const customers = await Customer.find({
        $or:[
            { firstName: {$regex: new RegExp(searchNoSpecialChar, "i")}},
            { lastName: {$regex: new RegExp(searchNoSpecialChar, "i")}},
        ]
    });

    res.render("search",{
        customers,
        locals
    })

        
    } catch (error) {
        console.log(error);
    }
}



