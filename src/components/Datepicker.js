import React, { Component } from 'react'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './Datepicker.css'
import {IoCalendarOutline} from 'react-icons/io5'
import Button from 'react-bootstrap/Button'

export default class Datepicker extends Component {

    constructor(){
        super();
        this.handlerDate = this.handlerDate.bind(this);
    }
    
    render() {
        return (
            <div id="calendar-container">
                <Button variant="light" id="calendar-button"><IoCalendarOutline style={{fontSize:'30px'}}></IoCalendarOutline></Button>
                <div id="calendar">
                    <Calendar selected={this.props.date} onClickDay={(date) => this.handlerDate(date)}></Calendar>
                </div>
            </div>
        )
    }

    handlerDate(date){
        this.props.selectDate(date);
    }
}
