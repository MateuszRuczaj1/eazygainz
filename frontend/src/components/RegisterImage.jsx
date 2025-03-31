import fitness from "@/assets/fitness.webp";
export default function RegisterImage() {
  return (
    <div className="hidden md:flex w-1/2">
      <img
        src={fitness}
        alt="Obraz przedstawiający osobę trenującą"
        className="rounded-e-2xl"
      />
    </div>
  );
}
