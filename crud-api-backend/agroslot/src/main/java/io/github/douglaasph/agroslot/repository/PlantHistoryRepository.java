package io.github.douglaasph.agroslot.repository;

import io.github.douglaasph.agroslot.model.PlantHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantHistoryRepository extends JpaRepository<PlantHistory, Integer> {

    List<PlantHistory> findByPlantaIdOrderByUploadDateDesc(Integer plantaId);
}
