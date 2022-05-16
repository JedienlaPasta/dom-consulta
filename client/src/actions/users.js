import { clearUser, isUserAuth, userAuth } from "../api/api";

export const login = async (user, setMessage) => {
    try {
        const { data } = await userAuth(user)
        setMessage(data.message)
        return data
    } catch (error) {
        if (error.response) {
            setMessage(error.response.data.message)
        }
    }
}

export const logout = async () => {
    try {
        await clearUser()
    } catch (error) {
        console.log("couldn't clear cookie")
    }
    return { isAuthenticated: false, user: { name: '', role: '' }}
}

export const isAuthenticated = async () => {
    try {
        const { data } = await isUserAuth()
        return data
    } catch (error) {
        return { isAuthenticated: false, user: { name: '', role: '' }}
    }
}