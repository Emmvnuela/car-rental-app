import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {
  container: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    color: '#ea580c',
    marginBottom: '1rem',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  missionTitle: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginBottom: '0.5rem',
  },
  missionDetail: {
    margin: '0.2rem 0',
  },
};

function Missions() {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/missions')
      .then(res => {
        setMissions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur récupération missions:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Chargement des missions...</p>;

  if (missions.length === 0) return <p style={{ textAlign: 'center' }}>Aucune mission trouvée.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Missions</h2>
      <ul style={styles.list}>
        {missions.map(mission => (
          <li key={mission.id} style={styles.item}>
            <div style={styles.missionTitle}>{mission.title}</div>
            <div style={styles.missionDetail}><strong>Description:</strong> {mission.description}</div>
            <div style={styles.missionDetail}><strong>Date de début:</strong> {new Date(mission.start_date).toLocaleDateString()}</div>
            <div style={styles.missionDetail}><strong>Date de fin:</strong> {new Date(mission.end_date).toLocaleDateString()}</div>
            <div style={styles.missionDetail}><strong>Statut:</strong> {mission.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Missions;
