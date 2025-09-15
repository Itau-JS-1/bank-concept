import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
export class ModalsContainerComponent {
  modals$!: Observable<ModalProps[]>;
  private modals: ModalProps[] = [];

  constructor(private modalsService: ModalsService) {}

  ngOnInit() {
    this.modals$ = this.modalsService.modals$;

    this.modals$.subscribe((modals) => {
      this.modals = modals;
    });
  }

  isAnyModalOpen(): boolean {
    return this.modals.some((m) => m.open);
  }
}
