import { useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import { Menu } from "./utils/constants";
import DashboardPage from "./pages/DashboardPage";
import Header from "./components/Layout/Header";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <DashboardPage />
    </div>
  );
}

export default App;
