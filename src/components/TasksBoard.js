import React, { Component } from 'react'
import { Row, Col, Spinner } from 'react-bootstrap';
import { getTasks } from '../services/tasks/getTasks'
import Task from './Task';
import './TaskBoard.css'

export default class TasksBoard extends Component {

    constructor(props){
        super(props);
        this.state = {tasks:[], fetched:false, update:false};
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    async componentDidMount(){
        let tasks =  await getTasks(this.props.id);
        this.setState({tasks : tasks[1], fetched: true})
    }

    async handleUpdate(){
        let tasks =  await getTasks(this.props.id);
        this.setState({tasks : tasks[1]}, () => {
            this.setState({update:!this.state.update})
        })
    }

    render() {
        return (
            this.state.fetched ? 
                <div key={this.state.update} id="task-container">
                    {this.state.tasks != null ? this.state.tasks.map( (task, index) => {
                        return <Task key={this.state.update} id_project={this.props.id} values={task} onUpdate={this.handleUpdate}/>
                    }) : <Col sm="10"><strong>No se han asignado tareas a este proyecto</strong></Col>}
                </div> :
                <Row><Col sm="10"><Spinner animation="border" /></Col></Row>
        )
    }
}
