import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
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
                    <Card.Header closeButton={false}>
                        <Card.Title id="task-title">{this.props.values.id} - {this.props.values.name}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle id="task-subtitle"><small>{this.props.values.state}</small></Card.Subtitle>
                        <Card.Subtitle id="task-subtitle">Descripción</Card.Subtitle>
                        <Card.Text className="task-description">{this.props.values.description}</Card.Text>
                        <Card.Subtitle id="task-subtitle">Equipo asignado{'   '}<TeamWindow onUpdate={this.handleUpdateTeam} id={this.props.values.id} team={this.state.team} /></Card.Subtitle>
                        <Card.Text className="task-team">
                            <Table>
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
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <ButtonGroup id="task-buttons">
                            <EditTaskWindow edit={true} values={this.props.values} onSubmit={this.handleUpdate}/>
                            <DeleteWindow onDelete={this.handleDelete} values={this.props.values}/>{'            '}
                        </ButtonGroup>
                    </Card.Footer>
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
