import React, { Component } from 'react'
import { Table, Spinner } from 'react-bootstrap'
import './Team.css'
import { getAllEmployees } from '../services/team/getAllEmployees'

export default class Team extends Component {
    constructor(props){
        super(props);
        this.state = {team:[], remainingEmployees:[], fetched:false}
    }

    async componentDidMount(){
        if(this.props.values.length != 0) {
            let fetched =  await getAllEmployees();
            this.setState({
                team: fetched.results.filter((employee) => {
                    return this.props.values.includes(employee.id)
                }),
                remainingEmployees: fetched.results.filter((employee) => {
                    return !this.props.values.includes(employee.id)
                }),
            })
        }
        this.setState({fetched:true})
    }

    render() {
        return (
            <div id="team-container">
                <Table striped hover bordered responsive variant="light">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    {this.state.team.length != 0 && 
                    <tbody>
                        {this.state.team.map((value,index) => {
                            return(<tr key={index}>
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td>{value.last_name}</td>
                            </tr>)
                        })}
                    </tbody>}
                </Table>
                {!this.state.fetched && <Spinner animation="border" />}
                {this.state.fetched && this.state.team.length == 0 && <small>No se ha asignado personal a este proyecto</small>}
            </div>
        )
    }
}
