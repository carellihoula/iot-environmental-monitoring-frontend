import Sidebar from "../components/Layout/Sidebar";
import { Menu } from "../utils/constants";
import styled from "styled-components";
import MainInterface from "../components/MainInterface";

const DashboardPage = () => {
  return (
    <Container style={{ backgroundColor: "#000" }}>
      <Sidebar list={Menu} />
      <MainInterface />
    </Container>
  );
};

export default DashboardPage;

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100vh;
`;
