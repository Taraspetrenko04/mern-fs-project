const { Router } = require('express');
const Link = require('../models/Link');
// const config = require('config');
const router = Router();
const auth = require('../middleware/auth.middleware');
const shortid = require('shortid');
const dotenv = require('dotenv');
dotenv.config();


// /api/link/generate
router.post('/generate', auth, async (req, res) => { //auth - non author users cant create links
    try {
        const baseUrl = process.env.baseUrl;
        const { from } = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne( {from} );
        if( existing ){
            res.status(200).json({ link: existing })
        }


        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code, from, to, owner: req.user.userId
        });

        await link.save();
        res.status(201).json({ link })

    } catch (error) {
        res.status(500).json( {message: 'Somethin going wrong \'post /generate\''} )
    }
})


// get all links from user
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find( { owner: req.user.userId } ); //how to get owner?
        res.json(links)

        
    } catch (error) {
        res.status(500).json( {message: 'Somethin going wrong \'get /\''} )
    }
})


router.get('/:id', auth, async (req, res) => {
    try {
        
        const links = await Link.findById( req.params.id );
        res.json(links)


    } catch (error) {
        res.status(500).json( {message: 'Somethin going wrong \'get /:id\''} )
    }
})


module.exports = router;
