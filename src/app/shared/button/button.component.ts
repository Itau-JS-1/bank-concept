import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  standalone: true,
})
export class ButtonComponent {
  // @Input() variant: 'default' | 'subtle' = 'default';
  variant = input<'default' | 'subtle'>('default');
  ariaLabel? = input<string>();
  leftSection = input<TemplateRef<any> | null>();
  rightSection = input<TemplateRef<any> | null>();
  tooltip = input<string>('');
  className = input<string>('');
}
