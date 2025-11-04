package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import jakarta.persistence.*;
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
    @Column(name = "durataFilm")
    private int durataFilm;

    @OneToMany(mappedBy = "film", cascade = CascadeType.ALL)
    private List<RiconoscimentoFilm> listaRiconoscimenti = new ArrayList<>();

    //Costruttori
    public Film(String titolo, String descrizione, LocalDate annoDiUscita, int durataFilm, List<GenereFilmSerieTv> genere, List<RiconoscimentoFilm> listaRiconoscimenti, List<Attore> attore, Regista regista) {
        super(titolo, descrizione, annoDiUscita, genere, attore, regista);
        this.durataFilm = durataFilm;
        this.listaRiconoscimenti = listaRiconoscimenti;
    }
}
