package claudiopostiglione.reelconnect.payload;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.CatalogoTvFilm;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record RegistaDTO(
        UUID id,
        @NotBlank(message = "Il nome del regista è obbligatorio")
        @Size(min = 2, max = 20, message = "Il nome del regista deve avere un minimo di due caratteri e un massimo di 20")
        String nome,
        @NotBlank(message = "Il cognome del regista è obbligatorio")
        @Size(min = 2, max = 20, message = "Il cognome del regista deve avere un minimo di 2 caratteri e un massimo di 20")
        String cognome,
        @NotNull(message = "L'età del regista non può essere nulla")
        int eta,
        @NotNull(message = "La data di nascita del regista non può essere nulla")
        LocalDate dataDiNascita,
        String immagineProfilo
) {
}
