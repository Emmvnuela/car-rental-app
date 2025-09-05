// src/components/DriverDocuments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverDocuments = ({ userId }) => {
  const [isVerified, setIsVerified] = useState(null); // null = loading
  const [driving_license, setDrivingLicense] = useState(null);
  const [national_id, setIdentityDoc] = useState(null);
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    const checkDocumentsStatus = async () => {
      try {
        const response = await axios.get(`/documents/check/${userId}`);
        setIsVerified(response.data.is_verified);
      } catch (error) {
        console.error('Erreur lors de la vérification des documents', error);
      }
    };

    checkDocumentsStatus();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('driving_license', driving_license);
      formData.append('national_id', national_id);
      formData.append('birth_date', birthDate);

      await axios.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Documents envoyés avec succès.');
      setIsVerified(true);
    } catch (error) {
      console.error('Erreur lors de l’envoi des documents', error);
    }
  };

  if (isVerified === null) {
    return <p>Chargement...</p>;
  }

  if (isVerified === true) {
    return <p>Vos documents sont déjà vérifiés. Vous pouvez continuer votre réservation.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date de naissance :
        <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} required />
      </label>
      <br />

      <label>
        Permis de conduire :
        <input type="file" onChange={e => setDrivingLicense(e.target.files[0])} required />
      </label>
      <br />

      <label>
        Carte d'identité :
        <input type="file" onChange={e => setIdentityDoc(e.target.files[0])} required />
      </label>
      <br />

      <button type="submit">Envoyer les documents</button>
    </form>
  );
};

export default DriverDocuments;
