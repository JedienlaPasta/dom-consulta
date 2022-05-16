import { fetchRoles, fetchRolesByDIR, fetchRolesByRUT } from '../api/api'
import { ACTIONS } from '../context/DataContext'

export const getRoles = async (rol, quantity, dispatch, setMessage) => {
    try {
        const { data } = await fetchRoles(rol, quantity)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
        }
    }
}

export const getRolesByRUT = async (rut, quantity, dispatch, setMessage) => {
    try {
        const { data } = await fetchRolesByRUT(rut, quantity)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
        }
    }
}

export const getRolesByDIR = async (dir, quantity, dispatch, setMessage) => {
    try {
        const { data } = await fetchRolesByDIR(dir, quantity)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
        }
    }
}