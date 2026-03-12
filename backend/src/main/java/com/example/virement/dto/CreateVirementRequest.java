package com.example.virement.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record CreateVirementRequest(
        @NotBlank(message = "Le compte source est obligatoire")
        String sourceAccount,
        @NotBlank(message = "Le compte destination est obligatoire")
        String destinationAccount,
        @NotNull(message = "Le montant est obligatoire")
        @DecimalMin(value = "0.01", message = "Le montant doit etre superieur a 0")
        BigDecimal amount,
        @NotBlank(message = "La devise est obligatoire")
        @Pattern(regexp = "^[A-Za-z]{3}$", message = "La devise doit contenir 3 lettres")
        String currency,
        @Size(max = 120, message = "Le nom du beneficiaire ne doit pas depasser 120 caracteres")
        String beneficiaryName,
        @Size(max = 255, message = "Le motif ne doit pas depasser 255 caracteres")
        String reason
) {
}
