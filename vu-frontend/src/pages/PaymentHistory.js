import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PaymentHistory() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem('payments')) || [];
    setPayments(storedPayments);
  }, []);

  if (payments.length === 0) {
    return (
      <div>
        <h2>Historique des paiements</h2>
        <p>Aucun paiement enregistré pour le moment.</p>
        <Link to="/paiement">Retour à la page de paiement</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Historique des paiements</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Méthode</th>
            <th>Montant</th>
            <th>Réservation (voiture)</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, idx) => (
            <tr key={idx}>
              <td>{new Date(payment.date).toLocaleString()}</td>
              <td>{payment.method}</td>
              <td>
                {payment.details.amount
                  ? `${payment.details.amount} FCFA`
                  : 'N/A'}
              </td>
              <td>{payment.reservation?.car || 'N/A'}</td>
              <td>
                {/* Affiche quelques détails de façon lisible */}
                {Object.entries(payment.details).map(([key, value]) => (
                  key !== 'amount' && <div key={key}><strong>{key}:</strong> {value}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/paiement" style={{ display: 'inline-block', marginTop: '1rem' }}>
        Retour à la page de paiement
      </Link>
    </div>
  );
}

export default PaymentHistory;
