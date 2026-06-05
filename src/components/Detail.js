import React from "react";
import { Typography, Stack, Button } from "@mui/material";
import BodyPartImage from "../assets/icons/body-part.png";
import TargetMuscleImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";

const Detail = ({ exerciseDetail }) => {
  const { id, bodyPart, name, target, equipment } = exerciseDetail;
  const imageUrl = `https://exercisedb.p.rapidapi.com/image?exerciseId=${id}&resolution=360&rapidapi-key=${process.env.REACT_APP_RAPID_API_KEY}`;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetMuscleImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];
  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      <img src={imageUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h3">{name}</Typography>
        <Typography variant="h6">
          Exercises keep you strong. {name} {"  "} is one of the best exercises
          to target your {target}. It will help you improve your mood and gain
          energy.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Detail;
