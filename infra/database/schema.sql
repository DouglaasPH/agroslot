-- ============================================================
-- AgroSlot — Script de Criação do Banco de Dados
-- SGBD: PostgreSQL 14+
-- Baseado no diagrama UML (Usuarios, Plantação, Plantas, Historico_Planta)
-- ============================================================

-- 1. Tipos ENUM

CREATE TYPE especie_planta AS ENUM ('SOJA');


-- 2. Tabela: Usuarios

CREATE TABLE Usuarios (
    id          SERIAL       PRIMARY KEY,
    nome        VARCHAR(150) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL
);


-- 3. Tabela: Plantação

CREATE TABLE Plantacao (
    id           SERIAL       PRIMARY KEY,
    nome         VARCHAR(150) NOT NULL,
    capacidade   INTEGER      NOT NULL CHECK (capacidade > 0),
    user_id      INTEGER      NOT NULL,
    colunas      INTEGER      NOT NULL CHECK (colunas > 0),
    linhas       INTEGER      NOT NULL CHECK (linhas > 0),

    CONSTRAINT fk_plantacao_usuario
        FOREIGN KEY (user_id)
        REFERENCES Usuarios (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    -- Regra: colunas * linhas deve comportar a capacidade de slots
    CONSTRAINT chk_plantacao_dimensoes
        CHECK (colunas * linhas >= capacidade)
);

-- 4. Tabela: Plantas

CREATE TABLE Plantas (
    id            SERIAL         PRIMARY KEY,
    especie       especie_planta NOT NULL DEFAULT 'SOJA',
    nome          VARCHAR(150),
    posicao_x     INTEGER        NOT NULL,
    posicao_y     INTEGER        NOT NULL,
    plantacao_id  INTEGER        NOT NULL,

    CONSTRAINT fk_plantas_plantacao
        FOREIGN KEY (plantacao_id)
        REFERENCES Plantacao (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    -- Regra de negócio MVP: 1 slot = 1 planta ativa
    CONSTRAINT uq_plantas_slot
        UNIQUE (plantacao_id, posicao_x, posicao_y),

    -- Posições devem ser válidas dentro da matriz
    CONSTRAINT chk_plantas_posicao_positiva
        CHECK (posicao_x >= 0 AND posicao_y >= 0)
);


-- 5. Tabela: Historico_Planta

CREATE TABLE Historico_Planta (
    id               SERIAL       PRIMARY KEY,
    planta_id        INTEGER      NOT NULL,
    foto             VARCHAR(500) NOT NULL,
    upload_date      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    predicao         VARCHAR(255),
    nivel_saude_predicao FLOAT,

    CONSTRAINT fk_historico_planta
        FOREIGN KEY (planta_id)
        REFERENCES Plantas (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    -- Confiança da predição deve estar entre 0 e 1
    CONSTRAINT chk_historico_nivel_saude
        CHECK (nivel_saude_predicao IS NULL
               OR (nivel_saude_predicao >= 0 AND nivel_saude_predicao <= 1))
);

-- 6. Índices para otimização de consultas frequentes

-- Buscar plantações de um usuário
CREATE INDEX idx_plantacao_user_id
    ON Plantacao (user_id);

-- Buscar plantas de uma plantação
CREATE INDEX idx_plantas_plantacao_id
    ON Plantas (plantacao_id);

-- Buscar histórico de uma planta (ordenado por data)
CREATE INDEX idx_historico_planta_id_date
    ON Historico_Planta (planta_id, upload_date DESC);

-- Buscar usuário por email (login)
CREATE INDEX idx_usuarios_email
    ON Usuarios (email);

-- 7. Comentários (documentação do schema)

COMMENT ON TABLE Usuarios IS 'Usuários do sistema (workspace isolado por usuário).';
COMMENT ON TABLE Plantacao IS 'Espaço delimitado em matriz de slots, pertencente a um usuário.';
COMMENT ON TABLE Plantas IS 'Planta individual (soja) vinculada a um slot (x,y) de uma plantação.';
COMMENT ON TABLE Historico_Planta IS 'Registro de fotos + predições de IA para cada planta.';

COMMENT ON COLUMN Plantacao.capacidade IS 'Quantidade de slots disponíveis na plantação.';
COMMENT ON COLUMN Plantacao.colunas IS 'Número de colunas da matriz de slots.';
COMMENT ON COLUMN Plantacao.linhas IS 'Número de linhas da matriz de slots.';
COMMENT ON COLUMN Plantas.posicao_x IS 'Coordenada X (coluna) do slot ocupado.';
COMMENT ON COLUMN Plantas.posicao_y IS 'Coordenada Y (linha) do slot ocupado.';
COMMENT ON COLUMN Historico_Planta.predicao IS 'Rótulo predito pela IA (ex: ferrugem_asiatica, septoria, healthy).';
COMMENT ON COLUMN Historico_Planta.nivel_saude_predicao IS 'Grau de confiança/severidade retornado pelo modelo (0.0 a 1.0).';