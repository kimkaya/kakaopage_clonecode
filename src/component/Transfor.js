import React, { Component } from 'react';
import { Form, Label, Input, Button, Col, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';

class Deposit extends Component {
  constructor(props) {
    super(props);
    this.divStyle = {
      width:'480px', height:'280px', textAlign:'left', 
      margin:'100px auto', border:'2px solid gray', padding:'40px',
      borderRadius: '20px'
    };
    this.state = {
      acc: {sid:'', rid:'', money:''},
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
    console.log("acc:"+JSON.stringify(this.state.acc));
    axios.post('http://localhost:8090/transfor',  null,
      {
        params : this.state.acc
      }
    )
    .then((response) => {
      this.setState({msg_header:"이체", msg_body:`보내는 계좌 잔액 : ${response.data}원`});
      this.toggle();
    })
    .catch((error) => {
      this.setState({msg_header:"오류", msg_body:"이체에 오류가 발생했습니다."});
      this.toggle();
    });    
  }  

  render() {
    return (      
        <div style={this.divStyle}> 
          <Form>
            <FormGroup row>
              <Label for="sid" sm={5}>보내는 계좌번호</Label>
              <Col>
                <Input type="text" name="sid" id="sid" sm={7} value={this.state.acc.sid} onChange={this.change}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="rid" sm={5}>받&nbsp;&nbsp; 는 계좌번호</Label>
              <Col>
                <Input type="text" name="rid" id="rid" sm={7} value={this.state.acc.rid} onChange={this.change}/>
              </Col>
            </FormGroup>
            <FormGroup row>
            <Label for="money" sm={5}>이 &nbsp;&nbsp;체 &nbsp;&nbsp;금&nbsp;&nbsp; 액</Label>
              <Col>
                <Input type="text" name="money" id="money" sm={7} value={this.state.acc.money} onChange={this.change}/>
              </Col>
            </FormGroup>
            <FormGroup row>
                <Col>
                <Button sm={12} style={{width:'100%'}} color='primary' onClick={this.submit}>이 체</Button>
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

export default Deposit;