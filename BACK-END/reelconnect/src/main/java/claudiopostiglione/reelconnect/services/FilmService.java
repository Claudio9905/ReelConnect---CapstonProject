package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.Attore;
import claudiopostiglione.reelconnect.entities.catalogoTvFilm.Film;
import claudiopostiglione.reelconnect.entities.catalogoTvFilm.RiconoscimentoAttore;
import claudiopostiglione.reelconnect.entities.catalogoTvFilm.RiconoscimentoFilm;
import claudiopostiglione.reelconnect.exceptions.BadRequestException;
import claudiopostiglione.reelconnect.payload.FilmDTO;
import claudiopostiglione.reelconnect.repositories.AttoreRepository;
import claudiopostiglione.reelconnect.repositories.FilmRepository;
import claudiopostiglione.reelconnect.repositories.RiconoscimentoAttoreRepository;
import claudiopostiglione.reelconnect.repositories.RiconoscimentoFilmRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
            if (attoreDTO.id() != null){
                return this.attoreRepository.findById(attoreDTO.id()).orElseThrow(() -> new BadRequestException("L'attore non è stato trovato"));
            } else {
                List<RiconoscimentoAttore> riconoscimentoAttoreList = attoreDTO.listaRiconoscimenti().stream().map(riconoscimentoAttoreDTO -> {
                    if (riconoscimentoAttoreDTO != null){
                        return this.riconoscimentoAttoreRepository.findById(riconoscimentoAttoreDTO.id());
                    } else {
                        return new RiconoscimentoAttore(riconoscimentoAttoreDTO.nome(),riconoscimentoAttoreDTO.anno(),riconoscimentoAttoreDTO.tipoRiconoscimento());
                    }
                }).toList();
                return new Attore(attoreDTO.nome(), attoreDTO.cognome(), attoreDTO.eta(),attoreDTO.dataDiNascita(), attoreDTO.listaRiconoscimenti())
            }
        });

        Film newFilm = new Film(body.titolo(), body.descrizione(), body.annoDiUscita(), body.durataFilm(), body.genere(), body.listaRiconoscimentiFilm(), body.listaAttori(), body.regista(), body.coverUrl())

    }

}
