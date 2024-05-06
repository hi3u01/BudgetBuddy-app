import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Icon from "@mdi/react";
import { mdiAccount  } from "@mdi/js";
import Button from 'react-bootstrap/Button';

function NavBar() {
  return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/home" ><strong>BudgetBuddy</strong></Navbar.Brand>
          <Nav className="bg-body-tertiary">
            <Nav.Link href="/finance">MY FINANCE</Nav.Link>
            <Nav.Link href="/category">CATEGORIES</Nav.Link>
            <Nav.Link href="/savingPlan">SAVING PLAN</Nav.Link>
            <Button href = "/user" variant = "light" >
              <Icon path={mdiAccount } size={1} color={"black"}/> 
            </Button>
          </Nav>
        </Container>
      </Navbar>
  );
}


export default NavBar;
