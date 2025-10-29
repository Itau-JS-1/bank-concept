import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { CreateTransactionModalComponent } from '../../../features/transactions/modals/create-transaction-modal/create-transaction-modal.component';
import { UpdateTransactionModalComponent } from '../../../features/transactions/modals/update-transaction-modal/update-transaction-modal.component';
import { ModalProps, ModalsService } from '../../../services/modals.service';

@Component({
  selector: 'app-modals-container',
  standalone: true,
  imports: [
    CommonModule,
    CreateTransactionModalComponent,
    UpdateTransactionModalComponent,
  ],
  templateUrl: './container.component.html',
})
export class ModalsContainerComponent implements OnInit {
  private modalsService = inject(ModalsService);

  public modals$!: Observable<ModalProps[]>;

  ngOnInit() {
    this.modals$ = this.modalsService.modals$;
  }

  public isAnyModalOpen$: Observable<boolean> = this.modalsService.modals$.pipe(
    map((modals) => modals.some((m) => m.open))
  );
}
