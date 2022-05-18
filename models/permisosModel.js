import mongoose from "mongoose";

const permisoSchema = mongoose.Schema({
    MATRIZ: {
        type: String,
        required: false
    },
    DIGITO: {
        type: String,
        required: false
    },
    NOMBRE: {
        type: String,
        required: false
    },
    APELLIDO_P: {
        type: String,
        required: false
    },
    APELLIDO_M: {
        type: String,
        required: false
    },
    MZ: {
        type: String,
        required: false
    },
    NSTPC: {
        type: String,
        required: false
    },
    CALLE: {
        type: String,
        required: false
    },
    SECTOR: {
        type: String,
        required: false
    },
    N_VIV: {
        type: String,
        required: false
    },
    M2_C_RECEP: {
        type: Number,
        required: false
    },
    M2_C_PERM: {
        type: Number,
        required: false
    },
    M2_S_PERM: {
        type: Number,
        required: false
    },
    M2_TOTAL: {
        type: Number,
        required: false
    },
    ESTADO: {
        type: String,
        required: false
    },
})

const Permiso = mongoose.model('permisos', permisoSchema)

export default Permiso