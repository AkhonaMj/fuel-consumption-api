import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config()
import pgPromise from "pg-promise";
import FuelConsumption from './fuel-consumption.js';
import FuelConsumptionRoutes from './fuel-consumptionRoutes.js';

const pgp = pgPromise();
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

const app = express();
const db = pgp(connectionOptions);

const fuelConsumption_db = FuelConsumption(db);
const fuelConsumption = FuelConsumptionRoutes(fuelConsumption_db)

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


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(flash());

app.get('/', (req, res) => {
    res.redirect('/vehicles'); 
});

app.post('/vehicle', fuelConsumption.addVehicle);
app.get('/vehicles', fuelConsumption.vehicles);
app.get('/vehicle', fuelConsumption.vehicle);
app.post('/refuel', fuelConsumption.refuel);

app.listen(PORT, () => console.log(`App started on port: ${PORT}`));

