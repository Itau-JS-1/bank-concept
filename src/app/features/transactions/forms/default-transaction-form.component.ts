import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { CategoriesService, CategoryType } from '../../categories/services/categories.service';
import { TransactionFormType, TransactionType } from '../services/transactions.service';
import { Observable } from 'rxjs';
import { PAYMENT_METHODS } from '../services';

@Component({
  selector: 'app-default-transaction-form',
  standalone: true,
  templateUrl: './default-transaction-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
})
export class DefaultTransactionFormComponent implements OnInit, OnChanges {
  private fb = inject(FormBuilder);
  private categoriesService = inject(CategoriesService);

  @Input() defaultValues?: TransactionType;
  @Output() submitForm = new EventEmitter<TransactionFormType>();

  form!: FormGroup;
  categories$!: Observable<CategoryType[]>;
  paymentMethods = PAYMENT_METHODS;

  ngOnInit() {
    this.categories$ = this.categoriesService.categories$;

    this.form = this.fb.group({
      name: [this.defaultValues?.name || '', Validators.required],
      value: [this.defaultValues?.value || null, Validators.min(0.01)],
      categoryId: [this.defaultValues?.categoryId || null, Validators.required],
      paymentType: [this.defaultValues?.paymentType || null, Validators.required],
      date: [this.formatDate(this.defaultValues?.date), Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultValues'] && this.form) {
      const v = changes['defaultValues'].currentValue as TransactionType;
      if (v) {
        this.patchForm(v);
      } else if (changes['defaultValues'].firstChange === false) {
        this.form.reset();
      }
    }
  }

  private formatDate(date: Date | undefined): string {
    const d = date ? new Date(date) : new Date();
    return d.toISOString().substring(0, 10);
  }

  private patchForm(v: TransactionType) {
    this.form.patchValue({
      name: v.name,
      value: v.value,
      categoryId: v.categoryId,
      paymentType: v.paymentType,
      date: this.formatDate(v.date),
    });
  }

  onSubmit() {
    console.log(this.form.value);

    this.submitForm.emit(this.form.value);
    this.form.reset();
  }
}

