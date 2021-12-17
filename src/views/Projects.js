import React, { Component } from 'react'
import ProjectsBoard from '../components/ProjectsBoard'
import { Tabs, Tab} from 'react-bootstrap'
import './Projects.css'
import Project from '../components/Project';
import ProjectForm from '../components/ProjectForm';
import { getProject } from '../services/projects/getProject'
export default class Projects extends Component {

    constructor(props){
        super(props);
        this.state = {projectClicked:false, project:[], active:this.props.active ? this.props.active : "projects", update:false, key:false}
        this.handlerClickProject = this.handlerClickProject.bind(this);
        this.handlerCloseProject = this.handlerCloseProject.bind(this);
        this.handlerClickTab = this.handlerClickTab.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleUpdateProject = this.handleUpdateProject.bind(this);
        //this.handleUpdateComponent = this.handleUpdateComponent.bind(this);
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

    handleCreate(){
        this.setState({active:"projects", update:true});
    }

    handleUpdate(){
        this.setState({active:"projects", update:false});
    }

    async handleUpdateProject(id){
        let res = await getProject(id);
        let projects = this.state.project.filter( (project) => project.id != id);
        projects.push(res.result);
        this.setState({project:projects}, () => {
            this.setState({key:!this.state.key})
        })
    }

    render() {
        return (
            <div id="projects-view">
                <Tabs onSelect={(key) => {this.handlerClickTab(key)}} activeKey={this.state.active} id="uncontrolled-tab-example" className="mb-3">
                    <Tab  eventKey="projects" title="Proyectos">
                        <ProjectsBoard onUpdate={this.handleUpdate} key={this.state.update} onClick={this.handlerClickProject} />
                    </Tab>
                    <Tab eventKey="create" title="+ Nuevo">
                        <ProjectForm onSubmit={this.handleCreate}/>
                    </Tab>
                    {this.state.projectClicked && this.state.project.length != 0 && 
                        this.state.project.map((project,idx) => {
                            return(<Tab key={idx} eventKey={project.id} title={"Proyecto - " + project.name}>
                                <Project key={this.state.key} onUpdate={this.handleUpdateProject} values={project} onClose={this.handlerCloseProject}/>
                            </Tab>)
                        })
                    }
                </Tabs>
            </div>
        )
    }
}
