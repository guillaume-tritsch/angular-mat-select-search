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

import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-single-select-search',
  templateUrl: './single-select-search.component.html',
  styleUrls: ['./single-select-search.component.scss'],
})
export class SingleSelectSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
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
  @Input() options: Object[];

  // Label de l'option 'none'
  @Input() resetLabel: string = 'None';

  // Suite

  /** control for the selected bank */
  public valueCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public valueFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredValue: ReplaySubject<Object[]> = new ReplaySubject<Object[]>(
    1
  );

  @ViewChild('singleSelect') singleSelect!: MatSelect;

  @Input() value: Object; // TODO : ici quand recherche pays -> afga toujours selectionné; les options chargent pas au premier clique
  @Output() valueChange: EventEmitter<Object> = new EventEmitter<Object>();

  protected _onDestroy = new Subject<void>();

  constructor() {}

  ngOnInit() {
    this.valueCtrl.setValue(this.value);
    // load the initial bank list

    this.filteredValue.next(this.options.slice());

    // listen for search field value changes
    this.valueFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterValue();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  loadOptions() {
    this.filteredValue.next(this.options.slice());
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredValue
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Object, b: Object) =>
          a && b && a === b;
      });
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

  protected filterValue() {
    if (!this.options) {
      return;
    }
    // get the search keyword
    let search = this.valueFilterCtrl.value;
    if (!search) {
      this.filteredValue.next(this.options.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredValue.next(
      this.options.filter(
        (value) => value['label'].toLowerCase().indexOf(search) > -1
      )
    );
  }

  emitValueChange() {
    console.log(this.valueCtrl.value);
    this.valueChange.emit(this.valueCtrl.value);
  }
}
