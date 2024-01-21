import React, { useState } from "react";
import FormComponent from "../DescriptionTab/FormComponent";
import "./MaterialTab.css";
import AddIcon from "@mui/icons-material/Add";

const MaterialTab = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const [openForms, setOpenForms] = useState([]);

  const handleChange = (newValue) => {
    setTabValue(newValue);
    setOpenForms([]);
  };

  const handleWorkAddButtonClick = () => {
    setTabValue((prevTabValue) => (prevTabValue === "" ? 0 : prevTabValue));
    setOpenForms((prevForms) => [...prevForms, true]);
  };

  const handleMaterialAddButtonClick = () => {
    setOpenForms((prevForms) => [...prevForms, true]);
    setTabValue((prevTabValue) => (prevTabValue === 0 ? 1 : prevTabValue));
  };

  return (
    <div className="material-tab-container">
      <div className="material-tab-content">
        <div className="tab-buttons">
          <button
            className={tabValue === 0 ? "active" : ""}
            onClick={() => handleChange(0)}
          >
            Work
          </button>
          <AddIcon
            onClick={handleWorkAddButtonClick}
            style={{
              color: "black",
              backgroundColor: "grey",
              width: "30vw",
              // marginLeft: "-27vw",
            }}
          />
          {tabValue === 0 && (
            <FormComponent
              formType="work"
              masterData={props.masterData}
              index={props.index}
              handleChange={props.handleChange}
              type="work"
            />
          )}

          <button
            className={tabValue === 1 ? "active" : ""}
            onClick={() => handleChange(1)}
          >
            Material
          </button>
          <AddIcon
            onClick={handleMaterialAddButtonClick}
            style={{
              color: "black",
              backgroundColor: "grey",
              width: "30vw",
              // marginLeft: "-27vw",
            }}
          />
        </div>

        {tabValue === 1 && (
          <div>
            <FormComponent
              formType="material"
              masterData={props.masterData}
              index={props.index}
              handleChange={props.handleChange}
              type="material"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialTab;
