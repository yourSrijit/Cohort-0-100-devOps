const express = require("express");
const app = express();
const zod = require("zod");

// Define the schema
const schema = zod.object({
  kidneys: zod.array(zod.number()),
  email: zod.string(),
  password:zod.string(),
  country:zod.literal("US").or(zod.literal("IN"))
});

// Middleware to parse incoming JSON requests
app.use(express.json());

app.post("/srijit", (req, res) => {
  const { kidneys } = req.body;
  
  // Validate the request body against the schema
  const validationResult = schema.safeParse(req.body);

  if (!validationResult.success) {
    res.status(400).json({ msg: "Input is invalid", errors: validationResult.error });
  } else {
    res.json({ response: validationResult.data });
  }
});

app.listen(4000, () => {
  console.log('Connected on port no 4000');
});
