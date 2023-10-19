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


  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios.get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err))
  }

  displayCompleted = status => {
    if (status) {
      this.setState({ viewCompleted: true });
    } else {
      this.setState({ viewCompleted: false });
    }
  }

  // renderizando los items de la lista que esten completos || incompletos
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



  toggle = () => {//add this after modal creation
    this.setState({ modal: !this.state.modal });//add this after modal creation
  };

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

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList());
  };



  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };



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
