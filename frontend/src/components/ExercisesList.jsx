import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function ExercisesList({ exercises }) {
  console.log(exercises);
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Ćwiczenia:</h3>
      <Accordion type="multiple" className="w-full">
        {exercises.map((exercise, index) => (
          <AccordionItem key={exercise?.id} value={`item-${index}`}>
            <AccordionTrigger>{exercise.name}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                {exercise?.sets.length > 0 &&
                  exercise?.sets.map((set, index) => {
                    return (
                      <div key={index} className="">
                        <h2 className="text-lg font-semibold">
                          Seria {index + 1}
                        </h2>
                        <p key={index} className="flex justify-between">
                          <span className="gap-2.5">
                            <strong>Powtórzenia: </strong> {set?.reps}
                          </span>
                          <span className="gap-2.5">
                            <strong>Ciężar: </strong> {set?.weight} kg
                          </span>
                        </p>
                      </div>
                    );
                  })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
