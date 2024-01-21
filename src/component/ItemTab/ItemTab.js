

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./ItemTab.css";

const ItemTab = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  console.log(props.headingData, "heaing Data ");
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{width : "33%"}}  className="item-tab-container">
      <div className="item-tab-content">
        {props.headingData.length > 0 &&
          props.headingData.map((data, index) => (
            <div key={index}>
              <TextField
                label="Heading"
                name="heading"
                type="text"
                variant="standard"
                fullWidth
                value={props.headingData[index].heading}
                onChange={props.changeheading(index)}
                InputProps={{
                  endAdornment: (
                    <>
                      <IconButton
                        aria-controls="options-menu"
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="options-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={props.addHeading}>
                          Add More Heading
                        </MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </Menu>
                    </>
                  ),
                }}
              />

              <TextField
                label="Sub-Heading"
                variant="standard"
                name="subHeading"
                fullWidth
                value={
                  props.headingData[index].heading
                    ? props.headingData[index].subHeading
                    : ""
                }
                onChange={props.changeheading(index)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => props.submitHeading(index)}>
                      <ArrowForwardIcon />
                    </IconButton>
                  ),
                }}
              />
              
            </div>
          ))}

        {props.headingData.length === 0 && (
          <Button
            variant="contained"
            onClick={props.addHeading}
            style={{ backgroundColor: "rgba(18, 12, 66, 0.836)" }}
          >
            Add Heading
          </Button>
        )}
      </div>
    </div>
  );
};

export default ItemTab;
