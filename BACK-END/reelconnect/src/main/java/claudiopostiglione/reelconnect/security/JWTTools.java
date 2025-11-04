package claudiopostiglione.reelconnect.security;

import claudiopostiglione.reelconnect.entities.utente.Utente;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

// Classe gestita da Spring tramite l'annotazione "@Component" che conterrà
// i metodi per la creazione, verifica del TOKEN ed estrazione dell'ID da essa
@Component
public class JWTTools {

    @Value("${jwt.secret}")
    private String jwtSecret;


    //    1. Creazione del token
    public String createToken(Utente utente) {
        return Jwts.builder()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .subject(String.valueOf(utente.getId())) // Si passerà l'oggetto interessato da cui appunto assegnare il token. Verrà fatto in un altra branch
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
                .compact();
    }

    //    2. Validazione del token
    public void verifyToken(String accessToken){
        Jwts.parser().verifyWith(Keys.hmacShaKeyFor(jwtSecret.getBytes())).build().parse(accessToken);
    }

    //    3. Estrazione dell'ID dal token

    public UUID extractIDFromToken(String accessToken){
        return UUID.fromString(Jwts.parser().verifyWith(Keys.hmacShaKeyFor(jwtSecret.getBytes())).build().parseSignedClaims(accessToken).getPayload().getSubject());
    }

}
