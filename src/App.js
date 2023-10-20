import React, { Component } from 'react';
import './App.css';
import axios from 'axios'



import Modal from './components/Modal';
import TodoList from './components/TodoList';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';



const hol = 'Título';
const hola2 = 'Descripción';


class App extends Component {


  // Se define el constructor del componente. 
  // En el estado inicial del componente, se establecen varias 
  // propiedades, como modal (para controlar la visibilidad de un modal),
  // viewCompleted (para filtrar tareas completadas o incompletas), 
  // activeItem (para mantener un seguimiento del ítem de tarea 
  // actualmente activo), y 
  // taskList (para almacenar la lista de tareas).

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        done: false
      },
      taskList: []
    };
  }

  // Se implementa el método componentDidMount, 
  // que se ejecuta después de que el componente se monta. 
  // Llama a la función refreshList para cargar inicialmente 
  // la lista de tareas desde la API.
  componentDidMount() {
    this.refreshList();
  }

  // Se define el método refreshList, que utiliza
  // Axios para hacer una solicitud GET a una 
  // API en http://localhost:8000/api/tasks/. 
  // Cuando la solicitud se completa con éxito, 
  // actualiza el estado taskList con los datos 
  // de respuesta de la API.
  refreshList = () => {
    axios.get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err))
  }

  // Se define el método displayCompleted, que recibe un argumento 
  // status y actualiza el estado viewCompleted para 
  // filtrar las tareas completadas o incompletas.
  displayCompleted = status => {
    if (status) {
      this.setState({ viewCompleted: true });
    } else {
      this.setState({ viewCompleted: false });
    }
  }

  // Se define el método renderItems, que filtra las 
  // tareas basadas en el estado viewCompleted y luego 
  // mapea las tareas filtradas para renderizarlas en la 
  // interfaz de usuario.  
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.done === viewCompleted
    );

    return newItems.map(item => (

      <li key={item.id}
        className='list-group-item d-flex justify-content-between align-items-center'>
        {/* <div>
          <h3 ><b >Título</b></h3>
          <hr />
          <h3><b>Descripción</b></h3>

        </div> */}
        <span className={`todo-title mr-2 ${this.state.viewCompleted ? "complete-todo" : ""} `}
          title={item.title}
        >


          <div >
            <h5>{hol}: {item.title}</h5>
            <h5 >{hola2}: {item.description}</h5>
          </div>
        </span>

        <span>
          <button onClick={() => {
            this.editItem(item);

          }}
            className='btn btn-info mr-2' style={{ marginRight: '10px' }}>
            Editar
          </button>
          <button onClick={() => {

            Swal.fire({
              title: 'Estas seguro?',
              text: `Su tarea se eliminara permanentemente`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: 'Eliminado!',
                  text: 'Tarea eliminada',
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false
                }
                )
                this.handleDelete(item)


              }

            })

          }




          }
            className='btn btn-danger mr-2'>
            Eliminar
          </button>
        </span>


      </li>

    ))


  };


  // Se define el método toggle, que alterna la 
  // visibilidad del modal al cambiar el estado 
  // modal entre true y false.
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // Se define el método handleSubmit, que se llama cuando 
  // se envía un formulario. Dependiendo de si el elemento 
  // tiene una propiedad id, realiza una solicitud PUT para 
  // editar una tarea existente o una solicitud POST para 
  // crear una nueva tarea. Luego, llama a refreshList para 
  // actualizar la lista de tareas.
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // if old post to edit and submit
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then(res => this.refreshList());
  };

  // Se define el método handleDelete, que se utiliza para 
  // eliminar una tarea. Realiza una solicitud DELETE 
  // a la API y, después de la eliminación exitosa, 
  // llama a refreshList para actualizar la lista de tareas.
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList());
  };


  // Se define el método createItem, que se utiliza 
  // para crear una nueva tarea. Inicializa un objeto 
  // item con propiedades de título, descripción y 
  // completado, y luego actualiza el estado activeItem 
  // y modal para abrir el modal de creación.
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // Se define el método editItem, que se utiliza para editar 
  // una tarea existente. Actualiza el estado activeItem con 
  // la tarea seleccionada y abre el modal de edición.
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  // Se define el método render, que renderiza la interfaz de 
  // usuario de la aplicación. Esto incluye un encabezado, 
  // una lista de tareas y un botón para crear una nueva tarea. 
  // También muestra el modal de edición/creación de tareas.
  render() {
    return (
      <main className='content p-5 bg-dark' style={{ width: '100%', height: '100vh' }}>
        <h1 className='text-white text-uppercase text-center my-4'>Administrador de Tareas</h1>

        <div className='row'>
          <div className='col-md-6 col-sm-10 mx-auto p-0'>
            <div className='card p-3'>

              <div>
                <button onClick={this.createItem} className='btn btn-primary'>
                  Añadir tarea
                </button>

              </div>
              <TodoList
                displayCompleted={this.displayCompleted}

              />
              <ul className='list-group list-group-flush'>
                {this.renderItems()}
              </ul>



            </div>

          </div>

        </div>

        <footer className='my-5 mb-2 bg-dark text-white
        text-center'>Django - React

        </footer>

        {this.state.modal ? (
          <Modal activeItem={this.state.activeItem} toggle={this.toggle}
            onSave={this.handleSubmit} />
        ) : null}

      </main>
    )
  }










}

export default App;
