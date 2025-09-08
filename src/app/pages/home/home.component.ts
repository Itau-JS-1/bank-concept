import { Component } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconArrowRight, IconUserCircle } from 'angular-tabler-icons/icons';
import { TransactionListComponent } from '../../features/transactions/components/list/transaction-list.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { CreditCardComponent } from '../../shared/credit-card/credit-card.component';
import { HomeInfoSectionComponent } from './home-info-section/home-info-section.component';

@Component({
  selector: 'app-home',
  imports: [
    TablerIconComponent,
    CreditCardComponent,
    ButtonComponent,
    HomeInfoSectionComponent,
    TransactionListComponent,
  ],
  templateUrl: './home.component.html',
  providers: [
    provideTablerIcons({
      IconUserCircle,
      IconArrowRight,
    }),
  ],
})
export class HomeComponent {}
