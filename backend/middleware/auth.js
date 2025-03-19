import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Sprawdź, czy nagłówek Authorization istnieje i ma poprawny format
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res
        .status(401)
        .json({ error: "Brak tokena lub niepoprawny format" });
    }

    // Pobierz token z nagłówka
    const token = req.headers.authorization.split(" ")[1];

    // Zweryfikuj token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Przypisz dane użytkownika do requestu
    req.user = decodedToken;

    // Przekaż żądanie do następnego middleware
    next();
  } catch (error) {
    res.status(401).json({ error: "Nieprawidłowy token!" });
  }
};

export default auth;
