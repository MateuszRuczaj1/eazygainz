import { BodyWeight } from "../models/BodyWeightModel.js";
const getAverage = (raports) => {
  if (raports.length === 0) return 0;

  const total = raports.reduce((acc, { weight }) => acc + weight, 0);
  return total / raports.length;
};

export const getBodyWeightByFilter = async (req, res) => {
  let filter = req.params.filter;
  switch (filter) {
    case "month":
      filter = 30;
      break;
    case "week":
      filter = 7;
      break;
    default:
      filter = 30;
  }
  const past = new Date();
  past.setDate(past.getDate() - filter);
  try {
    const bodyWeight = await BodyWeight.find({
      date: { $gte: past },
      _user: req.user.userId,
    }).sort({ date: 1 });
    const average = getAverage(bodyWeight);
    return res.status(200).json({
      data: bodyWeight,
      averageWeight: average,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch body weight data" });
  }
};
export const createBodyWeightRaport = async (req, res) => {
  const user = req.user.userId;
  const bodyWeightRaport = {
    ...req.body,
    _user: req.user.userId,
  };
  try {
    const newBodyWeightRaport = new BodyWeight(bodyWeightRaport);
    newBodyWeightRaport.save().then((savedRaport) => {
      return res.status(201).json({
        message: "A new raport has been successfully created!",
        savedRaport,
      });
    });
  } catch (error) {
    console.error("Validation error", error);
    return res.status(400).json({ error: "Validation error occured" });
  }
};
