const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt')

const crearUsuario = async(req, res = response) => {
  const { password, email} = req.body; 


 try {
  let usuario = await Usuario.findOne({email});
  if(usuario){
  return  res.status(400).json({
     ok:false,
     msg:'Un usuario existe con ese correo'
    });
  }
   usuario = new Usuario(req.body);

   // Encriptar contraseña
   const salt = bcrypt.genSaltSync();
   usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save(); 
  // generar JWT
  const token = await generarJWT(usuario.id, usuario.name);
  
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
     
    })
  
 } catch (error) {
   console.log(error)
   res.status(500).json({
    ok:false,
    msg:'Por favor hable con el administrador'
   });
 }
}  


  const loginUsuario = async (req, res = response) => {   
    

    const { password, email} = req.body;

    try {

    const usuario = await Usuario.findOne({email});
    if(!usuario){
    return  res.status(400).json({
      ok:false,
      msg:'El usuario no existe con ese email'
      });
    }

    // confirmar los passwords 

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if(!validPassword){
      return res.status(400).json({
        ok:false,
        password:'Password incorrecto'
      });
    }
  

    
    // generar JWT
  const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })
      
    } catch (error) {
      console.log(error)
    res.status(500).json({
      ok:false,
      msg:'Por favor hable con el administrador'
    });
   }    
  }

  const revalidarToquen = (req, res = response) => {
  
    res.json({
      ok: true,
      msg: 'renew'
    })
  }

  module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToquen
  }
