import bcrypt from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      newUser
        .save()
        .then((user) => {
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
              userUsername: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).send({
            message: "Utworzono nowe konto użytkownika!",
            token,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Wystąpił błąd przy rejestracji",
          });
        });
    })
    .catch((e) => {
      res.status(500).send({
        message: "Nie udało się zapisać hasła",
        e,
      });
    });
};
export const loginUser = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Błędne hasło lub nazwa użytkownika",
              error,
            });
          }
          const token = jwt.sign(
            {
              userId: user._id,
              userUsername: user.username,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          );
          res.status(200).send({
            message: "Zalogowano!",
            username: user.username,
            token,
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Błędne hasło lub nazwa użytkownika",
          });
        });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Nie znaleziono takiego użytkownika",
        e,
      });
    });
};
