//==========Puerto======

process.env.PORT = process.env.PORT || 3005;

// definir el entorno de trabajo

process.env.NODE_ENV = process.env.NODE_ENV || `dev`;

// base de datos
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/rolling";
} else {
  urlDB =
    "mongodb+srv://user:rollingcode2020@cluster0.iccew.mongodb.net/rolling";
}

process.env.URLDB = urlDB;

//===Caducidad de Token=====
process.env.CADUCIDAD_TOKEN = "48h";

//=====SEED===========
process.env.SEED = process.env.SEED || "este_es_el_semilla";

