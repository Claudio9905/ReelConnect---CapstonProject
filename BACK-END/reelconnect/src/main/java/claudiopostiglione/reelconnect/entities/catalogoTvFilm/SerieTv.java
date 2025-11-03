package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "serieTv")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class SerieTv extends CatalogoTvFilm{

    //Attributi
    @Column(name = "numStagioni")
    private int numStagioni;
    @Column(name = "numEpisodi")
    private int numEpisodi;

    @OneToMany(mappedBy = "serieTv")
    private List<RiconoscimentoSerieTv> listaRiconoscimenti = new ArrayList<>();

    //Costruttori
    public SerieTv(String titolo, String descrizione, LocalDate annoDiUscita, int durata, GenereFilmSerieTv genere, int numStagioni, int numEpisodi, List<RiconoscimentoSerieTv> listaRiconoscimenti) {
        super(titolo, descrizione, annoDiUscita, durata, genere);
        this.numStagioni = numStagioni;
        this.numEpisodi = numEpisodi;
        this.listaRiconoscimenti = listaRiconoscimenti;
    }
}
