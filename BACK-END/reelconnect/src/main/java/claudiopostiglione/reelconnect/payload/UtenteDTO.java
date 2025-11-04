package claudiopostiglione.reelconnect.payload;

import claudiopostiglione.reelconnect.entities.utente.TipoSesso;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record UtenteDTO(
        @NotBlank(message = "Il nome dell'utente è obbligatorio")
        @Size(min = 2, max = 20, message = "Il nome deve avere un minimo di due caratteri e massimo di 20")
        String nome,
        @NotBlank(message = "Il cognome dell'utente è obbligatorio")
        @Size(min = 2, max = 20, message = "Il cognome deve avere un minimo di due caratteri e un massimo di 20")
        String cognome,
        @NotBlank(message = "Lo username dell'utente è obbligatorio")
        @Size(min = 2, max = 20, message = "Lo username dell'utente deve averen un minimo di due caratteri e un massimo di 20")
        String username,
        @NotNull(message = "L'età non può essere nulla")
        @Min(value = 13, message = "L'età minima è di 13 anni")
        int eta,
        @NotNull(message = "La data di nascita non può essere nulla")
        LocalDate dataDiNascita,
        TipoSesso sesso,
        @NotBlank(message = "L'email dell'utente è obbligatoria")
        @Email
        String email,
        @NotBlank(message = "La password dell'utente è obbligatoria")
        String password

) {
}
