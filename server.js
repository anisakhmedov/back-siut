const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// Вот эта строка нужна — она позволяет раздавать загруженные изображения

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// MongoDB connection
// const mongoURI = 'mongodb+srv://akhmedovanis:nipanid2@cluster0.1bp9j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

mongoose.connect("mongodb://localhost:27017/university", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/students", require("./routes/students"));
app.use("/api/departments", require("./routes/departments"));
app.use("/api/programs", require("./routes/programs"));
app.use("/api/semesters", require("./routes/semesters"));
app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
