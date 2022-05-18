import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACTIONS, DataContext } from '../../context/DataContext'
import Filter from './Filter/Filter'
import FormRol from './Form/FormRol'
import FormRut from './Form/FormRut'
import FormDir from './Form/FormDir'
import List from './List/List'

export default function AppBody() {
    const [filter, setFilter] = useState('ROL')
    const filters = [['ROL', <FormRol key={'rol'}/>], ['RUT', <FormRut key={'rut'}/>], ['DIR', <FormDir key={'dir'}/>]]
    const { roles, isAuth, dispatch } = useContext(DataContext)
    const history = useNavigate()
    
    const displayFilters = filters.map(item => <Filter key={item} val={item[0]} filter={filter} setFilter={setFilter} />)

    useEffect(() => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        if (!isAuth) return history('/auth')
    }, [isAuth, dispatch, history])

    return (
        <div className="super-body-container">
            <div className='body-container'>
                <ul className='filter-links'>{displayFilters}</ul>
                <h4 className='titulo-consulta'>Haga su consulta</h4>
                {
                    filters.map(item => item[0] === filter ? item[1] : null)
                }
                { roles.length > 0 && <List /> }
            </div>
        </div>
        
    )
}