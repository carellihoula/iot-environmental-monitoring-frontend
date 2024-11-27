import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SensorProvider } from "./context/SensorContext.tsx";
import { MenuProvider } from "./context/MenuContext.tsx";
import { MQTTProvider } from "./context/MqttContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MQTTProvider>
      <SensorProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </SensorProvider>
    </MQTTProvider>
  </StrictMode>
);
