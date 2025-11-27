package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.BadRequestException;
import claudiopostiglione.reelconnect.exceptions.IdUserNotFoundException;
import claudiopostiglione.reelconnect.exceptions.UserNotFoundException;
import claudiopostiglione.reelconnect.payload.UtenteDTO;
import claudiopostiglione.reelconnect.payload.UtenteNoPasswordDTO;
import claudiopostiglione.reelconnect.repositories.UtenteRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
public class UtenteService {

    @Autowired
    private UtenteRepository utenteRepository;
    @Autowired
    private PasswordEncoder bCrypt;
    @Autowired
    private Cloudinary imageUploader;

    private static final long MAX_SIZE = 5 * 1024 * 1024; //5MB
    private static final List<String> ALLOWED_FORMAT = List.of("image/jpeg", "image/png");
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
        String imageUrl = "https://ui-avatars.com/api/?name=" + bodyUtente.nome() + "+" + bodyUtente.cognome();
        newUtente.setAvatarUrl(imageUrl);
        newUtente.setBannerUrl(imageUrl);

        Utente utenteSaved = this.utenteRepository.save(newUtente);
        log.info("L'utente " + utenteSaved.getNome() + " " + utenteSaved.getCognome() + " con username: " + utenteSaved.getUsername() + " è stato salvato correttamente");

        return utenteSaved;

    }

    // 2. Ricerca di tutti gli utenti
    public Page<Utente> getAllUtenteWithPagination(int numPage, int pageSize, String sortBY) {
        if (pageSize > 30) pageSize = 30;
        sortBY = "nome";
        Pageable pageable = PageRequest.of(numPage, pageSize, Sort.by(sortBY).ascending());
        return this.utenteRepository.findAll(pageable);
    }

    // 3. Ricerca dell'utente tramite ID
    public Utente getUtenteById(UUID idUtente) {
        return this.utenteRepository.findById(idUtente).orElseThrow(() -> new IdUserNotFoundException(idUtente));
    }

    // 4. Modifica dell'utente tramite ID
    public Utente getUtenteByIdAndUpdate(UUID idUtente, UtenteNoPasswordDTO bodyUtente) {
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

    // 6. Upload dell'immagine profilo
    public Utente uploadImageProfile(MultipartFile file, UUID idUtente) {
        if (file.getSize() > MAX_SIZE) throw new BadRequestException("Attenzione, il file super i 5MB di dimensione");
        if (!ALLOWED_FORMAT.contains(file.getContentType()))
            throw new BadRequestException("Attenzione, il formato deve essere: |.jpeg| - |.png|");

        Utente utenteFound = this.getUtenteById(idUtente);

        try {
            //Catturo l'URL dell'immagine datomi da Cloudinary
            Map result = imageUploader.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String imageUrl = (String) result.get("url");

            //Salvataggio dell'immagine catturata
            utenteFound.setAvatarUrl(imageUrl);
            this.utenteRepository.save(utenteFound);
            return utenteFound;
        } catch (Exception ex) {
            throw new BadRequestException("Errore nel caricamento del file");
        }
    }

    //    7. Upload dell'immagine di copertina
    public Utente uploadBannerProfile(MultipartFile file, UUID idUtente) {
        if (file.getSize() > MAX_SIZE) throw new BadRequestException("Attenzione, il file super i 5MB di dimensione");
        if (!ALLOWED_FORMAT.contains(file.getContentType()))
            throw new BadRequestException("Attenzione, il formato deve essere: |.jpeg| - |.png|");

        Utente utenteFound = this.getUtenteById(idUtente);

        try {
            //Catturo l'URL dell'immagine datomi da Cloudinary
            Map result = imageUploader.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String imageUrl = (String) result.get("url");

            //Salvataggio dell'immagine catturata
            utenteFound.setBannerUrl(imageUrl);
            this.utenteRepository.save(utenteFound);
            return utenteFound;
        } catch (Exception ex) {
            throw new BadRequestException("Errore nel caricamento del file");
        }
    }

    public Utente getUtenteByEmailOrUsername(String emailUsername) {
        return this.utenteRepository.findByEmailOrUsername(emailUsername, emailUsername).orElseThrow(() -> new UserNotFoundException("L'utente non è stato trovato"));
    }

    public Utente getUtenteByUsername(String username) {
        return this.utenteRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("L'utente con username " + username + " non è stato trovato"));
    }

    public Utente getUtenteByEmail(String email) {
        return this.utenteRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("L'utente con e-mail " + email + " non è stato trovato"));
    }
}
