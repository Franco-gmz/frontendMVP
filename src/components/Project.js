import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import TasksBoard from './TasksBoard';
import './Project.css'
import { Row, Col } from 'react-bootstrap'
import {AiOutlineClose} from 'react-icons/ai'
import EditProjectWindow from './EditProjectWindow';
import DeleteWindow from './DeleteWindow';
import { updateProject } from '../services/projects/updateProject'
import { deleteProject } from '../services/projects/deleteProject'
import { addToProjectTeam } from '../services/team/addToProjectTeam'
import { getProjectHours } from '../services/hours/getProjectHours'
import { deleteFromProjectTeam } from '../services/team/deleteFromProjectTeam'
import { createTask } from '../services/tasks/createTask'
import Button from 'react-bootstrap/Button'
import EditTaskWindow from './EditTaskWindow';
import { getAllEmployees } from '../services/team/getAllEmployees'

export default class Project extends Component {

    constructor(props){
        super(props);
        this.state = {team:this.props.values.team, update:false, employees:[], leader:this.props.values.leader, leader_name:this.props.values.leader_name, hours:'...'}
        this.handlerUpdate = this.handlerUpdate.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
        this.handleCreateTask = this.handleCreateTask.bind(this);
        this.handleUpdateComponents = this.handleUpdateComponents.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this)
    }

    async componentDidMount(){
        let fetched =  await getAllEmployees();
        let hours = await getProjectHours(this.props.values.id);
        localStorage.setItem("employees", JSON.stringify(fetched.results))
        this.setState({employees: fetched.results, hours:hours});     
    }

    render() {
        return (
            <div id="project-view" key={this.state.update}>
                <Row className="justify-content-md-center">
                    <Col sm="10">
                        <Card id="project-card">
                            <Card.Header id="project-header">
                                <Row id="project-header-row">
                                    <Col sm={{ span: 8, offset: 2 }}><Card.Title className="project-title">{this.props.values.name + '          '}</Card.Title></Col>
                                    <Col id="buttons-col" sm="auto">
                                        <ButtonGroup id="project-buttons">
                                            <EditProjectWindow onSubmit={this.handlerUpdate} values={this.props.values} />
                                            <DeleteWindow onDelete={this.handlerDelete} values={this.props.values}/>
                                            <Button size="sm" className="crud-button" variant="light" onClick={() => this.props.onClose(this.props.values.id)}><AiOutlineClose/></Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                                <Card.Subtitle><small className="project-id">Identificador {this.props.values.id}</small></Card.Subtitle>
                            </Card.Header>
                            <Card.Body id="project-info">
                                <Card.Subtitle className="project-subtitle">Descripción</Card.Subtitle>
                                <Card.Text className="project-value project-description">{this.props.values.description}</Card.Text>
                                <Card.Subtitle className="project-subtitle">Estado</Card.Subtitle>
                                <Card.Text className="project-value project-state">{this.props.values.state}</Card.Text>
                                <Card.Subtitle className="project-subtitle">Fecha de inicio</Card.Subtitle>
                                <Card.Text className="project-value project-start">{this.props.values.start}</Card.Text>
                                <Card.Subtitle className="project-subtitle">Fecha de finalización</Card.Subtitle>
                                <Card.Text className="project-value project-finish">{this.props.values.finish}</Card.Text>
                                <Card.Subtitle className="project-subtitle">Asignado a</Card.Subtitle>
                                <Card.Text className="project-value project-leader">{this.state.leader_name != ' ' ? this.state.leader_name : "Sin asignar"}</Card.Text>
                                <Card.Subtitle className="project-subtitle">Horas acumuladas</Card.Subtitle>
                                <Card.Text className="project-value project-hours">{this.state.hours || 0}hs.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-md-center" id="task-row">
                    <Col sm="12">
                        <Card id="project-tasks-card">
                            <Card.Header id="project-tasks-header">
                                <Row>
                                    <Col><Card.Title>Tareas</Card.Title></Col>
                                    <Col xs="1">
                                        <ButtonGroup id="tasks-buttons">
                                            <EditTaskWindow edit={false} onSubmit={this.handleCreateTask} values={{name:'',description:'', state:'',team:[]}}/>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <TasksBoard id={this.props.values.id} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

    handleRefresh(){
        this.setState({update:!this.state.update})
    }

    async handlerUpdate(values){
        let res = await updateProject(this.props.values.id, values);
        this.props.onUpdate(this.props.values.id, values.leader_name)
    }

    async handleCreateTask(values){
        let res = await createTask(this.props.values.id, values);
        this.props.onUpdate(this.props.values.id, this.props.values.leader_name)
    }

    async handlerDelete(){
        let result = await deleteProject(this.props.values);
        if(result.status == 200) window.location.reload();
    }

    handleUpdateComponents(){     
        this.props.onUpdate(this.props.values.id);
        this.setState({update: !this.state.update});
    }
}
