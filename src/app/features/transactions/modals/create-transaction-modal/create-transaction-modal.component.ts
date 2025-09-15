import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { ModalName, ModalsService } from '../../../../services/modals.service';
import { ModalsComponent } from '../../../../shared/modals/modal/modal.component';
import { dateFromLocalString } from '../../../../shared/utils/dates';
import { DefaultTransactionFormComponent } from '../../form/default-transaction-form.component';
import {
  TransactionFormType,
  TransactionService,
} from '../../services/transactions.service';

@Component({
  selector: 'app-create-transaction-modal',
  standalone: true,
  imports: [CommonModule, ModalsComponent, DefaultTransactionFormComponent],
  templateUrl: './create-transaction-modal.component.html',
})
export class CreateTransactionModalComponent {
  modalName: ModalName = ModalName.CREATE_TRANSACTION;
  isOpen$;

  constructor(
    private modalsService: ModalsService,
    private transactionService: TransactionService,
  ) {
    this.isOpen$ = this.modalsService
      .getModal(this.modalName)
      .pipe(map((modal) => modal?.open ?? false));
  }

  onSubmit(data: TransactionFormType) {
    console.log(data);
    this.transactionService.create({
      ...data,
      categoryId: Number(data.categoryId),
      date: dateFromLocalString(data.date as any),
    });
    this.modalsService.close(this.modalName);
  }
}
