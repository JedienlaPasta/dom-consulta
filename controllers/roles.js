import RolData from "../models/rolesData.js";

export const getRoles = async (req, res) => {
    const roles = req.query
    let rolesData
    // esto es en caso de que el rol2 sea ''
    if (roles.rol1 && roles.rol2) {
        rolesData = await RolData.find({ ROL_AVALUO_1: roles?.rol1, ROL_AVALUO_2: roles?.rol2 }).limit( roles?.quantity)
    }
    else {
        rolesData = await RolData.find({ ROL_AVALUO_1: roles?.rol1 }).limit( roles?.quantity)
    }
    // en caso de no encontrar coincidencias
    if (!rolesData.length) {
        return res.status(404).json({ message: 'No se encontraron coincidencias' })
    }
    try {
        console.log(rolesData.length)
        res.status(200).json(rolesData)
    } catch (error) {
        res.status(404).json({ message: 'No se encontraron resultados' })
    }
}

export const getRolesByRUT = async (req, res) => {
    const rut = req.query.rut
    const reg = await RolData.find({ RUT: rut }).limit(req.query?.quantity)
    if (!reg.length) {
        return res.status(404).json({ message: 'No se encontraron coincidencias' })
    }
    try {
        res.status(200).json(reg)
    } catch (error) {
        res.status(404).json({ message: 'No se encontraron resultados' })
    }
}

export const getRolesByDIR = async (req, res) => {
    const dir = req.query.dir || 'empty'
    try {
        const reg = await RolData.find({ DIRECCION: {$regex: dir, $options: 'i'} }).limit(req.query?.quantity)
        res.status(200).json(reg)
    } catch (error) {
        res.status(404).json({ message: 'No se encontraron resultados' })
    }
}