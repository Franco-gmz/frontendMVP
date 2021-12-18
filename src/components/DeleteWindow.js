import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {AiFillDelete} from 'react-icons/ai'

export default function EditWindow(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => props.onDelete();

    return (
      <>
        <Button size="sm" className="crud-button" variant="danger" onClick={handleShow}><AiFillDelete/></Button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Eliminar proyecto - {props.values.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Si elimina este proyecto, se eliminarán todas las tareas asociadas y el personal asignado ¿Está seguro?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
            <Button variant="success" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

    


