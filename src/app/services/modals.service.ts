import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { TransactionType } from '../features/transactions/services/transactions.service';

export enum ModalName {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
}
/*
export type ModalName =
  | 'createTransaction'
  | 'updateTransaction'
  | 'createCategory'
  | 'updateCategory';
  */

export type ModalProps = {
  name: ModalName;
  open: boolean;
  dataId?: number | string | null;
};

const DEFAULT_MODALS: ModalProps[] = [
  { name: ModalName.CREATE_TRANSACTION, open: false },
  { name: ModalName.UPDATE_TRANSACTION, open: false, dataId: null },
  { name: ModalName.CREATE_CATEGORY, open: false },
  { name: ModalName.UPDATE_CATEGORY, open: false, dataId: null },
];

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  private modalsSubject = new BehaviorSubject<ModalProps[]>(DEFAULT_MODALS);
  modals$ = this.modalsSubject.asObservable();

  private updateModals(newModals: ModalProps[]) {
    this.modalsSubject.next(newModals);
  }

  open(name: ModalName) {
    const newModals = this.modalsSubject
      .getValue()
      .map((modal) =>
        modal.name === name
          ? { ...modal, open: true }
          : { ...modal, open: false, dataId: null },
      );

    this.updateModals(newModals);
  }

  close(name: ModalName) {
    const newModals = this.modalsSubject
      .getValue()
      .map((modal) =>
        modal.name === name ? { ...modal, open: false } : modal,
      );

    this.updateModals(newModals);
  }

  openUpdate(name: ModalName, dataId: TransactionType['id'] | null) {
    const newModals = this.modalsSubject
      .getValue()
      .map((modal) =>
        modal.name === name
          ? { ...modal, open: true, dataId }
          : { ...modal, open: false, dataId: null },
      );
    this.updateModals(newModals);
  }

  getModal(name: ModalName) {
    return this.modals$.pipe(
      map((modals) => modals.find((m) => m.name === name)),
    );
  }
}
