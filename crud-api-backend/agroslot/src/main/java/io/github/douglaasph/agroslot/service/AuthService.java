package io.github.douglaasph.agroslot.service;

import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import io.github.douglaasph.agroslot.dto.auth.ForgotPasswordRequest;
import io.github.douglaasph.agroslot.dto.auth.ForgotPasswordResponse;
import io.github.douglaasph.agroslot.dto.auth.LoginRequest;
import io.github.douglaasph.agroslot.dto.auth.LoginResponse;
import io.github.douglaasph.agroslot.dto.auth.RegisterRequest;
import io.github.douglaasph.agroslot.dto.auth.RegisterResponse;
import io.github.douglaasph.agroslot.model.User;
import io.github.douglaasph.agroslot.repository.UserRepository;

@Service
// a classe normaliza o email, verifica se já existe um user com o mesmo email e caso não exista ele cria, aplica o password encoder na senha,
//salva no banco e retorna os dados publicos de cadastro

public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    //método de registro do user
    public RegisterResponse register(RegisterRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        // Verifica se o user já está cadastrado
        if (userRepository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Um usuario com esse email já foi cadastrado."
            );
        }

        // Cria o user
        User user = new User();
        user.setNome(request.getNome());
        user.setEmail(email);

        // Criptografa a senha antes de salvar
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // Salva o user no banco de dados
        User savedUser = userRepository.save(user);

        // Retorna os dados públicos do user
        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getNome(),
                savedUser.getEmail()
        );
    }

        //método d elogin do user
        public LoginResponse login(LoginRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        // Busca o user pelo email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "E-mail ou senha inválidos."
                ));

        // Confere a senha informada 
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
                throw new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "E-mail ou senha inválidos."
                );
        }

        // Gera o token após validar as credenciais
        String token = jwtService.generateToken(user.getEmail());

        //retorna o token e o tipo (bearear")
        return new LoginResponse(token, "Bearer");
        }

        //método para rec a senha do user
        public ForgotPasswordResponse forgotPassword(
                ForgotPasswordRequest request
        ) {
        String email = request.getEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        // Verifica se o usuer existe pra poder enviar o email
        userRepository.findByEmail(email).ifPresent(user -> {
                //a ser implementado (em breve)
        });

        // A resposta é igual para emails cdastrados ou não
        return new ForgotPasswordResponse(
                "Se o e-mail estiver cadastrado, você receberá as instruções para recuperar sua senha"
        );
        }

}
