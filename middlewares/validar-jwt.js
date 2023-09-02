const {response} = require('express');
//const { Token} = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    // x-token headers 
      const token = req.header('x-token');

      if(!token) {
        return res.status(401).json({
            ok:false,
            msg:'No hay toquen en la petición'
        });
      } 
      
      try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        console.log(payload);      } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido'
        })
        
      }


      next();    

}

module.exports = {
    validarJWT
}