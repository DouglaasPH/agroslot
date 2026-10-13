
package io.github.douglaasph.agroslot.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
//retorna a resposta json após a validação de dados
public class LoginResponse {

    private String accessToken;
    private String tokenType;
}
