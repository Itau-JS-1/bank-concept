import { Component, inject, input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, Observable, switchMap } from 'rxjs';
import { ModalName, ModalsService } from '../../../services/modals.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalsComponent {
  private modalsService = inject(ModalsService);

  name = input.required<ModalName>({ alias: 'name' });
  title = input<string>();
  actionsTemplate = input<TemplateRef<any> | null>(null);

  public isOpen$!: Observable<boolean>;

  constructor() {
    const name$ = toObservable(this.name);

    this.isOpen$ = name$.pipe(
      switchMap((modalName) => this.modalsService.getModal(modalName)),
      map((modal) => modal?.open ?? false)
    );
  }

  close() {
    this.modalsService.close(this.name());
  }
}
