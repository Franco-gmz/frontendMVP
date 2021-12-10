import React, { Component } from 'react'
import Toast from 'react-bootstrap/Toast'
import {AiFillDelete} from 'react-icons/ai'
import EditTaskWindow from './EditTaskWindow'
import './Task.css'

export default class Task extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
                <Toast id="task">
                    <Toast.Header closeButton={false}>
                        <strong className="me-auto">{this.props.values.id} - {this.props.values.name}</strong>
                        <small>{this.props.values.state}{'            '}<EditTaskWindow values={this.props.values}/></small>
                    </Toast.Header>
                    <Toast.Body>
                        <div className="left-align" id="task-description-container">
                            <strong>Descripción</strong>
                            <p className="task-description">{this.props.values.description}</p>
                        </div>
                        <div className="left-align" id="task-team-container">
                            <strong>Equipo asignado</strong>
                            <p className="task-team">{this.props.values.team || "Nadie ha sido asignado a esta tarea"}</p>
                        </div>
                    </Toast.Body>
                </Toast>
        )
    }
}
