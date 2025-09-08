import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    const current = this.transactionsSubject.getValue();
    this.transactionsSubject.next([
      ...current,
      { id: this.generateUUID(), ...values },
    ]);
    // TODO: toast
  }

  update(values: TransactionFormType, id: TransactionType['id']): void {
    const current = this.transactionsSubject.getValue();
    const updated = current.map((t) => (t.id === id ? { id, ...values } : t));
    this.transactionsSubject.next(updated);
    // TODO: toast
  }

  delete(id: TransactionType['id']): void {
    const current = this.transactionsSubject.getValue();
    const filtered = current.filter((t) => t.id !== id);
    this.transactionsSubject.next(filtered);
    // TODO: toast
  }

  getById(id: TransactionType['id']): TransactionType | undefined {
    return this.transactionsSubject.getValue().find((t) => t.id === id);
  }

  generateUUID(): string {
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
