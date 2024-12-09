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
  display: flex;
  color: #fff;
  //background-color: red;
  width: 80%;
`;
