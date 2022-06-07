import React, { useContext } from 'react'
import './Sidebar.css'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { MdFindInPage, MdAddCircle, MdSimCardDownload, MdInsertChart, MdAccountCircle } from 'react-icons/md'
import Items from './Items'
import { Link } from 'react-router-dom'
import { ACTIONS, DataContext } from '../../../context/DataContext'
import { logout } from '../../../actions/users'

export default function Sidebar() {
    const { user, setUser, setIsAuth, dispatch, page, setMessage, toggleMenu } = useContext(DataContext)
    const permisosFilters = [['Rol Vigente', 'Consultar'], ['Rol Asignado', 'Consultar'], ['Rut', 'Consultar'], ['Apellido Paterno', 'Consultar'], ['Dirección', 'Consultar'], ['Sector', 'Consultar'], ['Id', 'Consultar'], ['N° Viv & m2 Total', 'Consultar']]
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
            {/* <hr className='sidebar-hr' /> */}
            <h4 className='sidebar-items account-item'>
                <MdAccountCircle className='account-logo'/>
                <span>
                    {user.name}
                    <li className='logout-item' onClick={handleLogout}>
                        <span><Link className='logout' to='/auth'></Link><span className='logout-text'>Cerrar Sesión</span></span>
                    </li>
                </span>
            </h4>
            <hr className='sidebar-hr' />
            <h4 className='sidebar-items'><MdFindInPage/><span>{page === 'permisos' ? 'Buscar Permisos' : 'Buscar Registros'}</span></h4>
            {displayItems}
            {   page === 'permisos' && user.role === 'dom_admin' &&
                <>
                    <hr className='sidebar-hr' />
                    <h4 className='sidebar-items'><MdAddCircle/><span>Ingresar Permiso</span></h4>
                    <Items val={'Nuevo'} crudType={'Ingresar'} />

                    <hr className='sidebar-hr' />
                    <h4 className='sidebar-items'><MdSimCardDownload/><span>Descargas</span></h4>
                    <Items val={'XLSX'} crudType={'Descargar'} />
                </>
            }
            {
                page === 'permisos' && user.role === 'dom_admin' &&
                <>
                    <hr className='sidebar-hr' />
                    <h4 className='sidebar-items'><MdInsertChart/><span>Buscar Eventos</span></h4>
                    <Items val={'Registro de Eventos'} crudType={'Ver Logs'} />
                </>
            }
        </div>
    )
}