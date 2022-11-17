import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-single-select-search-wngx',
  templateUrl: './single-select-search-wngx.component.html',
  styleUrls: ['./single-select-search-wngx.component.scss'],
})
export class SingleSelectSearchWngxComponent implements OnInit, OnDestroy {
  // A faire
  /*
  - gerer le workflow
  - positionner le dropdown sous le trigger
  - afficher les options au premier clique (solution actuelle pas opti )
  - rediger une doc qui explique le code
  */

  // ===== PARAMETRES =====

  // Nom de la variable label
  @Input() optionLabel = 'label';

  // Nom de la variable value
  @Input() optionValue = 'value';

  // Vrai si une option 'none' est proposé
  @Input() resetOption: boolean = false;

  // Vrai si l'icon de suppression est présent
  @Input() showClear: boolean = false;

  // Vrai si la selection est désactivé
  @Input() disabled: boolean = false;

  // Vrai si barre de recherche presente
  @Input() filter: boolean = false;

  // Label de la selection
  @Input() placeholder: string = ''; // =================== MARCHE PAS

  // Label dans la barre de recherche
  @Input() placeholderLabel: string = 'Search...';

  // Label lorsque aucune option correspond à la recherche
  @Input() noEntriesFoundLabel: string = 'no matching option found';

  // Liste des options proposé
  @Input() options: { value; label }[];

  // Label de l'option 'none'
  @Input() resetLabel: string = 'None';

  // Suite

  /** control for the selected bank */
  public valueCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredValue: ReplaySubject<{ value; label }[]> = new ReplaySubject<
    { value; label }[]
  >(1);

  @ViewChild('singleSelect') singleSelect!: MatSelect;

  @Input() value: Object; // TODO : ici quand recherche pays -> afga toujours selectionné; les options chargent pas au premier clique
  @Output() valueChange: EventEmitter<Object> = new EventEmitter<Object>();

  protected _onDestroy = new Subject<void>();

  constructor() {}

  ngOnInit() {
    this.valueCtrl.setValue(this.value);
    // load the initial bank list

    this.filteredValue.next(this.options.slice());
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  loadOptions() {
    this.filteredValue.next(this.options.slice());
  }

  deleteContent(event: Event) {
    if (
      ![null, undefined].includes(this.valueCtrl.value) &&
      this.showClear &&
      !this.disabled
    ) {
      event.stopPropagation();
      this.valueCtrl.setValue(undefined);
      this.emitValueChange();
    }
  }

  emitValueChange() {
    console.log(this.valueCtrl.value);
    this.valueChange.emit(this.valueCtrl.value);
  }

  onKey(event) {
    this.filteredValue.next(
      this.search((event.target as HTMLInputElement).value)
    );
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.options.filter((option) =>
      option.label.toLowerCase().includes(filter)
    );
  }
}
