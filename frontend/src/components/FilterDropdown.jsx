
import React, { useState } from "react";
import { Button, Menu, MenuItem, Slider, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FilterDropdown = ({ filters, setFilters }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Open & Close Menu
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  // Handle Slider Change
  const handleSliderChange = (name, newValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: newValue }));
  };

  return (
    <>
      <Button
        onClick={openMenu}
        variant="contained"
        sx={{
          background: "#6B7280",
          color: "white",
          "&:hover": { background: "#4B5563" },
          borderRadius: "8px",
          padding: "10px 16px",
        }}
      >
        All Filters <ArrowDropDownIcon />
      </Button>

      {/* Filter Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#1F2937",
            color: "white",
            width: "280px",
            padding: "10px",
            borderRadius: "10px",
          },
        }}
      >
        {/* NFTs Filter */}
        <MenuItem disableRipple sx={{ display: "block", textAlign: "center" }}>
          <Typography variant="body1" color="primary">
            No. of NFTs
          </Typography>
          <Slider
            value={filters.nfts}
            onChange={(e, newValue) => handleSliderChange("nfts", newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={20}
            sx={{ color: "#9333EA" }}
          />
        </MenuItem>

        {/* Experience Filter */}
        <MenuItem disableRipple sx={{ display: "block", textAlign: "center" }}>
          <Typography variant="body1" color="primary">
            Experience (Years)
          </Typography>
          <Slider
            value={filters.experience}
            onChange={(e, newValue) => handleSliderChange("experience", newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            sx={{ color: "#10B981" }}
          />
        </MenuItem>

        {/* Close Button */}
        <MenuItem
          onClick={closeMenu}
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "#D1D5DB",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "transparent", color: "#A78BFA" },
          }}
        >
          Close
        </MenuItem>
      </Menu>
    </>
  );
};

export default FilterDropdown;
