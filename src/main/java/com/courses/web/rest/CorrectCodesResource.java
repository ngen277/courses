package com.courses.web.rest;

import com.courses.domain.CorrectCodes;
import com.courses.repository.CorrectCodesRepository;
import com.courses.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.courses.domain.CorrectCodes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CorrectCodesResource {

    private final Logger log = LoggerFactory.getLogger(CorrectCodesResource.class);

    private static final String ENTITY_NAME = "correctCodes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CorrectCodesRepository correctCodesRepository;

    public CorrectCodesResource(CorrectCodesRepository correctCodesRepository) {
        this.correctCodesRepository = correctCodesRepository;
    }

    /**
     * {@code POST  /correct-codes} : Create a new correctCodes.
     *
     * @param correctCodes the correctCodes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new correctCodes, or with status {@code 400 (Bad Request)} if the correctCodes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/correct-codes")
    public ResponseEntity<CorrectCodes> createCorrectCodes(@RequestBody CorrectCodes correctCodes) throws URISyntaxException {
        log.debug("REST request to save CorrectCodes : {}", correctCodes);
        if (correctCodes.getId() != null) {
            throw new BadRequestAlertException("A new correctCodes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CorrectCodes result = correctCodesRepository.save(correctCodes);
        return ResponseEntity.created(new URI("/api/correct-codes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /correct-codes} : Updates an existing correctCodes.
     *
     * @param correctCodes the correctCodes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated correctCodes,
     * or with status {@code 400 (Bad Request)} if the correctCodes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the correctCodes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/correct-codes")
    public ResponseEntity<CorrectCodes> updateCorrectCodes(@RequestBody CorrectCodes correctCodes) throws URISyntaxException {
        log.debug("REST request to update CorrectCodes : {}", correctCodes);
        if (correctCodes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CorrectCodes result = correctCodesRepository.save(correctCodes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, correctCodes.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /correct-codes} : get all the correctCodes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of correctCodes in body.
     */
    @GetMapping("/correct-codes")
    public List<CorrectCodes> getAllCorrectCodes() {
        log.debug("REST request to get all CorrectCodes");
        return correctCodesRepository.findAll();
    }

    /**
     * {@code GET  /correct-codes/:id} : get the "id" correctCodes.
     *
     * @param id the id of the correctCodes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the correctCodes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/correct-codes/{id}")
    public ResponseEntity<CorrectCodes> getCorrectCodes(@PathVariable Long id) {
        log.debug("REST request to get CorrectCodes : {}", id);
        Optional<CorrectCodes> correctCodes = correctCodesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(correctCodes);
    }

    /**
     * {@code DELETE  /correct-codes/:id} : delete the "id" correctCodes.
     *
     * @param id the id of the correctCodes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/correct-codes/{id}")
    public ResponseEntity<Void> deleteCorrectCodes(@PathVariable Long id) {
        log.debug("REST request to delete CorrectCodes : {}", id);
        correctCodesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
