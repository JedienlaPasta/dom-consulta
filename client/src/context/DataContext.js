import React, { createContext, useEffect, useReducer, useState } from "react";
import { isAuthenticated } from "../actions/users";

export const ACTIONS = {
    FETCH_MATCHES: 'fetch_matches'
}

const reducer = (roles, action) => {
    switch(action.type) {
        case ACTIONS.FETCH_MATCHES:
            return action.payload
        default:
            return roles
    }
}

const reducerInitialState = []

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [roles, dispatch] = useReducer(reducer, reducerInitialState)
    const [user, setUser] = useState({name: '', role: ''})
    const [isAuth, setIsAuth] = useState(false) // 'is the user authenticated?'
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState('')
    const [page, setPage] = useState('')
    const [rolIndex, setRolIndex] = useState(0)
    const [showPopup, setShowPopup] = useState(false)
    const [crudFilter, setCrudFilter] = useState({ crudType: 'Consultar', filter: 'ROL', type: 'read', filters: ['Ingresar', 'Consultar']})

    const permisoInitialValue = crudFilter.type !== 'insert' ? { _id: '', MATRIZ: '', DIGITO: '', NOMBRE: '', APELLIDO_P: '', APELLIDO_M: '', MZ: '', NSTPC: '', CALLE: '', SECTOR: '', N_VIV: '', M2_C_RECEP: '', M2_C_PERM: '', M2_S_PERM: '', M2_TOTAL: '', ESTADO: '' }
    : { MATRIZ: '', DIGITO: '', NOMBRE: '', APELLIDO_P: '', APELLIDO_M: '', MZ: '', NSTPC: '', CALLE: '', SECTOR: '', N_VIV: '', M2_C_RECEP: '', M2_C_PERM: '', M2_S_PERM: '', M2_TOTAL: '', ESTADO: '' }
    const [newPermiso, setNewPermiso] = useState(permisoInitialValue)

    useEffect(() => {
        isAuthenticated().then(data => {
            setUser(data.user)
            setIsAuth(data.isAuthenticated)
            setIsLoaded(true)
        })
    }, [])

    useEffect(() => {
        if (crudFilter.type !== 'insert') {
            // se asignan los valores en roles a newPermiso, cada vez que estos se cambian, en caso de no estar definidos, se asigna un ''
            Object.keys(newPermiso).forEach(key => newPermiso[key] = roles[rolIndex]?.[key] || '')
        }
    }, [roles, rolIndex])

    useEffect(() => {
        setCrudFilter(c => ({...c, crudType: 'Consultar', filter: 'ROL', type: 'read'}))
    }, [page])

    return (
        <div>
            {
                !isLoaded ? <h1>Loading...</h1> :
                <DataContext.Provider value={{ roles, dispatch, user, setUser, isAuth, setIsAuth, page, setPage, message, setMessage, newPermiso, setNewPermiso, permisoInitialValue, showPopup, setShowPopup, rolIndex, setRolIndex, crudFilter, setCrudFilter }}>
                    { children }
                </DataContext.Provider>
            }
        </div>
    )
}