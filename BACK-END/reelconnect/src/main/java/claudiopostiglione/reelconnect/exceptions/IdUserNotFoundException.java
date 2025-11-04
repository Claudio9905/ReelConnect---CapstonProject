package claudiopostiglione.reelconnect.exceptions;

import java.util.UUID;

public class IdUserNotFoundException extends RuntimeException {
    public IdUserNotFoundException(UUID id) {
        super("L'ID utente " + id + " non è stato trovato");
    }
}
