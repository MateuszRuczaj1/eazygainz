import useTrainings from "../hooks/useTraining";
export default function Tranings() {
  const { data, isLoading, error } = useTrainings();
  console.log(data);
  return <h1>Trainings</h1>;
}
