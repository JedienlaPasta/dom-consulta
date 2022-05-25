import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { DataContext } from './context/DataContext'
import RolCobro from './components/Body/RolCobro'
import Permisos from './components/Body/Permisos'

export default function App() {
  const { user } = useContext(DataContext)
  
  return (
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

// DONE (mostly)
// al ingresar un registro nuevo, que se calcule automaticamente el valor de M2_TOTAL // calcular el valor total de M2_TOTAL (combinando los valores de todos los registros) (hecho, falta probar si funciona bien siempre)
// agregar popups de carga a las consultas que se realizan, para mejorar la experiencia de usuario al haber tiempos de esperas un tanto largos (mas o menos hecho, falta ver si tiene buen recibimiento)
// separar rol de cobro y permisos en elementos distintos para que al recargar se mantenga en la misma pagina
// podria hacer un array con los input, correspondiente a cada uno de los form que se van a mostrar, y que se muestre dependiendo de la pagina y el crudFilter.filter (mas o menos terminado, al menos funciona)
// que los registros se muestren en orden ascendente de acuerdo al rol (doble siclo for? el primero para rol1 y el segundo para rol2) // reparado temporalmente, no es totalmente funcional
// al presionar rapidamente el boton de editar, despues de presionar buscar, se produce un error. Se podria invalidar el uso de dichos botones hasta que llegue una respuesta por parte del servidor (solucion temporal: ahora no se puede cerrar el popup de carga)
// antes de que se envie el request y se abra el popup, que se verifique primero al usuario (ahora no se deberia abrir el popup si se vence el token)
// calcular el M2_TOTAL de la coleccion completa (hecho)
// En el FormDir se comparte el state, asi que hay que actualizarlo manualmente cada vez que se cambia de filter
// revizar el tema de las mayusculas y minusculas (de momento funciona)
// agregar el campo observaciones a los permisos (hecho)
// para los usuarios de DOM abrir por defecto la pagina en 'permisos' (hecho)
// se debe poder ingresar un nuevo registro con roles repetidos de un registro ingresado anteriormente, el unico valor unico seria el id (listo)
// resaltar campos obligatorios en caso de que esten vacios (mas o menos funciona, pero se puede mejorar)

// revizar el tema de los campos obligatorios y no obligatorios(hecho de momento, pero puede que se deban hacer cambios mas adelante)

// TODO list
// (later)
// refactorizar codigo
// validar en el servidor el rol del usuario cada vez que haga algun request
// guardar token en db y compararlo en cada request para verificar el rol del usuario
// ocultar M2 TOTAL en ingreso y de registros y solo mostrar en la consulta de M2 Totales totales?

// (now)
// vista de tabla para computador de escritorio, campos seteados a ciertos tamaños y al presionarlos, que estos se desplieguen mostrando toda la informacion (util para campos con valores muy extensos)
// crear un log que guarde todos los ingresos o cambios hechos de los registros: quien lo hizo, que hizo, cuando lo hizo. Esto iria guardado en una coleccion aparte de los permisos y solo la persona con cuenta de admin podria consultarla
// $sort roles, buscar como hacerlo con valores numericos en vez de string
// ingresar fechas de forma opcional?
// dropdown
// quitar el scroll behavior (quitar el efecto de la rueda del mouse en los input numericos)!!!!!
// ROL VIGENTE - ROL ASIGNADO
// que la pantalla de carga cuando se busca un registro aparezca altiro, y que diga verificando primero. Luego, si la autenticacion es positiva, que cambie el mensaje a buscando...

// informe

// que son los dynos de heroku? mongodb tiene una cantidad de requests limitada? => para dar sugerencias de busqueda
// en caso de hacerlo, quizas crear una coleccion aparte con todos los valores que quiero buscar y que cada vez que se actualize o cree un registro, se revize en la db si este valor existe, y si no existe, se agregue a la db

// cada vez que se haga un cambio en un registro o se ingrese uno nuevo, se guarda una spreadsheet en el google drive con GOOGLE DRIVE API
// https://www.youtube.com/watch?v=AwTxrCgIBWk&ab_channel=ProgrammingWithPrem \\ to abort or cancel API requests // \\ https://www.npmjs.com/package/react-use-cancel-token

// campos obligatorios (ojala todos estos)
// MATRIZ
// DIGITO
// NOMBRE             *
// N° VIV
// M2 C/RECEP
// M2 C/PERM
// M2 S/PERM
// M2 TOTAL
// U. INGRESO NÚM
// U. INGRESO AÑO
// DESDE              * (quizas no debiese ser obligatorio, ya que puede que aun no este aprobado el permiso)
// DERECHOS

// los * son de que aun falta ponerlos como obligatorios