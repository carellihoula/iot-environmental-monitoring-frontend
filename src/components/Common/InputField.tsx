import React from "react";
import styled from "styled-components";
import { InputFieldProps } from "../../interface_types/interface";

const InputField: React.FC<InputFieldProps> = ({
  placeholder = "Enter text...",
  value,
  onChange,
  type = "text",
  width = "300px",
  height = "35px",
  margin = "0",
  icon,
}) => {
  return (
    <SearchBar width={width} height={height} margin={margin}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </SearchBar>
  );
};

export default InputField;

// Styled-components
const SearchBar = styled.div<{ width: string; height: string; margin: string }>`
  display: flex;
  align-items: center;
  background-color: #252525;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  color: #fff;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};

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
`;

const IconWrapper = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  color: #bbb;
  cursor: pointer;
`;
