import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import {
  IconCar,
  IconShirt,
  IconShoppingCart,
  IconToolsKitchen2,
} from 'angular-tabler-icons/icons';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { ModalName, ModalsService } from '../../../../services/modals.service';
import { FormatDatePipe } from '../../../../shared/utils/format-date.pipe';
import {
  CategoriesService,
  CategoryType,
} from '../../../categories/services/categories.service';
import { TransactionType } from '../../services/transactions.service';

@Component({
  standalone: true,
  selector: 'app-transaction-item',
  imports: [CommonModule, TablerIconComponent, FormatDatePipe],
  templateUrl: './transaction-item.component.html',
  providers: [
    provideTablerIcons({
      IconCar,
      IconShirt,
      IconToolsKitchen2,
      IconShoppingCart,
    }),
  ],
})
export class TransactionItemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() data!: TransactionType;

  category: CategoryType | undefined;

  private data$ = new BehaviorSubject<TransactionType | null>(null);
  private subscription: Subscription = new Subscription();

  constructor(
    private categoriesService: CategoriesService,
    private modalsService: ModalsService,
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.categoriesService.categories$,
      this.data$.asObservable(),
    ]).subscribe(([categories, data]) => {
      if (data) {
        this.category = categories.find((c) => c.id === data.categoryId);
      }
    });

    if (this.data) {
      this.data$.next(this.data);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.data$.next(this.data);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openUpdateTransactionModal(dataId: string) {
    this.modalsService.openUpdate(ModalName.UPDATE_TRANSACTION, dataId);
  }
}
