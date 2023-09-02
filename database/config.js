/*const mongoose = require('mongoose');

const dbConnection = async()=> {

    try {
      await mongoose.connect(process.env.DB_CNN, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }); 
      console.log('DB Online');
       
    } catch (error) {
        console.log(error);
        throw new Error('Error al inizializar la BD');
    }

}

module.exports = {
    dbConnection
}*/

const mongoose = require( 'mongoose' );
 
const dbConnection = async () => {
 
    try {
 
        await mongoose.connect( process.env.DB_CNN || '' );
 
        console.log( 'Database online' );
 
    } catch ( err ) {
        console.log( err );
        throw new Error( 'Error connecting to the DB' );
    }
 
};
 
module.exports = {
    dbConnection
};
