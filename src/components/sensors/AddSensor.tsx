import styled from "styled-components";
import SensorForm from "./SensorForm";

const AddSensor = () => {
  return (
    <Container>
      <SensorForm />
    </Container>
  );
};

export default AddSensor;

const Container = styled.div`
  color: #fff;
  width: 50%;
`;
