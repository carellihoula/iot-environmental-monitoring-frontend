import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import styled from "styled-components";
import { Sensor } from "../../interface_types/types";
import CopyToClipboard from "../Common/CopyToClipboard";
import InputField from "../Common/InputField";
import convert, { Unit } from "convert-units";

const SensorForm: React.FC = () => {
  const [formData, setFormData] = useState<Sensor>({
    id: "carel1998",
    name: "",
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
  const handleCopy = () => {
    const json = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      alert("JSON copié dans le presse-papiers !");
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données soumises :", formData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2 className="raleway-bold">AJOUTER UN DISPOSITIF</h2>

        <h3 className="raleway-bold">Nom du Dispositif</h3>
        <InputField
          placeholder="Entrez le nom"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          height="55px"
          width="100%"
          margin="10px 0"
          icon={<CiCirclePlus size={20} />}
        />

        <h3 className="raleway-bold">Mesures</h3>
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
      <JsonContainer>
        <h3>Format JSON</h3>
        <CopyToClipboard
          text={JSON.stringify(formData, null, 2)}
          onCopy={() => console.log("JSON copié !")}
        />
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </JsonContainer>
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
  const [searchTerm, setSearchTerm] = useState<string>(""); // État pour le champ de recherche
  const [filteredMeasures, setFilteredMeasures] = useState<string[]>([]);
  const [magnitude, setMagnitude] = useState<string>("");
  const [unitOptions, setUnitOptions] = useState<Unit[]>(
    convert().possibilities(searchTerm as convert.Measure)
  );
  const [selectedUnit, setSelectedUnit] = useState<string>("");

  // Fonction pour gérer les changements dans le champ de grandeur
  const handleMagnitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const measures = convert().measures();
    const value = e.target.value;
    setSearchTerm(value);

    // Filtrer les mesures de `convert().measures()` en fonction du terme de recherche

    const filtered = measures.filter((measure) =>
      measure.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMeasures(filtered);
  };

  // Fonction pour gérer la sélection d'une unité
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value);
  };
  const handleAdd = () => {
    if (key && searchTerm && selectedUnit) {
      // Ajouter la mesure avec la grandeur et l'unité sélectionnées
      addMeasurement(`${key} (${searchTerm}, ${selectedUnit})`, null);
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
        height="55px"
        width="100%"
        icon={<CiCirclePlus size={20} />}
      />
      {/* Champ pour la grandeur */}
      <InputField
        placeholder="Entrez une grandeur (ex: masse, longueur)"
        value={searchTerm}
        onChange={handleMagnitudeChange}
        height="55px"
        width="100%"
        margin="10px 0"
      />
      {/* Liste filtrée des grandeurs */}
      <ul>
        {convert().measures().length > 0 ? (
          filteredMeasures.map((measure) => <li key={measure}>{measure}</li>)
        ) : (
          <li>Aucune grandeur trouvée</li>
        )}
      </ul>

      {/* Sélectionner l'unité de la grandeur */}
      {unitOptions.length > 0 && (
        <select value={selectedUnit} onChange={handleUnitChange}>
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      )}
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
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  //background-color: blue;
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 70%;
    h2 {
      text-align: center;
    }
  }
  .btn__submit {
    background-color: #3c1bd1;
    padding: 0.5rem 0;
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
    box-sizing: border-box;
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

  border-radius: 5px;
`;

const MeasurementAdderStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  // background-color: red;
  width: 100%;
  gap: 10px;
  select {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0;
  }
  .add__measure {
    height: 55px;
    background-color: #3c1bd1;
    box-sizing: border-box;
    border-style: none;
    font-weight: bold;
    color: #fff;
    padding: 0.5rem 5rem;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: #2e02f5;
    }
  }
`;

const JsonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex: 1;
  background-color: #252525;
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const CopyButton = styled.button`
  background-color: #3c1bd1;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  &:hover {
    background-color: #2e02f5;
  }
`;
