package claudiopostiglione.reelconnect.payload;


import claudiopostiglione.reelconnect.entities.catalogoTvFilm.TipoRiconoscimentoSerieTv;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record RiconoscimentoSerieTvDTO(
        UUID id,
        @NotBlank(message = "Il nome del riconoscimento è obbligatorio")
        String nome,
        @NotNull(message = "L'anno non può essere nullo")
        int anno,
        @NotNull(message = "Il tipo del riconoscimento non può essere nullo")
        TipoRiconoscimentoSerieTv tipo
) {
}
