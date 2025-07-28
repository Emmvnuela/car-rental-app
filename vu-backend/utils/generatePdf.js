const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateContratPDF(reservationData, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      // Supprimer le fichier s'il existe déjà
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }

      const doc = new PDFDocument({
        size: 'A4',
        margins: { top: 60, bottom: 60, left: 60, right: 60 }
      });

      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // Couleurs
      const primaryColor = '#2C3E50';
      const accentColor = '#3498DB';
      const lightGray = '#ECF0F1';
      const darkGray = '#7F8C8D';

      // En-tête
      doc.rect(0, 0, doc.page.width, 120).fill(primaryColor);
      const logoPath = path.join(__dirname, '../public/logo.png');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 60, 20, { width: 80 });
      }

      doc.fillColor('white')
        .fontSize(18)
        .font('Helvetica-Bold')
        .text('VU VÉHICULES', 180, 30)
        .fontSize(10)
        .font('Helvetica')
        .text('Entreprise de location de véhicules', 180, 55)
        .text('Email: contact@vuvehicules.com', 180, 70)
        .text('Téléphone: +228 99 55 59 59', 180, 85);

      doc.fontSize(12)
        .font('Helvetica-Bold')
        .text(`CONTRAT N° ${reservationData.id}`, 400, 30, { align: 'right' })
        .fontSize(10)
        .font('Helvetica')
        .text(`${new Date().toLocaleDateString('fr-FR')}`, 400, 50, { align: 'right' });

      // Titre principal
      doc.fillColor(primaryColor)
        .fontSize(22)
        .font('Helvetica-Bold')
        .text('CONTRAT DE LOCATION DE VÉHICULE', 60, 150, { align: 'center' });

      let currentY = 200;

      const createSection = (title, content, y) => {
        doc.rect(60, y - 5, doc.page.width - 120, 25).fill(lightGray);
        doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text(title, 70, y + 5);
        let contentY = y + 30;
        doc.fillColor('black').fontSize(10).font('Helvetica');

        content.forEach(item => {
          if (item.label && item.value) {
            doc.font('Helvetica-Bold').text(`${item.label}:`, 70, contentY);
            doc.font('Helvetica').text(`${item.value}`, 200, contentY);
          }
          contentY += 15;
        });
        return contentY + 10;
      };

      // Sections
      currentY = createSection('INFORMATIONS CLIENT', [
        { label: 'Nom complet', value: reservationData.user_name },
        { label: 'Email', value: reservationData.user_email },
        { label: 'Téléphone', value: reservationData.user_phone || 'Non renseigné' }
      ], currentY);

      currentY = createSection('INFORMATIONS VÉHICULE', [
        { label: 'Marque', value: reservationData.brand },
        { label: 'Modèle', value: reservationData.model },
        { label: 'Année', value: reservationData.year },
        { label: 'Prix journalier', value: `${reservationData.price_per_day.toLocaleString()} FCFA` }
      ], currentY);

      const duration = Math.ceil(
        (new Date(reservationData.end_date) - new Date(reservationData.start_date)) / (1000 * 60 * 60 * 24)
      );

      currentY = createSection('PÉRIODE DE LOCATION', [
        { label: 'Date de début', value: new Date(reservationData.start_date).toLocaleDateString('fr-FR') },
        { label: 'Date de fin', value: new Date(reservationData.end_date).toLocaleDateString('fr-FR') },
        { label: 'Durée totale', value: `${duration} jour(s)` }
      ], currentY);

      // Section financière
      doc.rect(60, currentY - 5, doc.page.width - 120, 25).fill(accentColor);
      doc.fillColor('white').fontSize(12).font('Helvetica-Bold').text('RÉCAPITULATIF FINANCIER', 70, currentY + 5);
      currentY += 35;

      const financialData = [
        ['Description', 'Montant (FCFA)'],
        ['Prix total de la location', reservationData.total_price.toLocaleString()],
        ['Montant déjà payé', reservationData.deposit.toLocaleString()],
        ['Caution demandée', reservationData.caution.toLocaleString()],
        ['Solde restant à payer', (reservationData.total_price - reservationData.deposit).toLocaleString()]
      ];

      doc.rect(60, currentY, doc.page.width - 120, 20).fill(darkGray);
      doc.fillColor('white').fontSize(10).font('Helvetica-Bold')
        .text(financialData[0][0], 70, currentY + 6)
        .text(financialData[0][1], 300, currentY + 6);
      currentY += 20;

      for (let i = 1; i < financialData.length; i++) {
        const bgColor = i === financialData.length - 1 ? lightGray : 'white';
        const textColor = i === financialData.length - 1 ? primaryColor : 'black';
        const font = i === financialData.length - 1 ? 'Helvetica-Bold' : 'Helvetica';

        doc.rect(60, currentY, doc.page.width - 120, 18).fill(bgColor);
        doc.fillColor(textColor).font(font)
          .text(financialData[i][0], 70, currentY + 5)
          .text(financialData[i][1], 300, currentY + 5);
        currentY += 18;
      }

      currentY += 20;

      // Conditions
      doc.rect(60, currentY - 5, doc.page.width - 120, 25).fill(lightGray);
      doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('CONDITIONS GÉNÉRALES', 70, currentY + 5);
      currentY += 35;

      const conditions = [
        'Le locataire s\'engage à restituer le véhicule dans l\'état où il l\'a reçu.',
        'Tout dommage constaté sera facturé au locataire selon le barème en vigueur.',
        'Le véhicule doit être restitué avec le même niveau de carburant.',
        'En cas de retard, des frais de 10 000 FCFA/jour seront appliqués.',
        'La caution sera restituée après vérification de l\'état du véhicule.',
        'Le locataire doit posséder un permis de conduire valide.'
      ];

      doc.fillColor('black').fontSize(9).font('Helvetica');
      conditions.forEach((text, i) => {
        doc.text(`${i + 1}. ${text}`, 70, currentY, { width: doc.page.width - 140 });
        currentY += 20;
      });

      currentY += 20;

      // Signatures
      doc.rect(60, currentY, doc.page.width - 120, 80).stroke(primaryColor).lineWidth(2);
      doc.fillColor(primaryColor).fontSize(12).font('Helvetica-Bold').text('SIGNATURES', 70, currentY + 10);

      doc.fontSize(10).font('Helvetica').fillColor('black')
        .text('Signature du locataire:', 80, currentY + 40)
        .text('Date: _______________', 80, currentY + 55)
        .text('Signature de l\'agent:', 320, currentY + 40)
        .text('Date: _______________', 320, currentY + 55);

      doc.moveTo(80, currentY + 70).lineTo(200, currentY + 70).stroke();
      doc.moveTo(320, currentY + 70).lineTo(440, currentY + 70).stroke();

      // Pied de page
      doc.rect(0, doc.page.height - 40, doc.page.width, 40).fill(primaryColor);
      doc.fillColor('white').fontSize(8).font('Helvetica')
        .text(`Document généré le ${new Date().toLocaleString('fr-FR')}`, 60, doc.page.height - 25, { align: 'center' });

      doc.end();

      stream.on('finish', () => resolve(outputPath));
      stream.on('error', reject);

    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateContratPDF;
