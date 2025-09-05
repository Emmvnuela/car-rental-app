import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContratsLocation = () => {
  const [contrats, setContrats] = useState([]);
  const [formData, setFormData] = useState({
    user_id: '',
    car_id: '',
    date_debut: '',
    date_fin: '',
    prix_total: '',
    statut: 'en cours',
  });

  // Récupère la liste des contrats
  const fetchContrats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contrats-location');
      setContrats(response.data);
    } catch (error) {
      console.error('Erreur récupération contrats', error);
    }
  };

  useEffect(() => {
    fetchContrats();
  }, []);

  // Soumission du formulaire de création
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contrats-location', formData);
      alert('Contrat créé avec succès');
      setFormData({
        user_id: '',
        car_id: '',
        date_debut: '',
        date_fin: '',
        prix_total: '',
        statut: 'en cours',
      });
      fetchContrats();
    } catch (error) {
      console.error('Erreur création contrat', error);
    }
  };

  // Nouvelle fonction : téléchargement du PDF du contrat
  const downloadPDF = async (contratId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/contrats/generate-pdf/${contratId}`,
        { responseType: 'blob' }
      );
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `contrat-${contratId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur téléchargement PDF', error);
      alert("Impossible de télécharger le contrat.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Créer un contrat de location</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="User ID"
          value={formData.user_id}
          onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
          className="border p-1 w-full"
        />
        <input
          type="text"
          placeholder="Vehicule ID"
          value={formData.car_id}
          onChange={(e) => setFormData({ ...formData, car_id: e.target.value })}
          className="border p-1 w-full"
        />
        <input
          type="date"
          value={formData.date_debut}
          onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
          className="border p-1 w-full"
        />
        <input
          type="date"
          value={formData.date_fin}
          onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
          className="border p-1 w-full"
        />
        <input
          type="number"
          placeholder="Prix total"
          value={formData.prix_total}
          onChange={(e) => setFormData({ ...formData, prix_total: e.target.value })}
          className="border p-1 w-full"
        />
        <select
          value={formData.statut}
          onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
          className="border p-1 w-full"
        >
          <option value="en cours">En cours</option>
          <option value="terminé">Terminé</option>
          <option value="annulé">Annulé</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Créer
        </button>
      </form>

      <h3 className="text-lg font-bold mt-6">Contrats existants</h3>
      <ul className="mt-2 space-y-2">
        {contrats.map((contrat) => (
          <li
            key={contrat.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <div>
              Contrat #{contrat.id} – Véhicule : {contrat.car_id} – Client : {contrat.user_id} –{' '}
              {contrat.statut}
            </div>

            {/* Bouton Télécharger le contrat */}
            <button
              onClick={() => downloadPDF(contrat.id)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            >
              Télécharger
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContratsLocation;
