import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
export default function CustomSelect({ filter, setFilter }) {
  return (
    <Select value={filter} onValueChange={setFilter}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filtruj" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="month">Ostatni miesiąc</SelectItem>
        <SelectItem value="week">Ostatni tydzień</SelectItem>
      </SelectContent>
    </Select>
  );
}
