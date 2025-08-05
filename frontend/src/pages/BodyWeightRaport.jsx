import Button from "@/components/Button";
import Modal from "@/components/Modal";
import {
  useGetBodyWeightRaport,
  useCreateBodyWeightRaport,
} from "@/hooks/useGetBodyWeightRaport";
import CustomSelect from "@/components/CustomSelect";
import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import CustomTooltip from "@/components/ui/CustomTooltip";
export default function BodyWeightRaport() {
  const [filter, setFilter] = useState("month");
  const {
    data: bwRaportData,
    isLoading,
    error,
  } = useGetBodyWeightRaport(filter);
  const { mutate } = useCreateBodyWeightRaport();
  const [formData, setFormData] = useState({
    weight: "",
    weightedAt: "morning",
  });

  console.log(bwRaportData);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [isOpen, setIsOpen] = useState(false);
  const chartData =
    bwRaportData?.data?.map((entry) => {
      const date = new Date(entry.date);
      const day = date.toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
      }); // np. "01.07"
      return {
        ...entry,
        day,
        weightedAt: entry.weightedAt,
      };
    }) ?? [];
  const handleAddRaport = (formData) => {
    mutate(formData);
  };
  let content = <p>Dodaj swój pierwszy raport!</p>;
  if (bwRaportData?.data?.length > 0) {
    content = (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-end mb-4">
          <CustomSelect filter={filter} setFilter={setFilter} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ResponsiveContainer width={1200} height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, bottom: 10, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={["auto", "auto"]}
                allowDecimals={true}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#18A999"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Waga (kg)"
                dot={({ cx, cy, payload }) => {
                  const colorMap = {
                    morning: "#18A999", // zielony
                    afternoon: "#19B3A1", // pomarańcz
                    evening: "#0F6B60", // niebieski
                  };
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill={colorMap[payload.weightedAt] || "#7e3ff2"}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        {bwRaportData?.averageWeight && (
          <p className="mt-4 text-sm text-gray-700 italic">
            Średnia waga z pomiarów:{" "}
            <span className="font-semibold">
              {parseFloat(bwRaportData.averageWeight).toFixed(2)} kg
            </span>
          </p>
        )}
      </div>
    );
  }
  if (isLoading) return <p>Ładowanie danych...</p>;
  if (error) return <p>{String(error)}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Raport masy ciała</h2>
      {content}
      <div className="p-2 ">
        <Button action={() => setIsOpen(true)}>Dodaj pomiar</Button>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <form
            className="flex flex-col space-y-10"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddRaport(formData);
              setIsOpen(false);
            }}
          >
            <label htmlFor="weight">Wpisz wagę</label>
            <input
              id="weight"
              name="weight"
              type="number"
              step={0.1}
              value={formData.weight}
              onChange={handleChange}
              required
              min={"1"}
            />
            <label htmlFor="weightedAt">Kiedy się ważyłeś</label>
            <select
              id="weightedAt"
              name="weightedAt"
              value={formData.weightedAt}
              required
              onChange={handleChange}
            >
              <option value={"morning"}>Rano</option>
              <option value={"afternoon"}>Popołudniu</option>
              <option value={"evening"}>Wieczorem</option>
            </select>
            <Button type="submit">Dodaj</Button>
          </form>
        </Modal>
      )}
    </div>
  );
}
