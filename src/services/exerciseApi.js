const RAPIDAPI_KEY = process.env.REACT_APP_RAPID_API_KEY;

// שימי כאן את ה-base URL של ה-V2 endpoint מתוך RapidAPI/AscendAPI
// אחרי שתירשמי/תתחברי למסלול המתאים ב-RapidAPI.
const BASE_URL = "PASTE_YOUR_V2_EXERCISE_ENDPOINT_HERE";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": RAPIDAPI_KEY,
  },
};

const normalizeExercise = (item) => {
  const imageUrl =
    item.imageUrl && item.imageUrl.startsWith("http")
      ? item.imageUrl
      : item.imageUrl
        ? `${BASE_URL.replace(/\/api.*$/, "")}/media/images/${item.imageUrl}`
        : "";

  return {
    id: item.exerciseId ?? item.id ?? "",
    name: item.name ?? "",
    gifUrl: imageUrl,
    bodyPart: item.bodyParts?.[0]?.toLowerCase?.() ?? "",
    target: item.targetMuscles?.[0]?.toLowerCase?.() ?? "",
    equipment: item.equipments?.[0]?.toLowerCase?.() ?? "",
    secondaryMuscles: item.secondaryMuscles ?? [],
    instructions: item.instructions ?? [],
  };
};

const extractItems = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.results)) return data.results;
  if (Array.isArray(data.items)) return data.items;
  return [];
};

export const getAllExercises = async () => {
  const response = await fetch(BASE_URL, options);
  const data = await response.json();
  return extractItems(data).map(normalizeExercise);
};

export const searchExercises = async (query) => {
  const all = await getAllExercises();
  const q = query.toLowerCase().trim();

  return all.filter(
    (exercise) =>
      exercise.name.includes(q) ||
      exercise.target.includes(q) ||
      exercise.equipment.includes(q) ||
      exercise.bodyPart.includes(q),
  );
};

export const getBodyParts = async () => {
  const all = await getAllExercises();
  const unique = [
    ...new Set(all.map((exercise) => exercise.bodyPart).filter(Boolean)),
  ];
  return ["all", ...unique];
};

export const getExercisesByBodyPart = async (bodyPart) => {
  const all = await getAllExercises();
  if (bodyPart === "all") return all;
  return all.filter((exercise) => exercise.bodyPart === bodyPart.toLowerCase());
};
