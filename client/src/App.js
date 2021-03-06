import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { DataContext } from './context/DataContext'
import RolCobro from './components/Body/RolCobro'
import Permisos from './components/Body/Permisos'
import ColorsLine from './components/ColorsLine/ColorsLine'

export default function App() {
  const { user } = useContext(DataContext)
  
  return (
      <div className='app-container'>
        <Routes>
          <Route path="/*" element={ <PrivateRoute /> }>
            <Route path="/*" element={ [<Navbar key='navApp'/>, <ColorsLine key='colorsLine'/>, <RolCobro key='rolcobro' />] }/>
          </Route>
          { (user.role === 'dom_admin' || user.role === 'dom_user') &&
            <Route path="/permisos/*" element={ <PrivateRoute /> }>
              <Route path="/permisos/*" element={ [ <Navbar key='navApp'/>, <ColorsLine key='colorsLine'/>, <Permisos key='permisos' />] }/>
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
// arreglar, popup de eliminar no muestra boton de 'continuar' (funciona)
// COMENTARIO AGRANDADO
// crear cuentas personales y cambiar las contrase??as de aseo y transito
// El campo derechos es de dinero, por lo que hay que aplicar el formato
// ROL VIGENTE - ROL ASIGNADO
// agregar campo de RUT
// crear un log que guarde todos los ingresos o cambios hechos de los registros: quien lo hizo, que hizo, cuando lo hizo. Esto iria guardado en una coleccion aparte de los permisos y solo la persona con cuenta de admin podria consultarla
// De momento funciona el ingresar datos, pero falta revisarlo mas a fondo, ver tambien el tema de editar datos. Eliminar funciona sin problemas
// Filtrar los logs por tipo de accion (eliminar, crear, editar) y por fecha quizas
// Agregar la busqueda de logs por id y por rol, ademas de guardar los roles en el registro de los logs, para facilitar su busqueda.
// Quitar el buscar permisos de rol_cobro
// Permitir ingresar el rut completo, quizas separarlo en 2 inputs \\ o que solo se ingrese el rut, sin el digito, pero al ingresarlo que se muestre cual seria.
// Agregar buscar por ID, en caso de buscar usando los logs
// Quitar el scroll behavior (quitar el efecto de la rueda del mouse en los input numericos)!!!!!
// Antes de ingresar la fecha de 'DESDE', darla vuelta para que se guarde en formato 'dd/mm/yyyy' y no 'yyyy/mm/dd' que es como se esta guardando ahora. Sino habria que actualizar todas las demas fechas que estan guardadas al formato nuevo y creo que quedaria un poco mal (de momento funciona, la fecha se da vueltas varias veces si en el sv y client)

// Revizar el tema de los campos obligatorios y no obligatorios(hecho de momento, pero puede que se deban hacer cambios mas adelante)
// El rol vigente o el asignado deben ser campos obligatorios, en el sentido de que almenos 1 de los 2 debe estar rellenado (de momento el rol vigente es obligatorio)

// TODO list
// (later)
// refactorizar codigo
// validar en el servidor el rol del usuario cada vez que haga algun request
// guardar token en db y compararlo en cada request para verificar el rol del usuario
// ocultar M2 TOTAL en ingreso y de registros y solo mostrar en la consulta de M2 Totales totales?
// https://devcenter.heroku.com/articles/scheduler  => servira para guardar la base de datos 1 vez al dia todos los dias?
// Quizas quitar el useEffect en Popup.js que abre el popup cada vez que llega un mensaje, de todas formas ya habia empezado a controlar eso directamente cuando llega el mensaje.
// Tambien podria ir eliminando los logs ingresados hace mas de 6 meses o 1 a??o por ejemplo || o que despues de ~2000 registros, se elimine el mas viejo automaticamente al ingresar uno nuevo

// (now)
// vista de tabla para computador de escritorio, campos seteados a ciertos tama??os y al presionarlos, que estos se desplieguen mostrando toda la informacion (util para campos con valores muy extensos)
// $sort roles, buscar como hacerlo con valores numericos en vez de string
// dropdown
// Que la pantalla de carga cuando se busca un registro aparezca altiro, y que diga verificando primero. Luego, si la autenticacion es positiva, que cambie el mensaje a buscando... Y para saber que tipo de mensaje debe mandar de vuelta la verificacion del usuario, se puede mandar una variable en la funcion auth() (o como se llame)
// despues de ~10 minutos cerrar sesion y mientras se este iniciando la aplicacion que aparezca un popup que diga Iniciando... (hasta recibir una respuesta del servidor)
// o sino mantener el servidor corriendo desde las 8 de la ma??ana hasta las 6 de la tarde de lunes a viernes con UptimeRobot https://dev.to/j471n/prevent-heroku-server-from-sleeping-for-free-1ib1
// Antes de ingresar los datos, intentar limpiarlos lo mejor posible, sacando puntos en los numeros, etc
// Aparece mensaje de la descarga puede tardar un poco, por favor espere. Efectivamente, no se limpia el timeout
// Quizas agregar un campo de busqueda adicional en los logs, para poder comparar los valores que se muestran en los logs con los que estan guardados en la DB
// Busqueda por mes ademas de por dia quizas, o por usuario
// Ver si hay alguna forma de verificar si la fecha es valida, ya que si no lo es de momento no se ingresa
// Permitir buscar rut con puntos y sin digito, eso si, mostrando al lado cual seria el DV igual que al ingresar un permiso nuevo

// informe
// Servicios y herramientas utilizadas (lenguajes, frameworks, stack, host, base de datos, respaldo)
// Caracteristicas y funcionalidades
// Problematica
// Objetivos
// Soluciones => (portabilidad, etc)
// Posibles mejoras, contratacion de servicios, precios
// Manual de usuario
// Diagramas ?

// que son los dynos de heroku? mongodb tiene una cantidad de requests limitada? => para dar sugerencias de busqueda
// en caso de hacerlo, quizas crear una coleccion aparte con todos los valores que quiero buscar y que cada vez que se actualize o cree un registro, se revize en la db si este valor existe, y si no existe, se agregue a la db

// cada vez que se haga un cambio en un registro o se ingrese uno nuevo, se guarda una spreadsheet en el google drive con GOOGLE DRIVE API
// https://www.youtube.com/watch?v=AwTxrCgIBWk&ab_channel=ProgrammingWithPrem \\ to abort or cancel API requests // \\ https://www.npmjs.com/package/react-use-cancel-token