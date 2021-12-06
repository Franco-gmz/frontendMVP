import React, { Component } from 'react'
import ProjectsBoard from '../components/ProjectsBoard'
import { Tabs, Tab} from 'react-bootstrap'
import './Projects.css'

export default class Projects extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="project-view">
                <Tabs defaultActiveKey={this.props.active ? this.props.active : "projects"} id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="projects" title="Proyectos">
                        <ProjectsBoard />
                    </Tab>
                    <Tab eventKey="create" title="Nuevo">
                        <h5>Algo</h5>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
