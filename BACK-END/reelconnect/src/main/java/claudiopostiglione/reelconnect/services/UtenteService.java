package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.BadRequestException;
import claudiopostiglione.reelconnect.exceptions.IdUserNotFoundException;
import claudiopostiglione.reelconnect.exceptions.UserNotFoundException;
import claudiopostiglione.reelconnect.payload.UtenteDTO;
import claudiopostiglione.reelconnect.repositories.UtenteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class UtenteService {

    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private PasswordEncoder bCrypt;

    // Verrà inserita la logica di business dove gestirà le operazioni CRUD con il DB e i metodi che verranno chiamati nel controller

    // 1. Salvataggio dell'Utente

    public Utente saveUtente(UtenteDTO bodyUtente) {
        //Verifica della presenza di un utente già con l'email inserita nel payload
        this.utenteRepository.findByEmail(bodyUtente.email()).ifPresent(utente -> {
            throw new BadRequestException("L'email " + utente.getEmail() + " esiste già. Inserire un'email diversa");
        });
        this.utenteRepository.findByUsername(bodyUtente.username()).ifPresent(utente -> {
            throw new BadRequestException("L'utente con username " + utente.getUsername() + " esiste già, inserire uno username diverso");
        });

        Utente newUtente = new Utente(bodyUtente.nome(), bodyUtente.cognome(), bodyUtente.username(), bodyUtente.eta(), bodyUtente.dataDiNascita(), bodyUtente.sesso(), bodyUtente.email(), bCrypt.encode(bodyUtente.password()));
        newUtente.setAvatarUrl("https://ui-avatars.com/api/?name=" + bodyUtente.nome() + "+" + bodyUtente.cognome());


        Utente utenteSaved = this.utenteRepository.save(newUtente);
        log.info("L'utente " + utenteSaved.getNome() + " " + utenteSaved.getCognome() + " con username: " + utenteSaved.getUsername() + " è stato salvato correttamente");

        return utenteSaved;

    }

    // 2. Ricerca di tutti gli utenti
    public Page<Utente> getAllUtenteWithPagination(int numPage, int pageSize, String sortBY) {
        if (pageSize > 30) pageSize = 30;
        Pageable pageable = PageRequest.of(numPage, pageSize, Sort.by(sortBY).ascending());
        return this.utenteRepository.findAll(pageable);
    }

    // 3. Ricerca dell'utente tramite ID
    public Utente getUtenteById(UUID idUtente) {
        return this.utenteRepository.findById(idUtente).orElseThrow(() -> new IdUserNotFoundException(idUtente));
    }

    // 4. Modifica dell'utente tramite ID
    public Utente getUtenteByIdAndUpdate(UUID idUtente, UtenteDTO bodyUtente) {
        Utente utenteFound = this.getUtenteById(idUtente);

        if (!utenteFound.getEmail().equals(bodyUtente.email())) {
            this.utenteRepository.findByEmail(bodyUtente.email()).ifPresent(utente ->
            {
                throw new BadRequestException("L'email " + utente.getEmail() + " è già usata");
            });
        }

        if (!utenteFound.getUsername().equals(bodyUtente.username())) {
            this.utenteRepository.findByUsername(bodyUtente.username()).ifPresent(utente -> {
                throw new BadRequestException("Lo username " + utente.getUsername() + " è già usato, riprova con un altro");
            });
        }

        utenteFound.setNome(bodyUtente.nome());
        utenteFound.setCognome(bodyUtente.cognome());
        utenteFound.setEta(bodyUtente.eta());
        utenteFound.setEmail(bodyUtente.email());
        utenteFound.setSesso(bodyUtente.sesso());
        utenteFound.setUsername(bodyUtente.username());
        utenteFound.setDataDiNascita(bodyUtente.dataDiNascita());

        Utente utenteUpdate = this.utenteRepository.save(utenteFound);

        log.info("L'utente " + utenteUpdate.getNome() + " " + utenteUpdate.getCognome() + " con ID: " + utenteUpdate.getId() + " è username: " + utenteUpdate.getUsername() + " è stato modifcato correttamente");

        return utenteUpdate;
    }

    // 5. Eliminazione dell'utente tramite ID
    public void getUtenteByIdAndDelete(UUID idUtente) {
        Utente utenteFound = this.getUtenteById(idUtente);
        this.utenteRepository.delete(utenteFound);
    }

    public Utente getUtenteByEmailOrUsername(String email, String username) {
        return this.utenteRepository.findByEmailOrUsername(email, username).orElseThrow(() -> new UserNotFoundException("L'utente non è stato trovato"));
    }

    public Utente getUtenteByUsername(String username) {
        return this.utenteRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("L'utente con username " + username + " non è stato trovato"));
    }
}
