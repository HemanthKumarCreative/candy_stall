const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize("candy_stall", "postgres", "Byjus@12", {
  host: "localhost",
  dialect: "postgres",
});

const Candy = sequelize.define("Candy", {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  candyName: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.DECIMAL,
  quantity: DataTypes.INTEGER,
});

(async () => {
  await sequelize.sync();
})();

app.get("/candies", async (req, res) => {
  try {
    const candies = await Candy.findAll();
    res.json(candies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/candies", async (req, res) => {
  const { candyName, description, price, quantity } = req.body;
  try {
    const newCandy = await Candy.create({
      candyName,
      description,
      price,
      quantity,
    });
    res.json(newCandy);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/candies/:id/reduceQuantity/:amount", async (req, res) => {
  const candyId = req.params.id;
  const reductionAmount = parseInt(req.params.amount); // Parse amount as integer

  if (isNaN(reductionAmount) || reductionAmount <= 0) {
    return res.status(400).json({ error: "Invalid reduction amount" });
  }

  try {
    const candy = await Candy.findOne({ where: { _id: candyId } });
    if (candy) {
      if (candy.quantity >= reductionAmount) {
        await candy.update({ quantity: candy.quantity - reductionAmount });
        res.json({ message: `Quantity reduced by ${reductionAmount}` });
      } else {
        res.status(400).json({ error: "Not enough quantity to reduce" });
      }
    } else {
      res.status(404).json({ error: "Candy not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
