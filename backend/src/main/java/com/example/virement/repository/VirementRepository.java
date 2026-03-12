package com.example.virement.repository;

import com.example.virement.model.Virement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VirementRepository extends JpaRepository<Virement, Long> {
}
