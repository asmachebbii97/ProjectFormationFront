import { Component, OnInit } from '@angular/core';

interface Place {
  imgSrc: string;
  name: string;
  description: string;
  charge: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  places: Array<Place> = [];
  constructor() {}
  ngOnInit() {
    this.places = [
      {
        imgSrc: 'assets/images/im1.jpg',
        name: 'Bureaux de travail',
        description: `Environnement de travail agréable et collectif
        Idéal pour les sociétés cherchant à élargir leur réseau`,
        charge: '',
        location: ''
      },
      {
        imgSrc: 'assets/images/im2.jpg',
        name: 'Équipements et services',
        description: `Une cuisine commune où vous pourrez faire du thé et du café
        Salles de réunion disponibles à la location sur base horaire.`,
        charge: '',
        location: ''
      },
      {
        imgSrc: 'assets/images/im3.jpg',
        name: 'Espace de travail collaboratif',
        description: `Selon le forfait que vous choisissez, bénéficiez d'un espace de travail hautement équipé, comprenant services, mobilier, internet haut-débit et personnel de réception.`,
        charge: '',
        location: ''
      }
    ];
  }
}
