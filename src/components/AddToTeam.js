import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import  {AiOutlinePlus} from 'react-icons/ai'
import { Table } from 'react-bootstrap'

//pasandole un handler para cuando acepte, cubro proyecto y tarea

export default class AddToTeam extends Component {
    constructor(props){
        super(props);
        this.state = {show:false, is_project: this.props.project, added:[]}
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    render() {
        return (
    <>
        <Button variant="info" onClick={this.handleShow}><AiOutlinePlus/></Button>
        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Agregar miembros {this.state.is_project ? "al proyecto" : "a la tarea"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3 left-align" controlId="leader">
                        <Col sm="auto">    
                            <Form.Label>Empleados</Form.Label>
                        </Col>
                        <Col sm="6">
                            <Form.Select onChange={this.handleAdd} column sm="2" aria-label="Default select example">
                                <option value="1">Ejemplo1</option>
                                <option value="2">Ejemplo2</option>
                                <option value="3">Ejemplo3</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Form> 
                <Table striped hover bordered responsive variant="light">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.added.map( (member, index) => {
                            return(<tr>
                                   <td>member.id</td>
                                   <td>member.surname</td>
                                   <td>member.name</td>
                                   </tr>)
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={this.handleSubmit}>Aceptar</Button>
                <Button variant="danger" onClick={this.handleClose}>Cancelar</Button>
            </Modal.Footer>
        </Modal>
    </>
        )
    }

    handleClose(){
        this.setState({show:false});
    }
    handleShow(){
        this.setState({show:true});   
    }

    handleAdd(id){
        let added = this.state.added;
        added.push(id);
        this.setState({added:added});
    }
}
