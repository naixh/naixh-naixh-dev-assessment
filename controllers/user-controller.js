const User = require("../models/user");
const paginate = require("express-paginate");
const bcrypt = require("bcryptjs");
const mailgun = require("mailgun-js");
require("dotenv").config();


//get all users
const getAll = async(req, res) => {
    try {

        const [results, itemCount] = await
        Promise.all([
            User.find({}).select("-password") 
                .sort({createdAt: -1})
                .limit(req.query.limit)
                .skip(req.skip)
                .lean()
                .exec(),
                User.estimatedDocumentCount({}),
        ]);
        const pageCount = Math.ceil(itemCount / req.query.limit);
        return res.status(201).json({
            object: "list",
            has_more: paginate.hasNextPages(req)(pageCount),
            data: results,
            pageCount,
            itemCount,
            currentPage: req.query.page,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

//get user by id
const getOne = async(req, res) => {
    try {
        const item = await User.findById(req.params.id).select("-password");
        if(item) {
            return res.status(200).json(item);
        }
        return res.status(404).json({
            message: "Item not found",
            success: false,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};


//register new user
const register = async (req, res) => {
    try {    
        //varify if email was registed before
        const userTaken = await validateEmail(req.body.email);
        if(userTaken) {
            return res.status(400).json({
                email: "Email is already taken",
                message: "Registration failure",
                success: false,
            });
        }
        const data = {
            name: req.body.name,
            email: req.body.email,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
         
        };
        //use bycript to make hash password
        var salt = bcrypt.genSaltSync(5);
        var hashedPassword = bcrypt.hashSync( req.body.password, salt);
        const newUser = new User({
            ...data,
            password: hashedPassword,
        });
        
        await newUser.save()
        //send mail using mailgun

        const DOMAIN = 'mg.sudobrothers.com';
        const mg = mailgun({apiKey:process.env.MG_API_KEY, domain: process.env.MG_DOMAIN});
            const mgdata = {
                from: 'naaixh@gmail.com',
                to: req.body.email,
                subject: 'Welcome to Develab - '+ data.name,
                html: 'Welcome to Develab. We’re thrilled to see you here! <br /> Your feedback helps us to make sure that we’re delivering exactly what customers want.'
            };
            mg.messages().send(mgdata, function (error, body) {
                console.log(body);
            });

                        

        return res.status(201).json({
            message: "Account successfully created",
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
};



//Update by id
const updateOne = async(req, res) => {
    try {
        const id = req.body.id;
        await User.findByIdAndUpdate(id, req.body);
        return res.status(201).json({
            message: "Item successfully updated",
            success: true,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        });
    }
};

const validateEmail = async (email) => {
    let user = await User.findOne({ email });
    if(user) {
        return true;
    } else {
        return false;
    }
};

module.exports = {
    register,
    getAll,
    getOne,  
    updateOne
}