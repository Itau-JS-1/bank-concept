import { Component, Input } from '@angular/core';
import { provideTablerIcons, TablerIconComponent } from 'angular-tabler-icons';
import { IconDeviceSdCard, IconWifi2 } from 'angular-tabler-icons/icons';

@Component({
  selector: 'app-credit-card',
  imports: [TablerIconComponent],
  templateUrl: './credit-card.component.html',
  providers: [
    provideTablerIcons({
      IconDeviceSdCard,
      IconWifi2,
    }),
  ],
})
export class CreditCardComponent {
  @Input() name: string = '';
  @Input() brand: string = '';
  @Input() logo: string = '';
  @Input() ariaLabel?: string;
}
