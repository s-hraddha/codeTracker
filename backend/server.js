const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

//db
const connectDb = require("./config/db")
connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("server is working")
});  // check whether server is working or not

const UserRoutes = require('./routes/userRoutes');
const platformRoutes = require('./routes/platformRoutes')

app.use('/api/users',UserRoutes);
app.use('/api/platforms', platformRoutes);

// app.use((req, res, next) => {
//   res.status(404).json({ message: 'API route not found' });
// });

app.listen(5000,()=>{
    console.log("app is running on port 5000")
})