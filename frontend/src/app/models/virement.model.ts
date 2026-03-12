export type TransferStatus = 'PENDING' | 'VALIDATED' | 'REJECTED' | 'EXECUTED';

export interface Virement {
  id: number;
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  currency: string;
  beneficiaryName: string | null;
  reason: string | null;
  status: TransferStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVirementRequest {
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  currency: string;
  beneficiaryName: string | null;
  reason: string | null;
}
