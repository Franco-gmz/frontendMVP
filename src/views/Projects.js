import React, { Component } from 'react'
import ProjectsBoard from '../components/ProjectsBoard'
import { Tabs, Tab} from 'react-bootstrap'
import './Projects.css'
import Project from '../components/Project';

export default class Projects extends Component {

    constructor(props){
        super(props);
        this.state = {projectClicked:false, project:{}, active:this.props.active ? this.props.active : "projects"}
        this.handlerClickProject = this.handlerClickProject.bind(this);
        this.handlerCloseProject = this.handlerCloseProject.bind(this);
        this.handlerClickTab = this.handlerClickTab.bind(this);
    }

    handlerClickProject(project){
        this.setState({projectClicked:true, project:project, active:"project"});
        //ACTUALIZAR UN ESTADO PARA QUE SE AGREGUE UN TAB QUE PASANDOLE project BUSQUE LAS TAREAS Y MUESTRE
    }

    handlerCloseProject(){
        this.setState({projectClicked:false, project:{}, active:"projects"});
    }

    handlerClickTab(key){
        this.setState({active:key});
    }

    render() {
        return (
            <div id="project-view">
                <Tabs onSelect={(key) => {this.handlerClickTab(key)}} activeKey={this.state.active} id="uncontrolled-tab-example" className="mb-3">
                    <Tab  eventKey="projects" title="Proyectos">
                        <ProjectsBoard onClick={this.handlerClickProject} />
                    </Tab>
                    <Tab eventKey="create" title="Nuevo">
                        <h5>Algo</h5>
                    </Tab>
                    {this.state.projectClicked && 
                        <Tab eventKey="project" title={"Proyecto - " + this.state.project.name}>
                            <Project values={this.state.project} onClose={this.handlerCloseProject}/>
                        </Tab>
                    }
                </Tabs>
            </div>
        )
    }
}
