package claudiopostiglione.reelconnect.payload;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.GenereFilmSerieTv;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record SerieTvDTO(
        @NotBlank(message = "Il titolo della serie Tv è obbligatorio")
        String titolo,
        @NotBlank(message = "La descrizione della serie Tv è obbligatoria")
        String descrizione,
        @NotNull(message = "La data di uscita non può essere nulla")
        LocalDate annoDiUscita,
        @NotNull(message = "Il numero di stagioni non può essere nullo")
        int numStagioni,
        @NotNull(message = "Il numero di episodi non può essere nullo")
        int numEpisodi,
        @NotNull(message = "La durata media di un episodio non può essere nullo")
        int durataMediaEpisodio,
        @NotBlank(message = "Il genere della serie Tv è obbligatorio")
        List<GenereFilmSerieTv> genere,
        List<RiconoscimentoSerieTvDTO> listaSerieTv,
        @NotNull(message = "Il cast non può essere nullo")
        List<AttoreDTO> listaAttori,
        @NotNull(message = "Il regista non può essere nullo")
        RegistaDTO regista,
        @NotBlank(message = "L'URL dell'immagine di copertina è obbligatoria")
        String coverUrl
) {
}
