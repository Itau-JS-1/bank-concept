import { CommonModule } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconTrash } from 'angular-tabler-icons/icons';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ModalName, ModalsService } from '../../../../services/modals.service';
import { ModalsComponent } from '../../../../shared/modals/modal/modal.component';
import { dateFromLocalString } from '../../../../shared/utils/dates';
import { DefaultTransactionFormComponent } from '../../form/default-transaction-form.component';
import {
  TransactionFormType,
  TransactionService,
  TransactionType,
} from '../../services/transactions.service';

@Component({
  selector: 'app-update-transaction-modal',
  standalone: true,
  imports: [
    TablerIconComponent,
    CommonModule,
    ModalsComponent,
    DefaultTransactionFormComponent,
    FormsModule,
  ],
  templateUrl: './update-transaction-modal.component.html',
  providers: [
    provideTablerIcons({
      IconTrash,
    }),
  ],
})
export class UpdateTransactionModalComponent {
  modalName: ModalName = ModalName.UPDATE_TRANSACTION;
  isOpen$;

  transaction$!: Observable<TransactionType | undefined>;
  dataId!: string | number | null;

  constructor(
    private modalsService: ModalsService,
    private transactionService: TransactionService,
  ) {
    this.transaction$ = this.modalsService.getModal(this.modalName).pipe(
      map((modal) => modal?.dataId ?? null),
      tap((id) => (this.dataId = id)),
      switchMap((id) =>
        this.transactionService.transactions$.pipe(
          map((transactions) => transactions.find((t) => t.id === id)),
        ),
      ),
    );

    this.transaction$.subscribe((t) => console.log('[transaction$]', t));

    this.isOpen$ = this.modalsService
      .getModal(this.modalName)
      .pipe(map((modal) => modal?.open ?? false));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('update', changes);
  }

  onSubmit(data: TransactionFormType) {
    console.log(data, this.dataId);
    if (this.dataId) {
      this.transactionService.update(
        {
          ...data,
          categoryId: Number(data.categoryId),
          date: dateFromLocalString(data.date as any),
        },
        this.dataId.toString(),
      );
      this.modalsService.close(this.modalName);
    }
  }

  delete() {
    if (this.dataId) {
      this.transactionService.delete(this.dataId.toString());
      this.modalsService.close(this.modalName);
    }
  }
}
