
import React from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Row, Col, Layout } from 'antd';
import SideNav from '../components/SideNav'
import Axios from '../config/axios.setup'
const { Header, Content, Sider } = Layout;

 const callService = () => {
  Axios.get('/profile', {
    user: localStorage.getItem('ACCESS_TOKEN'),
  })
    .then((result) => {
      window.location=`/${result.data.Balance}`
    }).catch((err) => {
      // settoken(localStorage.removeItem('ACCESS_TOKEN'))
    window.location="/login"
    })
}
export default function status(props) {
  
  const show = props.match.params.params
  return (
    <div>
      <Layout>
          <Sider>            
            <SideNav props={props} />
          </Sider>
          <Layout>
          <Header style={{ backgroundColor: '#1E1F28' }}>
              <h2 style={{ color: 'white' }}>Payment Method</h2>
          </Header>
          <Content>
          {show === 'payment' ?
     <Row style={{ height: "100vh", backgroundColor: '#1E1F28' }} justify="center" align="middle" >
     <Col xs={20} sm={9} md={9} lg={8} xl={6} xxl={5}>
     <h2 style={{color: 'white', textAlign: 'center'}}>Withdrawal Succesfully</h2>
     <h2 style={{color: 'white', textAlign: 'center'}}>Done!</h2>
       <div style={{backgroundColor: 'green' , borderRadius: '100%', width: '12rem' , height: '12rem' , textAlign: 'center' , margin: 'auto'}}>
         <AiFillCheckCircle color="#1E1F28" fontSize={200} style={{ margin:'-0.2rem 0.1rem 0rem -0.2rem'}} />
       </div>
       <div style={{textAlign: 'center', marginTop: '3rem', marginBottom: '3rem'}}>
       <button  onClick={callService}>Home Page</button>
       </div>
     </Col>
   </Row>
      :
      null
      }
      {show === 'success' ?
      <Row style={{ height: "100vh", backgroundColor: '#1E1F28' }} justify="center" align="middle" >
      <Col xs={20} sm={9} md={9} lg={8} xl={6} xxl={5}>
      <h2 style={{color: 'white', textAlign: 'center'}}>Withdrawal Succesfully</h2>
      <h2 style={{color: 'white', textAlign: 'center'}}>Done!</h2>
        <div style={{backgroundColor: 'green' , borderRadius: '100%', width: '12rem' , height: '12rem' , textAlign: 'center' , margin: 'auto'}}>
          <AiFillCheckCircle color="#1E1F28" fontSize={200} style={{ margin:'-0.2rem 0.1rem 0rem -0.2rem'}} />
        </div>
        <div style={{textAlign: 'center', marginTop: '3rem', marginBottom: '3rem'}}>
        <button  onClick={callService}>Home Page</button>
        </div>
      </Col>
    </Row>
      :
      null
      }
      {show === 'fail' ?
      <Row style={{ height: "100vh", backgroundColor: '#1E1F28' }} justify="center" align="middle" >
      <Col xs={20} sm={9} md={9} lg={8} xl={6} xxl={5}>
      <h2 style={{color: 'white'}}>Withdrawal Failed !</h2> 
          <div style={{backgroundColor: 'red' , borderRadius: '100%', width: '12rem' , height: '12rem' , textAlign: 'center' , margin: 'auto'}}>
            <AiFillCloseCircle color="#1E1F28" fontSize={200} style={{ margin:'-0.2rem 0.1rem 0rem -0.2rem'}} />
          </div>
          <div style={{textAlign: 'center', marginTop: '3rem', marginBottom: '3rem'}}>
        <button onClick={callService}>Try Again</button>
          </div>
      </Col>
    </Row>
      :
      null
      }
          </Content>
          </Layout>
        </Layout>
     
    </div>
  )
}
