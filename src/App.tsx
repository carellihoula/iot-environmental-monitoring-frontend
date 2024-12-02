import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import { MQTTProvider } from "./context/MqttContext";
import { SensorProvider } from "./context/SensorContext";
import router from "./router";

function App() {
  return (
    <AuthProvider>
      <MQTTProvider>
        <SensorProvider>
          <MenuProvider>
            <RouterProvider router={router} />
          </MenuProvider>
        </SensorProvider>
      </MQTTProvider>
    </AuthProvider>
  );
}

export default App;
