import Card from "../components/Card";
import useTrainings from "../hooks/useTraining";
export default function Trainings() {
  const { data, isLoading, error } = useTrainings();
  if (isLoading) return <h1>Loading</h1>;
  if (error) return <h1>Error </h1>;
  console.log(data);
  return (
    <section className="py-10">
      Twoje treningi
      {data && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {data?.map((training, index) => (
            <Card key={index} training={training} />
          ))}
        </ul>
      )}
    </section>
  );
}
