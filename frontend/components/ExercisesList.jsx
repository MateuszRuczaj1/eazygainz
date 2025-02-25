/* eslint-disable react/prop-types */
import ExcerciseItem from "";
export default function ExercisesList({ exercises }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700">Ćwiczenia:</h3>
      <ul className="mt-2 space-y-2">
        {exercises.map((exercise, index) => (
          <ExcerciseItem key={index} name={exercise.name} />
        ))}
      </ul>
    </div>
  );
}
