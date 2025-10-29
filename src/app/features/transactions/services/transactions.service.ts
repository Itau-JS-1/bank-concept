import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DEFAULT_TRANSACTION_VALUES } from '.';

export type TransactionType = {
  id: string;
  name: string;
  value: number;
  categoryId: number;
  date: Date;
  paymentType: string;
};

export type TransactionFormType = Omit<TransactionType, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<TransactionType[]>(
    DEFAULT_TRANSACTION_VALUES,
  );

  transactions$: Observable<TransactionType[]> =
    this.transactionsSubject.asObservable();

  get transactions(): TransactionType[] {
    return this.transactionsSubject.getValue();
  }

  create(values: TransactionFormType): void {
    const current = this.transactions;
    this.transactionsSubject.next([
      ...current,
      { id: this.generateUUID(), ...values },
    ]);
  }

  update(values: TransactionFormType, id: TransactionType['id']): void {
    const current = this.transactions;
    const updated = current.map((t) => (t.id === id ? { id, ...values } : t));
    this.transactionsSubject.next(updated);
  }

  delete(id: TransactionType['id']): void {
    const current = this.transactions;
    const filtered = current.filter((t) => t.id !== id);
    this.transactionsSubject.next(filtered);
  }

  getById$(id: TransactionType['id']): Observable<TransactionType | undefined> {
    return this.transactions$.pipe(
      map(transactions => transactions.find((t) => t.id === id))
    );
  }

  getById(id: TransactionType['id']): TransactionType | undefined {
    return this.transactions.find((t) => t.id === id);
  }

  generateUUID(): string {
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
