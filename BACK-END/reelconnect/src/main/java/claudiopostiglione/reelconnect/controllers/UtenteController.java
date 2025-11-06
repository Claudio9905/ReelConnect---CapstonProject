package claudiopostiglione.reelconnect.controllers;

import claudiopostiglione.reelconnect.entities.utente.Utente;
import claudiopostiglione.reelconnect.exceptions.ValidationException;
import claudiopostiglione.reelconnect.payload.UtenteDTO;
import claudiopostiglione.reelconnect.services.UtenteService;
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
@RequestMapping("/utenti")
public class UtenteController {

    @Autowired
    private UtenteService utenteService;

    // Qui verranno posizionati gli endpoint /me per l'utente corrente
    // GET per il mio profilo
    @GetMapping("/me")
    public Utente getMyProfile(@AuthenticationPrincipal Utente currentUtente) {
        return currentUtente;
    }

    //PUT per modifiche al mio profilo
    @PutMapping("/me")
    public Utente getMyProfileAndUpdate(@AuthenticationPrincipal Utente currentUtente, @RequestBody @Validated UtenteDTO bodyUtente, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.utenteService.getUtenteByIdAndUpdate(currentUtente.getId(), bodyUtente);
    }

    //DELETE per eliminare il proprio profilo
    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void getMyProfileAndDelete(@AuthenticationPrincipal Utente currentUtente) {
        this.utenteService.getUtenteByIdAndDelete(currentUtente.getId());
    }

    //Qui verranno posizionati gli endpoint per la parte degli utenti

    // 1. GET per tutti gli utenti
    @GetMapping
    @ResponseStatus(HttpStatus.FOUND)
    @PreAuthorize(("hasAnyAuthority('ADMIN', 'USER')"))
    public Page<Utente> findAllUtenti(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return this.utenteService.getAllUtenteWithPagination(page, size, sortBy);
    }

    // 2. POST per la creazione di un utente
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize(("hasAuthority('ADMIN')"))
    public Utente createUtente(@RequestBody @Validated UtenteDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }

        return this.utenteService.saveUtente(body);
    }

    // 3. GET del singolo utente
    @GetMapping("/{idUtente}")
    @ResponseStatus(HttpStatus.FOUND)
    @PreAuthorize(("hasAnyAuthority('ADMIN', 'USER')"))
    public Utente findUtenteById(@PathVariable UUID idUtente) {
        return this.utenteService.getUtenteById(idUtente);
    }

    // 4. PUT per la modifica dell'utente
    @PutMapping("/{idUtente}")
    @PreAuthorize(("hasAuthority('ADMIN')"))
    public Utente findUtenteByIdAndUpdate(@PathVariable UUID idUtente, @RequestBody @Validated UtenteDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.utenteService.getUtenteByIdAndUpdate(idUtente, body);
    }

    // 5. DELETE per la cancellazione di un utente
    @DeleteMapping("/{idUtente}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize(("hasAuthority('ADMIN')"))
    public void findUtenteByIdAndDelete(@PathVariable UUID idUtente) {
        this.utenteService.getUtenteByIdAndDelete(idUtente);
    }

}
