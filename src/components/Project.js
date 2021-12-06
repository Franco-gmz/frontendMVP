import React, { Component } from 'react'
import TasksBoard from './TasksBoard';

export default class Project extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h5 className="project-id">Proyecto {this.props.values.id}</h5>
                <h4 className="project-name">{this.props.values.name}</h4>
                <p className="project-description">{this.props.values.description}</p>
                <p className="project-start">{this.props.values.start}</p>
                <p className="project-finish">{this.props.values.finish}</p>
                <TasksBoard id={this.props.values.id} />
            </div>
        )
    }
}
