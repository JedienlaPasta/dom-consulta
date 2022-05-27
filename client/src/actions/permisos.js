import fileDownload from "js-file-download"
import { fetchPermisos, fetchPermisosByApellidoP, fetchPermisosByDIR, createPermiso, updatePermiso, deletePermiso, getExcelFile, fetchPermisosBySector, fetchM2Total } from "../api/api"
import { ACTIONS } from "../context/DataContext"


export const getPermisos = async (rol, dispatch, setMessage, setShowPopup, setSearching) => {
    try {
        const { data } = await fetchPermisos(rol)
        setTimeout(() => {
            setShowPopup(false)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
        }, 100)
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        }
    }
}

export const getPermisosByApellidoP = async (apellido, dispatch, setMessage, setShowPopup, setSearching) => {
    try {
        const { data } = await fetchPermisosByApellidoP(apellido)
        setTimeout(() => {
            setShowPopup(false)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
        }, 100)
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        }
    }
}

export const getPermisosByDIR = async (dir, dispatch, setMessage, setShowPopup, setSearching) => {
    try {
        const { data } = await fetchPermisosByDIR(dir)
        setTimeout(() => {
            setShowPopup(false)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
        }, 100)
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        }
    }
}

export const getPermisosBySector = async (sector, dispatch, setMessage, setShowPopup, setSearching) => {
    try {
        const { data } = await fetchPermisosBySector(sector)
        setTimeout(() => {
            setShowPopup(false)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
        }, 100)
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        }
    }
}

export const getM2Total = async (dispatch, setMessage, setShowPopup, setSearching) => {
    try {
        const { data } = await fetchM2Total()
        setTimeout(() => {
            setShowPopup(false)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
        }, 100)
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
            setSearching(false)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        }
    }
}

export const postPermiso = async (user, permiso, setMessage, setNewPermiso, permisoInitialValue) => {
    try {
        const { data } = await createPermiso(user, permiso)
        setTimeout(() => {
            setMessage(data.message)
            setNewPermiso(permisoInitialValue) // se reestablecen los valores de newPermiso a su estado original (vacio)
        }, 500)
    } catch (error) {
        if (error.response) {
            setTimeout(() => setMessage(error.response.data.message), 500)
        }
    }
}

export const patchPermiso = async (permiso, setMessage, setNewPermiso, permisoInitialValue, user) => {
    try {
        const { data } = await updatePermiso(permiso, user)
        setTimeout(() => {
            setMessage(data.message)
            setNewPermiso(permisoInitialValue) // se reestablecen los valores de newPermiso a su estado original (vacio)
        }, 500)
    } catch (error) {
        if (error.response) {
            setTimeout(() => setMessage(error.response.data.message), 500)
        }
    }
}

export const delPermiso = async (id, user, setMessage) => {
    try {
        const { data } = await deletePermiso(id, user)
        setTimeout(() => setMessage(data.message), 500)
    } catch (error) {
        if (error.response) {
            setTimeout(() => setMessage(error.response.data.message), 500)
        }
    }
}

export const downloadPermisos = async (setMessage) => {
    const { data } = await getExcelFile()
    try {
        fileDownload(data, 'download.xlsx')
        setTimeout(() => setMessage('Descarga finalizada'), 500)
    } catch (error) {
        if (error.message) {
            console.log(error.response.data.message)
        }
    }
}