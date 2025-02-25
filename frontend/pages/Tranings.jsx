import useTrainings from "../hooks/useTraining";
export default function Tranings() {
  const { data, isLoading, error } = useTrainings();
  if (isLoading) return <h1>Loading</h1>;
  if (error) return <h1>Error </h1>;
  console.log(data);
  return <h1>Trainings</h1>;
}
