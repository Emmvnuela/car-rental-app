function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <h3>{car.name}</h3>
      <p><strong>Transmission :</strong> {car.transmission}</p>
      <p><strong>Places :</strong> {car.seats}</p>
      <p className="price">{car.pricePerDay} FCFA / jour</p>
      <button>Réserver</button>
    </div>
  );
}

export default CarCard;
