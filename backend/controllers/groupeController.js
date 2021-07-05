const { connection } = require("../connection");

const Groupes = (groupeOccupe, availbleGroupes, currentType) => {
  return new Promise(function (resolve, reject) {
    if (currentType === "TD") {
      const query = `
      select g.nom from groupe as g
      inner join sousgroupe as sg on g.id_groupe=sg.groupe_id
      where sg.nom="${groupeOccupe.groupe}"
      `;

      connection.query(query, (err, rows, field) => {
        if (!err) {
          const index = availbleGroupes.indexOf(rows[0].nom);
          availbleGroupes.splice(index, 1);

          resolve(availbleGroupes);
        } else {
          console.log(err.message());
        }
      });
    } else {
      const query = `
        select sg.nom from sousgroupe as sg
        inner join groupe as g on g.id_groupe=sg.groupe_id
        where g.nom="${groupeOccupe.groupe}"
        `;

      connection.query(query, (err, rows, field) => {
        if (!err) {
          rows.forEach((row) => {
            const index = availbleGroupes.indexOf(row.nom);
            availbleGroupes.splice(index, 1);
          });

          resolve(availbleGroupes);
        } else {
          reject("There is an error");
        }
      });
    }
  });
};

async function groupeAvailbleRecursion(groupeOccupe, availbleGroupes, currentType) {
  try {
    if (groupeOccupe[0].type === "Cours") {
      return [];
    } else if (groupeOccupe[0].type === currentType) {
      const index = availbleGroupes.indexOf(groupeOccupe[0].groupe);
      availbleGroupes.splice(index, 1);

      groupeOccupe.splice(0, 1);

      if (groupeOccupe.length === 0) {
        return availbleGroupes;
      }

      return await groupeAvailbleRecursion(groupeOccupe, availbleGroupes, currentType);
    } else {
      const availbleGroupe = await Groupes(groupeOccupe[0], availbleGroupes, currentType);

      groupeOccupe.splice(0, 1);

      if (groupeOccupe.length === 0) {
        return availbleGroupe;
      }

      return await groupeAvailbleRecursion(groupeOccupe, availbleGroupe, currentType);
    }
  } catch (error) {
    return ["there is an error"];
  }
}

const cpGroupeAvailble = async (req, res) => {
  try {
    const { type } = req.body;
    if (type) {
      const { availbleGroupes, groupeOccupe } = req;

      if (groupeOccupe.length === 0) {
        return res.json(availbleGroupes);
      } else {
        const data = await groupeAvailbleRecursion(groupeOccupe, availbleGroupes, type);
        res.json(data);
      }
    } else {
      res.json(["there is an error"]);
    }
  } catch (error) {
    res.json(["there is an error"]);
  }
};

const ciGroupeAvailble = async (req, res) => {
  const { type } = req.body;
  if (type) {
    const { availbleGroupes, groupeOccupe } = req;
    if (groupeOccupe.length === 0) {
      return res.json(availbleGroupes);
    } else {
      if (type === "TD" || type === "Cours") {
        return res.json([]);
      } else {
        if (groupeOccupe.some((grp) => grp.type === "TD") || groupeOccupe.some((grp) => grp.type === "Cours")) {
          return res.json([]);
        } else {
          const data = await groupeAvailbleRecursion(groupeOccupe, availbleGroupes, type);
          res.json(data);
        }
      }
    }
  } else {
    res.json(["Please try to select the require fields"]);
  }
};

module.exports = { cpGroupeAvailble, ciGroupeAvailble };
