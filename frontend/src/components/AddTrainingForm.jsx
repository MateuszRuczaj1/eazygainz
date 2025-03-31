import { motion } from "framer-motion";
import { useState, useReducer, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import useMuscles from "@/hooks/useMuscles";
import Button from "./Button";
import ExercisesGrid from "./ExercisesGrid";
import ExerciseCard from "./ExerciseCard";
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

export default function AddTrainingForm() {
  const { register, handleSubmit, setValue, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sets",
  });
  const [data, setData] = useState();
  const [state, dispatch] = useReducer(reducer, {
    isFormVisible: false,
    selectedMuscleGroup: null,
    selectedExercise: null,
  });

  const { data: musclesData, isLoading, error } = useMuscles();
  useEffect(() => {
    if (musclesData && musclesData.length > 0) {
      dispatch({
        type: "select_muscle_group",
        muscleGroup: musclesData[0]?.muscle,
      });
    }
  }, [musclesData]);
  const exercises = state.selectedMuscleGroup
    ? musclesData
        .filter((item) => item.muscle === state.selectedMuscleGroup)
        .flatMap((item) => item.exercises)
    : [];

  const handleShowContent = (e) => {
    e.preventDefault();
    dispatch({ type: "show_form" });
  };
  const handleSelectExercise = (exerciseName) => {
    dispatch({ type: "select_exercise", exercise: exerciseName });
    setValue("exercises", exerciseName);
  };
  const onSubmit = (formData) => {
    console.log(formData);
    setData(JSON.stringify(formData));
  };

  if (isLoading) return <p>Ładowanie mięśni...</p>;
  if (error) return <p>Wystąpił błąd: {error}</p>;
  if (state.selectedExercise) {
    console.log(state.selectedExercise);
  }

  return (
    <form
      className="flex flex-col items-center space-y-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        defaultValue={"Nowy trening"}
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
              name="exercise"
              id="exercise"
              onChange={(event) =>
                dispatch({
                  type: "select_muscle_group",
                  muscleGroup: event.target.value,
                })
              }
            >
              {musclesData.map((item, index) => (
                <option
                  key={item._id}
                  value={item.muscle}
                  selected={index === 0}
                >
                  {item.muscle}
                </option>
              ))}
            </select>

            {state.selectedMuscleGroup && (
              <>
                <ExercisesGrid>
                  {exercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise._id}
                      exercise={exercise}
                      onClick={(exercise) =>
                        handleSelectExercise(exercise.name)
                      }
                      selected={state.selectedExercise === exercise.name}
                      register={register}
                    />
                  ))}
                </ExercisesGrid>
              </>
            )}
            {state.selectedExercise && (
              <button
                type="button"
                onClick={() => append({ reps: 0, weight: 0 })}
              >
                Dodaj serię
              </button>
            )}
            {fields.map((field, index) => (
              <div key={field.id}>
                <input
                  {...register(`sets.${index}.reps`)}
                  defaultValue={field.reps}
                />
                <input
                  {...register(`sets.${index}.weight`)}
                  defaultValue={field.weight}
                />
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
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
            whileHover={{
              scale: 1.01,
              cursor: "pointer",
            }}
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
