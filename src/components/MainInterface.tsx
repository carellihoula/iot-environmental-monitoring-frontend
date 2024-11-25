import React from "react";
import styled from "styled-components";
import Header from "./Layout/Header";
import Dashboard from "./Dashboard/Dashboard";

type Props = {};

const MainInterface = (props: Props) => {
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
