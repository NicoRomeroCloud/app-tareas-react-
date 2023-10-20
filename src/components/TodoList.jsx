import React, { Component } from "react";


// Se define la clase TodoList como un componente de clase de React.
class TodoList extends Component {

    // renderTabList es un método de la clase que se encarga de renderizar la lista de pestañas para filtrar tareas. Aquí están los detalles:
    // Se devuelve un elemento div con una clase de estilo tab-list.
    // Se muestran dos elementos span con los textos "Completa" e "Incompleta". Estos elementos permiten al usuario cambiar entre la visualización de tareas completadas e incompletas.
    // Se utiliza el evento onClick para llamar a las funciones displayCompleted(true) y displayCompleted(false) cuando el usuario hace clic en "Completa" o "Incompleta", respectivamente. Estas funciones son pasadas como props desde el componente padre y se utilizan para cambiar la vista de tareas completadas o incompletas.
    // Se aplica una clase active a uno de los elementos span según el valor de viewCompleted para indicar visualmente qué filtro está activo.
    renderTabList = () => {
        return (
            <div className='my-5 tab-list'>
                <span
                    onClick={() => this.props.displayCompleted(true)}
                    className={this.props.viewCompleted ? "active" : ""}
                >
                    Completa
                </span>
                <span
                    onClick={() => this.props.displayCompleted(false)}
                    className={this.props.viewCompleted ? "" : "active"}
                >
                    Incompleta
                </span>
            </div>
        );
    }

    // El método render renderiza el contenido del 
    // componente TodoList. En este caso, simplemente se 
    // llama a la función renderTabList() para mostrar la 
    // lista de pestañas.
    render() {
        return (
            <div>
                {this.renderTabList()}
            </div>
        )
    }
}

// Exportamos el componente TodoList para que pueda 
// ser utilizado en otros componentes de la aplicación.
export default TodoList;