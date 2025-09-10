import { CommonModule } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ModalName, ModalsService } from '../../../services/modals.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalsComponent {
  name = input<ModalName>(ModalName.CREATE_TRANSACTION);
  title = input<string>();
  actionsTemplate = input<TemplateRef<any> | null>(null);

  isOpen$!: Observable<boolean>;

  constructor(private modalsService: ModalsService) {}

  ngOnInit() {
    this.isOpen$ = this.modalsService
      .getModal(this.name())
      .pipe(map((modal) => modal?.open ?? false));
  }

  close() {
    this.modalsService.close(this.name());
  }
}
