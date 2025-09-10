import { Component } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconPlus } from 'angular-tabler-icons/icons';
import { ModalName, ModalsService } from '../../../../services/modals.service';

@Component({
  standalone: true,
  selector: 'app-create-transaction-button',
  templateUrl: './create-transaction-button.component.html',
  imports: [TablerIconComponent],
  providers: [provideTablerIcons({ IconPlus })],
})
export class CreateTransactionButtonComponent {
  constructor(private modalsService: ModalsService) {}

  openCreateTransactionModal() {
    this.modalsService.open(ModalName.CREATE_TRANSACTION);
  }
}
