import React, { Component } from 'react'
import ProjectsBoard from '../components/ProjectsBoard'
import { Tabs, Tab} from 'react-bootstrap'
import './Projects.css'
import Project from '../components/Project';
import ProjectForm from '../components/ProjectForm';
export default class Projects extends Component {

    constructor(props){
        super(props);
        this.state = {projectClicked:false, project:[], active:this.props.active ? this.props.active : "projects"}
        this.handlerClickProject = this.handlerClickProject.bind(this);
        this.handlerCloseProject = this.handlerCloseProject.bind(this);
        this.handlerClickTab = this.handlerClickTab.bind(this);
    }

    handlerClickProject(project){
        let projects = this.state.project;
        projects.push(project);
        this.setState({projectClicked:true, project:projects, active:project.id});
    }

    handlerCloseProject(){
        this.setState({projectClicked:false, project:[], active:"projects"});
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
                        <ProjectForm />
                    </Tab>
                    {this.state.projectClicked && this.state.project.length != 0 && 
                        this.state.project.map((project,idx) => {
                            return(<Tab eventKey={project.id} title={"Proyecto - " + project.name}>
                                <Project values={project} onClose={this.handlerCloseProject}/>
                            </Tab>)
                        })
                    }
                </Tabs>
            </div>
        )
    }
}
