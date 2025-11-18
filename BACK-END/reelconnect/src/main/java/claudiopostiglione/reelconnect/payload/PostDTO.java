package claudiopostiglione.reelconnect.payload;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.UUID;

public record PostDTO(
        @NotBlank(message = "La descrizione è obbligatoria")
        String descrizione,
        UUID utenteId
) {
}
