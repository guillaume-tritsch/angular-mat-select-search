import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  liste = [
    { label: 'label 1', value: '1', disabled: true },
    { label: 'label 2', value: '2', disabled: true },
    { label: 'label 3', value: '3' },
    { label: 'label 4', value: '4' },
    { label: 'label 5', value: '5' },
    { label: 'label 6', value: '6' },
    { label: 'label 15', value: '15' },
    { label: 'label 25', value: '25' },
    { label: 'label 34', value: '34' },
    { label: 'label 18', value: '18' },
    { label: 'label 24', value: '24' },
    { label: 'label 33', value: '33' },
    { label: 'label 11', value: '11' },
    { label: 'label 25', value: '25' },
    { label: 'label 37', value: '37' },
  ];

  liste2 = [
    {
      label: 'Etat Unis',
      childrens: [
        { label: 'label 1', value: '1', disabled: true },
        { label: 'label 2', value: '2', disabled: true },
        { label: 'label 3', value: '3' },
        { label: 'label 4', value: '4' },
      ],
    },
    {
      label: 'France',
      childrens: [
        { label: 'label 5', value: '5' },
        { label: 'label 6', value: '6' },
        { label: 'label 15', value: '15' },
      ],
    },
    {
      label: 'Allemagne',
      childrens: [
        { label: 'label 24', value: '24' },
        { label: 'label 33', value: '33' },
        { label: 'label 25', value: '25' },
        { label: 'label 34', value: '34' },
      ],
    },
    {
      label: 'Suede',
      childrens: [
        { label: 'label 18', value: '18' },
        { label: 'label 11', value: '11' },
        { label: 'label 25', value: '25' },
        { label: 'label 37', value: '37' },
      ],
    },
  ];

  valeur2: string = this.liste[1]['value'];
}
