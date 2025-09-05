import React from 'react';

function DamageList({ damages, onDelete }) {
  return (
    <ul>
      {damages.map(d => (
        <li key={d.id}>
          {d.description} - {d.cost} FCFA
          <button onClick={() => onDelete(d.id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
}

export default DamageList;
