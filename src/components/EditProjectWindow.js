import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Datepicker from './Datepicker'
import Modal from 'react-bootstrap/Modal'
import {BiEdit} from 'react-icons/bi'

import React, { Component } from 'react'

export default class EditProjectWindow extends Component {
    constructor(props){
        super(props);
        let employees = JSON.parse(localStorage.getItem("employees"))
        this.state = {show:false, name:this.props.values.name, description:this.props.values.description,
                      state:this.props.values.state, start:this.props.values.start, finish:this.props.values.finish,
                      leader_name:this.props.values.leader_name || 0, employees:employees, leader: this.props.values.leader}
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleLeader = this.handleLeader.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(date){
        try{
            let month = (parseInt(date.getMonth() + 1))
            toString(month)
            let formattedDate = ( month + "/" + date.getDate() + "/" + date.getFullYear());
            return formattedDate;
        } catch(e){
            return date;
        }
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
    handleStart(start){
        this.setState({start:start});
    }
    handleFinish(finish){
        this.setState({finish:finish});
    }
    handleLeader(leader){
        let emp = JSON.parse(localStorage.getItem("employees")).find((e)=>e.id == leader)
        let name = emp.name + ' ' + emp.last_name;
        this.setState({leader:leader, leader_name:name});
    }
    handleClose(){
        this.setState({show:false});
    }
    handleShow(){
        this.setState({show:true});   
    }
    handleSubmit(){
        this.props.onSubmit(this.state);
        this.handleClose();
    }

    render() {
        return (
      <>
        <Button size="sm" className="crud-button" variant="success" onClick={this.handleShow}><BiEdit/></Button>
        <Modal key={this.state.key} show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Editor - {this.props.values.name}</Modal.Title>
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
                        <Form.Select onChange={(e) => this.handleState(e)} column sm="2" aria-label="Default select example">
                            <option>{this.state.state}</option>
                            <option value="Inicio">Inicio</option>
                            <option value="Desarrollo">Desarrollo</option>
                            <option value="Transición">Transición</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="startDate">
                    <Form.Label column sm="4">Fecha de inicio <span className="obligatory">*</span></Form.Label>
                    <Col sm="auto">
                        <Form.Control readOnly value={this.formatDate(this.state.start)} />
                    </Col>
                    <Col sm="2"><Datepicker date={this.state.start} selectDate={this.handleStart}/></Col>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="finishDate">
                    <Form.Label column sm="4">Fecha de finalización <span className="obligatory">*</span></Form.Label>
                    <Col lg="auto" sm="auto">
                        <Form.Control readOnly value={this.formatDate(this.state.finish)} />
                    </Col>
                    <Col sm="2"><Datepicker date={this.state.finish} selectDate={this.handleFinish}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 left-align" controlId="leader">
                    <Col sm="auto">    
                        <Form.Label>Asignado a </Form.Label>
                    </Col>
                    <Col sm="auto">
                        <Form.Control as="select" key={this.state.key} onChange={(e) => this.handleLeader(e.target.value)} column sm="2" aria-label="Default select example">
                            <option>{this.state.leader_name}</option>
                            {this.state.employees.length > 0 && this.state.employees.map((e) => {
                                return(
                                    <option value={e.id}>{e.name + ' '  + e.last_name}</option>
                                )
                            })}
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
