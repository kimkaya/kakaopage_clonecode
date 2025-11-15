import React, { Component } from "react";
import axios from 'axios';
import {Form,Label,Input,Button,Col,FormGroup,Modal,
    ModalHeader,ModalBody,ModalFooter} from 'reactstrap';

class MakeAccount extends Component {
    constructor(props) {
        super(props);
        this.divStyle = {
            width:'480px', height:'330px', textAlign:'left',
            margin:'100px auto', border:'2px solid gray',
            padding:'30px', borderRadius:'20px'
        };
        this.selectRef = React.createRef();
        this.state = {
            acc:{
                id:'',
                name:'',
                password:'',
                grade:''
            },
            special:false,
            modal:false,
            msg_header:'',
            msg_body:''
        }
    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({acc:{...this.state.acc, [name]:value}})
    }

    changeSpecial = (e) => {
        this.setState({special:e.target.checked});
        if(!e.target.checked) {
            this.setState({acc:{...this.state.acc, grade:''}});
        }
    }

    toggle = (e) => {
        this.setState({modal:!this.state.modal});
    }

    checkid = (e) => {
        axios.post('http://localhost:8090/doubleid',null,
            {params:{id:this.state.acc.id}}
        ).then((response)=> {            
            let msg = '';
            console.log(response.data);
            if(response.data===true)
                msg = '사용중인 계좌번호입니다.';
            else
                msg = '사용가능한 계좌번호입니다.';
            this.setState({msg_header:'계좌중복확인', msg_body:msg});
            this.toggle();
        }
        ).catch((error)=> {
            this.setState({msg_header:'오류', msg_body:'중복계좌 확인을 실패했습니다.'});
            this.toggle();
        })
    }

    submit = (e) => {
        axios.post('http://localhost:8090/makeaccount',null,
            {params:this.state.acc}
        ).then((response)=> {            
            this.setState({msg_header:'계좌개설', msg_body:'계좌가 개설되었습니다.'});
            this.toggle();
        }
        ).catch((error)=> {
            this.setState({msg_header:'오류', msg_body:'계좌개설에 실패했습니다.'});
            this.toggle();
        })
    }

    render() {
        return(
            <div style={this.divStyle}>
                <Form>
                    <FormGroup row>
                        <Label for='id' sm={4}>계 좌&nbsp; 번 호</Label>
                        <Col sm={5}>
                            <Input type='text' name='id' id='id' 
                                value={this.state.acc.id} onChange={this.change}/> 
                        </Col>
                        <Col sm={3}>
                            <Button  color='primary' style={{width:'100%'}} onClick={this.checkid}>중복</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='name' sm={4}>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</Label>
                        <Col sm={8}>
                            <Input type='text' name='name' id='name' 
                                value={this.state.acc.name} onChange={this.change}/> 
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for='password' sm={4}>비 밀&nbsp; 번 호</Label>
                        <Col sm={8}>
                            <Input type='password' name='password' id='password' 
                                value={this.state.acc.password} onChange={this.change}/> 
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label check sm={4}>
                            <Input type='checkbox' checked={this.state.special} 
                                onChange={this.changeSpecial}/>{' '}특수계좌
                        </Label>
                        <Col sm={8}>
                            <Input type='select' name='grade' id='grade'
                                style={{color:'gray'}} disabled={!this.state.special}
                                onChange={this.change}> 
                                <option value='VIP'>VIP</option>
                                <option value='Gold'>Gold</option>
                                <option value='Silver'>Silver</option>
                                <option value='Normal'>Normal</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12} >
                            <Button style={{width:'100%'}} color='primary'
                                onClick={this.submit}>계좌 개설</Button>
                        </Col>
                    </FormGroup>
                </Form>

                <Modal isOpen={this.state.modal} fade={true} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.msg_header}</ModalHeader>
                    <ModalBody>
                        {this.state.msg_body}
                    </ModalBody>
                    <ModalFooter>
                        <Button  color='secondary' onClick={this.toggle}>닫기</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default MakeAccount;