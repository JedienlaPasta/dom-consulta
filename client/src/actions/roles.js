import { fetchRoles, fetchRolesByDIR, fetchRolesByRUT } from '../api/api'
import { ACTIONS } from '../context/DataContext'

export const getRoles = async (rol, dispatch) => {
    try {
        const { data } = await fetchRoles(rol)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const getRolesByRUT = async (rut, dispatch) => {
    try {
        const { data } = await fetchRolesByRUT({ rut: rut })
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const getRolesByDIR = async (dir, quantity, dispatch) => {
    try {
        const { data } = await fetchRolesByDIR(dir, quantity)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}