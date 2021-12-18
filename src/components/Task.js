import React, { Component } from 'react'
import {Row, Col, Card} from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Accordion from 'react-bootstrap/Accordion'
import EditTaskWindow from './EditTaskWindow'
import DeleteWindow from './DeleteWindow'
import { updateTask } from '../services/tasks/updateTask'
import { deleteTask } from '../services/tasks/deleteTask'
import './Task.css'
import TeamWindow from './TeamWindow'
import { Table } from 'react-bootstrap'

export default class Task extends Component {

    constructor(props){
        super(props);
        this.state = {
            team: this.props.values.team || []
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdateTeam = this.handleUpdateTeam.bind(this)
    }

    async componentDidMount(){
        let employees = JSON.parse(localStorage.getItem("employees"));
        this.setState({
            team: employees.filter((employee) => {
                    return this.state.team.includes(employee.id)
            })
        })
    }

    render() {
        return (
                <Card id="task">
                    <Card.Header id="task-header" closeButton={false}>
                    <Row id="project-header-row">
                        <Col sm="auto"><Card.Title id="task-title">{this.props.values.id} - {this.props.values.name}</Card.Title></Col>
                        <Col id="buttons-col">
                            <ButtonGroup id="project-buttons">
                                <EditTaskWindow edit={true} values={this.props.values} onSubmit={this.handleUpdate}/>
                                <DeleteWindow onDelete={this.handleDelete} values={this.props.values}/>{'      '}
                            </ButtonGroup>
                        </Col>
                    </Row>
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle id="task-subtitle" className="task-state"><small>{this.props.values.state}</small></Card.Subtitle>
                        <Card.Subtitle id="task-subtitle" className="left-align task-description-subtitle">Descripción</Card.Subtitle>
                        <Card.Text className="task-description">{this.props.values.description}</Card.Text>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Equipo</Accordion.Header>
                                <Accordion.Body>
                                    <Card.Text className="task-team">
                                        <Table striped hover bordered responsive variant="light">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.team.map( (employee, index) => {
                                                    return(
                                                        <tr>
                                                            <td>{employee.id}</td>
                                                            <td>{employee.name}</td>
                                                            <td>{employee.last_name}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                        <TeamWindow onUpdate={this.handleUpdateTeam} id={this.props.values.id} team={this.state.team} />
                                    </Card.Text>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </Card>
        )
    }

    async handleUpdate(values){
        let res = await updateTask(this.props.id_project, this.props.values.id, values);
        this.props.onUpdate();
    }

    async handleDelete(){
        let res = await deleteTask(this.props.values.id);
        this.props.onUpdate();
    }

    handleUpdateTeam(){
        this.props.onUpdate();
    }
}
