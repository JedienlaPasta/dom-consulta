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
    // const permiso = req.body?.permiso
    const logInfo = req.body
    const oldPermiso = await Permiso.find({ _id: logInfo?._id })
    // Primero se sacan todos los valores que no cambiaron durante esta accion
    Object.keys(logInfo.newPermiso).filter((key) => logInfo.newPermiso[key] !== oldPermiso[key])
    // Luego, se les asigna undefined a los campos con valores vacios. Esto realmente es necesario? quizas basta con solo sacar los que no se cambiaron.
    Object.keys(logInfo.newPermiso).forEach((key) => !logInfo.newPermiso[key] ? logInfo.newPermiso[key] = undefined : null)
    const logToInsert = {
        
    }
    try {
        await logToInsert.save()
    } catch (error) {
        
    }
}