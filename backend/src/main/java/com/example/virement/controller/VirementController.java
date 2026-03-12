package com.example.virement.controller;

import com.example.virement.dto.CreateVirementRequest;
import com.example.virement.dto.UpdateStatusRequest;
import com.example.virement.dto.VirementResponse;
import com.example.virement.service.VirementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/virements")
@CrossOrigin(origins = "http://localhost:4200")
public class VirementController {

    private final VirementService virementService;

    public VirementController(VirementService virementService) {
        this.virementService = virementService;
    }

    @PostMapping
    public ResponseEntity<VirementResponse> create(@Valid @RequestBody CreateVirementRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(virementService.createVirement(request));
    }

    @GetMapping
    public List<VirementResponse> list() {
        return virementService.listVirements();
    }

    @PatchMapping("/{id}/status")
    public VirementResponse updateStatus(@PathVariable Long id, @Valid @RequestBody UpdateStatusRequest request) {
        return virementService.updateStatus(id, request.status());
    }
}
