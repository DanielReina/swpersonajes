import React from 'react';
import styled from "@emotion/styled";


const Nav = styled.nav`
  height: 70px;
  line-height: 70px;
  background-color: lightgray;
  p{
      text-align: center;
      font-size: 20px;
  }
`;

const Header = ({title}) => {
    return (
        <Nav><p>{title}</p></Nav>
     );
}
 
export default Header;