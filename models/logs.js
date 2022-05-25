import mongoose from "mongoose";

// Solo esta aquí porque no se quería exportar, y para no usar minimize en el schema de los permisos, por eso se llama local
const localPermisoSchema = mongoose.Schema({
    MATRIZ: { type: String, required: true },
    DIGITO: { type: String, required: true },
    NOMBRE: { type: String },
    APELLIDO_P: { type: String },
    APELLIDO_M: { type: String },
    DOMICILIO: { type: String },
    COMUNA: { type: String },
    TELEFONO: { type: String },
    MZ: { type: String },
    NSTPC: { type: String },
    CALLE: { type: String },
    SECTOR: { type: String },
    DESTINO: { type: String },
    N_VIV: { type: Number, required: true },
    M2_C_RECEP: { type: Number, required: true },
    M2_C_PERM: { type: Number, required: true },
    M2_S_PERM: { type: Number, required: true },
    M2_TOTAL: { type: Number, required: true },
    UI_NUM: { type: Number, required: true },
    UI_ANO: { type: Number, required: true },
    TIPO_EXPEDIENTE: { type: String },
    ESTADO: { type: String },
    DESDE: { type: String },
    DERECHOS: { type: Number, required: true },
    COMENTARIO: { type: String }
}, { minimize: true } )

const logsSchema = mongoose.Schema({
    permisoId: {        // id del permiso que se actualiza, crea o elimina
        type: String,
        required: true
    },
    user: {             // nombre del usuario que realiza la accion
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ['POST', 'PATCH', 'DELETE']
    },
    // si o si tiene que guardarse este valor aparte del que se almacena en permisos, porque este es el valor antes de ser cambiado, luego de esto el permiso puede cambiar varias veces pero este registro debe seguir igual
    previousVal: {      // el valor antes de ser cambiado, no es obligatorio en el caso de POST. Para DELETE, quizas debiese ingresarse el valor completo, o los campos borrados con valores !== '' || 0
        type: [localPermisoSchema]
    },
    newVal: {           // nuevo valor ingresado
        type: [localPermisoSchema],
        required: true
    }
})

const Log = mongoose.model('logs', logsSchema)

export default Log

// MATRIZ: String,
// DIGITO: String,
// NOMBRE: String,
// APELLIDO_P: String,
// APELLIDO_M: String,
// DOMICILIO: String,
// COMUNA: String,
// TELEFONO: String,
// MZ: String,
// NSTPC: String,
// CALLE: String,
// SECTOR: String,
// DESTINO: String,
// N_VIV: Number,
// M2_C_RECEP: Number,
// M2_C_PERM: Number,
// M2_S_PERM: Number,
// M2_TOTAL: Number,
// UI_NUM: Number,
// UI_ANO: Number,
// TIPO_EXPEDIENTE: String,
// ESTADO: String,
// DESDE: String,
// DERECHOS: Number,
// COMENTARIO: String,