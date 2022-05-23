import React, { useContext } from 'react'
import './style.css'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { RiFileExcel2Line } from 'react-icons/ri' //excel icon
import Items from './Items'
import { Link } from 'react-router-dom'
import { ACTIONS, DataContext } from '../../../context/DataContext'
import { logout } from '../../../actions/users'

// const [crudFilter, setCrudFilter] = useState({ crudType: 'Consultar', filter: 'ROL', type: 'read', filters: ['Ingresar', 'Consultar', 'Descargar']})

export default function Sidebar() {
    const { user, setUser, setIsAuth, dispatch, page, setPage, setMessage, toggleMenu, setToggleMenu } = useContext(DataContext)
    const permisosFilters = [['Rol', 'Consultar'], ['Apellido Paterno', 'Consultar'], ['Dirección', 'Consultar'], ['Sector', 'Consultar'], ['N° Viv & m2 Total', 'Consultar']]
    const rolCobroFilters = [['Rol', 'Consultar'], ['Rut', 'Consultar'], ['Dirección', 'Consultar']]
    const displayItems = page === 'permisos' 
        ? permisosFilters.map(item => <Items key={item} val={item[0]} crudType={item[1]} />) 
        : rolCobroFilters.map(item => <Items key={item} val={item[0]} crudType={item[1]} />)
    
    const sidebarName = toggleMenu ? 'sidebar show-sidebar' : 'sidebar'

    const handleLogout = () => {
        setMessage('')
        logout().then(data => {
            setUser(data.user)
            setIsAuth(data.isAuthenticated)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        })
    }

    return (
        <div className={sidebarName}>
            <hr className='sidebar-hr' />
            <h3 className='sidebar-items'>Consultar Registro</h3>
            {displayItems}
            {   page === 'permisos' &&
                <>
                    <hr className='sidebar-hr' />
                    <h3 className='sidebar-items'>Ingresar Registro</h3>
                    <Items val={'Ingresar Nuevo'} crudType={'Ingresar'} />

                    <hr className='sidebar-hr' />
                    <h3 className='sidebar-items'>Descargas</h3>
                    <Items val={'XLSX'} crudType={'Descargar'} />
                </>
            }
            <hr className='sidebar-hr' />
            <h3 className='sidebar-items'>Cuenta</h3>
            <li className='logout-item' onClick={handleLogout}>
                <span><Link className='logout' to='/auth'><RiLogoutBoxRLine/></Link>Cerrar Sesión</span>
            </li>
        </div>
    )
}