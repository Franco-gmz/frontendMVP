import React, { Component } from 'react'
import { Table, Spinner } from 'react-bootstrap'

import ProjectCell from './ProjectCell'

import { getProjects } from '../services/projects/getProjects'

export default class ProjectsBoard extends Component {

    constructor(){
        super();
        this.handlerClick = this.handlerClick.bind(this);
        this.state = {projects:[], fetched:false};
    }

    async componentDidMount(){
        let fetched =  await getProjects();
        this.setState({projects : fetched[1], fetched: true})
    }

    handlerClick(project){
        this.props.onClick(project)
    }

    render() {
        return (
              this.state.fetched ? 
                <Table striped hover bordered responsive variant="light">
                    <thead>
                        <ProjectCell header={true} values={["ID","Nombre","Descripción","Estado","Inicio","Fin","Asignado a"]} />
                    </thead>
                    <tbody>
                        {this.state.projects.map( (project, index) => {
                            return <ProjectCell onClick={this.handlerClick} header={false} values={project} key={index}  idx={index} />
                        })}
                    </tbody>
                </Table>
               :<Spinner animation="border" />
        )
    }
}
