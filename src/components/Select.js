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
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 20px;
    text-align: center;
  }
  p:hover {
    cursor: pointer;
  }
`;
const Small = styled.small`
  display: flex;
  justify-content: center;
`;
const SortBy = styled.h2`
  font-family: "Coustard", serif;
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-top: 100px;
  margin-bottom: -50px;
  @media (max-width: 400px) {
    margin-top: 50px;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setcharacterList(characterArray);
    setLoading(false);
  };

  const getCharacter = async (value) => {
    setLoadingCharacter(true);
    try {
      const response = await axios.get(value);
      setcharacter(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingCharacter(false);
  };

  const getOptionSort = (value) => {
    if (value === "name") {
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
          if (a.height === "unknown") {
            a.height = 0;
          }
          if (b.height === "unknown") {
            b.height = 0;
          }
          return a.height - b.height;
        })
      );
      setLoading(false);
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
            <>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  getCharacter(e.target.value);
                }}
                id="select"
              >
                <option>Elige un personaje</option>
                {characterList.map((object, index) => (
                  <option key={index} value={object.url}>
                    {object.name}
                  </option>
                ))}
              </Form.Select>

              <Small>
                {selectedOption === "name" ? (
                  "*Lista ordenada alfabéticamente."
                ) : selectedOption === "height" ? (
                  "*Lista ordenada por altura."
                ) : selectedOption === "" ? (
                  "*Lista desordenada."
                ) : (
                  <></>
                )}
              </Small>

              <SortBy>Ordenar por</SortBy>
              <Options className="mt-5 mb-5">
                <p
                  onClick={() => getOptionSort("name")}
                  className={
                    selectedOption === "name" ? "selected" : "non_selected"
                  }
                >
                  Nombre
                </p>
                <p
                  onClick={() => getOptionSort("height")}
                  className={
                    selectedOption === "height" ? "selected" : "non_selected"
                  }
                >
                  Estatura
                </p>
              </Options>
            </>
          )}
          {loadingCharacter ? (
            <Spinner />
          ) : Object.keys(character).length !== 0 ? (
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
