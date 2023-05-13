import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";


function Game() {
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(10);
  const [loadedRecently, setLoadedRecently] = useState(false);

  useEffect(() => {
    if (score > 0 && !loadedRecently) {
      // Obtener los datos de la imagen y las opciones de raza desde el backend
      fetch("http://localhost:90/api-adivina/api-adivina.php")
        .then((response) => response.json())
        .then((data) => {
          setBreed(data.breed);
          setImage(data.image);
          // Desordenar las opciones de raza y agregarlas al estado
          const shuffledOptions = shuffleArray([...data.options, data.breed]);
          setOptions(shuffledOptions);
          setSelectedOption("");
          setMessage("");
          setLoadedRecently(true);
        });
    }
  }, [score, loadedRecently]);

  const handleOptionSelect = (option) => {
    if (option === breed) {
      // Si la opción seleccionada es la raza correcta, aumentar la puntuación en 2
      setSelectedOption(option);
      setMessage("¡Correcto!");
      setScore(score + 2);
      setLoadedRecently(false);
    } else {
      // Si la opción seleccionada es incorrecta, restar 2 puntos
      setScore(Math.max(score - 2, 0));
      if (score > 2) {
        // Si todavía hay puntos disponibles, mostrar un mensaje de error
        setMessage("Incorrecto, intenta de nuevo");
      } else {
        // Si no hay más puntos disponibles, mostrar un mensaje de que perdió
        setSelectedOption("");
        setMessage("Lo siento, has perdido");
      }
    }
  };

  // Función para desordenar un array
  const shuffleArray = (array) => {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled;
  };

  // Función para reiniciar el juego
  const handleReset = () => {
    setBreed("");
    setImage("");
    setOptions([]);
    setSelectedOption("");
    setMessage("");
    setScore(10);
    setLoadedRecently(false);
  };

  return (
    <>
      <div className="exit-button">
    <Button variant="danger" onClick={() => window.location.href = '/'}>
      Salir del juego
    </Button>
  </div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: "35rem" }} className="text-center">
          <Card.Body>
            <Card.Title style={{textShadow: "1px 1px #000000"}} className="h2">¿Qué raza es este perro? </Card.Title>
            {score > 0 ? (
              <>
                <Card.Img variant="top" src={image} alt="Perro" className="img-fluid card-img-top"  />
                <div className="options">
                  <div className="btn-group">
                    {options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        disabled={selectedOption !== ""}
                        className={`btn m-2 ${
                          selectedOption === option ? "btn-success" : ""
                        }`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
                {selectedOption !== "" && (
                  <div className="message">{message}</div>
                )}
                <div className="score h4" style={{textShadow: "1px 1px #000000"}}>Puntuación: {score}</div>
              </>
            ) : (
              <div className="alert">
                <p className="text-white  h2">Se acabaron tus oportunidades, has perdido.</p>
                <Button onClick={handleReset} className="m-2 ">
                  Volver a jugar
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Game;
