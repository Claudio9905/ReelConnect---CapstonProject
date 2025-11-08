package claudiopostiglione.reelconnect.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordDTO(
        @NotBlank(message = "La vecchia password è obbligatoria")
        @Size(min = 8, message = "La password ha un minimo di 8 caratteri")
        String oldPassword,
        @NotBlank(message = "La nuova password è obbligatoria")
        @Size(min = 8, message = "La password ha un minimo di 8 caratteri")
        String newPassword
) {
}
