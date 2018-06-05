import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    //const cards
    const cards = [
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
    return {cards};
  }
}
