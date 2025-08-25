import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-navigation',
  imports: [NavbarComponent, HeaderComponent],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {}
