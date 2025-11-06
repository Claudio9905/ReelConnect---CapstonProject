package claudiopostiglione.reelconnect.payload;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.GenereFilmSerieTv;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public record FilmDTO(
        @NotBlank(message = "Il titolo del film è obbligatorio")
        String titolo,
        @NotBlank(message = "La descrizione del film è obbligatoria")
        String descrizione,
        @NotNull(message = "La data di uscita non può essere nulla")
        LocalDate annoDiUscita,
        @NotNull(message = "La durata del film non può essere nulla")
        int durataFilm,
        @NotNull(message = "Il genere del film non può essere nullo")
        List<GenereFilmSerieTv> genere,
        List<RiconoscimentoFilmDTO> listaFilm,
        @NotNull(message = "Il cast non può essere nullo")
        List<AttoreDTO> listaAttori,
        @NotNull(message = "Il regista non può essere nullo")
        RegistaDTO regista,
        @NotBlank(message = "L'URL dell'immagine di copertina è obbligatoria")
        String coverUrl
) {
}
