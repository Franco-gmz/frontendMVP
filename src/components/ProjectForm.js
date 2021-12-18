import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Datepicker from './Datepicker'
import './ProjectForm.css'
import { createProject } from '../services/projects/createProject'
import { Toast } from 'bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer'

export default class ProjectForm extends Component {

    constructor(){
        super();
        this.formatDate = this.formatDate.bind(this);
        this.handlerSelectedStartDate = this.handlerSelectedStartDate.bind(this);
        this.handlerSelectedFinishDate = this.handlerSelectedFinishDate.bind(this);
        this.handlerName = this.handlerName.bind(this);
        this.handlerDescription = this.handlerDescription.bind(this);
        this.handlerLeader = this.handlerLeader.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.cleanForm = this.cleanForm.bind(this);
        this.validForm = this.validForm.bind(this);
        this.state = {name:'', description:'', state:'Inicio',startDate: new Date(), finishDate: new Date(), leader:0, submitError:false, errorMsg:''};
    }
    
    formatDate(date){
        let month = (parseInt(date.getMonth() + 1))
        toString(month)
        return (date.getDate() + "/" + month + "/" + date.getFullYear());
    }

    getEmployees(){
        return JSON.parse(localStorage.getItem("employees"))

    }

    render() {
        return (
            <div id="project-form-container">
                <Form>
                    <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre <span className="obligatory">*</span></Form.Label>
                        <Form.Control value={this.state.name} onChange={this.handlerName}/>
                        <Form.Text className="text-muted">Máx. 20 caracteres</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Descripción <span className="obligatory">*</span></Form.Label>
                        <Form.Control value={this.state.description} as="textarea" rows={3} onChange={this.handlerDescription} />
                        <Form.Text className="text-muted">Máx. 50 caracteres</Form.Text>
                    </Form.Group>
                    <Form.Group  as={Row} className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                        <Form.Label column sm="2">Estado</Form.Label>
                        <Col md="2" sm="auto">
                            <Form.Control readOnly defaultValue={this.state.state} />
                        </Col>
                    </Form.Group>
                    <Form.Group  as={Row} className="mb-3 left-align" controlId="startDate">
                        <Form.Label column sm="2">Fecha de inicio <span className="obligatory">*</span></Form.Label>
                        <Col md="2" sm="auto">
                            <Form.Control readOnly value={this.formatDate(this.state.startDate)} />
                        </Col>
                        <Col sm="2"><Datepicker date={this.state.startDate} selectDate={this.handlerSelectedStartDate}/></Col>
                    </Form.Group>
                    <Form.Group  as={Row} className="mb-3 left-align" controlId="finishDate">
                        <Form.Label column sm="2">Fecha de finalización <span className="obligatory">*</span></Form.Label>
                        <Col lg="auto" md="2" sm="auto">
                            <Form.Control readOnly value={this.formatDate(this.state.finishDate)} />
                        </Col>
                        <Col sm="2"><Datepicker date={this.state.finishDate} selectDate={this.handlerSelectedFinishDate}/></Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3 left-align" controlId="leader">
                        <Col md="2" sm="auto">    
                            <Form.Label>Asignado a </Form.Label>
                        </Col>
                        <Col md="2" sm="auto">
                            <Form.Select onChange={this.handlerLeader} column sm="2" aria-label="Default select example">
                                <option value="0" selected>Sin asignar</option>
                                {this.getEmployees().map((e) => <option value={e.id}>{e.name + ' ' + e.last_name}</option>)}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                    <Button id="create-project-button" type="submit" onClick={this.handlerSubmit} variant="success">Crear proyecto</Button>
                </Form> 
                {this.state.submitError &&
                <ToastContainer className="p-3" position="top-end">
                    <Toast>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Error</strong>
                            <small>Descripción</small>
                        </Toast.Header>
                        <Toast.Body>{this.state.errorMsg}</Toast.Body>
                    </Toast>
                </ToastContainer>}          
            </div>
        )
    }

    handlerSelectedStartDate(selectedDate){
        this.setState({startDate:selectedDate});
    }

    handlerSelectedFinishDate(selectedDate){
        this.setState({finishDate:selectedDate});
    }

    async handlerSubmit(e){
        e.preventDefault();
        let validation = this.validForm();
        if(validation.isValid){
            let res = await createProject({name:this.state.name, description:this.state.description,
                start:this.state.startDate,finish:this.state.finishDate,
                leader:this.state.leader, state:this.state.state}); //seleccionar lider
            if(res.status == 200){
                this.cleanForm();
                this.props.onSubmit();
            }
        } else {
            this.setState({submitError:true, errorMsg:validation.message});
            setTimeout(()=> {
                this.setState({submitError:false, errorMsg:''})
            }, 2000);
        }
        
    }

    handlerName(e){
        if(e.target.value.length <= 20) this.setState({name:e.target.value}); 
    }

    handlerDescription(e){
        if(e.target.value.length <= 50) this.setState({description:e.target.value}); 
    }

    handlerLeader(e){
        console.log(e.target.value);
        this.setState({leader:e.target.value}); //usar array q me da rrhh y toma el index de target.value
    }

    cleanForm(){
        this.setState({name:'', description:'', state:'No iniciado',startDate: new Date(), finishDate: new Date(), leader:0});
    }

    validForm(){
        let valid = true;
        let message = '';
        let lname = this.state.name.length;
        let ldescrp = this.state.description.length;
        if(lname <= 0 && lname > 20){
            valid = false;
            message = 'El nombre debe contener entre 0 y 20 caracteres'
        }
        else if(ldescrp <= 0 && ldescrp > 50){
            valid = false;
            message = 'La descripción debe contener entre 0 y 50 caracteres'
            return {isValid: valid, message: message}
        }
        return {isValid: valid, message: message}
    }
}
