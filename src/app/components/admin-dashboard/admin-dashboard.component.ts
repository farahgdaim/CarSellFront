import { Component, OnInit, ViewChild } from '@angular/core';
import { StatistiquesService } from 'src/app/service/statistiques.service';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  totalAnnonces!: number;
  annoncesVendues!: number;
  totalUsers!: number;
  prixtotalVente!: number;
  annoncesParMarque: any[] = [];
  annoncesVenduesParMois: any[] = [];

  annoncesVenduesParMarque: any[] = [];
  annoncesPublieeParMois: any[] = [];
  showPieChart: boolean = true;
  showLineChart: boolean = true;
  prixMoyen!: number;
  prixMax!: number;
  prixMin!: number;
  prixTotal!: number;
  topUtilisateurs: any[] = [];
  kilometrageMoyenParMarque: any[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };
  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'category', // ← au lieu de 'time'
      },
      y: {
        ticks: {
          stepSize: 1, // Forcer des valeurs entières
          precision: 0, // Pas de décimales
        },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  //annonces par marque
  barChartLabels: string[] = [];

  barChartData: ChartData<'bar'> = {
    datasets: [
      {
        data: [],
        label: "Nombre total d'annonces",
        backgroundColor: '#3d5ec9',
        borderColor: '#3d5ec9', 
        borderWidth: 0.02,
      },
    ],
  };
  //annonces vendues par mois
  barChartOptions1: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };
  barChartLabels1: string[] = [];

  barChartData1: ChartData<'bar'> = {
    datasets: [
      {
        data: [],
        label: "Nombre total d'annonces",
        backgroundColor: '#3d5ec9',
        borderColor: '#3d5ec9', 
        borderWidth: 0.02,
      },
    ],
  };
  //annonces vendues par mois
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Annonces vendues',
        borderColor: '#3d5ec9', // Couleur contrastante
        backgroundColor: '#3d5ec9', // Fond légèrement transparent
        pointBackgroundColor: '#3d5ec9',
        pointBorderColor: '#3d5ec9',
        pointHoverBackgroundColor: '#3d5ec9',
        pointHoverBorderColor: '#3d5ec9',
        tension: 0.3,
      },
    ],
  };
  //annonces publiées par mois
  lineChartOptions1: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'category', // ← au lieu de 'time'
      },
      y: {
        ticks: {
          stepSize: 1, // Forcer des valeurs entières
          precision: 0, // Pas de décimales
        },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  lineChartLabels1: string[] = [];
  lineChartData1: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Annonces publiée',
        borderColor: '#3d5ec9',
        pointBackgroundColor: '#3d5ec9',
        tension: 0.1,
      },
    ],
  };
  //kilométrage moyen pas mois

  lineChartOptions2: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'category', // ← au lieu de 'time'
      },
      y: {
        ticks: {
          stepSize: 1, // Forcer des valeurs entières
          precision: 0, // Pas de décimales
        },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  lineChartLabels2: string[] = [];
  lineChartData2: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        borderColor: '#3d5ec9',
        pointBackgroundColor: '#3d5ec9',
        tension: 1,
      },
    ],
  };
  //top utilisateurs
  barChartOptions2: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };
  barChartLabels2: string[] = [];

  barChartData2: ChartData<'bar'> = {
    datasets: [
      {
        data: [],
        label: 'top users',
        backgroundColor: '#3d5ec9',
        borderColor: '#3d5ec9',
        borderWidth: 0.02,
      },
    ],
  };
  //repartition des annonces vendues
  pieChartLabels: string[] = ['Vendus', 'Non Vendus'];
  pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: ['#007bff', '#6f42c1'],
        hoverBackgroundColor: ['#b3e4fa', '#7fb7d8'],
      },
    ],
  };

  lineChartLabels: string[] = [];

  pieChartLabels1: string[] = [];
  pieChartData1: any;
  pieChartOptions1: any;

  constructor(
    private statsService: StatistiquesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.statsService.getStatistiques().subscribe((data) => {
      const stats = data as {
        totalAnnonces: number;
        annoncesVendues: number;
        prixTotalVentes: number;
        totalUsers: number;
        annoncesParMarque: { marque: string; total: number }[];
        annoncesVenduesParMois: { mois: string; total: number }[];
        annoncesPublieeParMois: { mois: string; total: number }[]; //fait
        annoncesVenduesParMarque: { marque: string; total: number }[]; //fait
        topUtilisateurs: { nom: string; totalAnnonces: number }[];

        kilometrageMoyenParMarque: { id: string; moyenKm: number }[]; //fait
        prixTotal: number;
        prixMax: number;
        prixMin: number;
        prixMoyen: number;
      };
      this.totalAnnonces = stats.totalAnnonces;
      this.annoncesVendues = stats.annoncesVendues;
      this.totalUsers = stats.totalUsers;
      this.prixtotalVente = stats.prixTotalVentes;
      this.prixTotal = stats.prixTotal;
      this.prixMax = stats.prixMax;
      this.prixMin = stats.prixMin;
      this.prixMoyen = stats.prixMoyen;

      this.lineChartLabels1 = stats.annoncesPublieeParMois.map((item: any) =>
        new Date(`${item.mois}-01`).toLocaleString('fr-FR', { month: 'long' })
      );

      this.lineChartData1 = {
        labels: this.lineChartLabels1,
        datasets: [
          {
            data: stats.annoncesPublieeParMois.map((item: any) => item.total),
            label: 'Annonces Publiée',
            borderColor: '#3d5ec9',
            pointBackgroundColor: '#3d5ec9',
            tension: 1,
          },
        ],
      };
      this.showLineChart = false;
      setTimeout(() => {
        this.showLineChart = true;
      }, 0);

      this.kilometrageMoyenParMarque = stats.kilometrageMoyenParMarque.map(
        (item) => ({
          marque: item.id,
          moyenKm: item.moyenKm,
        })
      );

      this.lineChartLabels2 = stats.kilometrageMoyenParMarque.map(
        (item: any) => item.id
      );
      this.lineChartData2 = {
        labels: this.lineChartLabels2,
        datasets: [
          {
            data: stats.kilometrageMoyenParMarque.map(
              (item: any) => item.moyenKm
            ),
            label: 'kilométrage moyen',
            borderColor: '#3d5ec9',
            pointBackgroundColor: '#3d5ec9',
            tension: 1,
          },
        ],
      };
      this.showLineChart = false;
      setTimeout(() => {
        this.showLineChart = true;
      }, 0);

      this.topUtilisateurs = stats.topUtilisateurs.map((item) => ({
        nom: item.nom,
        totalAnnonces: item.totalAnnonces,
      }));

      this.barChartLabels2 = stats.topUtilisateurs.map((item: any) => item.nom);
      this.barChartData2 = {
        labels: this.barChartLabels2,
        datasets: [
          {
            data: stats.topUtilisateurs.map((item: any) => item.totalAnnonces),
            label: "Nombre total d'annonces",
            backgroundColor: '#3d5ec9',
            borderColor: '#3d5ec9',
            borderWidth: 0.02,
          },
        ],
      };

      this.barChartLabels1 = stats.annoncesVenduesParMarque.map(
        (item: any) => item.marque
      );
      this.barChartData1 = {
        labels: this.barChartLabels1,
        datasets: [
          {
            data: stats.annoncesVenduesParMarque.map((item: any) => item.total),
            label: "Nombre total d'annonces",
            backgroundColor: '#3d5ec9',
            borderColor: '#3d5ec9', 
            borderWidth: 0.02,
          },
        ],
      };

      // Diagramme en bâtons (annonces par marque)
      this.barChartLabels = stats.annoncesParMarque.map(
        (item: any) => item.marque
      );
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: stats.annoncesParMarque.map((item: any) => item.total),
            label: "Nombre total d'annonces",
          backgroundColor: '#3d5ec9',
            borderColor: '#3d5ec9',
            borderWidth: 0.02,
          },
        ],
      };

      // Pie Chart (annonces vendues vs total)
      this.pieChartData.datasets[0].data = [
        this.annoncesVendues,
        this.totalAnnonces - this.annoncesVendues,
      ];

      this.showPieChart = false;
      setTimeout(() => {
        this.showPieChart = true;
      }, 0);
      console.log('Pie Chart Data:', this.pieChartData);

      this.pieChartLabels1 = stats.annoncesParMarque.map(
        (item: any) => item.marque
      );

      const pieData1 = stats.annoncesParMarque.map((item: any) => item.total);

      this.pieChartData1 = {
        labels: this.pieChartLabels1,
        datasets: [
          {
            data: pieData1,
            backgroundColor: this.generateColors(pieData1.length), // Génère des couleurs aléatoires ou définies
            borderWidth: 1,
          },
        ],
      };

      this.pieChartOptions1 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                const label = context.label || '';
                const value = context.raw || 0;
                return `${label}: ${value} annonces`;
              },
            },
          },
        },
      };

      // Courbe (annonces vendues par mois)
      this.lineChartLabels = stats.annoncesVenduesParMois.map((item: any) =>
        new Date(`${item.mois}-01`).toLocaleString('fr-FR', { month: 'long' })
      );

      this.lineChartData = {
        labels: this.lineChartLabels,
        datasets: [
          {
            data: stats.annoncesVenduesParMois.map((item: any) => item.total),
            label: 'Annonces vendues',
            borderColor: '#3d5ec9',
            pointBackgroundColor: '#3d5ec9',
            tension: 1,
          },
        ],
      };
      this.showLineChart = false;
      setTimeout(() => {
        this.showLineChart = true;
      }, 0);
      /*  this.cdr.detectChanges(); // Pour forcer Angular à détecter les changements

if (this.chart && this.chart.chart) {
  this.chart.update(); // Pour forcer la mise à jour du graphe
} */

      console.log(
        'Données annonces vendues par mois:',
        stats.annoncesVenduesParMois
      );
      console.log('Labels générés :', this.lineChartLabels);
      console.log('Données du graphe :', this.lineChartData);
      console.log('Référence du graphe :', this.chart);
      console.log('hello', this.prixtotalVente);
      console.log('kilométrage moyen', this.kilometrageMoyenParMarque);
    });
  }
  generateColors(count: number): string[] {
    const colors = [
      '#375A7F', // Dark Blue (for primary elements, similar to a navy but slightly softer)
      '#ADD8E6', // Light Blue (for accents or secondary elements)
      '#8FBC8F', // Soft Green (for success or positive indicators, less harsh than pure green)
      '#F08080', // Light Coral (for warnings or errors, softer than bright red)
      '#8A2BE2', // Blue Violet (a sophisticated accent color)
      '#B0E0E6', // Powder Blue (a very light and clean accent)
      '#FFA07A', // Light Salmon (another softer accent color)
      '#D3D3D3', // Light Gray (for neutral elements and backgrounds)
      '#98FB98', // Pale Green (a very light success indicator)
      '#BA55D3'
    ];
    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  }
}
