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




    handleChange = (e) => {
        let { name, value } = e.target;
        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

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