import React from "react";
import { Card } from "react-bootstrap";



const Target = ({ character }) => {
  return (
    <Card style={{ width: "18rem" }} id='card'>
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <div className="card-text">
          <ul>
            {character.height === "none" ||
            character.height === "n/a" ||
            character.height === "unknown" ? (
              <></>
            ) : (
              <li>Altura: {character.height} cms</li>
            )}

            {character.hair_color === "none" ||
            character.hair_color === "n/a" ||
            character.hair_color === "unknown" ? (
              <></>
            ) : (
              <li>Color de Pelo: {character.hair_color}</li>
            )}

            {character.gender === "none" ||
            character.gender === "n/a" ||
            character.gender === "unknown" ? (
              <></>
            ) : (
              <li>Género: {character.gender}</li>
            )}
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Target;
