import React from "react";
import { Typography, Stack, Button } from "@mui/material";
import BodyPartImage from "../assets/icons/body-part.png";
import TargetMuscleImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const { id, bodyPart, name, target, equipment } = exerciseDetail;
  const imageUrl = `https://exercisedb.p.rapidapi.com/image?exerciseId=${id}&resolution=360&rapidapi-key=${process.env.REACT_APP_RAPID_API_KEY}`;
  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      <img src={imageUrl} alt={name} loading="lazy" className="detail-image" />
    </Stack>
  );
};

export default Detail;
