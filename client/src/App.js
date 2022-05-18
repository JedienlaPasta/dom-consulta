import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
// import RolCobro from './components/RolCobro/RolCobro'
// import RolConsulta from './components/RolConsulta/RolConsulta'
import Consulta from './components/Consulta/Consulta'
import Auth from './components/Auth/Auth'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { DataContext } from './context/DataContext'
import RolCobro from './components/Body/RolCobro'
import Permisos from './components/Body/Permisos'

export default function App() {
  const { user } = useContext(DataContext)
  
  return (
    // <div className='app-container'>
    //   <Routes>
    //     <Route path="/*" element={ <PrivateRoute /> }>
    //       <Route path="/*" element={ [<Navbar key='navApp'/>, <RolCobro key='rolbody' />] }/>
    //     </Route>
    //     { (user.role === 'dom_admin' || user.role === 'dom_user') &&
    //       <Route path="/permisos/*" element={ <PrivateRoute /> }>
    //         <Route path="/permisos/*" element={ [<Navbar key='navApp'/>, <RolConsulta key='rol2body' />] }/>
    //       </Route>
    //     }
    //     <Route exact path='/auth/*' element={ <Auth key='auth' /> }/>
    //   </Routes>
    // </div>
      <div className='app-container'>
        <Routes>
          <Route path="/*" element={ <PrivateRoute /> }>
            <Route path="/*" element={ [<Navbar key='navApp'/>, <RolCobro key='rolcobro' />] }/>
          </Route>
          { (user.role === 'dom_admin' || user.role === 'dom_user') &&
            <Route path="/permisos/*" element={ <PrivateRoute /> }>
              <Route path="/permisos/*" element={ [<Navbar key='navApp'/>, <Permisos key='permisos' />] }/>
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
// al presionar rapidamente el boton de editar, despues de presionar buscar, se produce un error. Se podria invalidar el uso de dichos botones hasta que llegue una respuesta por parte del servidor
// agregar el campo observaciones a los permisos (depende del excel)
// al ingresar un registro nuevo, que se calcule automaticamente el valor de M2_TOTAL // calcular el valor total de M2_TOTAL (combinando los valores de todos los registros) (hecho, falta probar si funciona bien siempre)
// agregar popups de carga a las consultas que se realizan, para mejorar la experiencia de usuario al haber tiempos de esperas un tanto largos (mas o menos hecho, falta ver si tiene buen recibimiento)
// calcular el M2_TOTAL de la coleccion completa

// separar rol de cobro y permisos en elementos distintos para que al recargar se mantenga en la misma pagina

// podria hacer un array con los input, correspondiente a cada uno de los form que se van a mostrar, y que se muestre dependiendo de la pagina y el crudFilter.filter (mas o menos terminado, al menos funciona)
// que los registros se muestren en orden ascendente de acuerdo al rol (doble siclo for? el primero para rol1 y el segundo para rol2) // reparado temporalmente, no es totalmente funcional

// guardar token en db y compararlo en cada request para verificar el rol del usuario

// informe

// que son los dynos de heroku? mongodb tiene una cantidad de requests limitada? => para dar sugerencias de busqueda
// en caso de hacerlo, quizas crear una coleccion aparte con todos los valores que quiero buscar y que cada vez que se actualize o cree un registro, se revize en la db si este valor existe, y si no existe, se agregue a la db