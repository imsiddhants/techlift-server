const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');

const db = require('./models');
const userRoutes = require ('./routes/user-routes');

const PORT = process.env.PORT || 8080;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync");
});

app.use(
    cors({
        origin: "http://localhost:5173", // or "*" to allow all origins, though not recommended for production
        methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
        credentials: true // Enable cookies if needed
    })
);

//routes for the user API
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

process.on('uncaughtException', () => {
    console.log('Something broke');
})