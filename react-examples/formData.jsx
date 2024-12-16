import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function ModalEvent({ descricao = "descrição", data = "sem data", hora = "sem hora" }) {

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const [formData, setFormData] = useState({
        descricao,
        data,
        hora,
    });

    // AQUI QUE A MAGICA ACONTECE, VARRE TODOS OS CAMPOS E FAZ AUTOMATICO, BOM DEMAISSSSS
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        console.log(formData)
    };

   
    const handleSave = () => {
       
        console.log('Salvando dados:', formData);
        
        setShow(false);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show Modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Evento</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDescricao">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                type="text"
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formData">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="date"
                                name="data"
                                value={formData.data}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formHora">
                            <Form.Label>Hora</Form.Label>
                            <Form.Control
                                type="time"
                                name="hora"
                                value={formData.hora}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
