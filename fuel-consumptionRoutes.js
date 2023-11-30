

export default function FuelConsumptionRoutes(fuelConsumption_db) {
  async function addVehicle(req, res) {
    const description = req.body;
    const  regNumber  = req.body;
 
    await fuelConsumption_db.addVehicle({ description, regNumber });
    res.render("/vehicle", {

    });
  }

  async function vehicle(req, res) {
    await fuelConsumption_db.vehicle(id);
    res.redirect("/vehicle")
 
 }
  async function vehicles(req, res) {
     await fuelConsumption_db.vehicles();
     res.render("/vehicles", {
        
     })   
  }

  async function refuel(req, res) {
    await fuelConsumption_db.refuel()
    res.render("/refuel", {

    })
  }

  return {
    addVehicle,
    vehicle,
    vehicles,
    refuel,
  };
}
