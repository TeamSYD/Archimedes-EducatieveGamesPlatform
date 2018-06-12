import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    //let images
    const categories = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 150, name: 'Magneta' },
      { id: 160, name: 'RubberMan' },
      { id: 170, name: 'Dynama' },
      { id: 180, name: 'Dr IQ' },
      { id: 190, name: 'Magma' },
      { id: 119, name: 'Mr. Nice' },
      { id: 129, name: 'Narco' },
      { id: 139, name: 'Bombasto' }

    ];
    const cards = [
      { id: 11, name: 'Snorlex' },
      { id: 12, name: 'Pikachu' },
      { id: 13, name: 'Bobbafet' },
      { id: 14, name: 'Raichu' },
      { id: 15, name: 'Rattata' },
      { id: 16, name: 'Pidgy' },
      { id: 17, name: 'Pidgeot' },
      { id: 18, name: 'Pidgeotte' },
      { id: 19, name: 'Charizard' },
      { id: 150, name: 'Meow' },
      { id: 160, name: 'Blastoise' },
      { id: 170, name: 'Dynama' },
      { id: 180, name: 'Dr IQ' },
      { id: 190, name: 'Magma' },
      { id: 119, name: 'Mr. Nice' },
      { id: 129, name: 'Narco' },
      { id: 139, name: 'Bombasto' }

    ];
    const category = [
      { id: 11, name: 'Wiskunde' },
      { id: 14, name: 'Japan' },
      { id: 15, name: 'Nazi-Duitsland' },
    ];


    const wiskunde = [
      {id:1, imgUrl:"../../assets/angular-logo.png"},
      {id:2, imgUrl:"../../assets/angular-logo.png"},
      {id:3, imgUrl:"../../assets/angular-logo.png"},
      {id:4, imgUrl:"../../assets/angular-logo.png"},
      {id:5, imgUrl:"../../assets/angular-logo.png"},
      {id:6, imgUrl:"../../assets/angular-logo.png"},
      {id:7, imgUrl:"../../assets/angular-logo.png"},
      {id:8, imgUrl:"../../assets/angular-logo.png"},
      {id:9, imgUrl:"../../assets/angular-logo.png"},
      {id:10, imgUrl:"../../assets/angular-logo.png"},
      {id:11, imgUrl:"../../assets/angular-logo.png"},
      {id:12, imgUrl:"../../assets/angular-logo.png"},
    ];

    const japan =[];
    const naziDuitsland = [];
    return {cards, category, categories, wiskunde};
  }
}
