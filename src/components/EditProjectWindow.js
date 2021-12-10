import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Datepicker from './Datepicker'
import Modal from 'react-bootstrap/Modal'
import {BiEdit} from 'react-icons/bi'

import React, { Component } from 'react'

export default class EditProjectWindow extends Component {
    constructor(props){
        super(props);
        this.state = {show:false, name:this.props.values.name, description:this.props.values.description,
                      state:this.props.values.state, start:this.props.values.start, finish:this.props.values.finish,
                      leader:this.props.values.leader || 0}
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleLeader = this.handleLeader.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(date){
        try{
            let month = (parseInt(date.getMonth() + 1))
            toString(month)
            let formattedDate = (date.getDate() + "/" + month + "/" + date.getFullYear());
            return formattedDate;
        } catch(e){
            return date;
        }
    }

    handleName(name){
        this.setState({name:name});
    }
    handleDescription(description){
        this.setState({description:description});
    }
    handleState(state){
        this.setState({state:state});
    }
    handleStart(start){
        this.setState({start:start});
    }
    handleFinish(finish){
        this.setState({finish:finish});
    }
    handleLeader(leader){
        this.setState({leader:leader});
    }
    handleClose(){
        this.setState({show:false});
    }
    handleShow(){
        this.setState({show:true});   
    }
    handleSubmit(){
        this.props.onSubmit(this.state);
    }

    render() {
        return (
      <>
        <Button variant="primary" onClick={this.handleShow}><BiEdit/></Button>
        <Modal show={this.state.show} onHide={this.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Editor - {this.props.values.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre <span className="obligatory">*</span></Form.Label>
                    <Form.Control defaultValue={this.state.name} onChange={e => this.handleName(e.target.value)}/>
                    <Form.Text className="text-muted">Máx. 20 caracteres</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripción <span className="obligatory">*</span></Form.Label>
                    <Form.Control defaultValue={this.state.description} as="textarea" rows={3} onChange={e => this.handleDescription(e.target.value)} />
                    <Form.Text className="text-muted">Máx. 50 caracteres</Form.Text>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm="4">Estado</Form.Label>
                    <Col sm="auto">
                        <Form.Select onChange={this.handleState} column sm="2" aria-label="Default select example">
                            <option>{this.state.state}</option>
                            <option value="1">Ejemplo1</option>
                            <option value="2">Ejemplo2</option>
                            <option value="3">Ejemplo3</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="startDate">
                    <Form.Label column sm="4">Fecha de inicio <span className="obligatory">*</span></Form.Label>
                    <Col sm="auto">
                        <Form.Control readOnly value={this.formatDate(this.state.start)} />
                    </Col>
                    <Col sm="2"><Datepicker date={this.state.start} selectDate={this.handleStart}/></Col>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="finishDate">
                    <Form.Label column sm="4">Fecha de finalización <span className="obligatory">*</span></Form.Label>
                    <Col lg="auto" sm="auto">
                        <Form.Control readOnly value={this.formatDate(this.state.finish)} />
                    </Col>
                    <Col sm="2"><Datepicker date={this.state.finish} selectDate={this.handleFinish}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 left-align" controlId="leader">
                    <Col sm="auto">    
                        <Form.Label>Asignado a </Form.Label>
                    </Col>
                    <Col sm="auto">
                        <Form.Select onChange={this.handleLeader} column sm="2" aria-label="Default select example">
                            <option>{this.state.leader}</option>
                            <option value="1">Ejemplo1</option>
                            <option value="2">Ejemplo2</option>
                            <option value="3">Ejemplo3</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Form> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.handleSubmit}>
              Aceptar
            </Button>
            <Button variant="danger" onClick={this.handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );}
}


/*export default function EditWindow(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(props.values.name);
    const [description, setDescription] = useState(props.values.description);
    const [state, setState] = useState(props.values.state);
    const [startDate, setStartDate] = useState(props.values.start);
    const [finishDate, setFinishDate] = useState(props.values.finish);
    const [leader, setLeader] = useState(props.values.leader);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlerName = (newName) => { if(newName.length <= 20) setName(newName)};
    const handlerDescription = (newDescription) => {if(newDescription.length <= 50)setDescription(newDescription)};
    const handlerState = (newState) => setState(newState);
    const handlerStartDate = (newDate) => setStartDate(newDate.getDate() + "/" + newDate.getMonth() + "/" + newDate.getFullYear());
    const handlerFinishDate = (newDate) => setFinishDate(newDate.getDate() + "/" + newDate.getMonth() + "/" + newDate.getFullYear());
    const handlerLeader = (newLeader) => setLeader(newLeader);
    const handlerSubmit = () => {
        props.onSubmit({name:name,description:description,state:state,start:startDate,finish:finishDate,leader:leader});
        handleClose();
    }
 
    return (
      <>
        <Button variant="primary" onClick={handleShow}><BiEdit/></Button>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Editor - {props.values.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
                <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nombre <span className="obligatory">*</span></Form.Label>
                    <Form.Control defaultValue={name} onChange={e => handlerName(e.target.value)}/>
                    <Form.Text className="text-muted">Máx. 20 caracteres</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripción <span className="obligatory">*</span></Form.Label>
                    <Form.Control defaultValue={description} as="textarea" rows={3} onChange={e => handlerDescription(e.target.value)} />
                    <Form.Text className="text-muted">Máx. 50 caracteres</Form.Text>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm="4">Estado</Form.Label>
                    <Col sm="auto">
                        <Form.Select onChange={handlerState} column sm="2" aria-label="Default select example">
                            <option>{state}</option>
                            <option value="1">Ejemplo1</option>
                            <option value="2">Ejemplo2</option>
                            <option value="3">Ejemplo3</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="startDate">
                    <Form.Label column sm="4">Fecha de inicio <span className="obligatory">*</span></Form.Label>
                    <Col sm="auto">
                        <Form.Control readOnly value={startDate} />
                    </Col>
                    <Col sm="2"><Datepicker date={startDate} selectDate={handlerStartDate}/></Col>
                </Form.Group>
                <Form.Group  as={Row} className="mb-3 left-align" controlId="finishDate">
                    <Form.Label column sm="4">Fecha de finalización <span className="obligatory">*</span></Form.Label>
                    <Col lg="auto" sm="auto">
                        <Form.Control readOnly value={finishDate} />
                    </Col>
                    <Col sm="2"><Datepicker date={finishDate} selectDate={handlerFinishDate}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 left-align" controlId="leader">
                    <Col sm="auto">    
                        <Form.Label>Asignado a </Form.Label>
                    </Col>
                    <Col sm="auto">
                        <Form.Select onChange={handlerLeader} column sm="2" aria-label="Default select example">
                            <option>{leader}</option>
                            <option value="1">Ejemplo1</option>
                            <option value="2">Ejemplo2</option>
                            <option value="3">Ejemplo3</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
            </Form> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handlerSubmit}>
              Aceptar
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}*/

    


