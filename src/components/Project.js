import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import TasksBoard from './TasksBoard';
import './Project.css'
import Team from './Team';
import AddToTeam from './AddToTeam';
import {AiOutlineClose} from 'react-icons/ai'
import EditProjectWindow from './EditProjectWindow';
import DeleteWindow from './DeleteWindow';
import { updateProject } from '../services/projects/updateProject'
import { deleteProject } from '../services/projects/deleteProject'
import { addToProjectTeam } from '../services/team/addToProjectTeam'
import { deleteFromProjectTeam } from '../services/team/deleteFromProjectTeam'
import { createTask } from '../services/tasks/createTask'
import Button from 'react-bootstrap/Button'
import EditTaskWindow from './EditTaskWindow';

export default class Project extends Component {

    constructor(props){
        super(props);
        this.state = {team:this.props.values.team, update:false}
        this.handlerUpdate = this.handlerUpdate.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
        this.handleCreateTask = this.handleCreateTask.bind(this);
        this.handleUpdateComponents = this.handleUpdateComponents.bind(this);
        this.handleUpdateTeam = this.handleUpdateTeam.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this)
    }

    render() {
        return (
            <div id="project-view" key={this.state.update}>
                <Card id="project-card">
                    <Card.Header id="project-header">
                        <Card.Title className="project-title">{this.props.values.name + '          '}</Card.Title>
                        <Card.Subtitle><small className="project-id">Identificador {this.props.values.id}</small></Card.Subtitle>
                    </Card.Header>
                    <Card.Body id="project-info">
                        <Card.Subtitle className="project-subtitle">Descripción</Card.Subtitle>
                        <Card.Text className="project-description">{this.props.values.description}</Card.Text>
                        <Card.Subtitle className="project-subtitle">Estado</Card.Subtitle>
                        <Card.Text className="project-state">{this.props.values.state}</Card.Text>
                        <Card.Subtitle className="project-subtitle">Fecha de inicio</Card.Subtitle>
                        <Card.Text className="project-start">{this.props.values.start}</Card.Text>
                        <Card.Subtitle className="project-subtitle">Fecha de finalización</Card.Subtitle>
                        <Card.Text className="project-finish">{this.props.values.finish}</Card.Text>
                        <Card.Subtitle className="project-subtitle">Asignado a</Card.Subtitle>
                        <Card.Text className="project-leader">{this.props.values.leader || "Sin asignar"}</Card.Text>
                        <Card.Subtitle className="project-subtitle">Asignado a</Card.Subtitle>
                        <Card.Text className="project-hours">{this.props.values.hours || 0}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <ButtonGroup id="project-buttons">
                            <EditProjectWindow onSubmit={this.handlerUpdate} values={this.props.values} />{'     '}
                            <DeleteWindow onDelete={this.handlerDelete} values={this.props.values}/>{'     '}
                            <Button className="crud-button" variant="warning" onClick={this.props.onClose}>Cerrar <AiOutlineClose/></Button>
                        </ButtonGroup>
                    </Card.Footer> 
                </Card>
                <Card id="project-team-card">
                    <Card.Header id="project-team-header">
                        <Card.Title id="project-team-title">Equipo</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Team key={this.state.update} values={this.state.team || []} /> 
                    </Card.Body>
                    <Card.Footer>
                        <ButtonGroup id="team-buttons">
                            <AddToTeam onSubmit={this.handleUpdateTeam} key={this.state.update} update={this.handleRefresh} team={this.state.team || []} project={true}/>
                        </ButtonGroup>
                    </Card.Footer>
                </Card>
                <Card id="project-tasks-card">
                    <Card.Header id="project-tasks-header">
                        <Card.Title>Tareas</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <TasksBoard id={this.props.values.id} />
                    </Card.Body>
                    <Card.Footer>
                        <ButtonGroup id="tasks-buttons">
                            <EditTaskWindow edit={false} onSubmit={this.handleCreateTask} values={{name:'',description:'', state:'',team:[]}}/>
                        </ButtonGroup>
                    </Card.Footer>
                </Card>
            </div>
        )
    }

    handleRefresh(){
        this.setState({update:!this.state.update})
    }

    async handlerUpdate(values){
        let res = await updateProject(this.props.values.id, values);
        if(res.status == 200) window.location.reload();
    }

    async handleCreateTask(values){
        let res = await createTask(this.props.values.id, values);
        if(res.status == 200) window.location.reload(); //revisar
    }

    async handlerDelete(){
        let result = await deleteProject(this.props.values);
        if(result.status == 200) window.location.reload();
    }

    handleUpdateComponents(){     
        this.props.onUpdate(this.props.values.id);
        this.setState({update: !this.state.update});
    }

    async handleUpdateTeam(added, removed){
        if (added.length > 0){
            let res = await addToProjectTeam(this.props.values.id, added);
        }
        if (removed.length > 0){
            removed.forEach(async (e) => {
                let res = await deleteFromProjectTeam(this.props.values.id, e);
            })
        }
        this.handleUpdateComponents();
    }
}
