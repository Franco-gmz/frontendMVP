import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import EditTaskWindow from './EditTaskWindow'
import DeleteWindow from './DeleteWindow'
import { updateTask } from '../services/tasks/updateTask'
import { deleteTask } from '../services/tasks/deleteTask'
import './Task.css'

export default class Task extends Component {

    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
                        <Card.Subtitle id="task-subtitle">Equipo asignado</Card.Subtitle>
                        <Card.Text className="task-team">{this.props.values.team || "Nadie ha sido asignado a esta tarea"}</Card.Text>
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
        if (res.status == "200") window.location.reload();
    }

    async handleDelete(){
        let res = await deleteTask(this.props.values.id);
        if (res.status == "200") window.location.reload();
    }
}
