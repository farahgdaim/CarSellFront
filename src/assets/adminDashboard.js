var ctx1 = document.getElementById('pieChart').getContext('2d');
new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['SUV', 'Berline', 'Compacte'],
        datasets: [{
            data: [40, 35, 25],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
        }]
    }
});

// 2️⃣ Courbe : Nombre d'annonces publiées par mois
var ctx2 = document.getElementById('lineChart').getContext('2d');
new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{
            label: 'Annonces publiées',
            data: [150, 180, 220, 210, 250, 270],
            borderColor: '#36a2eb',
            fill: false
        }]
    }
});

// 3️⃣ Histogramme : Ventes mensuelles de voitures
var ctx3 = document.getElementById('barChart').getContext('2d');
new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'Modèle A',
                data: [50, 60, 70, 80, 90, 100],
                backgroundColor: '#ff6384'
            },
            {
                label: 'Modèle B',
                data: [30, 40, 50, 60, 70, 80],
                backgroundColor: '#36a2eb'
            }
        ]
    }
});