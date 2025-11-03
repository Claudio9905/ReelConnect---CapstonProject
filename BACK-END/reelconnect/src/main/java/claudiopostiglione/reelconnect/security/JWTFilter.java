package claudiopostiglione.reelconnect.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.UnavailableException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTTools jwtTools;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

//        ------[AUTHENTICATION]------------------------------------
//        1. Verifica della presenza del header authorization
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnavailableException("Inserire il token nell'authorization header e nel giusto formato");
        }

//        2. Verifica della presenza del token
        String accessToken = authHeader.replace("Bearer ", "");
        jwtTools.verifyToken(accessToken);
//        ------[AUTHORIZATION]------------------------------------
//        1. Ricerca dell'utente nel Database
//        2. Associazione dell'utente al Security Context
//        3. Aggiornamento del Security Context associando ad esso l'utente corrente e il suo ruolo
//        ---------------------------------------------------------

        filterChain.doFilter(request,response); // permetterà di continuare al prossimo filtro o direttamente al controller

    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return new AntPathMatcher().match("/auth/**", request.getServletPath()); // in questa maniera i seguenti percorsi non verranno toccati dalla Filter Chain
    }
}
