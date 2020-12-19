//version mariano
const mongoose = require(`mongoose`)
//importando uniquevalidator
const uniqueValidator = require('mongoose-unique-validator');

//para validar roles
let rolesValidos = {
    values: [`ADMIN_ROLE`, `USER_ROLE`],
    message:"{VALUE} No es un ROL valido"
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, `E nombre es Requerido`],
        trim: true,
    
    },
    email: {
        type: String,
        required: [true, `El correo es necesario`],
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: `USER_ROLE`,
        enum: rolesValidos,
        trim: true,

    },
    estado: {
        type: Boolean,
        default: true,
    },
});

//recibe como pluggin el unique validator(unique validator, mensaje)
usuarioSchema.plugin(uniqueValidator, {
    mesagge: "{PATH} debe ser único",
});


//oculto el password
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}


//exportando el modelo con mongoose(primer parametro= nombre del modelo,  esquema de donde toma)
module.exports = mongoose.model("Usuario", usuarioSchema);
