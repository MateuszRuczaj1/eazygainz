export default function ExerciseImage({ image }) {
  return (
    <img
      className="w-40 h-40 object-contain"
      src={`/img/${image}`}
      alt={image}
    />
  );
}
