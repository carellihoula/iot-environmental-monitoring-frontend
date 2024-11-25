import styled from "styled-components";
import Header from "./Layout/Header";
import Dashboard from "./Dashboard/Dashboard";

const MainInterface = () => {
  return (
    <Container>
      <Header />
      <Dashboard />
    </Container>
  );
};

export default MainInterface;

const Container = styled.div`
  width: 85%;
`;
