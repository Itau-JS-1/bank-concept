import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();

  constructor(public router: Router) {}

  navBarData = [
    { text: 'Dashboard', icon: 'graph', link: '/' },
    { text: 'Conta', icon: 'user-circle', link: '/account' },
    { text: 'Transações', icon: 'coin', link: '/transactions' },
    { text: 'Chat online', icon: 'message', link: '/chat' },
    { text: 'Configurações', icon: 'settings', link: '/settings' },
  ];

  closeNavbar() {
    this.openedChange.emit(false);
  }

  isActive(link: string): boolean {
    return this.router.url === link;
  }
}
