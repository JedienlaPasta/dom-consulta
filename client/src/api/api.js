import axios from 'axios'

// Usuarios
// const users_url = 'http://localhost:5000/users/login'

export const userAuth = (user) => axios.post('/users/login', { user })

export const clearUser = () => axios.get('/users/logout')

export const isUserAuth = () => axios.get('/users/auth')

// Roles
// const roles_url = 'http://localhost:5000/roles'
// const url = 'https://rol-cobro.herokuapp.com/roles'

export const fetchRoles = (rol) => axios.get('/roles/rol', { params: { mz: rol.mz, pd: rol.pd } })

export const fetchRolesByRUT = (rut) => axios.get('/roles/rut', { params: { rut: rut } })

export const fetchRolesByDIR = (dir) => axios.get('/roles/dir', { params: { dir: dir } })

// Permisos
// const permisos_url = 'https://localhost:5000/permisos'

export const fetchPermisosRolV = (rol) => axios.get('/perm/rol/vigente', { params: { mz: rol.mz, pd: rol.pd } })    // creo que hay que cambiar la ruta

export const fetchPermisosRolA = (rol) => axios.get('/perm/rol/asignado', { params: { mz: rol.mz, pd: rol.pd } })

export const fetchPermisosByRUT = (rut) => axios.get('/perm/rut', { params: { rut } })

export const fetchPermisosByApellidoP = (apellido) => axios.get('/perm/apellido', { params: { apellido: apellido } })

export const fetchPermisosByDIR = (dir) => axios.get('/perm/dir', { params: { dir: dir } })

export const fetchPermisosBySector = (sector) => axios.get('/perm/sector', { params: { sector: sector } })

export const fetchM2Total = () => axios.get('/perm/m2total')

export const createPermiso = (user, permiso) => axios.post('/perm/create', { user, permiso }) // aqui agregue un / al principio, antes funcionaba bien sin el /

export const updatePermiso = (permiso, user) => axios.patch('/perm/update', { permiso, user })

export const deletePermiso = (id, user) => axios.delete('/perm/delete', { params: { id: id, user: user } })

// export permisos

export const getExcelFile = () => axios({ url: '/perm/exportpermisos', method: 'GET', responseType: 'blob' })

// Logs

export const fetchLogs = () => axios.get('/logs')