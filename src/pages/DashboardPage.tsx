import styled from "styled-components";
import Sidebar from "../components/Layout/Sidebar";
import MainInterface from "../components/MainInterface";
import { Menu } from "../utils/constants";


const DashboardPage = () => {
  /*const [theme, setTheme] = useState("mytheme");
  const toggleTheme = () => {
    setTheme(theme === "mytheme" ? "dark" : "mytheme");
  }; data-theme={theme} */
  return (
    <Container style={{ backgroundColor: "#000" }} >
      <Sidebar list={Menu} />
      <MainInterface />
      {/*<button
        onClick={toggleTheme}
        className="btn btn-primary"
      >
        Toggle Theme
      </button>*/}
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
