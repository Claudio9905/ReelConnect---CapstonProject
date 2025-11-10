package claudiopostiglione.reelconnect.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    //    Andremo a disattivare le congifurazioni di default di Spring Security
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//      1. Disattivazione dell'autenticazione basata sul form di default di Spring Security
        httpSecurity.formLogin(formLogin -> formLogin.disable());
//      2. Disattivazione della protezione CSRF
        httpSecurity.csrf(csrf -> csrf.disable());
//      3. Disattivazione delle sessioni
        httpSecurity.sessionManagement(sessions -> sessions.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

//      Configurazionde i default per il collegamento con la prate FRONT_END del progetto
        httpSecurity.cors(Customizer.withDefaults());
        return httpSecurity.build();
    }

    //  Configurazione CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","PATCH"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // Configurazione per l'uso di BCRYPT per le password
    @Bean
    public PasswordEncoder getBCrypt(){
        return new BCryptPasswordEncoder(12);
    }
}
