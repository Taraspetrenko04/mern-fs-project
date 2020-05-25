const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); //hesh password
const {check, validationResult} = require('express-validator'); //validator
const jwt = require('jsonwebtoken')// jsonWebToken
const dotenv = require('dotenv');
dotenv.config();
// const config = require('config');

// api/auth/registr
router.post('/registr',
[   
    check('email', 'Email is not correct').isEmail(),
    check('password', 'Min password length is 6 chars').isLength( {min: 6})
],
 async (req, res) => {
    try {
        const errors = validationResult(req)
        if( !errors.isEmpty() ){
            return res.status(400).json({
                message: 'Input data is not correct',
                errors: errors.array(), //return array of errors
            })
        }
        
    

        const { email, password } = req.body; //get from frontEnd


        const candidate = await User.findOne( {email: email} );//
        if( candidate ){
           return res.status(400).json( { message: "User with current email already exist" } )
        }

        
        const hashedPasword = await bcrypt.hash(password, 12);//12 level of hashing
        const user = new User( {email: email, password: hashedPasword} );
        await user.save();// 
        res.status(201).json( {message: 'User has been created'} );



    } catch (error) {
        res.status(500).json( {message: 'Somethin going wrong'} )
    }
})


// api/auth/login
router.post('/login',
    [   

        check('email', 'Email is not correct').isEmail(), //
        check('password', 'Enter a password').exists()
    ], 
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if( !errors.isEmpty() ){
                return res.status(400).json({
                    message: 'Input login data is not correct',
                    errors: errors.array(), //return array of errors
                })
            }


            const { email, password } = req.body;
             
            const user = await User.findOne( {email: email} );
            if( !user ){
                return res.status(400).json( {message: 'User not found'} );
            }

            
            const isMatchPas = await bcrypt.compare( password, user.password );
            if( !isMatchPas ){
                return res.status(400).json( {message: 'Password not correct, try again'} )
            } 

            

        //JWT token
            const token = jwt.sign(
                { userId: user.id },
                process.env.jwtSecret, //get from config
                { expiresIn: '1h' } // life token duration 
            )

           
            res.status(200).json( { token: token, userId: user.id } );//




        } catch (error) {
            res.status(500).json( {message: 'Somethin going wrong'} )   
    }
})


module.exports = router;