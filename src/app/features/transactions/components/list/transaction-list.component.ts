import { CommonModule } from '@angular/common';
import { Component, input, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  TransactionService,
  TransactionType,
} from '../../services/transactions.service';
import { CreateTransactionButtonComponent } from '../create-transaction-button/create-transaction-button.component';
import { TransactionItemComponent } from '../item/transaction-item.component';

@Component({
  standalone: true,
  selector: 'app-transactions-list',
  templateUrl: './transaction-list.component.html',
  imports: [
    TransactionItemComponent,
    CommonModule,
    CreateTransactionButtonComponent,
  ],
})
export class TransactionListComponent implements OnInit {
  private transactionsService = inject(TransactionService);

  title = input('');

  public transactions$!: Observable<TransactionType[]>;

  ngOnInit() {
    this.transactions$ = this.transactionsService.transactions$;
  }
}
