package claudiopostiglione.reelconnect.payload;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.TipoRiconoscimentoAttore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record RiconoscimentoAttoreDTO(
        UUID id,
//        @NotBlank(message = "Il nome del riconoscimento è obbligatorio")
        String nome,
//        @NotNull(message = "L'anno non può essere nullo")
        int anno,
//        @NotNull(message = "Il tipo di riconoscimento dell'attore non può essere nullo")
        TipoRiconoscimentoAttore tipoRiconoscimento
) {
}
