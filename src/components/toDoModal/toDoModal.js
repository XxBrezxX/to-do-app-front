import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCaretDownFill } from "react-icons/bs";

function ToDoModal({ show, onHide }) {

    const [formData, setFormData] = useState({
        text: '',
        dueDate: '',
        priority: '',
    });
    const cambiarInput = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }
    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            dueDate: date,
        }));
    };
    const manejoEnvio = (event) => {
        event.preventDefault();
        const date = new Date();
        setFormData((prevData) => ({
            ...prevData,
            creationDate: date
        }));
        formData['creationDate'] = date;
        axios.post('http://localhost:8080/todos', formData)
        .then(response => {
          console.log('Todo creado:', response.data);
          // Aquí puedes realizar acciones adicionales después de crear el todo
          window.location.reload();
        })
        .catch(error => {
          console.error('Error al crear el todo:', error);
          // Aquí puedes manejar el error de alguna manera
        });
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>To-Do</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={manejoEnvio}>
                    {/* id, text, due date, priority, creationdate */}
                    <Form.Group controlId="formName" className="mx-1 my-2">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            type="text"
                            name="text"
                            value={formData.text}
                            onChange={cambiarInput}
                            placeholder="To-do"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDueDate" className="mx-1 my-2">
                        <Form.Label>Due Date</Form.Label>
                        <DatePicker
                            selected={formData.dueDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            dateFormat="dd/MM/yyyy h:mm aa"
                            timeFormat="HH:mm"
                            className="form-control"
                            timeIntervals={15}
                            placeholderText="Seleccione una fecha"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPriority" className="mx-1 my-2">
                        <Form.Label>Priority</Form.Label>
                        <div className="position-relative">
                            <Form.Control
                                as="select"
                                type="text"
                                name="priority"
                                value={formData.priority}
                                onChange={cambiarInput}
                            >
                                <option value="" disabled hidden>All, High, Medium, Low</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </Form.Control>
                            <div
                                className="position-absolute top-0 end-0 bottom-0 d-flex align-items-center px-4"
                                style={{ pointerEvents: 'none' }}
                            >
                                <BsCaretDownFill size={16} />
                            </div>
                        </div>
                    </Form.Group>
                    <Button variant="secondary" className="my-3" type="submit">Save</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' className='my-3' onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ToDoModal;