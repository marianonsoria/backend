//version mariano
// const bodyParser = require("body-parser");
const express = require("express");

//---encriptar contraseñas
const bcrypt = require("bcrypt");
//---------------------------
// const Usuario = require(`../modelos/usuario`)

//importar underscore para validar PUT
const _ = require("underscore");

const app = express();

const Usuario = require(`../modelos/usuario`);
const {verificaToken} =require(`../middlewares/autenticacion`);

// const usuario = require("../modelos/usuario");

app.get("/usuario",verificaToken,function (req, res) {
  //rec (reprensenta un solicitud) res(representa una respuesta)

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  //limit(numero) limita la cantidad de resgistros en pantalla
  //skip(num) muestra los num de registros siguientes
  Usuario.find({ estado: true })
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Usuario.count({ estado: true }, (err, conteo) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        err.json({
          ok: true,
          usuarios,
          cantidad: conteo,
        });
      });
    });
});
//-------Metodo POST-------
app.post("/usuario", function (req, res) {
  //rec (reprensenta un solicitud) res(representa una respuesta)
  //-----DESPUES DE AGRRGAR EN POSTMAN, AGREGAR FUNCION DESPUES DE USUARIO
  // /USUARIO, verificaToken,function()
  //lo mismo en put, delete

  let body = req.body;

  //crear instancia del modelo Usuario
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });
  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    //
    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });

  // let body = req.body;
  // if (body.nombre === undefined) {
  //     res.status(400).json({
  //         ok: false,
  //         mesagge:`El nombre es necesario`
  //     })

  // } else {
  //     res.json({
  //         //mesagge: 'POST usuario',
  //         persona: body
  //     }
  //     )

  // }
});
//-----------------

//-----Metodo PUT-------
app.put("/usuario/:id", function (req, res) {
  //rec (reprensenta un solicitud) res(representa una respuesta)
  // res.json({mesagge: 'PUT usuario',}
  // )
  let id = req.params.id;
  //ME FALTA IMPORTAR EL UNDERSCORE

  let body = _.pick(req.body, [`nombre`, `email`, `img`, `role`, `estado`]);
  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
});
//------Metodo DELETE-----
app.delete("/usuario/:id", function (req, res) {
  //rec (reprensenta un solicitud) res(representa una respuesta)
  let id = req.params.id;

  let estadoActualizado = {
    estado: false,
  };
  usuario.findByIdAndUpdate(
    id,
    estadoActualizado,
    { new: true },
    (err, usuarioBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      if (!usuarioBorrado) {
        return res.status(400).json({
          ok: false,
          mesagge: `Usuario NO Encontrado!`,
        });
      }
      res.json({
        ok: true,
        usuario: usuarioBorrado,
      });
    }
  );

  //   res.json({ mesagge: "DELETE usuario" });
});

module.exports = app;
