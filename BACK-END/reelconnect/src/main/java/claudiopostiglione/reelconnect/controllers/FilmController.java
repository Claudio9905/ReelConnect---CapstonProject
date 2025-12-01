package claudiopostiglione.reelconnect.controllers;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.Film;
import claudiopostiglione.reelconnect.exceptions.ValidationException;
import claudiopostiglione.reelconnect.payload.FilmDTO;
import claudiopostiglione.reelconnect.services.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/movies")
public class FilmController {

    @Autowired
    private FilmService filmService;

    //    1. GET su tutti i film
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Page<Film> getAllFilms(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size,
                                  @RequestParam(defaultValue = "id") String sortBy) {
        return this.filmService.findAllFilmWithPagination(page, size, sortBy);
    }

    //    2. POST per la creazione di un film
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Film createANewFilm(@RequestBody @Validated FilmDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.filmService.createFilm(body);
    }

    //    3. GET sul singolo film tramite ID
    @GetMapping("/{filmId}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Film getFilmById(@PathVariable UUID filmId) {
        return this.filmService.findFilmById(filmId);
    }

    //    4. GET sul singolo film tramite titolo
    @GetMapping("/{titolo}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Film getFilmByTitolo(@PathVariable String titolo) {
        return this.filmService.findFilmByTitolo(titolo);
    }

    //    5. PUT per la modifica del film tramite ID
    @PutMapping("/{filmId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Film getFilmByIdAndUpdate(@PathVariable UUID filmId, @RequestBody @Validated FilmDTO body, BindingResult validationResult) {
        if (validationResult.hasErrors()) {
            throw new ValidationException(validationResult.getFieldErrors().stream().map(fieldError -> fieldError.getDefaultMessage()).toList());
        }
        return this.filmService.findFilmByIdAndUpdate(filmId, body);
    }

    //    6. DELETE del film tramite ID
    @DeleteMapping("/filmId")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void getFilmByIdAndDelete(@PathVariable UUID filmId) {
        this.filmService.findFilmByIdAndDelete(filmId);
    }

}