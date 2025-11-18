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
import org.springframework.web.multipart.MultipartFile;

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

    //PATCH per modificare la propria immagine profilo
    @PatchMapping("/me/avatarUrl")
    public Utente uploadAvatarProfile(@AuthenticationPrincipal Utente currentUtente, @RequestParam("avatarUrl") MultipartFile file) {
        System.out.println("| Nome del file: " + file.getName());
        System.out.println("| Dimensione del file: " + file.getSize());
        return this.utenteService.uploadImageProfile(file, currentUtente.getId());
    }

    //PATCH per modificare la propria immagine di copertina
    @PatchMapping("/me/bannerUrl")
    public Utente uploadBannerProfile(@AuthenticationPrincipal Utente currentUtente, @RequestParam("bannerUrl") MultipartFile file) {
        System.out.println("| Nome del file: " + file.getName());
        System.out.println("| Dimensione del file: " + file.getSize());
        return this.utenteService.uploadBannerProfile(file, currentUtente.getId());
    }

    //Qui verranno posizionati gli endpoint per la parte degli utenti

    // 1. GET per tutti gli utenti
    @GetMapping
    @ResponseStatus(HttpStatus.FOUND)
    @PreAuthorize(("hasAnyAuthority('ADMIN', 'USER')"))
    public Page<Utente> findAllUtenti(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
        return this.utenteService.getAllUtenteWithPagination(page, size, sortBy);
    }

    // 2. GET del singolo utente tramite ID
    @GetMapping("/{idUtente}")
    @ResponseStatus(HttpStatus.FOUND)
    @PreAuthorize(("hasAuthority('ADMIN')"))
    public Utente findUtenteById(@PathVariable UUID idUtente) {
        return this.utenteService.getUtenteById(idUtente);
    }

    // 3. GET del singolo utente tramite username
    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.FOUND)
    @PreAuthorize(("hasAnyAuthority('ADMIN', 'USER')"))
    public Utente findUtenteByUsername(@PathVariable String username) {
        return this.utenteService.getUtenteByUsername(username);
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
