import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import { BsCaretDownFill } from 'react-icons/bs';
import { ToDoModel } from "../../models/toDo";
import axios from 'axios';

function FilteringControls({ actualizarDataTabla }) {

    useEffect(() => {
        axios.get('http://localhost:8080/todos', { params: { "page": 1 } })
            .then(response => {
                console.log(response.data);
                const toDoArray = response.data.map(todoData => {
                    const todo = new ToDoModel(todoData.uuid, todoData.text, todoData.dueDate, todoData.done, todoData.priority, todoData.creationDate)
                    return todo
                });
                actualizarDataTabla(toDoArray)
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        priority: '',
        state: ''
    });
    const cambiarInput = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }
    const manejoEnvio = (event) => {
        event.preventDefault();
        console.log(formData);
    }
    return (
        <Form onSubmit={manejoEnvio}>
            <Form.Group controlId="formName" className="row py-1">
                <Form.Label column sm="2">Name</Form.Label>
                <div className="col-sm-10">
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={cambiarInput}
                        placeholder="text"
                    />
                </div>
            </Form.Group>
            <Row>
                <Col md={8}>
                    <Form.Group controlId="formPriority" className="row py-1">
                        <Form.Label column sm="3">Priority</Form.Label>
                        <div className="col-sm-8 position-relative">
                            <Form.Control
                                as="select"
                                type="text"
                                name="priority"
                                value={formData.priority}
                                onChange={cambiarInput}
                            >
                                <option value="" disabled hidden>All, High, Medium, Low</option>
                                <option value="h">High</option>
                                <option value="m">Medium</option>
                                <option value="l">Low</option>
                            </Form.Control>
                            <div
                                className="position-absolute top-0 end-0 bottom-0 d-flex align-items-center px-4"
                                style={{ pointerEvents: 'none' }}
                            >
                                <BsCaretDownFill size={16} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formState" className="row py-1">
                        <Form.Label column sm="3">State</Form.Label>
                        <div className="col-sm-8 position-relative">
                            <Form.Control
                                as="select"
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={cambiarInput}
                            >
                                <option value="" disabled hidden>All, Done, Undone</option>
                                <option value="d">Done</option>
                                <option value="u">Undone</option>
                            </Form.Control>
                            <div
                                className="position-absolute top-0 end-0 bottom-0 d-flex align-items-center px-4"
                                style={{ pointerEvents: 'none' }}
                            >
                                <BsCaretDownFill size={16} />
                            </div>
                        </div>
                    </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end justify-content-end">
                    <Button variant="secondary" type="submit" className="px-4">
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default FilteringControls;