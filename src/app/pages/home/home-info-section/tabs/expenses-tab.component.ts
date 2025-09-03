import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  TransactionService,
  TransactionType,
} from '../../../../features/transactions/services/transactions.service';

@Component({
  selector: 'app-expenses-tab',
  imports: [CommonModule],
  templateUrl: './expenses-tab.component.html',
})
export class ExpensesTabComponent {
  transactions$: Observable<TransactionType[]>;
  total$: Observable<number>;

  constructor(private transactionService: TransactionService) {
    this.transactions$ = this.transactionService.transactions$;
    this.total$ = this.transactions$.pipe(
      map<TransactionType[], number>((transactions) =>
        transactions.reduce((acc, t) => acc + t.value, 0),
      ),
    );
  }
}
