import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function Index() {
  return (
    <>
    {/* Este es el componente para rendreizar el inicio del juego */}
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Card className="shadow text-center">
          <h1 style={{ textShadow: "1px 2px #000000" }}>
            Hola!! , Juguemos un poco a Adivinar el perro
          </h1>
          <Link to="/game">
            <Button variant="success" size="lg" className="mt-2">
              ¡Vamos a jugar!
            </Button>
          </Link>
        </Card>
      </Container>
    </>
  );
}

export default Index;
