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

    public RegisterResponse register(RegisterRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        if (userRepository.findByEmail(email).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Um usuario com esse email já foi cadastrado."
            );
        }

        User user = new User();
        user.setNome(request.getNome());
        user.setEmail(email);

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        User savedUser = userRepository.save(user);

        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getNome(),
                savedUser.getEmail()
        );
    }

        public LoginResponse login(LoginRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "E-mail ou senha inválidos."
                ));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
                throw new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "E-mail ou senha inválidos."
                );
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(token, "Bearer");
        }

        public ForgotPasswordResponse forgotPassword(
                ForgotPasswordRequest request
        ) {
        String email = request.getEmail()
                .trim()
                .toLowerCase(Locale.ROOT);

        userRepository.findByEmail(email).ifPresent(user -> {
        });

        return new ForgotPasswordResponse(
                "Se o e-mail estiver cadastrado, você receberá as instruções para recuperar sua senha"
        );
        }

}
