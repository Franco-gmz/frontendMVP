import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import './Team.css'

export default class Team extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="team-container">
                <Table striped hover bordered responsive variant="light">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Horas acumuladas</th>
                        </tr>
                    </thead>
                    {this.props.values && 
                    <tbody>
                        {this.props.values.map((value,index) => {
                            <tr>
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td>{value.hours}</td>
                            </tr>
                        })}
                    </tbody>}
                </Table>
                {this.props.values == null && <small>No se ha asignado personal a este proyecto</small>}
            </div>
        )
    }
}
