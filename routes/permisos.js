import express from 'express'
import { getPermiso, getPermisoByApellidoP, getPermisosByDIR, createPermiso, updatePermiso ,deletePermiso, exportPermisos, gerPermisosBySector, getM2Total } from '../controllers/permisos.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/rol', authenticateToken, getPermiso)
router.get('/apellido', authenticateToken, getPermisoByApellidoP)
router.get('/dir', authenticateToken, getPermisosByDIR)
router.get('/sector', authenticateToken, gerPermisosBySector)
router.get('/m2total', authenticateToken, getM2Total)
router.get('/exportpermisos', authenticateToken, exportPermisos)
router.post('/create', authenticateToken, createPermiso)
router.patch('/update', authenticateToken, updatePermiso)
router.delete('/delete', authenticateToken, deletePermiso)

export default router