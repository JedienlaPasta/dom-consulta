import LogPermiso from "../models/logPermiso.js"
import Log from "../models/logs.js"
import Permiso from "../models/permisosModel.js"

export const getLogs = async (req, res) => {
    const logs = await Log.find()
    if (!logs.length) {
        return res.status(404).json({ message: 'No se encontraron logs' })
    }
    try {
        res.status(200).json(logs)
    } catch (error) {
        res.status(400).json({ message: 'Error inesperado' })
    }
}

export const createLog = async (req, res) => {
    let logInfo
    let insertLog = true
    if (req.action === 'CREAR') {
        const newPermisoLog = req.permiso?._doc
        // Se les asigna undefined a los campos con valores vacios: '' y 0
        Object.keys(newPermisoLog).forEach((key) => !newPermisoLog[key] ? newPermisoLog[key] = undefined : null)
        const logPermisoToInsert = await new LogPermiso(newPermisoLog)
        logInfo = {
            permisoId: newPermisoLog._id,
            user: req.body.user.name,
            action: req.action,
            newVal: logPermisoToInsert
        }
    }
    else if (req.action === 'EDITAR') {
        let newPermiso = req.body?.permiso
        const id = newPermiso?._id
        let oldPermiso = await Permiso.findOne({ _id: id })
        oldPermiso = oldPermiso._doc

        // Se crea un array con las llaves de los campos que no cambiaron durante esta accion
        const keys = Object.keys(newPermiso).filter((key) => newPermiso[key] !== oldPermiso[key] && key !== '_id')
        // Se les asigna un valor 'undefined' a los campos que no cambiaron, esto provoca que el objeto creado solo tenga campos con valores relevantes
        Object.keys(newPermiso).forEach((key) => !keys.includes(key) ? newPermiso[key] = undefined : null)
        Object.keys(oldPermiso).forEach((key) => !keys.includes(key) ? oldPermiso[key] = undefined : null)
        // Se crean los objetos, estos son un poco distintos a los Permisos, ya que estos tienen la propiedad 'minimize' activada
        const logPermisoToInsert = await new LogPermiso(newPermiso)
        const logOldPermisoToInsert = await new LogPermiso(oldPermiso)
        logInfo = {
            permisoId: id,
            user: req.body.user.name,
            action: req.action,
            newVal: logPermisoToInsert,
            previousVal: logOldPermisoToInsert
        }
        insertLog = keys.length > 0
    }
    else if (req.action === 'ELIMINAR') {
        const id = JSON.parse(req.query.id).id
        let oldPermiso = await Permiso.findOne({ _id: id })
        oldPermiso = oldPermiso._doc
        const user = JSON.parse(req.query.user)
        
        Object.keys(oldPermiso).forEach((key) => !oldPermiso[key] ? oldPermiso[key] = undefined : null)
        const logOldPermisoToInsert = await new LogPermiso(oldPermiso)
        logInfo = {
            permisoId: id,
            user: user.name,
            action: req.action,
            previousVal: logOldPermisoToInsert
        }
    }
    const logToInsert = new Log(logInfo)
    // console.log(logToInsert)

    try {
        if (insertLog) {
            await logToInsert.save()
        }
    } catch (error) {
        console.log(error)
    }
}