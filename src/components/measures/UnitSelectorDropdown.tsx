import { Unit } from "convert-units";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

interface UnitSelectorDropdownProps {
  units: Unit[];
  selectedUnit: Unit;
  onUnitChange: (unit: Unit) => void;
}

const UnitSelectorDropdown: React.FC<UnitSelectorDropdownProps> = ({
  units,
  selectedUnit,
  onUnitChange,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleUnitSelect = (unit: Unit) => {
    onUnitChange(unit);
    setIsDropdownVisible(false);
  };

  return (
    <UnitsContainer>
      <SelectedUnit onClick={toggleDropdown}>
        <span className="truncate">{selectedUnit}</span>
        <IoIosArrowDown color="#FFF" size={24} style={{ cursor: "pointer" }} />
      </SelectedUnit>
      {isDropdownVisible && (
        <Dropdown>
          {units.map((unit: Unit) => (
            <DropdownItem key={unit} onClick={() => handleUnitSelect(unit)}>
              {unit}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </UnitsContainer>
  );
};

export default UnitSelectorDropdown;

// Styled Components
const UnitsContainer = styled.div`
  position: relative;
`;

const SelectedUnit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000; /* Background noir comme initialement */
  min-width: 90px;
  max-width: 100px;
  height: 22px;

  padding: 8px;
  border-radius: 10px;
  cursor: pointer;

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80%;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #4d73ac;
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 10px;
  z-index: 1000;
  margin-top: 5px;
`;

const DropdownItem = styled.div`
  padding: 5px;
  cursor: pointer;
  color: #fff;
  border-bottom: 1px solid #fff;
  //border-radius: 5px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #3bc229;
  }
`;
