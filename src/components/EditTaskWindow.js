import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import {BiEdit} from 'react-icons/bi'
import AddToTeam from './AddToTeam';
import  {AiOutlinePlus} from 'react-icons/ai'


import React, { Component } from 'react'

export default class EditTaskWindow extends Component {
    constructor(props){
        super(props);
        console.log(props.values);
        this.state = {show:false, name:this.props.values.name || '', description:this.props.values.description || '',
                      state:this.props.values.state || ''}
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(name){
        this.setState({name:name});
    }
    handleDescription(description){
        this.setState({description:description});
    }
    handleState(state){
        this.setState({state:state});
    }
    handleClose(){
        this.setState({show:false});
    }
    handleShow(){
        this.setState({show:true});   
    }
    handleSubmit(){
        this.props.onSubmit(this.state);
    }

    render() {
        return (
      <>
        <Button variant="warning" onClick={this.handleShow}>{this.props.plus ? <AiOutlinePlus/>:<BiEdit/>}</Button>
        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Editor - {this.props.values.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre <span className="obligatory">*</span></Form.Label>
                    <Form.Control defaultValue={this.state.name} onChange={e => this.handleName(e.target.value)}/>
                    <Form.Text className="text-muted">Máx. 20 caracteres</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripción <span className="obligatory">*</span></Form.Label>
                    <Form.Control defaultValue={this.state.description} as="textarea" rows={3} onChange={e => this.handleDescription(e.target.value)} />
                    <Form.Text className="text-muted">Máx. 50 caracteres</Form.Text>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm="4">Estado</Form.Label>
                    <Col sm="auto">
                        <Form.Select onChange={this.handleState} column sm="2" aria-label="Default select example">
                            <option>{this.state.state}</option>
                            <option value="1">Ejemplo1</option>
                            <option value="2">Ejemplo2</option>
                            <option value="3">Ejemplo3</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Equipo</Form.Label><AddToTeam/>
                    <Form.Text className="text-muted">Mostrar equipo actual</Form.Text>
                </Form.Group>
            </Form> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.handleSubmit}>
              Aceptar
            </Button>
            <Button variant="danger" onClick={this.handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );}
}
