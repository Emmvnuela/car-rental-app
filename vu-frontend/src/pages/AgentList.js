import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

function AgentList() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      const res = await axios.get('/agents');
      setAgents(res.data);
    };
    fetchAgents();
  }, []);

  return (
    <div>
      <h3>Liste des agents</h3>
      <ul>
        {agents.map(agent => (
          <li key={agent.id}>{agent.name} - {agent.phone} - {agent.site}</li>
        ))}
      </ul>
    </div>
  );
}

export default AgentList;