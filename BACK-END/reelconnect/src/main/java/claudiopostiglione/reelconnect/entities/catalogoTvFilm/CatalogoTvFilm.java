package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "catalogo-TV/FILM")
@NoArgsConstructor
@Getter
@Setter
public abstract class CatalogoTvFilm {

    //Attributi
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "titolo")
    private String titolo;
    @Column(name = "descrizione")
    private String descrizione;
    @Column(name = "anno_di_uscita")
    private LocalDate annoDiUscita;
    @Column(name = "durata")
    private int durata;
    @Column(name = "genere")
    private GenereFilmSerieTv genere;


    //Costurttori
    public CatalogoTvFilm(String titolo, String descrizione, LocalDate annoDiUscita, int durata, GenereFilmSerieTv genere) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.annoDiUscita = annoDiUscita;
        this.durata = durata;
        this.genere = genere;
    }

    //Metodi
    @Override
    public String toString() {
        return "|-- Catalogo Tv/Film " + "\n" +
                " ID: " + id + "\n" +
                " Titolo: " + titolo + "\n" +
                " Descrizione: " + descrizione + "\n" +
                " Anno di uscita: " + annoDiUscita + "\n" +
                " Durata film: " + durata + "\n" +
                " Genere: " + genere + "\n" +
                " --|";
    }
}
