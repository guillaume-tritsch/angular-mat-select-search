import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  liste = [
    { label: 'label 1', value: '1' },
    { label: 'label 2', value: '2' },
    { label: 'label 3', value: '3' },
    { label: 'label 4', value: '1' },
    { label: 'label 5', value: '2' },
    { label: 'label 6', value: '3' },
    { label: 'label 15', value: '1' },
    { label: 'label 25', value: '2' },
    { label: 'label 34', value: '3' },
    { label: 'label 18', value: '1' },
    { label: 'label 24', value: '2' },
    { label: 'label 33', value: '3' },
    { label: 'label 11', value: '1' },
    { label: 'label 25', value: '2' },
    { label: 'label 37', value: '3' },
  ];

  valeur: Object;
  valeur2: Object;
}
