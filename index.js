import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config()
import pgPromise from "pg-promise";
import FuelConsumptionRoutes from "./fuel-consumptionRoutes.js";
import FuelConsumption from "./fuel-consumption.js";

const pgp = pgPromise();
const app = express();

const exphbs = engine({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts'
});


const connectionOptions = {

    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
};
const db = pgp(connectionOptions);



app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(express.json());

// Create instances for the db factory function and routes
const fuelConsumption_db= FuelConsumption(db);
const fuelConsumption = FuelConsumptionRoutes()

app.get('/addCar', (req, res) => {
    res.render('addCar'); 
});
app.post('/addCar', fuelConsumption.addVehicle);

app.post('/addCar', fuelConsumption.addVehicle);
app.get('/seeCar', fuelConsumption.vehicles);
app.get('/seeCar', fuelConsumption.vehicle);
app.post('/refuel', fuelConsumption.refuel);




const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});