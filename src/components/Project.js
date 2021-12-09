import React, { Component } from 'react'
import TasksBoard from './TasksBoard';
import './Project.css'
import Team from './Team';
import AddToTeam from './AddToTeam';
import {AiOutlineClose} from 'react-icons/ai'
import EditWindow from './EditWindow';
import DeleteWindow from './DeleteWindow';
import { updateProject } from '../services/projects/updateProject'
import { deleteProject } from '../services/projects/deleteProject'
import Button from 'react-bootstrap/Button'

export default class Project extends Component {

    constructor(props){
        super(props);
        this.handlerUpdate = this.handlerUpdate.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
    }

    render() {
        return (
            <div>
                <div id="project-header">
                    <div id="project-info-container" className="left-align">
                        <small className="project-id">#{this.props.values.id}</small>
                        <h4 className="project-name">{this.props.values.name + '          '}
                                                     <EditWindow onSubmit={this.handlerUpdate} values={this.props.values} />{'     '}
                                                     <DeleteWindow onDelete={this.handlerDelete} values={this.props.values}/>{'     '}
                                                     <Button variant="warning"><AiOutlineClose onClick={this.props.onClose}/></Button>
                        </h4>
                        <strong className="project-name">Descripción</strong>
                        <p className="project-description">{this.props.values.description}</p>
                        <p className="project-state-container">Estado <span className="project-date">{this.props.values.state}</span></p>
                        <p className="project-start-container">Fecha de inicio <span className="project-date">{this.props.values.start}</span></p>
                        <p className="project-finish-container">Fecha de finalización <span className="project-date">{this.props.values.finish}</span></p>
                         <p className="project-leader-container">Asignado a <span className="project-leader">{this.props.values.leader || "Sin asignar"}</span></p>
                    </div>
                    <div id="project-team-container" className="left-align">
                        <strong>Equipo</strong><AddToTeam/>
                        <Team values={this.props.values.team} /> 
                    </div>
                </div>
                <h5 className="left-align">Tareas</h5>
                <TasksBoard id={this.props.values.id} />
            </div>
        )
    }

    async handlerUpdate(values){
        let res = await updateProject(this.props.values.id, values);
        if(res.status == 200) window.location.reload();
    }

    async handlerDelete(){
        let result = await deleteProject(this.props.values);
        if(result.status == 200) window.location.reload();
    }
}
