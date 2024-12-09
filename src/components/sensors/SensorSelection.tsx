import styled from "styled-components";
import SensorList from "./SensorList";

type Props = {};

const SensorSelection = (props: Props) => {
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
