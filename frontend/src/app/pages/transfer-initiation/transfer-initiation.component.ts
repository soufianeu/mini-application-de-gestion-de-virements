import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { finalize } from 'rxjs';
import { CreateVirementRequest } from '../../models/virement.model';
import { VirementService } from '../../services/virement.service';

@Component({
  selector: 'app-transfer-initiation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzAlertModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzButtonModule
  ],
  templateUrl: './transfer-initiation.component.html',
  styleUrl: './transfer-initiation.component.scss'
})
export class TransferInitiationComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly virementService = inject(VirementService);
  private readonly messageService = inject(NzMessageService);
  private readonly router = inject(Router);

  isSubmitting = false;
  validationMessages: string[] = [];
  readonly currencyOptions = ['MAD', 'EUR', 'USD'];

  readonly transferForm = this.formBuilder.group({
    sourceAccount: this.formBuilder.nonNullable.control('', [Validators.required]),
    destinationAccount: this.formBuilder.nonNullable.control('', [Validators.required]),
    amount: this.formBuilder.control<number | null>(null, [Validators.required, Validators.min(0.01)]),
    currency: this.formBuilder.control<string | null>(null, [
      Validators.required,
      Validators.pattern(/^[A-Za-z]{3}$/)
    ]),
    beneficiaryName: this.formBuilder.nonNullable.control(''),
    reason: this.formBuilder.nonNullable.control('')
  });

  submitTransfer(): void {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      this.validationMessages = this.buildValidationMessages();
      return;
    }

    this.validationMessages = [];
    this.isSubmitting = true;

    const raw = this.transferForm.getRawValue();
    const payload: CreateVirementRequest = {
      sourceAccount: raw.sourceAccount,
      destinationAccount: raw.destinationAccount,
      amount: raw.amount as number,
      currency: (raw.currency as string).toUpperCase(),
      beneficiaryName: raw.beneficiaryName || null,
      reason: raw.reason || null
    };

    this.virementService
      .createVirement(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.messageService.success('Virement cree avec succes');
          this.router.navigate(['/virements']);
        },
        error: () => {
          this.messageService.error("Impossible de creer le virement. Verifiez les donnees.");
        }
      });
  }

  private buildValidationMessages(): string[] {
    const messages: string[] = [];

    if (this.transferForm.controls.sourceAccount.hasError('required')) {
      messages.push('Le compte source est obligatoire.');
    }

    if (this.transferForm.controls.destinationAccount.hasError('required')) {
      messages.push('Le compte destination est obligatoire.');
    }

    if (
      this.transferForm.controls.amount.hasError('required') ||
      this.transferForm.controls.amount.hasError('min')
    ) {
      messages.push('Le montant doit etre superieur a 0.');
    }

    if (
      this.transferForm.controls.currency.hasError('required') ||
      this.transferForm.controls.currency.hasError('pattern')
    ) {
      messages.push('La devise est obligatoire.');
    }

    return messages;
  }
}
