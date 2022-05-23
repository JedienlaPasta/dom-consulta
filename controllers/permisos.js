import Permiso from "../models/permisosModel.js"
import XLSX from 'xlsx'

import { filePath } from "../server.js"

export const getPermiso = async (req, res) => {
    const roles = req.query
    let permiso
    if (roles.mz && roles.pd) {
        // aqui se buscan registros con los roles exactos, por lo que no hace falta hacer un $sort
        permiso = await Permiso.find({ MATRIZ: roles?.mz, DIGITO: roles?.pd })
    }
    else {
        permiso = await Permiso.aggregate([ 
            { $match: { MATRIZ: roles?.mz }},
            { $addFields: { 
                // "DIGITO": { $arrayElemAt: [{"$split": [ "$DIGITO", ("/")]}, 0] },
                "DIGITO_length": { $strLenCP: "$DIGITO" }}},
            { $sort: {"DIGITO_length": 1, "DIGITO": 1}},
            { $project: {"DIGITO_length": 0}}
        ])
    }
    if (!permiso.length) {
        return res.status(404).json({ message: 'No se encontraron coincidencias' })
    }
    try {
        res.status(200).json(permiso)
    } catch (error) {
        res.status(404).json({ message: 'Error inesperado' })
    }
}

export const getPermisoByApellidoP = async (req, res) => {
    const apellido = req.query?.apellido
    // const permiso = await Permiso.find({ APELLIDO_P: apellido })
    // const permiso = await Permiso.find({ APELLIDO_P: { $regex: apellido, $options: 'i'} })
    const perm = await Permiso.aggregate([ 
        { $match: { APELLIDO_P: { $regex: apellido, $options: 'i'} }},
        { $addFields: { "MATRIZ_length": { $strLenCP: "$MATRIZ"}, "DIGITO_length": { $strLenCP: "$DIGITO"} }},
        { $sort: { "MATRIZ_length": 1, "MATRIZ": 1, "DIGITO_length": 1, "DIGITO": 1 }},
        { $project: { "MATRIZ_length": 0, "DIGITO_length": 0 }}
    ])
    if (!perm.length) {
        return res.status(404).json({ message: 'No se encontraron coincidencias' })
    }
    try {
        res.status(200).json(perm)
    } catch (error) {
        res.status(404).json({ message: 'Error inesperado' })
    }
}

export const getPermisosByDIR = async (req, res) => {
    const dir = req.query?.dir
    // const permiso = await Permiso.find({ CALLE: {$regex: dir, $options: 'i'} })
    const permiso = await Permiso.aggregate([ 
        { $match: { CALLE: { $regex: dir, $options: 'i'} }},
        { $addFields: { "MATRIZ_length": { $strLenCP: "$MATRIZ"}, "DIGITO_length": { $strLenCP: "$DIGITO"} }},
        { $sort: { "MATRIZ_length": 1, "MATRIZ": 1, "DIGITO_length": 1, "DIGITO": 1 }},
        { $project: { "MATRIZ_length": 0, "DIGITO_length": 0 }}
    ])
    if (!permiso.length) {
        return res.status(404).json({ message: 'No se encontraron coincidencias' })
    }
    try {
        res.status(200).json(permiso)
    } catch (error) {
        res.status(404).json({ message: 'Error inesperado' })
    }
}

export const gerPermisosBySector = async (req, res) => {
    const sector = req.query.sector || 'empty'
    // const permiso = await Permiso.find({ SECTOR: {$regex: sector, $options: 'i'} })
    const permiso = await Permiso.aggregate([ 
        { $match: { SECTOR: { $regex: sector, $options: 'i'} }},
        { $addFields: { "MATRIZ_length": { $strLenCP: "$MATRIZ"}, "DIGITO_length": { $strLenCP: "$DIGITO"} }},
        { $sort: { "MATRIZ_length": 1, "MATRIZ": 1, "DIGITO_length": 1, "DIGITO": 1 }},
        { $project: { "MATRIZ_length": 0, "DIGITO_length": 0 }}
    ])
    if (!permiso.length) {
        return res.status(404).json({ message: 'No se encontraron coincidencias' })
    }
    try {
        res.status(200).json(permiso)
    } catch (error) {
        res.status(404).json({ message: 'Error inesperado' })
    }
}

// Usar en caso de requerir cambiar valores de la DB
// export const getM2Total = async (req, res) => {
//     // Devuelve la base de datos completa con los cambios especificados
//     // const permisos = await Permiso.aggregate([
//     //     {
//     //         $addFields: {
//     //             COMENTARIO: { $replaceAll: { input: "$COMENTARIO", find: "¡", replacement: "," } }
//     //         }
//     //     }
//     // ])

//     // Actualiza la base de datos completa en los campos especificados con los valores definidos
//     await Permiso.updateMany(
//         { "COMENTARIO": { $regex: /%/ }},
//         [{
//             $set: { "COMENTARIO": {
//                 $replaceAll: { input: "$COMENTARIO", find: "%", replacement: ";" }
//             }}
//         }]
//     )
//     try {
//         res.status(200).json({ message: 'done' })
//     } catch (error) {
//         res.status(404).json({ message:error.message })
//     }
// }

export const getM2Total = async (req, res) => {
    // const permisos = await Permiso.find()
    const permisos = await Permiso.aggregate([
        {
            $group: {
                _id: 'M2_TOTALES',
                N_VIV: { $sum: '$N_VIV' },
                M2_C_RECEP: { $sum: '$M2_C_RECEP' },
                M2_C_PERM: { $sum: '$M2_C_PERM' },
                M2_S_PERM: { $sum: '$M2_S_PERM' },
                M2_TOTAL: { $sum: '$M2_TOTAL' },
            }
        }
    ])
    
    if (!permisos.length) {
        return res.status(404).json({ message: 'No se encontraron coincidencias' })
    }
    try {
        res.status(200).json(permisos)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPermiso = async (req, res) => {
    // se checkea primero que el permiso no exista
    const permiso = await Permiso.findOne({ MATRIZ: req.body.permiso?.MATRIZ, DIGITO: req.body.permiso?.DIGITO })
    if (permiso) {
        console.log('este permiso ya existe')
        return res.status(403).json({ message: 'Este permiso ya existe'}) // 403?
    }
    // si no existe, se intenta ingresar en la DB
    const toInsert = new Permiso(req.body.permiso)
    try {
        await toInsert.save()
        res.status(201).json({ message: 'Permiso ingresado exitosamente'})
    } catch (error) {
        res.status(400).json({ message: 'No se pudo ingresar el permiso' })
    }
}

export const updatePermiso = async (req, res) => {
    const permiso = req.body.permiso
    const toUpdate = await Permiso.findOne({ _id: permiso?._id })
    if (!toUpdate) {
        console.log('este permiso no existe')
        return res.status(404).json({ message: 'Este permiso no existe' })
    }
    // se cambian los valores del documento guardado en la DB por los nuevos valores enviados en el body
    // Object.keys(toUpdate.toJSON()).forEach((key) => permiso[key] && (toUpdate[key] = permiso[key]))
    // Object.keys(newPermiso).forEach(key => newPermiso[key] = roles[rolIndex]?.[key] || (typeof roles[rolIndex]?.[key] == 'number' ? 0 : ''))
    // quizas esto no hace falta, pero no estaria de mas dejarlo por si acaso?
    Object.keys(toUpdate.toJSON()).forEach((key) => key !== '__v' && (toUpdate[key] = permiso[key] || (typeof permiso[key] == 'number' ? 0 : '')))
    try {
        await toUpdate.save()
        console.log('permiso actualizado exitosamente')
        res.status(200).json({ message: 'Permiso actualizado exitosamente' })
    } catch (error) {
        console.log('no se pudo actualizar el permiso')
        res.status(400).json({ message: 'No se pudo actualizar el permiso' }) // 400?
    }
}

export const deletePermiso = async (req, res) => {
    const id = req.query.id
    const toDelete = await Permiso.findOne({ _id: id })
    if (!toDelete) {
        console.log('este permiso no existe')
        return res.status(404).json({ message: 'Este permiso no existe' })
    }
    try {
        await Permiso.deleteOne({ _id: toDelete._id })
        console.log('permiso eliminado exitosamente')
        res.status(200).json({ message: 'Permiso eliminado exitosamente' })
    } catch (error) {
        console.log('no se pudo eliminar el permiso')
        res.status(400).json({ message: 'No se pudo eliminar el permiso' })
    }
}

export const exportPermisos = async (req, res) => {
    const wb = XLSX.utils.book_new()
    Permiso.find((err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            let temp = JSON.stringify(data)
            temp = JSON.parse(temp)
            const ws = XLSX.utils.json_to_sheet(temp)
            const down = filePath
            XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
            XLSX.writeFile(wb, down)
            res.sendFile(down)
        }    
    })
}