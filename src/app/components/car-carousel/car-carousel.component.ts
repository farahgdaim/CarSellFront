import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-car-carousel',
  templateUrl: './car-carousel.component.html',
  styleUrls: ['./car-carousel.component.css']
})
export class CarCarouselComponent implements OnInit, OnDestroy {
  carBrands = [
    { name: 'Audi', logo: 'assets/logos/audi.png' },
    { name: 'BMW', logo: 'assets/logos/bmw.jpg' },
    { name: 'Mercedes', logo: 'assets/logos/mercedes.jpg' },
    { name: 'Toyota', logo: 'assets/logos/toyota.jpg' },
    { name: 'Ford', logo: 'assets/logos/ford.png' },
    { name: 'Porsche', logo: 'assets/logos/porsche.jpg' },
    { name: 'Chevrolet', logo: 'assets/logos/chevrolet.jpg' },
    { name: 'Hyundai', logo: 'assets/logos/Hundai.jpg' },
    { name: 'Nissan', logo: 'assets/logos/nissan.jpg' },
    { name: 'Volkswagen', logo: 'assets/logos/vw.jpg' },
    { name: 'Honda', logo: 'assets/logos/honda.jpg' },
    { name: 'Citroen', logo: 'assets/logos/citroen.jpg' },
    { name: 'Kia', logo: 'assets/logos/kia.jpg' },
    { name: 'Tesla', logo: 'assets/logos/tesla.jpg' },
    { name: 'Cherry', logo: 'assets/logos/cherry.jpg' },
    { name: 'haval', logo: 'assets/logos/haval.jpg' },
    { name: 'mg', logo: 'assets/logos/mg.jpg' },
    { name: 'rangeRover', logo: 'assets/logos/rangeRover.jpg' },
    { name: 'renault', logo: 'assets/logos/renault.jpg' },
    { name: 'Peugeot', logo: 'assets/logos/peugot.jpg' }
  ];
  
  autoScrollInterval: any;
  currentSlide = 0;
  brandsPerPage = 4;

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoScrollInterval);
  }

  nextSlide(): void {
    if (this.currentSlide + this.brandsPerPage < this.carBrands.length) {
      this.currentSlide += this.brandsPerPage;
    } else {
      this.currentSlide = 0; // Retour au début
    }
  }

  prevSlide(): void {
    if (this.currentSlide - this.brandsPerPage >= 0) {
      this.currentSlide -= this.brandsPerPage;
    } else {
      this.currentSlide = this.carBrands.length - this.brandsPerPage;
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index * this.brandsPerPage;
    this.restartAutoScroll();
  }

  getDotCount(): number[] {
    return Array(Math.ceil(this.carBrands.length / this.brandsPerPage)).fill(0).map((_, i) => i);
  }

  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 secondes de pause entre les phases
  }

  restartAutoScroll(): void {
    clearInterval(this.autoScrollInterval);
    this.startAutoScroll();
  }
}
