package claudiopostiglione.reelconnect.exceptions;

import java.util.UUID;

public class IdUserNotFoundException extends RuntimeException {
    public IdUserNotFoundException(UUID id) {
        super("L'utente con ID " + id + " non è stato trovato");
    }
}
