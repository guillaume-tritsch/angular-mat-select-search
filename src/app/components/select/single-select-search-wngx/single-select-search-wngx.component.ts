import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-single-select-search-wngx',
  templateUrl: './single-select-search-wngx.component.html',
  styleUrls: ['./single-select-search-wngx.component.scss'],
})
export class SingleSelectSearchWngxComponent implements OnInit {
  // A faire
  /*
  - gerer le workflow
  - positionner le dropdown sous le trigger
  - afficher les options au premier clique (solution actuelle pas opti )
  - rediger une doc qui explique le code
  */

  // ===== PARAMETRES =====

  // Nom de la variable label
  @Input() optionLabel: string = 'label';

  // Nom de la variable value
  @Input() optionValue: string = 'value';

  // Nom de la variable value
  @Input() optionDisabled: string = 'disabled';

  // Vrai si une option 'none' est proposé
  @Input() resetOption: boolean = false;

  // Vrai si la selection est désactivé
  @Input() disabled: boolean = false;

  // Vrai si barre de recherche presente
  @Input() filter: boolean = true;

  // Label de la selection
  @Input() placeholderSelect: string; // =================== MARCHE PAS

  // Label dans la barre de recherche
  @Input() placeholderDropdownInput: string = 'Search...';

  // Liste des options proposé
  @Input() options: { label: string; value; disabled?: boolean }[];

  // Label de l'option 'none'
  @Input() resetLabel: string = 'None';

  // Label lorsque aucune option disponible
  @Input() noOptionLabel: string = 'No option found';

  // Suite

  public dropdownInputContent: string;

  /** list of options filtered by search keyword */
  public filteredValue: { label: string; value; disabled?: boolean }[];

  @ViewChild('singleSelect') singleSelect!: MatSelect;
  @ViewChild('dropdownInput') dropdownInput!: ElementRef<HTMLInputElement>;

  @Input() ngModel: string; // TODO : ici quand recherche pays -> afga toujours selectionné; les options chargent pas au premier clique
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.filteredValue = this.options.slice();
  }

  loadOptions() {
    this.filteredValue = this.options.slice();
    this.dropdownInput.nativeElement.focus();
    this.dropdownInputContent = null;
  }

  deleteContent(event: Event) {
    if (![null, undefined].includes(this.ngModel) && !this.disabled) {
      event.stopPropagation();
      this.ngModel = null;
      this.emitValueChange();
    }
  }

  emitValueChange() {
    this.ngModelChange.emit(this.ngModel);
  }

  onKey() {
    this.filteredValue = this.search(this.dropdownInputContent);
  }

  search(value: string): { label: string; value; disabled?: boolean }[] {
    let filter = value.toLowerCase();
    return this.options.filter((option) =>
      option[this.optionLabel].toLowerCase().includes(filter)
    );
  }
}
