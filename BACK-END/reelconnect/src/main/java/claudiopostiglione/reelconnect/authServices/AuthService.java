package claudiopostiglione.reelconnect.authServices;

import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.BadRequestException;
import claudiopostiglione.reelconnect.exceptions.UnauthorizedException;
import claudiopostiglione.reelconnect.payload.LoginDTO;

import claudiopostiglione.reelconnect.payload.PasswordDTO;
import claudiopostiglione.reelconnect.repositories.UtenteRepository;
import claudiopostiglione.reelconnect.security.JWTTools;
import claudiopostiglione.reelconnect.services.UtenteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private UtenteService utenteService;

    @Autowired
    private UtenteRepository utenteRepository;

    @Autowired
    private JWTTools jwtTools;

    @Autowired
    private PasswordEncoder bCrypt;


    public String checkAndCreateToken(LoginDTO bodyLogin) {
        //Controllo delle credenziali di accesso
        Utente utentefound = this.utenteService.getUtenteByEmailOrUsername(bodyLogin.usernameEmail());

        //Controllo della password usando bCrypt essendo che nel DB sono codificate
        if (bCrypt.matches(bodyLogin.password(), utentefound.getPassword())) {
            return this.jwtTools.createToken(utentefound);
        } else {
            throw new UnauthorizedException("Credenziali non valide!");
        }
    }

    //Metodo per la modifica della password
    public String changePassword(PasswordDTO bodyPassword, String email) {

        // Viene chiesto all'utente di inserire la propria email per verificare che esso è nel DB
        Utente utenteFound = this.utenteService.getUtenteByEmail(email);

        // Viene chiesto all'utente di inserire la vecchia password e assicurarsi che sia quella nel DB
        String oldPassword = bodyPassword.oldPassword();
        if (!bCrypt.matches(oldPassword, utenteFound.getPassword()))
            throw new BadRequestException("La password inserita non corrisponde a quella vecchia");

        // Viene chiesto di inserire la nuova password e assicurarsi che non si uguale a quella vecchia
        String newPassword = bodyPassword.newPassword();
        if (newPassword.equals(oldPassword))
            throw new BadRequestException("La nuova password che hai inserito è uguale a quella vecchia, creane un altra");

        // Se i controlli sono passati c'è la riassegnazione della password
        utenteFound.setPassword(bCrypt.encode(newPassword));
        this.utenteRepository.save(utenteFound);
        log.info("La password è stata modificata correttamente");

        return "La password è stata cambiata";
    }


}
