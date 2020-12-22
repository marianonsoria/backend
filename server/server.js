//version mariano
require(`./config/config`); //importando arch config, asi es en node, siempre arriba de todo

//===LEVANTO EL SERVIDOR CON NODEMON SERVER/SERVER EN TERMINAL GIT

const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("./rutas/index"));

//creamos conexion con mongo.db

mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log(`bASE DE DATOS ONLINE`);
  }
);

app.listen(process.env.PORT, () => {
  console.log("Genial estamos Online:", process.env.PORT);
});
