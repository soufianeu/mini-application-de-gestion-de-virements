package com.example.virement.dto;

import com.example.virement.model.TransferStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateStatusRequest(
        @NotNull(message = "Le statut est obligatoire")
        TransferStatus status
) {
}
