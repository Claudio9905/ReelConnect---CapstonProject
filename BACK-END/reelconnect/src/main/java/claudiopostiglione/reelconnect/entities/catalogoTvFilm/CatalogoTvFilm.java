package claudiopostiglione.reelconnect.entities.catalogoTvFilm;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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
    protected UUID id;
    @Column(name = "titolo")
    protected String titolo;
    @Column(name = "descrizione")
    protected String descrizione;
    @Column(name = "anno_di_uscita")
    protected LocalDate annoDiUscita;
    @Column(name = "genere")
    protected GenereFilmSerieTv genere;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "partecipazione",
            joinColumns = @JoinColumn(name = "catalogo"),
            inverseJoinColumns = @JoinColumn(name = "attore"))
    private List<Attore> cast = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "regista")
    private Regista regista;

    //Costruttori
    public CatalogoTvFilm(String titolo, String descrizione, LocalDate annoDiUscita, GenereFilmSerieTv genere, List<Attore> cast, Regista regista) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.annoDiUscita = annoDiUscita;
        this.genere = genere;
        this.cast = cast;
        this.regista = regista;
    }

    //Metodi
    @Override
    public String toString() {
        return "|-- Catalogo Tv/Film " + "\n" +
                " ID: " + id + "\n" +
                " Titolo: " + titolo + "\n" +
                " Descrizione: " + descrizione + "\n" +
                " Anno di uscita: " + annoDiUscita + "\n" +
                " Genere: " + genere + "\n" +
                " --|";
    }
}
