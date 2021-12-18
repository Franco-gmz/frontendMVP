import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import {BiEdit} from 'react-icons/bi'
import  {AiOutlinePlus} from 'react-icons/ai'


import React, { Component } from 'react'

export default class EditTaskWindow extends Component {
    constructor(props){
        super(props);
        this.state = {show:false, name:this.props.values.name || '', description:this.props.values.description || '',
                      state:this.props.values.state || 'No iniciada'}
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(name){
      if(name.length <= 20) this.setState({name:name}); 
    }
    handleDescription(description){
        if(description.length <= 50){
            this.setState({description:description});
        }
    }
    handleState(e){
        this.setState({state:e.target.value});
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
        <Button variant="success" onClick={this.handleShow}>{!this.props.edit ? <div><AiOutlinePlus/></div>:<div><BiEdit/></div>}</Button>
        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.edit ? "Editar tarea":"Crear tarea"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre <span className="obligatory">*</span></Form.Label>
                    <Form.Control value={this.state.name} onChange={e => this.handleName(e.target.value)}/>
                    <Form.Text className="text-muted">Máx. 20 caracteres</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripción <span className="obligatory">*</span></Form.Label>
                    <Form.Control value={this.state.description} as="textarea" rows={3} onChange={e => this.handleDescription(e.target.value)} />
                    <Form.Text className="text-muted">Máx. 50 caracteres</Form.Text>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm="4">Estado</Form.Label>
                    <Col sm="auto">
                        <Form.Control as="select" onChange={(e) => this.handleState(e)} column sm="2" aria-label="Default select example">
                            <option selected={this.state.state == "No iniciada"} value="No iniciada">No iniciada</option>
                            <option selected={this.state.state == "Iniciada"} value="Iniciada">Iniciada</option>
                            <option selected={this.state.state == "Finalizada"} value="Finalizada">Finalizada</option>
                        </Form.Control>

                    </Col>
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
