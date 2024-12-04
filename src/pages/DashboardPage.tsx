import styled from "styled-components";
import Sidebar from "../components/Layout/Sidebar";
import MainInterface from "../components/MainInterface";
import { Menu } from "../utils/constants";

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
  overflow-y: hidden;
`;
