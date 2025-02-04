import styled from "styled-components";
import SensorList from "./SensorList";

const SensorSelection = () => {
  return (
    <Container>
      <SensorList />
    </Container>
  );
};

export default SensorSelection;

const Container = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  width: 100%;
`;
