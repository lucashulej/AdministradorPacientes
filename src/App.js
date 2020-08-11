import React,{Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
function App() {

  //Citas iniciales
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }
  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //Se ejecuta cuando se carga el documento y hay un cambio en el state de citas
  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas] );

  //Funcion que tome las citas actuale y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita]);
  }

  //Funcion que elimina una sita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje condificional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className='container'>
        <div className='row'>
          <div className='one-half column'>
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
