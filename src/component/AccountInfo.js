import React, { Component } from 'react';
import { Form, Label, Input, Button, Col, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';

class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.divStyle = {
      width:'480px', height:'300px', textAlign:'left', 
      margin:'100px auto', border:'2px solid gray', padding:'40px',
      borderRadius: '20px'
    };
    this.state = {
      acc : {id:'', name:'', balance:'', grade:''},
      modal : false,
      msg_header :'',
      msg_body:''       
    };
  }

  
  toggle = () => {
    this.setState({modal : !this.state.modal});
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;    
    this.setState({acc:{...this.state.acc,  [name] : value}});
  }

  

  submit = (e) => {
    console.log(this.state.acc.id);
    axios.post('http://localhost:8090/accinfo', null,
      {params:{id:this.state.acc.id}})
    .then((response) => {
      console.log(response.data);
      var racc = response.data;
      this.setState({acc:racc});
    })
    .catch((error) => {
      console.log(error);
      this.setState({msg_header:"오류", msg_body:"계좌번호가 틀립니다."});
      this.toggle();
    });    
  }  

  render() {
    return (      
        <div style={this.divStyle}> 
          <Form>
            <FormGroup row>
              <Label for="id" sm={4}>계 좌 번 호</Label>
              <Col>
                <Input type="text" name="id" id="id" sm={4} value={this.state.acc.id ||''} onChange={this.change}/>
              </Col>
              <Col>
                <Button sm={4} color="primary" style={{width:'100%'}} onClick={this.submit}>계좌조회</Button>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="name" sm={4}>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</Label>
              <Col>
                <Input type="text" name="name" id="name" sm={8} value={this.state.acc.name || ''} readOnly/>
              </Col>
            </FormGroup>            
            <FormGroup row>
              <Label for="money" sm={4}>잔 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 액</Label>
              <Col>
                <Input type="text" name="balance" id="balance" sm={8} value={this.state.acc.balance && ''} readOnly/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="grade" sm={4}>
                등&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;급
              </Label>
              <Col>
                <Input type="text" name="grade" id="grade" sm={8} value={this.state.acc.grade || ''} readOnly/>
              </Col>
            </FormGroup>
          </Form>

          <Modal isOpen={this.state.modal} fade={true} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>{this.state.msg_header}</ModalHeader>
            <ModalBody>{this.state.msg_body}</ModalBody>
            <ModalFooter>
              <Button color='secondary' onClick={this.toggle}>닫기</Button>
            </ModalFooter>
          </Modal>              
        </div>
      )
  }
}

export default AccountInfo;