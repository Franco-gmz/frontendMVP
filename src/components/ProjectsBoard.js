import React, { Component } from 'react'
import { Table, Spinner } from 'react-bootstrap'

import ProjectCell from './ProjectCell'

import { getProjects } from '../services/projects/getProjects'
import { getAllEmployees } from '../services/team/getAllEmployees'

export default class ProjectsBoard extends Component {

    constructor(props){
        super(props);
        this.handlerClick = this.handlerClick.bind(this);
        this.state = {projects:[], fetched:false, employees:[]};
        this.props.onUpdate();
    }

    async componentDidMount(){
        let fetched =  await getProjects();
        let employees = await getAllEmployees();
        fetched[1].map(async (proj) => {

            let id_leader = proj.leader;
            if(id_leader == 0 || id_leader == undefined || id_leader == null){
                proj.leader = 0;
                Object.assign(proj,{leader_name:"Sin asignar"})
                
            }
            else{
                let info_leader = employees.results.filter((e) => id_leader == e.id)[0];
                proj.leader = id_leader;
                Object.assign(proj,{leader_name:info_leader.name + ' ' + info_leader.last_name})
            }
        })
        this.setState({projects : fetched[1], employees: employees}, () => {
            this.setState({ fetched: true })
        })
    }

    handlerClick(project){
        this.props.onClick(project)
    }

    render() {
        return (
              this.state.fetched ? 
                <Table key={this.state.fetched} striped hover bordered responsive variant="light">
                    <thead>
                        <ProjectCell header={true} values={["ID","Nombre","Descripción","Estado","Inicio","Fin","Asignado a"]} />
                    </thead>
                    <tbody>
                        {this.state.projects.map( (project, index) => {
                            return <ProjectCell onClick={this.handlerClick} header={false} values={(project)} key={index}  idx={index} />
                        })}
                    </tbody>
                </Table>
               :<Spinner animation="border" />
        )
    }
}
