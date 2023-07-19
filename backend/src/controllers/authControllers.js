const models = require("../models");

const getUserByEmailMiddleWare = (req, res, next) => {
  // user existe avec cet email?
  const { email } = req.body;
  models.user
    .findByEmailWithPassword(email)
    .then(([users]) => {
      if (users[0]) {
        // si l'utilisateur existe on le passe dans req.user pour avoir accès au req.user.id, req.user.firstname...
        [req.user] = users;
        next();
      } else {
        // si l'utilisateur avec ce mail n'existe pas
        res.sendStatus(401);
      }
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const register = (req, res) => {
  const user = req.body;

  models.user
    .insert(user)
    .then(([result]) => {
      console.warn("Result from register request", result);
      if (result.affectedRows) res.sendStatus(201);
      else res.sendStatus(400);
    })
    .catch((error) => {
      console.error(error);
      if (error.errno === 1062) res.sendStatus(409);
      else res.sendStatus(500);
    });
};

module.exports = {
  getUserByEmailMiddleWare,
  register,
};
