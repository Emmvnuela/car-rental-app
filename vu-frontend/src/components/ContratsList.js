import ContratsLocation from "../pages/ContratsLocation";

const envoyerContrat = async (contratId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/pdf/send-contrat/${contratId}`, {
      method: 'POST'
    });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'envoi du contrat.");
  }
};

// Dans le render JSX :
<button onClick={() => envoyerContrat(ContratsLocation.id)} className="bg-blue-600 text-white px-4 py-2 rounded">
  Envoyer Contrat PDF
</button>
