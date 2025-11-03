package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "film")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Film extends CatalogoTvFilm{

    //Attributi
    @OneToMany(mappedBy = "film")
    private List<RiconoscimentoFilm> listaRiconoscimenti = new ArrayList<>();

    //Costruttori
    public Film(String titolo, String descrizione, LocalDate annoDiUscita, int durata, GenereFilmSerieTv genere, List<RiconoscimentoFilm> listaRiconoscimenti) {
        super(titolo, descrizione, annoDiUscita, durata, genere);
        this.listaRiconoscimenti = listaRiconoscimenti;
    }
}
