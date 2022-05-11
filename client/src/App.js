import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RolCobro from './components/RolCobro/RolCobro'
import RolConsulta from './components/RolConsulta/RolConsulta'
import Auth from './components/Auth/Auth'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

export default function App() {
  
  return (
    <div className='app-container'>
      <Routes>
        <Route path="/*" element={ <PrivateRoute /> }>
          <Route path="/*" element={ [<Navbar key='navApp'/>, <RolCobro key='rolbody' />] }/>
        </Route>
        <Route path="/permisos/*" element={ <PrivateRoute /> }>
          <Route path="/permisos/*" element={ [<Navbar key='navApp'/>, <RolConsulta key='rol2body' />] }/>
        </Route>
        <Route exact path='/auth/*' element={ <Auth key='auth' /> }/>
      </Routes>
    </div>
  )
}

// TODO list
// import & export excel files to & from mongodb, all this from the web app
// refactor code
// response message when searching for roles/permisos in case the result is []