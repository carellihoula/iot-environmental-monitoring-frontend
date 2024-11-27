import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { BsQuestionCircle, BsBell } from "react-icons/bs";
import avatar from "/images/aa.jpg";
import { useMQTTContext } from "../../context/MqttContext";

const Header: React.FC = () => {
  const { sensors } = useMQTTContext();
  console.log(sensors);
  return (
    <Container>
      {/* Barre de recherche */}
      <div className="search__bar__container">
        <SearchBar>
          <input type="text" placeholder="Search type of keywords" />
          <FiSearch size={20} />
        </SearchBar>
      </div>

      {/* Icônes et avatar */}
      <IconsContainer>
        <IconWrapper>
          <BsQuestionCircle size={20} />
        </IconWrapper>
        <IconWrapper>
          <BsBell size={20} />
        </IconWrapper>
        <UserProfile>
          <img src={avatar} alt="User" />
          <span>Carel</span>
          <DropdownIcon>▼</DropdownIcon>
        </UserProfile>
      </IconsContainer>
    </Container>
  );
};

export default Header;

// Styles
const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #000;
  color: #fff;
  margin-bottom: 20px;
  //background-color: red;
  .search__bar__container {
    display: flex;
    //background-color: red;
    justify-content: center;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #252525;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: #fff;
  width: 300px;
  height: 35px;
  margin-left: 195px;

  input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: #fff;
    font-size: 0.9rem;
    margin-right: 0.5rem;
  }

  input::placeholder {
    color: #bbb;
  }

  svg {
    color: #bbb;
    cursor: pointer;
  }
`;

const IconsContainer = styled.div`
  //background-color: red;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  background-color: #333;
  border-radius: 20%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    color: #fff;
  }

  &:hover {
    background-color: #444;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  span {
    font-size: 0.9rem;
  }
`;

const DropdownIcon = styled.span`
  font-size: 0.8rem;
  color: #bbb;
`;
