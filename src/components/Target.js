import React from "react";
import { Card } from "react-bootstrap";
import styled from "@emotion/styled";

const Properties = styled.ul`
  li {
    list-style: none;
  }
`;
const Target = ({ character }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <div className="card-text">
          <Properties>
            {character.height === "none" ||
            character.height === "n/a" ||
            character.height === "unknown" ? (
              <></>
            ) : (
              <li>Altura: {character.height}</li>
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
          </Properties>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Target;
