import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  TransactionService,
  TransactionType,
} from '../../services/transactions.service';
import { TransactionItemComponent } from '../item/transaction-item.component';

@Component({
  standalone: true,
  selector: 'app-transactions-list',
  templateUrl: './transaction-list.component.html',
  imports: [TransactionItemComponent, CommonModule],
})
export class TransactionListComponent {
  title = input('');

  transactions: TransactionType[] = [];

  constructor(private transactionsService: TransactionService) {}

  ngOnInit() {
    this.transactionsService.transactions$.subscribe(
      (t) => (this.transactions = t),
    );
  }
}
