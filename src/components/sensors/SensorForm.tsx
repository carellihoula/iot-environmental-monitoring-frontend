import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";
import { Sensor } from "../../interface_types/types";
import InputField from "../Common/InputField";

const SensorForm: React.FC = () => {
  const [formData, setFormData] = useState<Sensor>({
    id: "carel1998",
    name: "DHT22",
    owner_id: "1258",
    data: {},
  });

  // Ajouter des mesures dynamiques avec valeur null
  const addMeasurement = (key: string, value: null) => {
    setFormData((prev) => ({
      ...prev,
      data: { ...prev.data, [key]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données soumises :", formData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ flex: 1, padding: "10px" }}>
        <h2>Ajouter un Capteur</h2>

        <div>
          <label>Nom du capteur :</label>

          <InputField
            placeholder="Entrez le nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            width="100%"
            height="40px"
            margin="10px 0"
            icon={<CiCirclePlus size={20} />}
          />
        </div>

        <h3>Mesures</h3>
        <MeasurementAdder addMeasurement={addMeasurement} />

        {/* Liste des mesures */}
        {Object.keys(formData.data).length > 0 && (
          <div className="mesures__list">
            {Object.entries(formData.data).map(([key]) => (
              <Mesure key={key}>
                <p className="raleway-regular ">{key}</p>
                <TiDelete color="red" size={24} />
              </Mesure>
            ))}
          </div>
        )}
        <button type="submit" className="btn__submit">
          Sauvegarder
        </button>
      </form>

      {/* Affichage du JSON */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          flex: 1,
          backgroundColor: "#252525",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h3>Format JSON</h3>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </Container>
  );
};

// Composant MeasurementAdder inclus ici
interface MeasurementAdderProps {
  addMeasurement: (key: string, value: null) => void;
}

const MeasurementAdder: React.FC<MeasurementAdderProps> = ({
  addMeasurement,
}) => {
  const [key, setKey] = useState("");

  const handleAdd = () => {
    if (key) {
      addMeasurement(key, null); // La valeur est toujours null
      setKey(""); // Réinitialiser le champ de la clé
    }
  };

  return (
    <MeasurementAdderStyled>
      <input
        type="text"
        placeholder="Valeur"
        value={"null"}
        readOnly
        style={{ display: "none" }}
      />
      <InputField
        placeholder="Ajouter une mesure"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        width="100%"
        height="40px"
        margin="10px 0"
        icon={<CiCirclePlus size={20} />}
      />
      <button
        type="button"
        onClick={handleAdd}
        className="raleway-medium add__measure "
      >
        Ajouter
      </button>
    </MeasurementAdderStyled>
  );
};
export default SensorForm;

const Container = styled.div`
  display: "flex";
  flex-direction: row;
  justify-content: "space-between";
  gap: "20px";
  width: 100%;
  // background-color: red;

  .btn__submit {
    background-color: #3c1bd1;
    padding: 5px;
    border-style: none;
    text-align: center;
    border-radius: 5px;
    height: 40px;
    width: 100%;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    box-sizing: content-box;
    &:hover {
      background-color: #2e02f5;
    }
  }

  .mesures__list {
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    gap: 10px;
    padding: 15px;
    width: 100%;
    background-color: #252525;
  }
`;

const Mesure = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #000;
  padding: 5px;
  margin-bottom: 5px;
  width: auto;
  border-radius: 5px;
`;

const MeasurementAdderStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .add__measure {
    height: 40px;
    width: 300px;
    background-color: #252525;
    box-sizing: content-box;
    border-style: none;
    margin-bottom: 5px;
    font-weight: bold;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: #4e4c4c;
    }
  }
`;
