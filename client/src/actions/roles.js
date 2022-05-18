import { fetchRoles, fetchRolesByDIR, fetchRolesByRUT } from '../api/api'
import { ACTIONS } from '../context/DataContext'

export const getRoles = async (rol, dispatch, setMessage, setShowPopup, setSearching) => {
    try {
        const { data } = await fetchRoles(rol)
        setTimeout(() => {
            setShowPopup(false)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
        }, 100)
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
        }
    }
}

export const getRolesByRUT = async (rut, dispatch, setMessage, setShowPopup, setSearching) => {
    try {
        const { data } = await fetchRolesByRUT(rut)
        setTimeout(() => {
            setShowPopup(false)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
        }, 100)
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
        }
    }
}

export const getRolesByDIR = async (dir, dispatch, setMessage, setShowPopup, setSearching) => {
    try {
        const { data } = await fetchRolesByDIR(dir)
        setTimeout(() => {
            setShowPopup(false)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
        }, 100)
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
        }
    }
}