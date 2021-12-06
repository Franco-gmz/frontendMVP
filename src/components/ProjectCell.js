import React, { Component } from 'react'

export default class ProjectCell extends Component {

    constructor(props){
        super(props);
        this.handlerClick = this.handlerClick.bind(this);
        this.header = this.header.bind(this);
        this.row = this.row.bind(this);
    }

    handlerClick(){
        if (!this.props.header){
            this.props.onClick(this.props.values);
        }
    }

    header(values){
        return (
            <tr>
                {values.map( (value, index) => {
                    return (<th key={index}>{value}</th>)
                })}
            </tr>
        )
    }

    row(values, idx){
        return (
            <tr onClick={this.handlerClick} key={idx}>
                <td>{values.id}</td>
                <td>{values.name}</td>
                <td>{values.description}</td>
                <td>{values.state}</td>
                <td>{values.start}</td>
                <td>{values.finish}</td>
                <td>{values.leader ? values.leader : "Sin asignar"}</td>
            </tr>
        )
    }

    render() {
        if (this.props.header) return this.header(this.props.values);
        return this.row(this.props.values, this.props.idx);
    }
}
