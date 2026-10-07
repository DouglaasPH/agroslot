package io.github.douglaasph.agroslot.repository;

import io.github.douglaasph.agroslot.model.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantRepository extends JpaRepository<Plant, Integer> {

    List<Plant> findByPlantacaoId(Integer plantacaoId);
}
