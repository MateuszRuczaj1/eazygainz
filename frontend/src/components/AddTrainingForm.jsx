import { motion } from "framer-motion";
import { useState, useReducer, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useMuscles from "@/hooks/useMuscles";
import Button from "./Button";
import ExercisesGrid from "./ExercisesGrid";
import ExerciseCard from "./ExerciseCard";
import ExerciseSets from "./ExerciseSets";
import useCreateTraining from "@/hooks/useCreateTraining";
function reducer(state, action) {
  switch (action.type) {
    case "select_muscle_group":
      return { ...state, selectedMuscleGroup: action.muscleGroup };
    case "select_exercise":
      return { ...state, selectedExercise: action.exercise };
    case "show_form":
      return { ...state, isFormVisible: true };
    case "hide_form":
      return { ...state, isFormVisible: false };
    default:
      return state;
  }
}

export default function AddTrainingForm({ onClose }) {
  const { register, handleSubmit, setValue, control } = useForm();
  const {
    fields: exerciseFields,
    append: appendExercise,
    remove: removeExercise,
  } = useFieldArray({ control, name: "exercises" });

  const [data, setData] = useState();
  const [state, dispatch] = useReducer(reducer, {
    isFormVisible: false,
    selectedMuscleGroup: null,
    selectedExercise: null,
  });

  const { data: musclesData, isLoading, error } = useMuscles();
  const {
    mutate,
    isPending,
    isError,
    error: submitError,
  } = useCreateTraining();
  useEffect(() => {
    if (musclesData?.length > 0) {
      dispatch({
        type: "select_muscle_group",
        muscleGroup: musclesData[0]?.muscle,
      });
    }
  }, [musclesData]);

  const exercises = state.selectedMuscleGroup
    ? musclesData
        ?.filter((item) => item.muscle === state.selectedMuscleGroup)
        .flatMap((item) => item.exercises)
    : [];

  const handleShowContent = (e) => {
    e.preventDefault();
    dispatch({ type: "show_form" });
  };

  const handleSelectExercise = (exercise) => {
    appendExercise({ name: exercise.name, sets: [] });
    dispatch({ type: "select_exercise", exercise: exercise.name });
  };

  const onSubmit = (formData) => {
    console.log(formData);
    mutate(formData, {
      onSuccess: () => {
        alert("Trening zapisany!");
        onClose();
      },
      onError: (error) => alert("Błąd:" + error.message),
    });
  };

  if (isLoading) return <p>Ładowanie mięśni...</p>;
  if (error) return <p>Wystąpił błąd: {error}</p>;
  if (isPending) return <p>Zapisywanie treningu...</p>;
  if (isError) return <p>Błąd zapisu: {submitError.message}</p>;
  return (
    <form
      className="flex flex-col items-center space-y-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        defaultValue="Nowy trening"
        className="text-center"
        {...register("title")}
      />
      {state.isFormVisible ? (
        <div className="flex flex-col justify-between p-6">
          <div>
            <label htmlFor="exercise" className="text-sm md:text-base">
              Ćwiczona grupa mięśniowa:
            </label>
            <select
              className="min-w-[80px] border border-slate-500 rounded-2xl ms-4 px-2 text-sm md:text-base appearance-none bg-white"
              id="exercise"
              onChange={(e) =>
                dispatch({
                  type: "select_muscle_group",
                  muscleGroup: e.target.value,
                })
              }
            >
              {musclesData.map((item) => (
                <option key={item._id} value={item.muscle}>
                  {item.muscle}
                </option>
              ))}
            </select>

            {state.selectedMuscleGroup && (
              <ExercisesGrid>
                {exercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise._id}
                    exercise={exercise}
                    onClick={() => handleSelectExercise(exercise)}
                    selected={state.selectedExercise === exercise.name}
                  />
                ))}
              </ExercisesGrid>
            )}

            {exerciseFields.map((exercise, exerciseIndex) => (
              <div key={exercise.id} className="mt-4">
                <h3>{exercise.name}</h3>
                <button
                  className="bg-red-500 px-4 py-1 text-white rounded-md mt-2"
                  type="button"
                  onClick={() => removeExercise(exerciseIndex)}
                >
                  Usuń ćwiczenie
                </button>
                <ExerciseSets
                  control={control}
                  register={register}
                  exerciseIndex={exerciseIndex}
                />
              </div>
            ))}
          </div>
          <div className="self-start my-4">
            <Button type="submit">Dodaj</Button>
          </div>
        </div>
      ) : (
        <>
          <motion.button
            className="w-full px-6 rounded-2xl text-start border border-gray-200 py-2"
            whileHover={{ scale: 1.01, cursor: "pointer" }}
            onClick={handleShowContent}
          >
            + Dodaj ćwiczenie
          </motion.button>
          <p>{data}</p>
        </>
      )}
    </form>
  );
}
