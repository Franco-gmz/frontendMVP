import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import  { AiOutlineClose} from 'react-icons/ai'
import { Table } from 'react-bootstrap'
import { RiSearchLine } from 'react-icons/ri'
import  {AiOutlinePlus} from 'react-icons/ai'
import { addTaskTeam } from '../services/team/addTaskTeam'
import { deleteTaskTeam } from '../services/team/deleteTaskTeam'
import './TeamWindow.css'

export default class TeamWindow extends Component {
    constructor(props){
        super(props);
        this.state = {show:false, is_project: this.props.project, team:this.props.team || [], noteam:[], newMembers:[], removed:[]}
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        let employees = JSON.parse(localStorage.getItem("employees"));
        this.setState({
            team: employees.filter((employee) => {
                    return this.state.team.includes(employee.id)
            }),
            noteam: employees.filter((employee) => {
                    return !this.state.team.includes(employee.id)
            }),
        })
        this.setState({fetched:true})
    }

    render() {
        return (
    <>
        <Button className="team-window-button crud-button" variant="light" onClick={this.handleShow}><AiOutlinePlus/></Button>
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
                                {this.state.noteam.map((employee, index) => {
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

    async handleSubmit(){
        if(this.state.newMembers.length > 0) await addTaskTeam(this.props.id, this.state.newMembers)
        if(this.state.removed.length > 0){
            this.state.removed.forEach(async (employee) => {
                await deleteTaskTeam(this.props.id, employee)
            })            
        }
        this.setState({removed:[], newMembers:[]});
        this.handleClose();
        this.props.onUpdate();
    }

    handleClose(){
        this.setState({show:false});
    }
    handleShow(){
        this.setState({show:true});   
    }

    handleAdd(id){
        let newMember = this.state.noteam.filter((e) => e.id == id)[0];
        let currentTeam = this.state.team;
        currentTeam.push(newMember)
        let newMembers = this.state.newMembers;
        newMembers.push(id)
        let removed = this.state.removed.filter( i => i == id)
        this.setState({team:currentTeam, noteam: this.state.noteam.filter((e) => e.id != id), newMembers:newMembers, removed:removed})
    }

    handleDelete(id){
        let removedMember = this.state.team.filter((employee)=>{return employee.id == id;})[0];
        let currentNoTeam = this.state.noteam;
        currentNoTeam.push(removedMember)
        let removedMembers = [];
        removedMembers.push(id);
        let newMembers = this.state.newMembers.filter( i => i == id)
        this.setState({
            team: this.state.team.filter((employee)=>{
                return employee.id != id;
            }),
            removed:removedMembers,
            newMembers:newMembers,
            noteam: currentNoTeam
        })
    }
}
