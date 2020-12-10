import React, { Component } from 'react'
import { Row, Col, Form, Input, Button, Layout} from "antd";
import avatar from '../image/avatars.jpg'
import moment from 'moment'
import Axios from 'axios';
import SideNav from '../components/SideNav'
const { Header, Content, Sider } = Layout;
class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.state.Avatar = 'name'
    this.state.name = 'name'
    this.state.surname = 'name'
    this.state.email = 'name'
    this.state.tel = 'name'
    this.state.birth_date = 'name'
    this.state.gender = 'name'
    this.state.disabled = true
    this.token = localStorage.getItem('ACCESS_TOKEN')
  }
  componentDidMount() {
    if (this.token) {
      this.callService()
    } else {
      this.props.history.push("/login")
    }
  }

  callService = () => {

    Axios.get('/profile', {
      user: this.token
    })
      .then((result) => {
        this.getData(result.data)
      }).catch((err) => {
        console.log(err)
      });
  }

  getData = (dataUser) => {
    if (dataUser) {
      this.setState({
        name: dataUser.name,
        surname: dataUser.surname,
        email: dataUser.email,
        tel: dataUser.tel,
        gender: dataUser.gender,
        birth_date: moment(dataUser.birth_date).format("MM-DD-YYYY"),
      })
    }
  }


  onFinish = values => {
    console.log(values)
    Axios.put('/profile', {
      user: this.token,
      name: values.name,
      surname: values.surname,
      tel: values.tel
    })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err);
      })
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  changeDisabled = () => {
    this.setState({
      disabled: false
    })
  }

  render() {
    const { name, surname, email, tel, gender, birth_date } = this.state
    console.log(this.state.name)
    const requireField = (v) => {
      return {
        required: true,
        message: `Please input ${v}`
      }
    }

    const inputField = (parameter, placeholder) => {
      console.log(parameter)
      return <Input
      defaultValue={parameter}
        style={{ backgroundColor: '#2A2C36', border: '#2A2C36', color: '#ffffff' }}
        placeholder={placeholder}
      
      />
    }

    if (name !== 'name') {
      return (
        <div>
          <Layout>
          <Sider>            
            <SideNav props={this.props} />
          </Sider>
            <Layout>
              <Header style={{ backgroundColor: '#1E1F28' }}>
                <h2 className="color-white">
                Profile
                </h2>
              </Header>
              <Content>
              <Row style={{ height: "100vh", backgroundColor: '#1E1F28' }} justify="center" align="middle" >
          <Col xs={20} sm={9} md={9} lg={8} xl={6} xxl={5}>
            <Form
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <div style={{ textAlign: 'center' }}>
                <img src={avatar} alt="profile" style={{ marginBottom : '1rem' }} className="img-profile" />
              </div>
              <Row>
                <Form.Item
                  style={{ width: "100%" }}
                  name="name"
                  rules={[requireField('name')]}
                >
                  <Input
                    defaultValue={name}
                    style={{ backgroundColor: '#2A2C36', border: '#2A2C36', color: '#ffffff' }}
                    placeholder={'name'}
                    disabled={(this.state.disabled) ? true : false}
                  />
                </Form.Item>
                <Form.Item
                  style={{ width: "100%" }}
                  name="surname"
                  rules={[requireField('surname')]}
                >
                  {inputField(surname, 'surname')}
                </Form.Item>
                <Form.Item
                  style={{ width: "100%" }}
                  name="tel"
                  rules={[requireField('tel')]}
                >
                  {inputField(tel, 'phone')}
                </Form.Item>
                <Form.Item
                  style={{ width: "100%" }}
                  name="Email"
                  rules={[requireField('email')]}
                >
                  {inputField(email, 'email')}
                </Form.Item>
                <Form.Item
                  style={{ width: "100%" }}
                  name="brithday"
                  rules={[requireField('birth_date')]}
                >
                  {inputField(birth_date, 'birth_date')}
                </Form.Item>
                <Form.Item
                  style={{ width: "100%" }}
                  name="gender"
                  rules={[requireField('gender')]}
                >
                  {inputField(gender, 'gender')}
                </Form.Item>
              </Row>
              <Row justify="space-around">
                <Col>
                  <Button onClick={() => this.changeDisabled()} type="danger">
                    Edit
                  </Button>
                  <Button htmlType="submit" type="danger">
                    Confrim
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row >
              </Content>
            </Layout>
        </Layout>
        </div>
        
      )
    } else {
      return 'name'
    }
  }
}

export default Profile