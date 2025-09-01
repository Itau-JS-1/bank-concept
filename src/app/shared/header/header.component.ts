import { Component, EventEmitter, Output } from '@angular/core';
import { TablerIconComponent, provideTablerIcons } from 'angular-tabler-icons';
import { IconMenu2 } from 'angular-tabler-icons/icons';

@Component({
  selector: 'app-header',
  imports: [TablerIconComponent],
  templateUrl: './header.component.html',
  providers: [
    provideTablerIcons({
      IconMenu2,
    }),
  ],
})
export class HeaderComponent {
  @Output() setOpened = new EventEmitter<boolean>();

  openMenu(): void {
    this.setOpened.emit(true);
  }
}
