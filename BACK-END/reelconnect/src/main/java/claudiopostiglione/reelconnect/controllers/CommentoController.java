package claudiopostiglione.reelconnect.controllers;

import claudiopostiglione.reelconnect.entities.utente.Commento;
import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.ValidationException;
import claudiopostiglione.reelconnect.payload.CommentoDTO;
import claudiopostiglione.reelconnect.services.CommentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/commenti")
public class CommentoController {

    @Autowired
    private CommentoService commentoService;

    //    Endpoint "/me"
//    1. PUT per la modifica del proprio commento
    @PutMapping("/{commentoId}")
    public Commento getMyCommentoAndUpdate(@AuthenticationPrincipal Utente currentUtente, @PathVariable UUID commentoId, @RequestBody @Validated CommentoDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.commentoService.updateMyCommento(currentUtente.getId(), commentoId, body);
    }

    //    2. DELETE per la cancellazione del proprio commento
    @DeleteMapping("/{commentoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void getMyCommentoAndDelete(@AuthenticationPrincipal Utente currentUtente, @PathVariable UUID commentoId) {
        this.commentoService.deleteMyCommento(currentUtente.getId(), commentoId);
    }


    //    ----------------------------------------
//    1. GET per la ricerca dei commenti di un relativo post
    @GetMapping("/{postId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Page<Commento> getAllCommentiByPost(@PathVariable UUID postId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return this.commentoService.findAllCommentiByPost(postId, page, size, sortBy);
    }

    //    2. POST per la creazione di un commento
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Commento createANewComment(@RequestBody @Validated CommentoDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.commentoService.createCommento(body);
    }
}
