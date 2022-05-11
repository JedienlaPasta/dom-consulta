import RolData from "../models/rolesData.js";

export const getRoles = async (req, res) => {
    const roles = req.query
    try {
        const rolesData = await RolData.find({ ROL_AVALUO_1: roles.rol1, ROL_AVALUO_2: roles.rol2 })
        res.status(200).json(rolesData)
    } catch (error) {
        res.status(404).json({ message: 'No se encontraron resultados' })
    }
}

export const getRolesByRUT = async (req, res) => {
    const rut = req.query.rut
    try {
        const reg = await RolData.find({ RUT: rut })
        res.status(200).json(reg)
    } catch (error) {
        res.status(404).json({ message: 'No se encontraron resultados' })
    }
}

export const getRolesByDIR = async (req, res) => {
    const dir = req.query.dir || 'empty'
    const quantity = req.query.quantity || 1
    console.log(req.query)
    try {
        const reg = await RolData.find({ DIRECCION: {$regex: dir, $options: 'i'} }).limit(quantity)
        res.status(200).json(reg)
    } catch (error) {
        res.status(404).json({ message: 'No se encontraron resultados' })
    }
}