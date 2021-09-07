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
  const [heightList, setheightList] = useState([]);
  const [alphabeticalList, setAlphabeticalList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [character, setcharacter] = useState([]);
  let characterArray = [];
  let heightArray = [];
  let alphabeticalArray = [];

  useEffect(() => {
    
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
        setcharacterList(characterArray);
      };
      getCharacterList();

      setSelectedList(characterList);
      if (characterList.length > 0) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    
    
  }, [characterArray, characterList]);


  const getCharacter = async (value) => {
    setLoading(true);
    try {
      const response = await axios.get(value);
      setcharacter(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOption = (value) => {
    setSelectedOption(value);
    let arr1 = [...characterList]
    let arr2 = [...characterList]
    heightArray = arr1.sort(function (a, b) {
        return a.height - b.height;
      })
    setheightList(heightArray);

    alphabeticalArray = arr2.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
    setAlphabeticalList(alphabeticalArray);

    if (selectedOption === "name") {
      console.log(alphabeticalArray);
      setSelectedList(alphabeticalList);
    } else if (selectedOption === "height") {
      console.log(heightArray);
      setSelectedList(heightList);
    }
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
              {selectedList.map((object, index) => (
                <option key={index} value={object.url}>
                  {object.name}
                </option>
              ))}
            </Form.Select>
          )}
          <Options>
            <p onClick={() => getOption("name")}>
              {selectedOption === "name" ? (
                <b>Ordenar por nombres</b>
              ) : (
                "Ordenar por nombres"
              )}
            </p>
            <p onClick={() => getOption("height")}>
              {selectedOption === "height" ? (
                <b>Ordenar por estatura</b>
              ) : (
                "Ordenar por estatura"
              )}
            </p>
          </Options>
          {Object.keys(character).length !== 0 ? (
            <Target character={character} />
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Select;
