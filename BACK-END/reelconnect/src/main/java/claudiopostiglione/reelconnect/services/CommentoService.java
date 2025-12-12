package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.entities.utente.Commento;
import claudiopostiglione.reelconnect.entities.utente.Post;
import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.AccessDeniedException;
import claudiopostiglione.reelconnect.exceptions.BadRequestException;
import claudiopostiglione.reelconnect.payload.CommentoDTO;
import claudiopostiglione.reelconnect.repositories.CommentoRepository;
import claudiopostiglione.reelconnect.repositories.PostRepository;
import claudiopostiglione.reelconnect.repositories.UtenteRepository;
import com.cloudinary.Cloudinary;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class CommentoService {

    @Autowired
    private CommentoRepository commentoRepository;
    @Autowired
    private UtenteService utenteService;
    @Autowired
    private PostRepository postRepository;
//    @Autowired
//    private Cloudinary imageUploader;

    //    1. Creazione del commento
    public Commento createCommento(CommentoDTO bodyCommento) {

        Utente utenteFound = this.utenteService.getUtenteById(bodyCommento.utenteId());
        Post postFound = this.postRepository.findById(bodyCommento.postId()).orElseThrow(() -> new BadRequestException("Il post non è stato trovato"));

        Commento newCommento = new Commento(bodyCommento.descrizione(), postFound, utenteFound);

        Commento commentoSaved = this.commentoRepository.save(newCommento);
        postFound.getListaCommenti().add(commentoSaved);
//        postFound.setNumCommenti(postFound.getListaCommenti().size());

        log.info("Il commento con id " + commentoSaved.getId() + " è stato salvato correttamente");
        return commentoSaved;
    }

    //    2. Ricerca di tutti i commenti
    public Page<Commento> findAllCommenti(int numPage, int sizePage, String sortBy) {
        if (sizePage > 20) sizePage = 20;
        sortBy = "dataCreazionePost";
        Pageable pageable = PageRequest.of(numPage, sizePage, Sort.by(sortBy));
        return this.commentoRepository.findAll(pageable);
    }

//    3. Ricerca di tutti i commenti relativi ad un post
    public Page<Commento> findAllCommentiByPost(UUID postId, int numPage, int sizePage, String sortBy){
        if(sizePage > 20) sizePage =20;
        sortBy ="dataCreazioneCommento";
        Pageable pageable = PageRequest.of(numPage, sizePage, Sort.by(sortBy).descending());
        return this.commentoRepository.findByPostId(postId,pageable);
    }

    //    4. Modifica di un commento
    public Commento getCommentoAndUpdate(UUID commentoId, CommentoDTO bodyCommentoUpdate) {
        Commento commentoFound = this.commentoRepository.findById(commentoId).orElseThrow(() -> new BadRequestException("Commento non trovato"));

        commentoFound.setDescrizione(bodyCommentoUpdate.descrizione());

        Commento commentoUpdated = this.commentoRepository.save(commentoFound);
        log.info("il commento con ID: " + commentoUpdated.getId() + " è stato modificato correttamente");
        return commentoUpdated;
    }

    //    5. Cancellazione del commento
    public void findCommentoByIdAndDelete(UUID commentoId) {
        Commento commentoFound = this.commentoRepository.findById(commentoId).orElseThrow(() -> new BadRequestException("Commento non trovato"));
        this.commentoRepository.delete(commentoFound);
    }

//    Metodi per gestire i prorpi commenti

    //    Metodo per verificare l'apparteneza al commento
    private Commento verifyCommento(UUID utenteId, UUID commentoId) {
        Commento commentoVerified = this.commentoRepository.findById(commentoId).orElseThrow(() -> new BadRequestException("Il commento non è stato trovato"));
        if (!commentoVerified.getUtente().getId().equals(utenteId))
            throw new AccessDeniedException("Non hai l'autorizzazione a modificare questo commento");
        return commentoVerified;
    }

//    Modifica del proprio commento
    public Commento updateMyCommento(UUID utenteId, UUID commentoId, CommentoDTO bodyCommentoUpdate){
        Commento commentoFound = verifyCommento(utenteId, commentoId);
        commentoFound.setDescrizione(bodyCommentoUpdate.descrizione());
        Commento commentoUpdated = this.commentoRepository.save(commentoFound);
        log.info("il commento con ID: " + commentoUpdated.getId() + " è stato modificato correttamente");
        return commentoUpdated;
    }

//    Cancellazione del proprio commento
    public void deleteMyCommento(UUID utenteId, UUID commentoId){
        Commento commentoFound = verifyCommento(utenteId, commentoId);
        this.commentoRepository.delete(commentoFound);
    }
}
