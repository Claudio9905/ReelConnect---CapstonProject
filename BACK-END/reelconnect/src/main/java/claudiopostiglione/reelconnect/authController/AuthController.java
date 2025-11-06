package claudiopostiglione.reelconnect.authController;


import claudiopostiglione.reelconnect.authServices.AuthService;
import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.ValidationException;
import claudiopostiglione.reelconnect.payload.LoginDTO;
import claudiopostiglione.reelconnect.payload.LoginResponseDTO;
import claudiopostiglione.reelconnect.payload.UtenteDTO;
import claudiopostiglione.reelconnect.services.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authProfile")
public class AuthController {

    @Autowired
    private UtenteService utenteService;
    @Autowired
    private AuthService authService;


//    Ci saranno due endpoint, uno per il login, l'altro per la registrazione

//    1. Endpoint per login
    @PostMapping("/loginProfile")
    public LoginResponseDTO login(@RequestBody LoginDTO body){
        return new LoginResponseDTO(this.authService.checkAndCreateToken(body));
    }

//    2. Endpoint per la registrazione
    @PostMapping("/registerProfile")
    @ResponseStatus(HttpStatus.CREATED)
    public Utente register(@RequestBody @Validated UtenteDTO body, BindingResult validationResult){
        if(validationResult.hasErrors()){
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.utenteService.saveUtente(body);
    }
}
