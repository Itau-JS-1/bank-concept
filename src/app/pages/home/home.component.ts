import { Component } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconArrowRight, IconUserCircle } from 'angular-tabler-icons/icons';
import { ButtonComponent } from '../../shared/button/button.component';
import { CreditCardComponent } from '../../shared/credit-card/credit-card.component';

@Component({
  selector: 'app-home',
  imports: [TablerIconComponent, CreditCardComponent, ButtonComponent],
  templateUrl: './home.component.html',
  providers: [
    provideTablerIcons({
      IconUserCircle,
      IconArrowRight,
    }),
  ],
})
export class HomeComponent {}
