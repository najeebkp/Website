import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

// Components
import { Stack, Avatar, Typography } from "@mui/material";

const CategoryItem = (props) => {
  return (
    <Link to={props.url} target="_blank" className="item">
      <Stack justifyContent="center" alignItems="center">
        <Avatar
          src={props.imgUrl}
          alt={props.label}
          sx={{ width: 56, height: 56 }}
        />
        <h6 className="item-h6">{props.label}</h6>
        <Typography variant="caption">
          <strong>Shop Now</strong>
        </Typography>
      </Stack>
    </Link>
  );
};

const Categories = () => {
  return (
    <Stack className="categories">
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        sx={{ padding: "10px" }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "Staatliches" }}
          align="center"
        >
          Featured Categories
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        className="item-wrapper"
        spacing={1}
        flexWrap="wrap"
      >
        <CategoryItem
          url="/SearchResult/tag:JEE Mains"
          imgUrl="/images/Categories/jeemains-logo.png"
          label="JEE MAINS"
        />
        <CategoryItem
          url="/SearchResult/tag:JEE Advanced"
          imgUrl="/images/Categories/JEE-Advance-Logo.png"
          label="JEE ADVANCED"
        />
        <CategoryItem
          url="/SearchResult/tag:CSBE"
          imgUrl="/images/Categories/cbse-logo.png"
          label="CBSE"
        />
        <CategoryItem
          url="/SearchResult/tag:NEET"
          imgUrl="/images/Categories/neet-ug-logo.png"
          label="NEET UG"
        />
        <CategoryItem
          url="/SearchResult/tag:NOVELS"
          imgUrl="/images/Categories/novel-logo.jpg"
          label="NOVELS"
        />
      </Stack>
    </Stack>
  );
};
export default Categories;
