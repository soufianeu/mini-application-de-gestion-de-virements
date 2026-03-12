package com.example.virement.dto;

import com.example.virement.model.TransferStatus;
import com.example.virement.model.Virement;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record VirementResponse(
        Long id,
        String sourceAccount,
        String destinationAccount,
        BigDecimal amount,
        String currency,
        String beneficiaryName,
        String reason,
        TransferStatus status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static VirementResponse fromEntity(Virement virement) {
        return new VirementResponse(
                virement.getId(),
                virement.getSourceAccount(),
                virement.getDestinationAccount(),
                virement.getAmount(),
                virement.getCurrency(),
                virement.getBeneficiaryName(),
                virement.getReason(),
                virement.getStatus(),
                virement.getCreatedAt(),
                virement.getUpdatedAt()
        );
    }
}
