const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config()


const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI || 'mongodb+srv://taraspetrenko04:t170589t@cluster0-x9thw.mongodb.net/test?retryWrites=true&w=majority';

 
app.use(cors());
app.use(express.json());


// use routes (app.use('adreess', route))
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/links.routes'));
app.use('/t', require('./routes/redirect.routes'));


//Serve statick assets if in production HEROKU
if( process.env.NODE_ENV === 'production' ){
  //set statick folder
  // app.use(express.static('client/build'));
  app.use(express.static(path.join(__dirname, "../client", "build")));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  }); 
}


const start = async () => {
  try { 
    // console.log('proces.uri: ' + URI)//work
    // console.log('jwt secret: ' + process.env.jwtSecret)//work
    // console.log('base url: '  + process.env.baseUrl)//work

    //db connection
    await mongoose.connect( URI , {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
    });
    console.log('DataBase connected sucsesfully!');
    
    
    // statr server
    app.listen( PORT, () => { console.log(`server has been started on port ${PORT}`) });


    } catch (error) {
      console.log(`server error ${error.message} `);
  }
}

start();

