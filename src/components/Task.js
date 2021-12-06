import React, { Component } from 'react'
import Toast from 'react-bootstrap/Toast'

export default class Task extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Tarea#{this.props.values.id} - {this.props.values.name}</strong>
                    <small>{this.props.values.state}</small>
                </Toast.Header>
                <Toast.Body>
                    <p className="task-description">{this.props.values.description}</p>
                </Toast.Body>
            </Toast>
        )
    }
}
