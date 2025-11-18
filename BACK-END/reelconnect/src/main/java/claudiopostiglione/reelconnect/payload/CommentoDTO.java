package claudiopostiglione.reelconnect.payload;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record CommentoDTO(
        @NotBlank(message = "La descrizione è obbligatoria")
        String descrizione,
        UUID postId,
        @NotNull(message = "L'ID dell'utente non può essere nullo")
        UUID utenteId
) {
}
