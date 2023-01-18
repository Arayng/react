import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './App.css'
import {useState} from 'react'
import data from './data.js';

function App() {
  let [item] = useState(data)
  let [itemNum,setItemNum] = useState(0)
  let [modalShow, setModalShow] = useState(false)
  return ( 
    <div className="App">
      <Navbar variant="dark" className='nav-bg' sticky='top'>
        <Container>
          <Navbar.Brand href="#home">Shop by React</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className='main-banner'>
        <Row>
          <Col>
            <img src={process.env.PUBLIC_URL + '/assets/main_banner.jpg'} alt="bannerImg" />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {
            item.map((item, i)=>{
              return(
                <ItemList item={item} index={i} key={i} onShow={() => setModalShow(true)} setNum={() => setItemNum(i)}/>
                // 아이템 리스트를 컴포넌트화 시킨건
              )
            })
          }
        </Row>
      </Container>
      <ItemModal item={item} itemnum={itemNum} show={modalShow} onHide={() => setModalShow(false)}  />
    </div>
  );
}

function ItemList(props){
  let item = props.item;
  let i = props.index;
  return(
    <Col className='item'>
      <img src={`${process.env.PUBLIC_URL}/assets/item${i+1}.jpg`} alt="itemImg 1" className='item-img' onClick={() => {
        props.onShow()
        props.setNum()
      }}/>
      <h4>{item.title}</h4>
      <p>{item.detail}</p>
    </Col>
  )
}

function ItemModal(props) {
  const item = props.item;
  let num = props.itemnum;
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {item[num].title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col>
            <img src={`${process.env.PUBLIC_URL}/assets/item${num+1}.jpg`} alt="itemImg 1" className='item-img'/>
            </Col>
            <Col>
              <p>Detail : {item[num].detail}</p>
              <p>Price : {item[num].price.toLocaleString()}</p>
            </Col>
          </Row>
        </Container>
        <Button onClick={props.onHide} className='modal-btn'>Close</Button>
      </Modal.Body>
    </Modal>
  );
}

export default App;
