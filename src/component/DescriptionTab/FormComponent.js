import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

const FormComponent = (props) => {
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue((prevValue) => !prevValue);
  };

  const switchLabel = props.formType === "work" ? "No Material" : "No Work";

  return (
    <Grid container spacing={2} marginTop={"2vw"}>
      <Grid item xs={6}>
        <Select
          label="Category"
          name="category"
          variant="outlined"
          fullWidth
          value={props.masterData[props.index][props.type].category}
          onChange={props.handleChange(props.index, props.type)}
        >
          {props.formType === "work"
            ? [
                <MenuItem key="workOption1" value="workOption1">
                  Work Option 1
                </MenuItem>,
                <MenuItem key="workOption2" value="workOption2">
                  Work Option 2
                </MenuItem>,
              ]
            : [
                <MenuItem key="materialOption1" value="materialOption1">
                  Material Option 1
                </MenuItem>,
                <MenuItem key="materialOption2" value="materialOption2">
                  Material Option 2
                </MenuItem>,
              ]}
        </Select>
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Switch checked={switchValue} onChange={handleSwitchChange} />
          }
          label={switchLabel}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          variant="standard"
          fullWidth
          name="description"
          value={props.masterData[props.index][props.type].description}
          onChange={props.handleChange(props.index, props.type)}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Quantity"
          name="quantity"
          variant="standard"
          type="number"
          inputProps={{ pattern: "[0-9]*" }}
          fullWidth
          value={props.masterData[props.index][props.type].quantity}
          onChange={props.handleChange(props.index, props.type)}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Unit"
          variant="standard"
          fullWidth
          name="unit"
          value={props.masterData[props.index][props.type].unit}
          onChange={props.handleChange(props.index, props.type)}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Rate"
          name="rate"
          variant="standard"
          type="number"
          inputProps={{ pattern: "[0-9]*" }}
          fullWidth
          value={props.masterData[props.index][props.type].rate}
          onChange={props.handleChange(props.index, props.type)}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="GST (%)"
          name="Gst"
          variant="standard"
          type="number"
          inputProps={{ pattern: "^\\d{0,2}(\\.\\d{1,2})?%" }}
          fullWidth
          value={props.masterData[props.index][props.type].Gst}
          onChange={props.handleChange(props.index, props.type)}
        />
      </Grid>
    </Grid>
  );
};

export default FormComponent;
