import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import "./DescriptionTab.css";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


const DescriptionTab = (props) => {
  const [activeSubTab, setActiveSubTab] = useState("drawing");
  const [showForm, setShowForm] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const fileInputRef = useRef(null);
  const [url, setUrl] = useState("");
  const handleSubTabClick = (subTab) => {
    setActiveSubTab(subTab);
    if (subTab === "components") {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const multiplyQuantity = () => {
    const total =
      props.masterData[props.index].component.quantity *
      props.masterData[props.index].component.rate;
    return total.toFixed(2);
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url, " this is url");

    setUrl(url);
  };

  return (
    <div style={{ width: "33%" }} className="description-tab-container">
      <div className="tabs">
        <button
          className={activeSubTab === "drawing" ? "active" : ""}
          onClick={() => handleSubTabClick("drawing")}
        >
          Drawing
        </button>

        <DriveFolderUploadIcon
          onClick={handleUploadButtonClick}
          style={{
            color: "white",
            backgroundColor: "yellow",
            marginLeft: "-27vw",
          }}
        />

        <button
          className={activeSubTab === "components" ? "active" : ""}
          onClick={() => handleSubTabClick("components")}
        >
          Components
        </button>
      </div>

      {showForm && (
        <div className={`form-container ${isFormFilled ? "yellow-bg" : ""}`}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Description"
                variant="standard"
                fullWidth
                name="description"
                value={props.masterData[props.index].component.description}
                onChange={props.handleChange(props.index)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Quantity"
                variant="standard"
                name="quantity"
                type="number"
                value={props.masterData[props.index].component.quantity}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={props.handleChange(props.index)}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                type="text"
                label="Unit"
                variant="standard"
                name="unit"
                value={props.masterData[props.index].component.unit}
                onChange={props.handleChange(props.index)}
                fullWidth
              >
                <MenuItem value="squareFoot">Square Foot</MenuItem>
                <MenuItem value="meter">Meter</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Rate"
                name="rate"
                variant="standard"
                type="number"
                value={props.masterData[props.index].component.rate}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={props.handleChange(props.index)}
              />
              <Grid item xs={4}>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    marginTop: "1vw",
                    marginLeft: "-41vw",
                  }}
                >
                  INR: {multiplyQuantity()}
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                endIcon={<SendIcon />}
                onClick={() => props.submitDescription(props.index)}
                style={{ marginRight: "-22vw" }}
              >
                Add Vendors
              </Button>
            </Grid>
          </Grid>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={changeImage}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default DescriptionTab;
