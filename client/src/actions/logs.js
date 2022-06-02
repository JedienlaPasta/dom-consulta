import { fetchLogs } from "../api/api"
import { ACTIONS } from "../context/DataContext"

export const getLogs = async (option, date, rol, id, dispatch, setMessage, setShowPopup, setSearching) => {
    try {
        const { data } = await fetchLogs(option, date, rol, id)
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