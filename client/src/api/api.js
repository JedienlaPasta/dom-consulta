import axios from 'axios'

// Usuarios
// const users_url = 'http://localhost:5000/users/login'

export const userAuth = (user) => axios.post('/users/login', { user })

export const clearUser = () => axios.get('/users/logout')

export const isUserAuth = () => axios.get('/users/auth')

// Roles
// const roles_url = 'http://localhost:5000/roles'
// const url = 'https://rol-cobro.herokuapp.com/roles'

export const fetchRoles = (rol) => axios.get('/roles/rol', { params: rol })

export const fetchRolesByRUT = (rut) => axios.get('/roles/rut', { params: rut })

export const fetchRolesByDIR = (dir, quantity) => axios.get('/roles/dir', { params: { dir: dir, quantity: quantity } })

// Permisos
// const permisos_url = 'https://localhost:5000/permisos'

export const fetchPermisos = (rol) => axios.get('/permisos/rol', { params: rol })

export const fetchPermisosByApellidoP = (apellido) => axios.get('/permisos/apellido', { params: apellido })

export const fetchPermisosByDIR = (dir, quantity) => axios.get('/permisos/dir', { params: { dir: dir, quantity: quantity } })

export const createPermiso = (permiso) => axios.post('/permisos/create', { permiso }) // aqui agregue un / al principio, antes funcionaba bien sin el /

export const updatePermiso = (permiso) => axios.patch('/permisos/update', { permiso })

export const deletePermiso = (id) => axios.delete('/permisos/delete', { params: id })

// export permisos

export const getExcelFile = () => axios({ url: '/permisos/exportpermisos', method: 'GET', responseType: 'blob' })