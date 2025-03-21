import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res
        .status(401)
        .json({ error: "Brak tokena lub niepoprawny format" });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ error: "Nieprawidłowy token!" });
  }
};

export default auth;
