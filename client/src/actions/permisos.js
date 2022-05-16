import fileDownload from "js-file-download"
import { fetchPermisos, fetchPermisosByApellidoP, fetchPermisosByDIR, createPermiso, updatePermiso, deletePermiso, getExcelFile } from "../api/api"
import { ACTIONS } from "../context/DataContext"

export const getPermisos = async (rol, quantity, dispatch, setMessage) => {
    try {
        const { data } = await fetchPermisos(rol, quantity)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        }
    }
}

export const getPermisosByApellidoP = async (apellido, quantity, dispatch, setMessage) => {
    try {
        const { data } = await fetchPermisosByApellidoP(apellido, quantity)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        }
    }
}

export const getPermisosByDIR = async (dir, quantity, dispatch, setMessage) => {
    try {
        const { data } = await fetchPermisosByDIR(dir, quantity)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: data })
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        }
    }
}
// el setMessage no se debe mostrar en los form si es un status positivo, solo se debe mostrar en los popup
export const postPermiso = async (permiso, setMessage) => {
    try {
        const { data } = await createPermiso(permiso)
        setTimeout(() => setMessage(data.message), 500)
    } catch (error) {
        if (error.response) {
            setTimeout(() => setMessage(error.response.data.message), 500)
        }
    }
}

export const patchPermiso = async (permiso, setMessage) => {
    try {
        const { data } = await updatePermiso(permiso)
        setTimeout(() => setMessage(data.message), 500)
    } catch (error) {
        if (error.response) {
            setTimeout(() => setMessage(error.response.data.message), 500)
        }
    }
}

export const delPermiso = async (id, setMessage) => {
    try {
        const { data } = await deletePermiso(id)
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