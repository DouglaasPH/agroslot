package io.github.douglaasph.agroslot.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "plantas",
uniqueConstraints = @UniqueConstraint(
name = "uq_plantas_posicao",
columnNames = {"plantacao_id", "posicao_x", "posicao_y"}))
@Getter 
@Setter 
@NoArgsConstructor
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(nullable = false, columnDefinition = "especie_planta")
    private EspeciePlanta especie = EspeciePlanta.SOJA;

    @Column(nullable = false)
    private String nome;

    @Column(name = "posicao_x", nullable = false)
    private Integer posicaoX;

    @Column(name = "posicao_y", nullable = false)
    private Integer posicaoY;

    // Muitas plantas pertencem a UMA plantacao 
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "plantacao_id", nullable = false)
    private Plantation plantacao;
}
