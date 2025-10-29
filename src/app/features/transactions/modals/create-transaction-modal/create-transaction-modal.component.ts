import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { ModalName, ModalsService } from '../../../../services/modals.service';
import { ModalsComponent } from '../../../../shared/modals/modal/modal.component';
import { dateFromLocalString } from '../../../../shared/utils/dates';
import { DefaultTransactionFormComponent } from '../../forms/default-transaction-form.component';
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
  private modalsService = inject(ModalsService);
  private transactionService = inject(TransactionService);

  readonly modalName: ModalName = ModalName.CREATE_TRANSACTION;

  public isOpen$: Observable<boolean>;

  constructor() {
    this.isOpen$ = this.modalsService
      .getModal(this.modalName)
      .pipe(
        map((modal) => modal?.open ?? false)
      );
  }
  onSubmit(data: TransactionFormType): void {
    console.log(data);
    this.transactionService.create({
      ...data,
      categoryId: Number(data.categoryId),
      date: dateFromLocalString(data.date as any),
    });

    this.modalsService.close(this.modalName);
  }
  onClose(): void {
    this.modalsService.close(this.modalName);
  }
}
