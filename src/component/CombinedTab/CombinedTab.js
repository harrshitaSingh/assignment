import React, { useEffect, useState } from "react";
import ItemTab from "../ItemTab/ItemTab";
import DescriptionTab from "../DescriptionTab/DescriptionTab";
import MaterialTab from "../MaterialTab/MaterialTab";
import "./CombinedTab.css";
import { FormState } from "../../formState";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const Tabs = () => {
  const [showDescriptionTab, setShowDescriptionTab] = useState(false);
  const [showMaterialTab, setShowMaterialTab] = useState(false);
  const [masterData, setMasterData] = useState([]);
  const [descIndex, setDescIndex] = useState();
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    console.log(masterData, " Master data ");
  }, [masterData]);

  const onAdding = () => {
    const state = FormState;
    setShowMaterialTab(false)
    setShowDescriptionTab(false)
    setMasterData((prev) => {
      return [...prev, state];
    });
    setAlert(true);
    setMessage("You Have Added One Heading ");
  };

  function ChangeHeading(index) {
    return function changeHeading(e) {
      setMasterData((prevState) => {
        const updatedState = [...prevState];
        updatedState[index] = {
          ...updatedState[index],
          [e.target.name]: e.target.value,
        };
        return updatedState;
      });
    };
  }

  const changeDescription = (value) => {
    console.log(value, " index ");

    return (e) => {
      setMasterData((prev) => {
        const updatedState = [...prev];
        updatedState[value] = {
          ...updatedState[value],
          component: {
            ...updatedState[value].component,
            [e.target.name]: e.target.value,
          },
        };
        return updatedState;
      });
    };
  };

  const changeWorkOrMaterial = (value, type) => {
    if (type === "work") {
      return (e) => {
        setMasterData((prev) => {
          const updatedState = [...prev];
          updatedState[value] = {
            ...updatedState[value],
            component: {
              ...updatedState[value].component,
            },
            work: {
              ...updatedState[value].work,
              [e.target.name]: e.target.value,
            },
          };
          return updatedState;
        });
        console.log(masterData, " data ");
      };
    } else {
      return (e) => {
        setMasterData((prev) => {
          const updatedState = [...prev];
          updatedState[value] = {
            ...updatedState[value],
            component: {
              ...updatedState[value].component,
            },
            material: {
              ...updatedState[value].material,
              [e.target.name]: e.target.value,
            },
          };
          return updatedState;
        });
      };
    }
  };

  const submitHeading = (value) => {
    if (masterData[value].heading && masterData[value].subHeading) {
      setDescIndex(value);
      setShowDescriptionTab(true);
      setShowMaterialTab(false)
    } else {
      setWarning(true);
      setWarningMessage("You Have to Fill All Required Fields");
      return;
    }
  };

  const SubmitComponent = (value) => {
    console.log(value , " value ")
    console.log(masterData ,  "masterdata")
    if (
      masterData[value]?.component.description &&
      masterData[value]?.component.quantity &&
      masterData[value]?.component.unit &&
      masterData[value]?.component.rate
    ) {
      setShowMaterialTab(true);
    }else {
      setWarning(true);
      setWarningMessage("You Have to Fill All Required Fields");
      return;
    }
  };

  return (
    <>
      {alert ? (
        <Snackbar
          open={alert}
          autoHideDuration={1000}
          onClose={() => setAlert(false)}
        >
          <Alert
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
            onClose={() => setAlert(false)}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : warning ? (
        <Snackbar
          open={warning}
          autoHideDuration={1000}
          onClose={() => setWarning(false)}
        >
          <Alert
            severity="warning"
            variant="filled"
            sx={{ width: "100%" }}
            onClose={() => setWarning(false)}
          >
            {warningMessage}
          </Alert>
        </Snackbar>
      ) : null}

      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            height: "8%",
          }}
        >
          <button style={{ width: "30%", flex: 1, marginRight: "5px" }}>
            Item
          </button>
          <button style={{ width: "30%", flex: 1, marginRight: "5px" }}>
            Description
          </button>

          <button style={{ width: "30%", flex: 1, marginRight: "5px" }}>
            Material
          </button>
        </div>

        <div style={{ display: "flex", width: "100%", height: "90%" }}>
          <ItemTab
            changeheading={ChangeHeading}
            submitHeading={submitHeading}
            addHeading={onAdding}
            headingData={masterData}
          />

          {showDescriptionTab && (
            <DescriptionTab
              submitDescription={SubmitComponent}
              masterData={masterData}
              index={descIndex}
              handleChange={changeDescription}
            />
          )}
          {showMaterialTab && (
            <MaterialTab
              masterData={masterData}
              index={descIndex}
              handleChange={changeWorkOrMaterial}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Tabs;
