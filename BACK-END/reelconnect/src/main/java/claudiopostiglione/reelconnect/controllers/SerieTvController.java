package claudiopostiglione.reelconnect.controllers;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.Film;
import claudiopostiglione.reelconnect.entities.catalogoTvFilm.SerieTv;
import claudiopostiglione.reelconnect.exceptions.ValidationException;
import claudiopostiglione.reelconnect.payload.FilmDTO;
import claudiopostiglione.reelconnect.payload.SerieTvDTO;
import claudiopostiglione.reelconnect.services.SerieTvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/serieTv")
public class SerieTvController {
    @Autowired
    private SerieTvService serieTvService;

    //    1. GET su tutte le serie TV
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Page<SerieTv> getAllSerieTv(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "10") int size,
                                       @RequestParam(defaultValue = "id") String sortBy) {
        return this.serieTvService.findAllSerieTvWithPagination(page, size, sortBy);
    }

    //    2. POST per la creazione di una serie TV
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SerieTv createANewSerieTv(@RequestBody @Validated SerieTvDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.serieTvService.createSerieTv(body);
    }

    //    3. GET su una singola serie TV tramite ID
    @GetMapping("/{serieTvId}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public SerieTv getSerieTvById(@PathVariable UUID serieTvId) {
        return this.serieTvService.findSerieTvById(serieTvId);
    }

    //    4. GET su una singola serie Tv tramite titolo
    @GetMapping("/{titolo}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public SerieTv getSerieTvByTitolo(@PathVariable String titolo) {
        return this.serieTvService.findSerieTvByTitolo(titolo);
    }

    //    5. PUT per la modifica della serie TV tramite ID
    @PutMapping("/{serieTvId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public SerieTv getSerieTvByIdAndUpdate(@PathVariable UUID serieTvId, @RequestBody @Validated SerieTvDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.serieTvService.findSerieTvByIdAndUpdate(serieTvId, body);
    }

    //    6. DELETE della serie TV tramite ID
    @DeleteMapping("/{serieTvId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void getSerieTvByIdAndDelete(@PathVariable UUID serieTvId) {
        this.serieTvService.findSerieTvByIdAndDelete(serieTvId);
    }
}
