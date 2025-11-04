package claudiopostiglione.reelconnect.exceptions;

import claudiopostiglione.reelconnect.entities.Utente;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Utente utente) {
        super("| L'utente " + utente. + " con ID");
    }
}
