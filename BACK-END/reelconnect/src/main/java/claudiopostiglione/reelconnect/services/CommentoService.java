package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.entities.utente.Commento;
import claudiopostiglione.reelconnect.entities.utente.Post;
import claudiopostiglione.reelconnect.entities.utente.Utente;
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
    public Commento createCommento(CommentoDTO bodyCommento){

        Utente utenteFound = this.utenteService.getUtenteById(bodyCommento.utenteId());
        Post postFound = this.postRepository.findById(bodyCommento.postId()).orElseThrow(() -> new BadRequestException("Il post non è stato trovato"));

        Commento newCommento = new Commento(bodyCommento.descrizione(), postFound, utenteFound);

        Commento commentoSaved = this.commentoRepository.save(newCommento);
        postFound.getListaCommenti().add(commentoSaved);

        log.info("Il commento con id " + commentoSaved.getId() + " è stato salvato correttamente");
        return commentoSaved;
    }

//    2. Ricerca di tutti i commenti
    public Page<Commento> findAllCommenti(int numPage, int sizePage, String sortBy){
        if(sizePage > 20) sizePage = 20;
        sortBy = "dataCreazionePost";
        Pageable pageable = PageRequest.of(numPage, sizePage, Sort.by(sortBy));
        return this.commentoRepository.findAll(pageable);
    }

//    3. Modifica di un commento
    public Commento getCommentoAndUpdate(UUID commentoId, CommentoDTO bodyCommentoUpdate){
        Commento commentoFound = this.commentoRepository.findById(commentoId).orElseThrow(() -> new BadRequestException("Commento non trovato"));

        commentoFound.setDescrizione(bodyCommentoUpdate.descrizione());

        Commento commentoUpdated = this.commentoRepository.save(commentoFound);
        log.info("il commento con ID: " + commentoUpdated.getId() + " è stato modificato correttamente");
        return commentoUpdated;
    }

//    4. Cancellazione del commento
    public void findCommentoByIdAndDelete(UUID commentoId){
        Commento commentoFound = this.commentoRepository.findById(commentoId).orElseThrow(() -> new BadRequestException("Commento non trovato"));
        this.commentoRepository.delete(commentoFound);
    }
}
