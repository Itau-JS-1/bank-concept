import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../../shared/button/button.component';
import {
  CategoriesService,
  CategoryType,
} from '../../categories/services/categories.service';
import { PAYMENT_METHODS } from '../services';
import {
  TransactionFormType,
  TransactionType,
} from '../services/transactions.service';

@Component({
  selector: 'app-default-transaction-form',
  standalone: true,
  templateUrl: './default-transaction-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
})
export class DefaultTransactionFormComponent implements OnChanges {
  @Input() defaultValues?: TransactionType;
  @Output() submitForm = new EventEmitter<TransactionFormType>();

  form!: FormGroup;
  categories$!: Observable<CategoryType[]>;
  paymentMethods = PAYMENT_METHODS;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
  ) {}

  ngOnInit() {
    this.categories$ = this.categoriesService.categories$;

    this.form = this.fb.group({
      name: [this.defaultValues?.name, Validators.required],
      value: [this.defaultValues?.value, Validators.min(0.01)],
      categoryId: [this.defaultValues?.categoryId, Validators.required],
      paymentType: [this.defaultValues?.paymentType, Validators.required],
      date: [
        new Date(this.defaultValues?.date || new Date())
          .toISOString()
          .substring(0, 10),
      ],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultValues'] && this.form) {
      const v = changes['defaultValues'].currentValue as TransactionType;
      if (v) this.patchForm(v);
    }
  }

  private patchForm(v: TransactionType) {
    this.form.patchValue({
      name: v.name,
      value: v.value,
      categoryId: v.categoryId,
      paymentType: v.paymentType,
      date: new Date(v.date).toISOString().substring(0, 10),
    });
    console.log('[Form patch]', v);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.submitForm.emit(this.form.value);
    this.form.reset();
  }
}
