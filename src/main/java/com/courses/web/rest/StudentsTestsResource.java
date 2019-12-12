package com.courses.web.rest;

import com.courses.domain.StudentsTests;
import com.courses.repository.StudentsTestsRepository;
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
 * REST controller for managing {@link com.courses.domain.StudentsTests}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StudentsTestsResource {

    private final Logger log = LoggerFactory.getLogger(StudentsTestsResource.class);

    private static final String ENTITY_NAME = "studentsTests";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentsTestsRepository studentsTestsRepository;

    public StudentsTestsResource(StudentsTestsRepository studentsTestsRepository) {
        this.studentsTestsRepository = studentsTestsRepository;
    }

    /**
     * {@code POST  /students-tests} : Create a new studentsTests.
     *
     * @param studentsTests the studentsTests to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentsTests, or with status {@code 400 (Bad Request)} if the studentsTests has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/students-tests")
    public ResponseEntity<StudentsTests> createStudentsTests(@RequestBody StudentsTests studentsTests) throws URISyntaxException {
        log.debug("REST request to save StudentsTests : {}", studentsTests);
        if (studentsTests.getId() != null) {
            throw new BadRequestAlertException("A new studentsTests cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentsTests result = studentsTestsRepository.save(studentsTests);
        return ResponseEntity.created(new URI("/api/students-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /students-tests} : Updates an existing studentsTests.
     *
     * @param studentsTests the studentsTests to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentsTests,
     * or with status {@code 400 (Bad Request)} if the studentsTests is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentsTests couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/students-tests")
    public ResponseEntity<StudentsTests> updateStudentsTests(@RequestBody StudentsTests studentsTests) throws URISyntaxException {
        log.debug("REST request to update StudentsTests : {}", studentsTests);
        if (studentsTests.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentsTests result = studentsTestsRepository.save(studentsTests);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, studentsTests.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /students-tests} : get all the studentsTests.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studentsTests in body.
     */
    @GetMapping("/students-tests")
    public List<StudentsTests> getAllStudentsTests() {
        log.debug("REST request to get all StudentsTests");
        return studentsTestsRepository.findAll();
    }

    /**
     * {@code GET  /students-tests/:id} : get the "id" studentsTests.
     *
     * @param id the id of the studentsTests to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentsTests, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/students-tests/{id}")
    public ResponseEntity<StudentsTests> getStudentsTests(@PathVariable Long id) {
        log.debug("REST request to get StudentsTests : {}", id);
        Optional<StudentsTests> studentsTests = studentsTestsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(studentsTests);
    }

    /**
     * {@code DELETE  /students-tests/:id} : delete the "id" studentsTests.
     *
     * @param id the id of the studentsTests to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/students-tests/{id}")
    public ResponseEntity<Void> deleteStudentsTests(@PathVariable Long id) {
        log.debug("REST request to delete StudentsTests : {}", id);
        studentsTestsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
