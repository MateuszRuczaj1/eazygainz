import { useFieldArray } from "react-hook-form";
import ControlledInput from "./ControlledInput";

export default function ExerciseSets({ control, register, exerciseIndex }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.sets`,
  });

  const handleRemoveSet = (index) => {
    if (fields.length === 1) {
      remove(index);
      remove(exerciseIndex);
      return;
    }
    remove(index);
  };

  return (
    <div className="mt-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex justify-evenly mt-5 flex-col">
          <h3>Seria {index + 1}</h3>
          <ControlledInput
            label={"Powtórzenia"}
            name={`exercises.${exerciseIndex}.sets.${index}.reps`}
            defaultValue={field.reps}
            register={register}
          />
          <ControlledInput
            label={"Ciężar"}
            register={register}
            name={`exercises.${exerciseIndex}.sets.${index}.weight`}
            defaultValue={field.weight}
          />
          <button
            className="bg-red-500 px-6 p-2 text-white rounded-lg max-h-fit max-w-lg self-start"
            type="button"
            onClick={() => handleRemoveSet(index)}
          >
            Usuń
          </button>
        </div>
      ))}
      <button
        className="bg-orange-500 px-6 p-2 text-white rounded-2xl mr-0"
        type="button"
        onClick={() => append({ reps: 0, weight: 0 })}
      >
        Dodaj serię
      </button>
    </div>
  );
}
