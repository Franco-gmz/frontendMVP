import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import  {AiOutlinePlus, AiOutlineClose} from 'react-icons/ai'
import {BiEdit} from 'react-icons/bi'
import { Table } from 'react-bootstrap'
import { getAllEmployees } from '../services/team/getAllEmployees'

export default class AddToTeam extends Component {
    constructor(props){
        super(props);
        this.state = {show:false, is_project: this.props.project, team:[], remainingEmployees:[], added:[], removed:[]}
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        if(this.props.team && this.props.team.length != 0) {
            let fetched =  await getAllEmployees();
            this.setState({
                team: fetched.results.filter((employee) => {
                    return this.props.team.includes(employee.id)
                }),
                remainingEmployees: fetched.results.filter((employee) => {
                    return !this.props.team.includes(employee.id)
                }),
            })
        }
        this.setState({fetched:true})
    }

    render() {
        return (
    <>
        <Button className="crud-button" variant="success" onClick={this.handleShow}>Editar equipo     <BiEdit/></Button>
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
                            <Form.Control as="select" onChange={(e)=> this.handleAdd(e.target.value)} column sm="2" aria-label="Default select example">
                                <option></option>
                                {this.state.remainingEmployees.map((employee, index) => {
                                    return(
                                        <option key={index} value={employee.id}>{employee.name + ' ' + employee.last_name}</option>
                                    )
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form> 
                <Table striped hover bordered responsive variant="light">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.team.map( (member, index) => {
                            return(<tr key={index}>
                                   <td>{member.id}</td>
                                   <td>{member.name}</td>
                                   <td>{member.last_name}</td>
                                   <td><Button variant="danger" onClick={() => this.handleDelete(member.id)}><AiOutlineClose/></Button></td>
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

    handleSubmit(){
        this.props.onSubmit(this.state.added, this.state.removed);
    }

    handleClose(){
        this.setState({show:false});
        this.props.update();
    }
    handleShow(){
        this.setState({show:true});   
    }

    handleAdd(id){
        let employee = this.state.remainingEmployees.filter((e) => e.id == id)[0];
        let employees = this.state.team;
        employees.push(employee)
        let added = this.state.added;
        added.push(id)
        let removed = this.state.removed.filter( i => i ==id)
        this.setState({team:employees, remainingEmployees: this.state.remainingEmployees.filter((e) => e.id != id), added:added, removed:removed})
    }

    handleDelete(id){
        let employee = this.state.team.filter((employee)=>{return employee.id == id;})[0];
        let employees = this.state.remainingEmployees;
        employees.push(employee)
        let removed = [];
        removed.push(id);
        let added = this.state.added.filter( i => i == id)
        this.setState({
            team: this.state.team.filter((employee)=>{
                return employee.id != id;
            }),
            removed:removed,
            added:added,
            remainingEmployees: employees
        })
    }
}
