import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap';
import { getTasks } from '../services/tasks/getTasks'
import Task from './Task';
import './TaskBoard.css'

export default class TasksBoard extends Component {

    constructor(props){
        super(props);
        this.state = {tasks:[], fetched:false};
    }

    async componentDidMount(){
        let tasks =  await getTasks(this.props.id);
        console.log(tasks);
        this.setState({tasks : tasks[1], fetched: true})
    }

    render() {
        return (
            this.state.fetched ? 
                <div id="task-container">
                    {this.state.tasks != null ? this.state.tasks.map( (task, index) => {
                        return <Task id_project={this.props.id} values={task}/>
                    }) : <strong>No se han asignado tareas a este proyecto</strong>}
                </div> :
                <Spinner animation="border" />
        )
    }
}
