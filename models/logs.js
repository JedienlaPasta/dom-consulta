import mongoose from "mongoose";

const logsSchema = mongoose.Schema({
    permisoId: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    previousVal: {
        type: String,
        required: true
    },
    newVal: {
        type: String,
        required: true
    }
    // id permiso, nombre usuario, fecha, tipo de accion (crud), valor antes de ser cambiado, nuevo valor.
})

const logs = mongoose.model('logs', logsSchema)

export default logs