const express = require('express');
const cookieParser = require('cookie-parser');
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

//routes for the user API
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

process.on('uncaughtException', () => {
    console.log('Something broke');
})