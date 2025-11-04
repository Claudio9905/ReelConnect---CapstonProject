package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.BadRequestException;
import claudiopostiglione.reelconnect.exceptions.UserNotFoundException;
import claudiopostiglione.reelconnect.payload.UtenteDTO;
import claudiopostiglione.reelconnect.repositories.UtenteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UtenteService {

    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private PasswordEncoder bCrypt;

    // Verrà inserita la logica di business dove gestirà le operazioni CRUD con il DB e i metodi che verranno chiamati nel controller

    // 1. Salvataggio dell'Utente

    public Utente createUtente(UtenteDTO bodyUtente) {
        //Verifica della presenza di un utente già con l'email inserita nel payload
        this.utenteRepository.findByEmail(bodyUtente.email()).ifPresent(utente -> {
            throw new BadRequestException("L'email " + utente.getEmail() + " esiste già. Inserire un'email diversa");
        });

        Utente newUtente = new Utente(bodyUtente.nome(), bodyUtente.cognome(), bodyUtente.username(), bodyUtente.eta(), bodyUtente.dataDiNascita(), bodyUtente.sesso(), bodyUtente.email(), bCrypt.encode(bodyUtente.password()));
        newUtente.setAvatarUrl("https://ui-avatars.com/api/?name=" + bodyUtente.nome() + "+" + bodyUtente.cognome());


        Utente utenteSaved = this.utenteRepository.save(newUtente);
        log.info("L'utente " + utenteSaved.getNome() + " " + utenteSaved.getCognome() + " con username: " + utenteSaved.getUsername() + " è stato salvato correttamente");

        return utenteSaved;

    }


    public Utente getUtenteByEmailOrUsername(String email, String username) {
        return this.utenteRepository.findByEmailOrUsername(email, username).orElseThrow(() -> new UserNotFoundException("L'utente non è stato trovato"));
    }
}
