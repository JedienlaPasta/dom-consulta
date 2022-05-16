import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import RolCobro from './components/RolCobro/RolCobro'
import RolConsulta from './components/RolConsulta/RolConsulta'
import Auth from './components/Auth/Auth'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { DataContext } from './context/DataContext'

export default function App() {
  const { user } = useContext(DataContext)
  
  return (
    <div className='app-container'>
      <Routes>
        <Route path="/*" element={ <PrivateRoute /> }>
          <Route path="/*" element={ [<Navbar key='navApp'/>, <RolCobro key='rolbody' />] }/>
        </Route>
        { (user.role === 'dom_admin' || user.role === 'dom_user') &&
          <Route path="/permisos/*" element={ <PrivateRoute /> }>
            <Route path="/permisos/*" element={ [<Navbar key='navApp'/>, <RolConsulta key='rol2body' />] }/>
          </Route>
        }
        <Route exact path='/auth/*' element={ <Auth key='auth' /> }/>
      </Routes>
    </div>
  )
}

// TODO list
// refactorizar codigo
// validar en el servidor el rol del usuario cada vez que haga algun request
// revizar el tema de las mayusculas y minusculas
// revizar el tema de los campos obligatorios y no obligatorios
// vista de tabla para computador de escritorio