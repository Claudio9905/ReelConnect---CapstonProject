package claudiopostiglione.reelconnect.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record AttoreDTO(
        UUID id,
        @NotBlank(message = "Il nome dell'attore è obbligatorio")
        @Size(min = 2, max = 20, message = "Il nome dell'attore deve avere un minimo di 2 caratteri e un massimo di 20")
        String nome,
        @NotBlank(message = "Il cognome dell'attore è obbligatorio")
        @Size(min = 2, max = 20, message = "Il cognome dell'attore deve avere un minimo di 2 caratteri e un massimo di 20")
        String cognome,
        @NotNull(message = "L'età dell'attore non può essere nulla")
        int eta,
        @NotNull(message = "La data di nascita dell'attore non può essere nulla")
        LocalDate dataDiNascita,
        List<RiconoscimentoAttoreDTO> listaRiconoscimenti
) {
}
