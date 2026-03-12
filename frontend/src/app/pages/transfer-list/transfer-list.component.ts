import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { finalize } from 'rxjs';
import { TransferStatus, Virement } from '../../models/virement.model';
import { VirementService } from '../../services/virement.service';

@Component({
  selector: 'app-transfer-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzTableModule,
    NzTagModule,
    NzSelectModule,
    NzButtonModule,
    NzEmptyModule
  ],
  templateUrl: './transfer-list.component.html',
  styleUrl: './transfer-list.component.scss'
})
export class TransferListComponent implements OnInit {
  readonly statusOptions: TransferStatus[] = ['PENDING', 'VALIDATED', 'REJECTED', 'EXECUTED'];
  readonly statusLabels: Record<TransferStatus, string> = {
    PENDING: 'En attente',
    VALIDATED: 'Valide',
    REJECTED: 'Rejete',
    EXECUTED: 'Execute'
  };
  readonly editableStatuses: Record<number, TransferStatus> = {};

  loading = false;
  virements: Virement[] = [];
  readonly updating = new Set<number>();

  constructor(
    private readonly virementService: VirementService,
    private readonly messageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.loadVirements();
  }

  loadVirements(): void {
    this.loading = true;
    this.virementService
      .getVirements()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (virements) => {
          this.virements = virements;
          for (const virement of virements) {
            this.editableStatuses[virement.id] = virement.status;
          }
        },
        error: () => {
          this.messageService.error('Impossible de charger la liste des virements.');
        }
      });
  }

  updateStatus(virement: Virement): void {
    const selectedStatus = this.editableStatuses[virement.id];
    if (!selectedStatus || selectedStatus === virement.status) {
      this.messageService.info('Aucun changement de statut detecte.');
      return;
    }

    this.updating.add(virement.id);
    this.virementService
      .updateStatus(virement.id, selectedStatus)
      .pipe(finalize(() => this.updating.delete(virement.id)))
      .subscribe({
        next: (updated) => {
          this.virements = this.virements.map((item) => (item.id === updated.id ? updated : item));
          this.editableStatuses[updated.id] = updated.status;
          this.messageService.success(`Statut du virement ${updated.id} mis a jour.`);
        },
        error: () => {
          this.messageService.error('La mise a jour du statut a echoue.');
        }
      });
  }

  statusColor(status: TransferStatus): string {
    switch (status) {
      case 'PENDING':
        return 'gold';
      case 'VALIDATED':
        return 'blue';
      case 'REJECTED':
        return 'red';
      case 'EXECUTED':
        return 'green';
      default:
        return 'default';
    }
  }

  statusLabel(status: TransferStatus): string {
    return this.statusLabels[status];
  }
}
