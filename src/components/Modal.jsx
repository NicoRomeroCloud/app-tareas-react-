import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import Swal from "sweetalert2";

// Aquí, se define la clase CustomModal como un componente de clase de React. En el constructor, inicializamos el estado del componente:
// activeItem: Almacena los datos de la tarea que se está creando o editando. Estos datos se pasan al componente como props.
// errors: Un objeto que se utiliza para manejar mensajes de error. Inicialmente, contiene un mensaje de error vacío para el campo done.

class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            errors: {
                done: ""
            }
        };
    }



    // handleChange es un método que se llama cada vez que cambia un campo en el formulario del modal. Realiza las siguientes acciones:
    // Extrae el name y value del elemento que cambió.
    // Si el elemento es de tipo checkbox, actualiza value en consecuencia.
    // Realiza validación de campos, verificando si title o description están en blanco. Si es así, establece mensajes de error en el objeto errors.
    // Actualiza el estado del componente con los cambios realizados en activeItem y errors.


    handleChange = (e) => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }
        // const errors está creando una copia del objeto this.state.errors 
        // utilizando el operador de propagación (spread operator) 
        // en JavaScript. Lo que hace específicamente es crear un 
        // nuevo objeto que es una copia superficial del objeto 
        // this.state.errors
        const errors = { ...this.state.errors };


        // Validación para el campo "title"
        if (name === 'title' && value.trim() === '') {
            errors.title = 'Este campo es obligatorio';
        } else {
            errors.title = ''; // Reinicia el mensaje de error
        }

        // Validación para el campo "description"
        if (name === 'description' && value.trim() === '') {
            errors.description = 'Este campo es obligatorio';
        } else {
            errors.description = ''; // Reinicia el mensaje de error
        }

        this.setState({
            activeItem: {
                ...this.state.activeItem,
                [name]: value
            },
            errors
        });
    };

    // El método render define la estructura visual del modal. Aquí se detallan los elementos clave:
    // El modal se muestra si isOpen es true y se puede cerrar utilizando la función toggle.
    // Se muestra un encabezado con el título "Tarea".
    // Dentro del modal, se encuentra un formulario con campos para el título, la descripción y una casilla de verificación para marcar como completada.
    // Se realizan validaciones para comprobar si el botón "Guardar" debe estar deshabilitado (isSaveDisabled). Este botón está deshabilitado si no se ha proporcionado un título o una descripción.
    // Los campos title y description se asocian con el método handleChange, lo que significa que cuando cambian, se llama a handleChange.
    // Si existen mensajes de error en los campos title o description, se muestran debajo de los respectivos campos con un fondo rojo y texto blanco.


    render() {
        const { toggle, onSave } = this.props;

        // Validación para determinar si el botón "Guardar" debe estar deshabilitado
        const isSaveDisabled =
            !this.state.activeItem.title ||  // Requiere un título
            !this.state.activeItem.description;  // Requiere una descripción
        return (
            <Modal isOpen={true} toggle={toggle}>

                <ModalHeader toggle={toggle}>Tarea</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            {/* label del título */}
                            <Label for="title">Título</Label>
                            <Input type="text"
                                name="title"
                                required
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Ingresa el título de la tarea">Título
                            </Input>
                            {this.state.errors.title && ( // Muestra el mensaje de error si existe un error en el campo "title"
                                <div className="error-message" style={{ backgroundColor: 'red', color: 'white' }}>{this.state.errors.title}</div>
                            )}
                        </FormGroup>

                        <FormGroup>
                            {/* label de la descripción */}
                            <Label for="description">Descripción</Label>
                            <Input type="text"
                                name="description"
                                required
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Ingresa la descripción de la tarea">Descripción
                            </Input>
                            {this.state.errors.description && ( // Muestra el mensaje de error si existe un error en el campo "description"
                                <div className="error-message" style={{ backgroundColor: 'red', color: 'white' }}>{this.state.errors.description}</div>
                            )}
                        </FormGroup>

                        <FormGroup check>
                            <Label for="done">
                                <Input type="checkbox"
                                    name="done"
                                    value={this.state.activeItem.done}
                                    onChange={this.handleChange}
                                >
                                </Input>

                                Completada

                            </Label>
                        </FormGroup>

                    </Form>
                </ModalBody>

                {/* Finalmente, en el ModalFooter, se encuentra el botón "Guardar". Este botón tiene las siguientes características:
Es de color verde (color "success").
Cuando se hace clic, verifica si los campos requeridos (title y description) están llenos.
Si ambos campos están llenos, llama a la función onSave con los datos de la tarea.
Utiliza SweetAlert2 para mostrar una notificación de éxito: "Tarea guardada" si se está creando una nueva tarea o "Tarea editada" si se está editando una tarea existente.
El botón estará deshabilitado si isSaveDisabled es true, es decir, si faltan datos en los campos requeridos. */}

                <ModalFooter>
                    <Button
                        color="success"
                        onClick={() => {
                            // Validar si los campos requeridos están llenos
                            if (this.state.activeItem.title && this.state.activeItem.description) {
                                // Guardar los cambios
                                onSave(this.state.activeItem);

                                // Mostrar la notificación de éxito
                                if (!this.state.activeItem.id) {
                                    Swal.fire({
                                        title: 'Tarea guardada!',
                                        icon: 'success',
                                        timer: 1500,
                                        showConfirmButton: false
                                    });
                                } else {
                                    Swal.fire({
                                        title: 'Tarea editada!',
                                        icon: 'success',
                                        timer: 1500,
                                        showConfirmButton: false
                                    });
                                }
                            }
                        }}
                        disabled={isSaveDisabled}
                    >
                        Guardar
                    </Button>


                </ModalFooter>

            </Modal>
        )
    }


}

export default CustomModal;