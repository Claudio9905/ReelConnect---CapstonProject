package claudiopostiglione.reelconnect.controllers;

import claudiopostiglione.reelconnect.entities.utente.Post;
import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.ValidationException;
import claudiopostiglione.reelconnect.payload.PostDTO;
import claudiopostiglione.reelconnect.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    //Enpoint "/me"
    //    1. GET di tutti i post del proprio profilo
    @GetMapping("/me")
    @ResponseStatus(HttpStatus.OK)
    public Page<Post> getMyAllPost(@AuthenticationPrincipal Utente currentUtente, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return this.postService.findAllPostByUtente(currentUtente.getId(), page, size, sortBy);
    }


    //     2. PUT per la modifica del proprio post
    @PutMapping("/me/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public Post getMyPostAndUpdate(@AuthenticationPrincipal Utente currentUtente, @RequestBody @Validated PostDTO body, @PathVariable UUID postId, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.postService.updateMyPost(currentUtente.getId(), postId, body);
    }

    //    3. PATCH per l'aggiunta di un immagine
    @PatchMapping("/me/{postId}/imageUrl")
    public Post getMyPostAndUploadImage(@AuthenticationPrincipal Utente currentUtente, @RequestParam("imageURl") MultipartFile file, @PathVariable UUID postId, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.postService.uploadImagePost(file, currentUtente.getId(), postId);
    }

    //     4. DELETE per l'eliminazione del proprio post
    @DeleteMapping("/me/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void getMyPostAndDelete(@AuthenticationPrincipal Utente currentUtente, @PathVariable UUID postId) {
        this.postService.deleteMyPost(currentUtente.getId(), postId);
    }

    //--------------------------------------------------------
    //    1. GET per la ricerca di tutti i post
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize(("hasAnyAuthority('ADMIN','USER')"))
    public Page<Post> getAllPost(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return this.postService.findAllPost(page, size, sortBy);
    }

    //    2. POST per la creazione del post
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post createMyPost(@ModelAttribute @Validated PostDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.postService.createPost(body);
    }

    // 3. DELETE per l'eliminazione di un post
    @DeleteMapping("/{postId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize(("hasAuthority('ADMIN')"))
    public void getPostByIdAndDelete(@PathVariable UUID postId) {
        this.postService.findPostByIdAndDelete(postId);
    }

}
