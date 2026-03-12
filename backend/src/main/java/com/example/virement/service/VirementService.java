package com.example.virement.service;

import com.example.virement.dto.CreateVirementRequest;
import com.example.virement.dto.VirementResponse;
import com.example.virement.exception.ResourceNotFoundException;
import com.example.virement.model.TransferStatus;
import com.example.virement.model.Virement;
import com.example.virement.repository.VirementRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class VirementService {

    private final VirementRepository virementRepository;

    public VirementService(VirementRepository virementRepository) {
        this.virementRepository = virementRepository;
    }

    public VirementResponse createVirement(CreateVirementRequest request) {
        Virement virement = new Virement();
        virement.setSourceAccount(request.sourceAccount());
        virement.setDestinationAccount(request.destinationAccount());
        virement.setAmount(request.amount());
        virement.setCurrency(request.currency());
        virement.setBeneficiaryName(request.beneficiaryName());
        virement.setReason(request.reason());
        virement.setStatus(TransferStatus.PENDING);

        return VirementResponse.fromEntity(virementRepository.save(virement));
    }

    public List<VirementResponse> listVirements() {
        return virementRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Virement::getCreatedAt).reversed())
                .map(VirementResponse::fromEntity)
                .toList();
    }

    public VirementResponse updateStatus(Long id, TransferStatus status) {
        Virement virement = virementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Virement introuvable avec l'id " + id));

        virement.setStatus(status);
        return VirementResponse.fromEntity(virementRepository.save(virement));
    }
}
