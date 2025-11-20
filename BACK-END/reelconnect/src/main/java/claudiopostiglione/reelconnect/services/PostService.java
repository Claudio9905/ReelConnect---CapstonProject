package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.entities.utente.Post;
import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.AccessDeniedException;
import claudiopostiglione.reelconnect.exceptions.BadRequestException;
import claudiopostiglione.reelconnect.payload.PostDTO;
import claudiopostiglione.reelconnect.repositories.PostRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UtenteService utenteService;
    @Autowired
    private Cloudinary imageUploader;

    private static final long MAX_SIZE = 5 * 1024 * 1024; //5MB
    private static final List<String> ALLOWED_FORMAT = List.of("image/jpeg", "image/png", "image/gif");


    //    1. Creazione del post
    public Post createPost(PostDTO bodyPost) {
        Utente utenteFound = this.utenteService.getUtenteById(bodyPost.utenteId());

        Post newPost = new Post(bodyPost.descrizione(), utenteFound);
        Post postSaved = this.postRepository.save(newPost);
        log.info("Il post con ID: " + postSaved.getId() + " è stato salvato correttamente");
        return postSaved;

    }

    //   2. Ricerca di tutti i post
    public Page<Post> findAllPost(int numPage, int sizePage, String sortBy) {
        if (sizePage > 20) sizePage = 20;
        sortBy = "dataCreazionePost";
        Pageable pageable = PageRequest.of(numPage, sizePage, Sort.by(sortBy));
        return this.postRepository.findAll(pageable);
    }

    //       3. Ricerca del singolo post
    public Post findPostById(UUID postId) {
        return this.postRepository.findById(postId).orElseThrow(() -> new BadRequestException("Il post non è stato trovato"));
    }

    //    4. Modifica del post
    public Post getPostAndUpdate(UUID postId, PostDTO bodyPost) {
        Post postFound = this.findPostById(postId);

        postFound.setDescrizione(bodyPost.descrizione());
        Post postUpdated = this.postRepository.save(postFound);
        log.info("il post con ID: " + postUpdated.getId() + " è stato modificato correttamente");
        return postUpdated;
    }

    //    5. Eliminazione del post
    public void findPostByIdAndDelete(UUID postId) {
        Post postFound = this.findPostById(postId);
        this.postRepository.delete(postFound);
    }

    //    6. Aggiunta di un immagine tramite file

    //    7. Modifica dell'attributo numPost ( cioè MyCiak sui post ricevuti dagli utenti)
    public Post getPostByIdAndIncrementNumCiak(UUID postId) {
        Post postFound = this.findPostById(postId);
        postFound.setNumCiak(+1);
        Post postUpdateCiak = this.postRepository.save(postFound);
        log.info("Il numero di ciak del post con ID: " + postUpdateCiak.getId() + " è stato modificato correttamente");
        return postUpdateCiak;
    }

    //    8. Decremento del numero di ciak
    public Post getPostByIdAndDecrementNumCiak(UUID postId) {
        Post postFound = this.findPostById(postId);
        postFound.setNumCiak(-1);
        Post postUpdateCiak = this.postRepository.save(postFound);
        log.info("Il numero di ciak del post con ID: " + postUpdateCiak.getId() + " è stato modificato correttamente");
        return postUpdateCiak;
    }

//    Metodi per il proprio profilo

//    Metodo privato per verificare l'appartenenza del post all'utente

    private Post verifyPost(UUID utenteId, UUID postId) {
        Post post = this.findPostById(postId);
        if (!post.getUtente().getId().equals(postId))
            throw new AccessDeniedException("Non hai i permessi per modificare questo post");
        return post;
    }

    //    9. Ricerca di tutti i propri post
    public Page<Post> findAllPostByUtente(UUID utenteId, int numPage, int sizePage, String sortBy) {
        if (sizePage > 20) sizePage = 20;
        sortBy = "dataCreazionePost";
        Pageable pageable = PageRequest.of(numPage, sizePage, Sort.by(sortBy).descending());
        return this.postRepository.findByUtenteId(utenteId, pageable);
    }

    //    10. Modifica del proprio post
    public Post updateMyPost(UUID utenteId, UUID postId, PostDTO bodyUpdate) {
        Post postFound = verifyPost(utenteId, postId);
        postFound.setDescrizione(bodyUpdate.descrizione());
        Post postSaved = this.postRepository.save(postFound);
        log.info("Il post con ID: " + postSaved.getId() + " è stato modificato");
        return postSaved;
    }

    //    11. Modifica dell'immagine Url all'interno del post
    public Post uploadImagePost(MultipartFile file, UUID utenteId, UUID postId) {
        if (file.getSize() > MAX_SIZE)
            throw new BadRequestException("Il file super la dimensione di 5MB, caricare un file di dimensione minore");
        if (!ALLOWED_FORMAT.contains(file.getContentType()))
            throw new BadRequestException("Attenzione, il file non corrisponde ai vari formati ( .jpeg / .png / .gif");

        Post postFound = verifyPost(utenteId, postId);

        try {
            //Catturo l'URL dell'immagine datomi da CLoudinary
            Map result = imageUploader.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String imagePostUrl = (String) result.get("url");

            //Salvataggio dell'immagine catturata
            postFound.setImageUrl(imagePostUrl);
            this.postRepository.save(postFound);
            return postFound;
        } catch (Exception ex) {
            throw new BadRequestException("Errore nel caricamento dell'immagine");
        }

    }

    //    12. Eliminare il proprio post
    public void deleteMyPost(UUID utenteId, UUID postId) {
        Post postFound = verifyPost(utenteId, postId);
        this.postRepository.delete(postFound);
    }
}
