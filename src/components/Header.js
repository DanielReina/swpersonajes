import React from "react";
import styled from "@emotion/styled";

const Nav = styled.nav`
  height: 70px;
  line-height: 70px;
  background-image: url("https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-25.jpg");
  p {
    font-family: "Coustard", serif;
    color: yellow;
    text-align: center;
    font-size: 20px;
    word-spacing: 1em;
    text-transform: uppercase;
  }
  @media (max-width: 500px) {
    p {
      font-size: 16px;
    }
  }
`;

const Header = ({ title }) => {
  return (
    <Nav>
      <p>{title}</p>
    </Nav>
  );
};

export default Header;
