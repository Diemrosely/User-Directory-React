import React, {useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AppTable from "./components/table/table"
import Header from './components/header/header';
import AppNavbar from './components/navbar/navbar';
import Col from 'react-bootstrap/Col';

function App() {
    useEffect(() => {

    })
  return (
    <div className="App">
        <Container>
            <Row>
              <Col><AppNavbar/></Col>
            </Row>
            <Row> 
              <Col className="text-center"><Header/></Col>
            </Row>
            <Row>
              <Col><AppTable/></Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
