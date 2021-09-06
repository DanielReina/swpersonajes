import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import  Spinner from './Spinner.js'
import styled from "@emotion/styled";

const Select = () => {
  const [characterList, setcharacterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heightList, setheightList] = useState([]);
  const [alphabeticalList, setalphabeticalList] = useState([]);
  const [character, setcharacter] = useState([]);
  let characterArray = [];
  let heightArray = [];
  let alphabeticalArray = [];
  
  useEffect(() => {
    const getCharacterList = async () => {
      let url = "https://swapi.dev/api/people/";
      let result = await axios.get(url);
      while (result.data.next != null) {
        result.data.results.forEach((element) => {
          characterArray.push(element);
        });
        url = result.data.next;
        result = await axios.get(url);
      }
      setcharacterList(characterArray);
      // result.data.results
    };
    getCharacterList();
    heightArray = characterList.sort(function (a, b) {
      return a.height - b.height;
    });
    setheightList(heightArray);
    alphabeticalArray = characterList.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name< b.name) {
        return -1;
      }
      return 0;
    });
    setalphabeticalList(heightArray);
    if (alphabeticalList.length>0){ setLoading(false)}else{
      setLoading(true);
    }  
  }, [characterArray, heightArray, alphabeticalArray]);

const getcharacter = async (value) => {
  let result = await axios.get(value);
  setcharacter(result);
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
                  getcharacter(e.target.value);
                }}
            >
              <option>Elige un personaje</option>
              {heightList.map((object, index) => (
                <option key={index} value={object.url}>
                  {object.name}
                </option>
              ))}
            </Form.Select>
          )}

        </Col>
      </Row>
    </Container>
  );
};

export default Select;
