const express = require("express");

//---encriptar contraseñas
const bcrypt = require("bcrypt");
//---------------------------

//import jwt
const jwt = require(`jsonwebtoken`);

 const Usuario = require(`../modelos/usuario`);
const usuario = require("../modelos/usuario");

const app = express();

app.post(`/login`, (req, res) => {
  let body = req.body;

  usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          mesagge: "usuario o contraseña incorrectos",
        },
      });
    }
    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          mesagge: "Usuario o contraseña incorrectos",
        },
      });
    }
    let token = jwt.sign(
      {
        usuario: usuarioDB,
      },
      process.env.SEED,
    //   { expiresIn: "48h" }
    {expiresIn: process.env.CADUCIDAD_TOKEN}
    );

    res.json({
      ok: true,
      usuario: usuarioDB,
      token: token,
    });
  });
});

module.exports = app;
