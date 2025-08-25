import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalsContainerComponent } from '../shared/modals/container/container.component';
import { NavigationComponent } from '../shared/navigation/navigation.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavigationComponent, ModalsContainerComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
