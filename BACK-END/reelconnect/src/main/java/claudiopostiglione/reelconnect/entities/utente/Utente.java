package claudiopostiglione.reelconnect.entities.utente;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

// Questa entità mi serve per avere un instanza da passare nel metodo della creazione del TOKEN
// Tale entità sara completata in una branch apposita

@Entity
@Table(name = "utente")
@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties({"listaCommenti", "listaPost", "password", "authorities", "enabled", "accountNonLocked", "accountNonExpired", "credentialsNonExpired"})
public class Utente implements UserDetails {

    //Attributi
    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private UUID id;
    @Column(name = "nome")
    private String nome;
    @Column(name = "cognome")
    private String cognome;
    @Column(name = "username")
    private String username;
    @Column(name = "età")
    private int eta;
    @Column(name = "data_di_nascita")
    private LocalDate dataDiNascita;
    @Column(name = "sesso")
    @Enumerated(EnumType.STRING)
    private TipoSesso sesso;
    @Column(name = "e-mail")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "avatar_url")
    private String avatarUrl;
    @Column(name = "banner_url")
    private String bannerUrl;
    @Column(name = "tipoUtente")
    @Enumerated(EnumType.STRING)
    private RuoloUtente role;


    @OneToMany(mappedBy = "utente")
    private List<Commento> listaCommenti = new ArrayList<>();

    @OneToMany(mappedBy = "utente")
    private List<Post> listaPost = new ArrayList<>();

    //Construttori
    public Utente(String nome, String cognome, String username, int eta, LocalDate dataDiNascita, TipoSesso sesso, String email, String password) {
        this.nome = nome;
        this.cognome = cognome;
        this.username = username;
        this.eta = eta;
        this.dataDiNascita = dataDiNascita;
        this.sesso = sesso;
        this.email = email;
        this.password = password;
        this.role = RuoloUtente.USER;
    }


    //Metodi
    @Override
    public String toString() {
        return "|-- Utente " + "\n" +
                " ID: " + id + "\n" +
                " Nome: " + nome + "\n" +
                " Cognome: " + cognome + "\n" +
                " Username: " + username + "\n" +
                " Età: " + eta + "\n" +
                " Sesso: " + sesso + "\n" +
                " Password: " + password + "\n" +
                " Ruolo utente: " + role + "\n" +
                " --|";
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @Override
    public String getUsername() {
        return this.username;
    }
}
