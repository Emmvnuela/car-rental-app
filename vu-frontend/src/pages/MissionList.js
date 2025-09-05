import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

function MissionList() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/missions');
      setMissions(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>Missions</h3>
      <ul>
        {missions.map(m => (
          <li key={m.id}>{m.title} - {m.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default MissionList;