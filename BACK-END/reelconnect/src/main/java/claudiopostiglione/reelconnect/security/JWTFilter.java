package claudiopostiglione.reelconnect.security;

import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.services.UtenteService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.UnavailableException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTTools jwtTools;
    @Autowired
    private UtenteService utenteService;

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
        UUID idUtente = jwtTools.extractIDFromToken(accessToken);
        Utente utenteFound = this.utenteService.getUtenteById(idUtente);
//        2. Associazione dell'utente al Security Context
        Authentication authentication = new UsernamePasswordAuthenticationToken(utenteFound, null, utenteFound.getAuthorities());
//        3. Aggiornamento del Security Context associando ad esso l'utente corrente e il suo ruolo
        SecurityContextHolder.getContext().setAuthentication(authentication);
//        ---------------------------------------------------------

        filterChain.doFilter(request,response); // permetterà di continuare al prossimo filtro o direttamente al controller

    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return new AntPathMatcher().match("/authProfile/**", request.getServletPath()); // in questa maniera i seguenti percorsi non verranno toccati dalla Filter Chain
    }
}
