import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise,
  );

  const paginate = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        const offsets = [0, 10, 20, 30, 40, 50];

        const requests = offsets.map((offset) =>
          fetchData(
            `https://exercisedb.p.rapidapi.com/exercises?offset=${offset}&limit=10`,
            exerciseOptions,
          ),
        );

        const responses = await Promise.all(requests);

        exercisesData = responses.flat();
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions,
        );
      }

      setExercises(exercisesData);
      setCurrentPage(1);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>

      {exercises.length === 0 ? (
        <Typography variant="h6" textAlign="center" mt="40px">
          No results found 😢
        </Typography>
      ) : (
        <>
          <Stack
            direction="row"
            sx={{ gap: { lg: "110px", xs: "50px" } }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {currentExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </Stack>

          <Stack mt="100px" alignItems="center">
            {exercises.length > exercisesPerPage && (
              <Pagination
                color="standard"
                defaultPage={1}
                count={Math.ceil(exercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
              />
            )}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default Exercises;
