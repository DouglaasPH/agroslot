package io.github.douglaasph.agroslot.repository;

import io.github.douglaasph.agroslot.model.Plantation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlantationRepository extends JpaRepository<Plantation, Integer> {

    List<Plantation> findByUsuarioId(Integer userId);
}
