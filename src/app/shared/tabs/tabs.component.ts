import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

export interface TabItem {
  text: string;
  value: string;
}

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  items = input<TabItem[]>();
  active = input<string | number>('');
  activeChange = output<string>();

  setActive(value: string) {
    this.activeChange.emit(value);
  }
}
