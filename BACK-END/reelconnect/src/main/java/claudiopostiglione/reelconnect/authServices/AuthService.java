package claudiopostiglione.reelconnect.authServices;

import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.UnauthorizedException;
import claudiopostiglione.reelconnect.payload.LoginDTO;

import claudiopostiglione.reelconnect.repositories.UtenteRepository;
import claudiopostiglione.reelconnect.security.JWTTools;
import claudiopostiglione.reelconnect.services.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UtenteService utenteService;

    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private PasswordEncoder bCrypt;

    public String checkAndCreateToken(LoginDTO bodyLogin){
        //Controllo delle credenziali di accesso
        Utente utentefound = this.utenteService.getUtenteByEmailOrUsername(bodyLogin.usernameEmail(), bodyLogin.usernameEmail());

        //Controllo della password usando bCrypt essendo che nel DB sono codificate
        if(bCrypt.matches(bodyLogin.password(), utentefound.getPassword())){
            return this.jwtTools.createToken(utentefound);
        } else {
            throw new UnauthorizedException("Credenziali non valide!");
        }
    }


}
