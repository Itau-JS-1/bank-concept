import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconTrash } from 'angular-tabler-icons/icons';
import { map, switchMap, Observable, Subscription } from 'rxjs';
import { ModalName, ModalsService } from '../../../../services/modals.service';
import { ModalsComponent } from '../../../../shared/modals/modal/modal.component';
import { dateFromLocalString } from '../../../../shared/utils/dates';
import { DefaultTransactionFormComponent } from '../../forms/default-transaction-form.component';
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
  ],
  templateUrl: './update-transaction-modal.component.html',
  providers: [
    provideTablerIcons({
      IconTrash,
    }),
  ],
})
export class UpdateTransactionModalComponent implements OnDestroy {
  // Injeções
  private modalsService = inject(ModalsService);
  private transactionService = inject(TransactionService);

  readonly modalName: ModalName = ModalName.UPDATE_TRANSACTION;

  public transaction$!: Observable<TransactionType | undefined>;

  public isOpen$!: Observable<boolean>;

  private currentDataId: string | null = null;

  private dataIdSubscription: Subscription;

  constructor() {
    const modalId$ = this.modalsService.getModal(this.modalName).pipe(
      map((modal) => modal?.dataId?.toString() ?? null)
    );

    this.dataIdSubscription = modalId$.subscribe(id => {
      this.currentDataId = id;
    });

    this.transaction$ = modalId$.pipe(
      switchMap((id) =>
        this.transactionService.transactions$.pipe(
          map((transactions) => (id ? transactions.find((t) => t.id === id) : undefined)),
        ),
      ),
    );

    this.isOpen$ = this.modalsService
      .getModal(this.modalName)
      .pipe(map((modal) => modal?.open ?? false));
  }

  ngOnDestroy(): void {
    this.dataIdSubscription.unsubscribe();
  }

  onSubmit(data: TransactionFormType): void {
    if (this.currentDataId) {
      this.transactionService.update(
        {
          ...data,
          categoryId: Number(data.categoryId),
          date: dateFromLocalString(data.date as any),
        },
        this.currentDataId,
      );
      this.modalsService.close(this.modalName);
    }
  }

  delete(): void {
    if (this.currentDataId) {
      this.transactionService.delete(this.currentDataId);
      this.modalsService.close(this.modalName);
    }
  }

  onClose(): void {
    this.modalsService.close(this.modalName);
  }
}
