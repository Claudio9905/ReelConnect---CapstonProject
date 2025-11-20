package claudiopostiglione.reelconnect.services;

import claudiopostiglione.reelconnect.entities.catalogoTvFilm.*;
import claudiopostiglione.reelconnect.exceptions.BadRequestException;
import claudiopostiglione.reelconnect.payload.SerieTvDTO;
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
public class SerieTvService {
    @Autowired
    private SerieTvRepository serieTvRepository;
    @Autowired
    private RiconoscimentoSerieTvRepository riconoscimentoSerieTvRepository;
    @Autowired
    private AttoreRepository attoreRepository;
    @Autowired
    private RiconoscimentoAttoreRepository riconoscimentoAttoreRepository;
    @Autowired
    private RegistaRepository registaRepository;

    //    1. Salvataggio del film
    public SerieTv createSerieTv(SerieTvDTO body) {
//        Verifica se la SerieTv è già presente nel catalogo
        this.serieTvRepository.findByTitolo(body.titolo()).ifPresent(serieTv -> {
            throw new BadRequestException("La serie TV " + serieTv.getTitolo() + " è già presente nel catalogo");
        });

        List<RiconoscimentoSerieTv> riconoscimentoSerieTvList = body.listaSerieTv().stream().map(riconoscimentoSerieTvDTO -> {
            if (riconoscimentoSerieTvDTO.id() != null) {
                return riconoscimentoSerieTvRepository.findById(riconoscimentoSerieTvDTO.id()).orElseThrow(() -> new BadRequestException("Il riconoscimento non è stato trovato"));
            } else {
                return new RiconoscimentoSerieTv(riconoscimentoSerieTvDTO.nome(), riconoscimentoSerieTvDTO.anno(), riconoscimentoSerieTvDTO.tipo());
            }
        }).toList();

        List<Attore> listaAttori = body.listaAttori().stream().map(attoreDTO -> {
            if (attoreDTO.id() != null) {
                return this.attoreRepository.findById(attoreDTO.id()).orElseThrow(() -> new BadRequestException("L'attore non è stato trovato"));
            } else {
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

        SerieTv newSerieTv = new SerieTv(body.titolo(), body.descrizione(), body.annoDiUscita(), body.durataMediaEpisodio(), body.genere(), body.numStagioni(), body.numEpisodi(), riconoscimentoSerieTvList, listaAttori, addRegista, body.coverUrl());

        SerieTv serieTvSaved = this.serieTvRepository.save(newSerieTv);
        log.info("La serie YV " + serieTvSaved.getTitolo() + " con ID: " + serieTvSaved.getId() + " è stata salvata correttamente");

        return serieTvSaved;
    }

    //    2. Ricerca di tutte le serie TV
    public Page<SerieTv> findAllSerieTvWithPagination(int numPage, int sizePage, String sortBy) {
        if (sizePage > 30) sizePage = 30;
        sortBy = "titolo";
        Pageable pageable = PageRequest.of(numPage, sizePage, Sort.by(sortBy).ascending());
        return this.serieTvRepository.findAll(pageable);
    }

    //    3. Ricerca di una singola serie TV tramite ID
    public SerieTv findSerieTvById(UUID serieTvId) {
        return this.serieTvRepository.findById(serieTvId).orElseThrow(() -> new BadRequestException("La serie TV con ID: " + serieTvId + " non è stata trovata")
        );
    }

    //    4. Ricerca di una singola Serie TV tramite Titolo
    public SerieTv findSerieTvByTitolo(String titolo) {
        return this.serieTvRepository.findByTitolo(titolo).orElseThrow(() -> new BadRequestException("La serie TV con titolo " + titolo + " non è stata trovata"));
    }

    //    5. Modifica di una Serie TV tramite ID
    public SerieTv findSerieTvByIdAndUpdate(UUID serieTvId, SerieTvDTO bodySerieTvUpdate) {

        SerieTv serieTvFound = this.findSerieTvById(serieTvId);
        List<RiconoscimentoSerieTv> riconoscimentoSerieTvList = bodySerieTvUpdate.listaSerieTv().stream().map(riconoscimentoSerieTvDTO -> {
            if (riconoscimentoSerieTvDTO.id() != null) {
                return riconoscimentoSerieTvRepository.findById(riconoscimentoSerieTvDTO.id()).orElseThrow(() -> new BadRequestException("Il riconoscimento non è stato trovato"));
            } else {
                return new RiconoscimentoSerieTv(riconoscimentoSerieTvDTO.nome(), riconoscimentoSerieTvDTO.anno(), riconoscimentoSerieTvDTO.tipo());
            }
        }).toList();

        List<Attore> listaAttori = bodySerieTvUpdate.listaAttori().stream().map(attoreDTO -> {
            if (attoreDTO.id() != null) {
                return this.attoreRepository.findById(attoreDTO.id()).orElseThrow(() -> new BadRequestException("L'attore non è stato trovato"));
            } else {
                return new Attore(attoreDTO.nome(), attoreDTO.cognome(), attoreDTO.eta(), attoreDTO.dataDiNascita());
            }
        }).toList();

        Regista addRegista = new Regista();

        if (bodySerieTvUpdate.regista().id() != null) {
            addRegista = this.registaRepository.findById(bodySerieTvUpdate.regista().id()).orElseThrow(() -> new BadRequestException("Il regista non è stato trovato"));
        } else {
            addRegista.setNome(bodySerieTvUpdate.regista().nome());
            addRegista.setCognome(bodySerieTvUpdate.regista().cognome());
            addRegista.setEta(bodySerieTvUpdate.regista().eta());
            addRegista.setDataDiNascita(bodySerieTvUpdate.regista().dataDiNascita());
            addRegista.setImmagineProfilo(bodySerieTvUpdate.regista().immagineProfilo());
        }

        serieTvFound.setTitolo(bodySerieTvUpdate.titolo());
        serieTvFound.setDescrizione(bodySerieTvUpdate.descrizione());
        serieTvFound.setAnnoDiUscita(bodySerieTvUpdate.annoDiUscita());
        serieTvFound.setNumStagioni(bodySerieTvUpdate.numStagioni());
        serieTvFound.setNumEpisodi(bodySerieTvUpdate.numEpisodi());
        serieTvFound.setDurataMediaEpisodio(bodySerieTvUpdate.durataMediaEpisodio());
        serieTvFound.setGenere(bodySerieTvUpdate.genere());
        serieTvFound.setListaRiconoscimenti(riconoscimentoSerieTvList);
        serieTvFound.setAttore(listaAttori);
        serieTvFound.setRegista(addRegista);
        serieTvFound.setCoverUrl(bodySerieTvUpdate.coverUrl());

        SerieTv serieTvUpdate = this.serieTvRepository.save(serieTvFound);
        log.info("La serie Tv con Titolo: " + serieTvUpdate.getTitolo() + " è ID: " + serieTvUpdate.getId() + " è stata modificata correttamente");
        return serieTvUpdate;
    }

    //    6. Eliminazione di una serie Tv tramite ID
    public void findSerieTvByIdAndDelete(UUID serieTvId) {
        SerieTv serieTvFound = this.findSerieTvById(serieTvId);
        this.serieTvRepository.delete(serieTvFound);
    }


}
