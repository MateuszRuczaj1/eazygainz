import Button from "../components/Button";
import { motion } from "framer-motion";
import hero from "../src/assets/hero.png";
export default function Home() {
  return (
    <motion.section
      className="flex flex-col gap-20 mt-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.h1
        className="font-extrabold text-6xl"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        Eazy Gainz
      </motion.h1>
      <motion.p
        className="text-4xl"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        Twoja aplikacja do śledzenia postępów treningowych!
      </motion.p>

      <motion.div
        className="flex flex-col md:flex-row text-3xl justify-center items-center"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <p className="max-w-2xl">
          Z nami możesz śledzić swoje postępy, planować treningi i analizować
          efektywność swoich ćwiczeń. Zyskaj dostęp do szczegółowych statystyk i
          rekomendacji, aby osiągnąć swoje cele treningowe szybciej niż
          kiedykolwiek!
        </p>
        <img src={hero} className="rounded-lg h-64 w-64" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex flex-row justify-between space-y-8 md:space-y-0"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button>Dodaj swój trening</Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button>Przykładowe treningi</Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
