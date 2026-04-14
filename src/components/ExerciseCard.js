import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ExerciseCard = ({ exercise }) => {
  const imageUrl = `https://exercisedb.p.rapidapi.com/image?exerciseId=${exercise.id}&resolution=360&rapidapi-key=${process.env.REACT_APP_RAPID_API_KEY}`;
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img src={imageUrl} alt={exercise.name} loading="lazy" />
    </Link>
  );
};

export default ExerciseCard;
