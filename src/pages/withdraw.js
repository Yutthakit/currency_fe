import React, { Component } from "react";
import Axios from '../config/axios.setup'
import SideNav from '../components/SideNav'
import "./withdraw.css"
import { Layout, Row, Col, Button, Input } from 'antd';
const { Header, Content, Sider } = Layout;
class WithDraw extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.state.number = '0'
    this.state.select = false
    this.token = localStorage.getItem('ACCESS_TOKEN')
    this.validate = null
  }


  componentDidMount() {
    console.log(this.props.match.params.params)
    if(!this.token) {
      this.props.history.push("/")
    }
  }

  handleSuccess = () => {
    Axios.post('/withdrawal', {
      user: this.token,
      amount: this.state.number
    })
      .then(() => {
        this.props.history.push("/status/success")
      })
      .catch(err => {
        this.props.history.push("/status/fail")
      })
  }

  onChange2 = (e) => {
    if(e.target.value > 100){
      this.setState({
        number: e.target.value,
        validate: null
      })
    } else {
      this.setState({
        number: 0,
        validate: 'ขั้นต่ำ 100 บาท'
      })
    }
    
  }
  onChange = (e) => {
      this.setState({
        number: e.target.value,
        validate2: null
      })
  }

  changeInput = (value) => {
    this.setState({
      select: true
    })
  }

  render() {

    return (
      <div>
        <Layout>
          <Sider>            
            <SideNav props={this.props} />
          </Sider>
          <Layout>
          <Header style={{ backgroundColor: '#1E1F28' }}>
              <h2 style={{ color: 'white' }}>Payment Method</h2>
          </Header>
          <Content>
          <Row style={{ height: "100vh", backgroundColor: '#1E1F28' }} justify="center" align="middle" >
            <Col xs={20} sm={9} md={9} lg={8} xl={6} xxl={5}>
              <h1 style={{ color: 'white' }}>Withdrawal</h1>
              <div>
              <div className="balance">
                <div className="col-1">
                $ Balance 
                </div>
                <div className="col-2">
                  {this.props.match.params.value}
                </div>
              </div>
              <div>
                <select className="width-select">
                  <option> K Bank</option>
                  <option> SCB</option>
                  <option> KTB</option>
                  <option> TMB</option>
                </select>
              </div>
               <Input
                 style={{ backgroundColor: '#2A2C36', color: '#FFFFFF' }}
                 type="text"
                 prefix="Number Account"
                 defaultValue="13911356879"
                 onChange={this.onChange2}
               />
               <p className="color-red">
                 <br/>
               {this.state.validate2 === null ? '' : this.state.validate2 }
               </p>
               <h1 style={{ color: 'white' }}>Amount</h1>
               <Input
                 style={{ backgroundColor: '#2A2C36', color: '#FFFFFF' }}
                 type="number"
                 prefix="$"
                 suffix="USD"
                 defaultValue="100"
                 onChange={this.onChange2}
               />
               <p className="color-red">
                 <br/>
               {this.state.validate === null ? '' : this.state.validate }
               </p>
              </div>
             
             
              <div style={{ textAlign: 'center' }}>
                <Button style={{ margin: '0.1rem', borderRadius: '10px' }} onClick={() => this.handleSuccess()} >Submit</Button>
              </div>
            </Col>
          </Row>
          </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}


export default WithDraw


