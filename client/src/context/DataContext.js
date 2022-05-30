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
    const [page, setPage] = useState('rolcobro')
    const [rolIndex, setRolIndex] = useState(0)
    const [showPopup, setShowPopup] = useState(false)
    const [crudFilter, setCrudFilter] = useState({ crudType: 'Consultar', filter: 'Rol', type: 'read', filters: ['Ingresar', 'Consultar', 'Descargar']})
    const [searching, setSearching] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [incompleteFields, setIncompleteFields] = useState(false)

    const permisoInitialValue = crudFilter.type !== 'insert' ? { _id: '', MATRIZ_V: '', DIGITO_V: '', MATRIZ_A: '', DIGITO_A: '', NOMBRE: '', APELLIDO_P: '', APELLIDO_M: '', RUT: '', DOMICILIO: '', COMUNA: '', TELEFONO: '', MZ: '', NSTPC: '', CALLE: '', SECTOR: '', DESTINO: '', N_VIV: 0, M2_C_RECEP: 0, M2_C_PERM: 0, M2_S_PERM: 0, M2_TOTAL: 0, UI_NUM: 0, UI_ANO: 0, TIPO_EXPEDIENTE: '', ESTADO: '', DESDE: '', DERECHOS: 0, COMENTARIO: '' }
    : { MATRIZ_V: '', DIGITO_V: '', MATRIZ_A: '', DIGITO_A: '', NOMBRE: '', APELLIDO_P: '', APELLIDO_M: '', RUT: '', DOMICILIO: '', COMUNA: '', TELEFONO: '', MZ: '', NSTPC: '', CALLE: '', SECTOR: '', DESTINO: '', N_VIV: 0, M2_C_RECEP: 0, M2_C_PERM: 0, M2_S_PERM: 0, M2_TOTAL: 0, UI_NUM: 0, UI_ANO: 0, TIPO_EXPEDIENTE: '', ESTADO: '', DESDE: '', DERECHOS: 0, COMENTARIO: '' }
    const [newPermiso, setNewPermiso] = useState(permisoInitialValue)

    const preventNegative = (e, fc, object) => {
        if (object) {
            return e.target.value < 0 ? fc(item => ({...item, [e.target.name]: 0 })) : fc(item => ({...item, [e.target.name]: e.target.value }))
        }
        e.target.value < 0 ? fc(0) : fc(e.target.value)
    }

    useEffect(() => {
        isAuthenticated().then(data => {
            setUser(data.user)
            setIsAuth(data.isAuthenticated)
            setIsLoaded(true)
        })
    }, [])

    useEffect(() => {
        if (crudFilter.type !== 'insert') {
            // se asignan los valores en roles a newPermiso, cada vez que estos se cambian, en caso de no estar definidos, se asigna un 0 o ''
            Object.keys(newPermiso).forEach(key => newPermiso[key] = roles[rolIndex]?.[key] || (typeof roles[rolIndex]?.[key] == 'number' ? 0 : ''))
        }
    }, [roles, rolIndex])

    useEffect(() => {
        if (page === 'permisos')
            setCrudFilter(prev => ({...prev, crudType: 'Consultar', filter: 'Rol Vigente', type: 'read'}))
        else
            setCrudFilter(prev => ({...prev, crudType: 'Consultar', filter: 'Rol', type: 'read'}))
        setMessage('')
    }, [page])

    useEffect(() => {
        setIsValid(false)
        setIncompleteFields(false)
    }, [crudFilter])

    return (
        <div>
            {
                !isLoaded ? <h1>Loading...</h1> :
                <DataContext.Provider value={{ roles, dispatch, user, setUser, isAuth, setIsAuth, page, setPage, message, setMessage, newPermiso, setNewPermiso, permisoInitialValue, showPopup, setShowPopup, rolIndex, setRolIndex, crudFilter, setCrudFilter, searching, setSearching, toggleMenu, setToggleMenu, preventNegative, isValid, setIsValid, incompleteFields, setIncompleteFields }}>
                    { children }
                </DataContext.Provider>
            }
        </div>
    )
}