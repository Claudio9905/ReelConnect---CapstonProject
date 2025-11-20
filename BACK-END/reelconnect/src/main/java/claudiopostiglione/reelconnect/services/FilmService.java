package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.*;
import claudiopostiglione.reelconnect.exceptions.BadRequestException;
import claudiopostiglione.reelconnect.payload.FilmDTO;
import claudiopostiglione.reelconnect.repositories.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class FilmService {
    @Autowired
    private FilmRepository filmRepository;
    @Autowired
    private RiconoscimentoFilmRepository riconoscimentoFilmRepository;
    @Autowired
    private AttoreRepository attoreRepository;
    @Autowired
    private RiconoscimentoAttoreRepository riconoscimentoAttoreRepository;
    @Autowired
    private RegistaRepository registaRepository;

    //    1. Salvataggio del film
    public Film createFilm(FilmDTO body) {
//        Verifica se il film è già presente nel catalogo
        this.filmRepository.findByTitolo(body.titolo()).ifPresent(film -> {
            throw new BadRequestException("Il film " + film.getTitolo() + " è già presente nel catalogo");
        });


        List<RiconoscimentoFilm> riconoscimentoFilmList = body.listaRiconoscimentiFilm().stream().map(riconoscimentoFilmDTO -> {
            if (riconoscimentoFilmDTO.id() != null) {
                return riconoscimentoFilmRepository.findById(riconoscimentoFilmDTO.id()).orElseThrow(() -> new BadRequestException("Il riconoscimento non è stato trovato"));
            } else {
                return new RiconoscimentoFilm(riconoscimentoFilmDTO.nome(), riconoscimentoFilmDTO.anno(), riconoscimentoFilmDTO.tipo());
            }
        }).toList();

        List<Attore> listaAttori = body.listaAttori().stream().map(attoreDTO -> {
            if (attoreDTO.id() != null) {
                return this.attoreRepository.findById(attoreDTO.id()).orElseThrow(() -> new BadRequestException("L'attore non è stato trovato"));
            } else {
//                List<RiconoscimentoAttore> riconoscimentoAttoreList = attoreDTO.listaRiconoscimenti().stream().map(riconoscimentoAttoreDTO -> {
//                    if (riconoscimentoAttoreDTO != null){
//                        return this.riconoscimentoAttoreRepository.findById(riconoscimentoAttoreDTO.id());
//                    } else {
//                        return new RiconoscimentoAttore(riconoscimentoAttoreDTO.nome(),riconoscimentoAttoreDTO.anno(),riconoscimentoAttoreDTO.tipoRiconoscimento());
//                    }
//                }).toList();
                return new Attore(attoreDTO.nome(), attoreDTO.cognome(), attoreDTO.eta(), attoreDTO.dataDiNascita());
            }
        }).toList();

        Regista addRegista = new Regista();

        if (body.regista().id() != null) {
            addRegista = this.registaRepository.findById(body.regista().id()).orElseThrow(() -> new BadRequestException("Il regista non è stato trovato"));
        } else {
            addRegista.setNome(body.regista().nome());
            addRegista.setCognome(body.regista().cognome());
            addRegista.setEta(body.regista().eta());
            addRegista.setDataDiNascita(body.regista().dataDiNascita());
            addRegista.setImmagineProfilo(body.regista().immagineProfilo());
        }

        Film newFilm = new Film(body.titolo(), body.descrizione(), body.annoDiUscita(), body.durataFilm(), body.genere(), riconoscimentoFilmList, listaAttori, addRegista, body.coverUrl());

        Film filmSaved = this.filmRepository.save(newFilm);
        log.info("Il film " + filmSaved.getTitolo() + " con ID: " + filmSaved.getId() + " è stato salvato correttamente");

        return filmSaved;
    }

    //    2. Ricerca di tutti i film
    public Page<Film> findAllFilmWithPagination(int numPage, int sizePage, String sortBy) {
        if (sizePage > 30) sizePage = 30;
        sortBy = "titolo";
        Pageable pageable = PageRequest.of(numPage, sizePage, Sort.by(sortBy).ascending());
        return this.filmRepository.findAll(pageable);
    }

    //    3. Ricerca di un singolo film tramite ID
    public Film findFilmById(UUID filmId) {
        return this.filmRepository.findById(filmId).orElseThrow(() -> new BadRequestException("Il film con ID: " + filmId + " non è stato trovato")
        );
    }

    //    4. Ricerca di un singolo film tramite Titolo
    public Film findFilmByTitolo(String titolo) {
        return this.filmRepository.findByTitolo(titolo).orElseThrow(() -> new BadRequestException("Il film con titolo " + titolo + " non è stato trovato"));
    }

    //    5. Modifica di un film tramite ID
    public Film findFilmByIdAndUpdate(UUID filmId, FilmDTO bodyFilmUpdate) {

        Film filmFound = this.findFilmById(filmId);
        List<RiconoscimentoFilm> riconoscimentoFilmList = bodyFilmUpdate.listaRiconoscimentiFilm().stream().map(riconoscimentoFilmDTO -> {
            if (riconoscimentoFilmDTO.id() != null) {
                return riconoscimentoFilmRepository.findById(riconoscimentoFilmDTO.id()).orElseThrow(() -> new BadRequestException("Il riconoscimento non è stato trovato"));
            } else {
                return new RiconoscimentoFilm(riconoscimentoFilmDTO.nome(), riconoscimentoFilmDTO.anno(), riconoscimentoFilmDTO.tipo());
            }
        }).toList();

        List<Attore> listaAttori = bodyFilmUpdate.listaAttori().stream().map(attoreDTO -> {
            if (attoreDTO.id() != null) {
                return this.attoreRepository.findById(attoreDTO.id()).orElseThrow(() -> new BadRequestException("L'attore non è stato trovato"));
            } else {
                return new Attore(attoreDTO.nome(), attoreDTO.cognome(), attoreDTO.eta(), attoreDTO.dataDiNascita());
            }
        }).toList();

        Regista addRegista = new Regista();

        if (bodyFilmUpdate.regista().id() != null) {
            addRegista = this.registaRepository.findById(bodyFilmUpdate.regista().id()).orElseThrow(() -> new BadRequestException("Il regista non è stato trovato"));
        } else {
            addRegista.setNome(bodyFilmUpdate.regista().nome());
            addRegista.setCognome(bodyFilmUpdate.regista().cognome());
            addRegista.setEta(bodyFilmUpdate.regista().eta());
            addRegista.setDataDiNascita(bodyFilmUpdate.regista().dataDiNascita());
            addRegista.setImmagineProfilo(bodyFilmUpdate.regista().immagineProfilo());
        }

        filmFound.setTitolo(bodyFilmUpdate.titolo());
        filmFound.setDescrizione(bodyFilmUpdate.descrizione());
        filmFound.setAnnoDiUscita(bodyFilmUpdate.annoDiUscita());
        filmFound.setDurataFilm(bodyFilmUpdate.durataFilm());
        filmFound.setGenere(bodyFilmUpdate.genere());
        filmFound.setListaRiconoscimenti(riconoscimentoFilmList);
        filmFound.setAttore(listaAttori);
        filmFound.setRegista(addRegista);
        filmFound.setCoverUrl(bodyFilmUpdate.coverUrl());

        Film filmUpdate = this.filmRepository.save(filmFound);
        log.info("Il film con Titolo: " + filmUpdate.getTitolo() + " è ID: " + filmUpdate.getId() + " è stato modificato correttamente");
        return filmUpdate;
    }

    //    6. Eliminazione di un film tramite ID
    public void findFilmByIdAndDelete(UUID filmId) {
        Film filmFound = this.findFilmById(filmId);
        this.filmRepository.delete(filmFound);
    }
}
