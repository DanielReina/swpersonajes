import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Target from "./Target.js";
import Spinner from "./Spinner.js";
import styled from "@emotion/styled";

const Options = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  p {
    margin: 20px;
  }
  p:hover {
    cursor: pointer;
  }
`;

const Select = () => {
  const [characterList, setcharacterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCharacter, setLoadingCharacter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [character, setcharacter] = useState([]);
  let characterArray = [];

  useEffect(() => {
    getCharacterList();
  }, []);
  const getCharacterList = async () => {
    let url = "https://swapi.dev/api/people";
    let result = await axios.get(url);
    while (result.data.next != null) {
      result.data.results.forEach((element) => {
        characterArray.push(element);
      });
      url = result.data.next;
      result = await axios.get(url);
    }
    console.log(characterArray.length);
    setcharacterList(characterArray);
    setLoading(false);
  };

  const getCharacter = async (value) => {
    setLoadingCharacter(true)
    try {
      const response = await axios.get(value);
      setcharacter(response.data)
      
    } catch (error) {
      console.log(error);
    }
    setLoadingCharacter(false)
  };

  const getOptionSort = (value) => {
    if (value === "name") {
      console.log("name");
      setLoading(true);
      setcharacterList(
        characterList.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      );
      setLoading(false);
    } else if (value === "height") {
      
      setLoading(true);
      setcharacterList(
        characterList.sort(function (a, b) {
          if (a.height==='unknown') {
            a.height=0
          }
          if (b.height === "unknown") {
            b.height=0
          }
          return a.height - b.height;
        })
      );
      console.log(characterList);
      setLoading(false);
    } else {
      console.log("none");
    }
    setSelectedOption(value);
  };

  return (
    <Container id="selectContainer">
      <Row>
        <Col>
          {loading ? (
            <Spinner />
          ) : (
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                getCharacter(e.target.value);
              }}
            >
              <option>Elige un personaje</option>
              {characterList.map((object, index) => (
                <option key={index} value={object.url}>
                  {object.name}
                </option>
              ))}
            </Form.Select>
          )}
          <Options>
            <p onClick={() => getOptionSort("name")}>
              {selectedOption === "name" ? (
                <b>Ordenar por nombres</b>
              ) : (
                "Ordenar por nombres"
              )}
            </p>
            <p onClick={() => getOptionSort("height")}>
              {selectedOption === "height" ? (
                <b>Ordenar por estatura</b>
              ) : (
                "Ordenar por estatura"
              )}
            </p>
          </Options>
          {loadingCharacter ? <Spinner /> :(
            
              Object.keys(character).length !== 0 ? (
                <Target character={character} />
              ) : (
                <></>
              ))
            }
        </Col>
      </Row>
    </Container>
  );
};

export default Select;
