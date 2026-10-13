package io.github.douglaasph.agroslot.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter 
@AllArgsConstructor 
//funciona como um filtro, quando o controller devolver o dto somente os campos definidos serão retornados
public class RegisterResponse {
    private Integer id;
    private String nome;
    private String email;
    
}
