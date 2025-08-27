import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();

  closeNavbar() {
    this.openedChange.emit(false);
  }
}
