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
    // // Primero se sacan todos los valores que no cambiaron durante esta accion
    // Object.keys(logInfo.newPermiso).filter((key) => logInfo.newPermiso[key] !== oldPermiso[key])
    // // Luego, se les asigna undefined a los campos con valores vacios. Esto realmente es necesario? quizas basta con solo sacar los que no se cambiaron.
    // Object.keys(logInfo.newPermiso).forEach((key) => !logInfo.newPermiso[key] ? logInfo.newPermiso[key] = undefined : null)
    let logInfo
    let insertLog = true
    // const user = JSON.parse(req.body?.user?.name)
    if (req.action === 'CREAR') {
        const newPermisoLog = req.permiso?._doc
        // console.log(newPermisoLog)
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

        const keys = Object.keys(newPermiso).filter((key) => newPermiso[key] !== oldPermiso[key] && key !== '_id')
        console.log(keys)
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
        console.log(keys.length)
        insertLog = keys.length > 0
    }
    else if (req.action === 'ELIMINAR') {
        const id = JSON.parse(req.query.id).id
        let oldPermiso = await Permiso.findOne({ _id: id })
        oldPermiso = oldPermiso._doc
        
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
    console.log(logToInsert)

    try {
        if (insertLog) {
            // await logToInsert.save()
        }
    } catch (error) {
        console.log(error)
    }
}