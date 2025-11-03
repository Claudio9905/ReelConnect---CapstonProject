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

    @OneToMany(mappedBy = "film")
    private List<RiconoscimentoFilm> listaRiconoscimenti = new ArrayList<>();

    //Costruttori
    public Film(String titolo, String descrizione, LocalDate annoDiUscita, int durataFilm, GenereFilmSerieTv genere, List<RiconoscimentoFilm> listaRiconoscimenti) {
        super(titolo, descrizione, annoDiUscita, genere);
        this.durataFilm = durataFilm;
        this.listaRiconoscimenti = listaRiconoscimenti;
    }
}
