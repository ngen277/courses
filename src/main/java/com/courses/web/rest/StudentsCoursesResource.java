package com.courses.web.rest;

import com.courses.domain.StudentsCourses;
import com.courses.repository.StudentsCoursesRepository;
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
 * REST controller for managing {@link com.courses.domain.StudentsCourses}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class StudentsCoursesResource {

    private final Logger log = LoggerFactory.getLogger(StudentsCoursesResource.class);

    private static final String ENTITY_NAME = "studentsCourses";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentsCoursesRepository studentsCoursesRepository;

    public StudentsCoursesResource(StudentsCoursesRepository studentsCoursesRepository) {
        this.studentsCoursesRepository = studentsCoursesRepository;
    }

    /**
     * {@code POST  /students-courses} : Create a new studentsCourses.
     *
     * @param studentsCourses the studentsCourses to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentsCourses, or with status {@code 400 (Bad Request)} if the studentsCourses has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/students-courses")
    public ResponseEntity<StudentsCourses> createStudentsCourses(@RequestBody StudentsCourses studentsCourses) throws URISyntaxException {
        log.debug("REST request to save StudentsCourses : {}", studentsCourses);
        if (studentsCourses.getId() != null) {
            throw new BadRequestAlertException("A new studentsCourses cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentsCourses result = studentsCoursesRepository.save(studentsCourses);
        return ResponseEntity.created(new URI("/api/students-courses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /students-courses} : Updates an existing studentsCourses.
     *
     * @param studentsCourses the studentsCourses to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentsCourses,
     * or with status {@code 400 (Bad Request)} if the studentsCourses is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentsCourses couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/students-courses")
    public ResponseEntity<StudentsCourses> updateStudentsCourses(@RequestBody StudentsCourses studentsCourses) throws URISyntaxException {
        log.debug("REST request to update StudentsCourses : {}", studentsCourses);
        if (studentsCourses.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentsCourses result = studentsCoursesRepository.save(studentsCourses);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, studentsCourses.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /students-courses} : get all the studentsCourses.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studentsCourses in body.
     */
    @GetMapping("/students-courses")
    public List<StudentsCourses> getAllStudentsCourses() {
        log.debug("REST request to get all StudentsCourses");
        return studentsCoursesRepository.findAll();
    }

    /**
     * {@code GET  /students-courses/:id} : get the "id" studentsCourses.
     *
     * @param id the id of the studentsCourses to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentsCourses, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/students-courses/{id}")
    public ResponseEntity<StudentsCourses> getStudentsCourses(@PathVariable Long id) {
        log.debug("REST request to get StudentsCourses : {}", id);
        Optional<StudentsCourses> studentsCourses = studentsCoursesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(studentsCourses);
    }

    /**
     * {@code DELETE  /students-courses/:id} : delete the "id" studentsCourses.
     *
     * @param id the id of the studentsCourses to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/students-courses/{id}")
    public ResponseEntity<Void> deleteStudentsCourses(@PathVariable Long id) {
        log.debug("REST request to delete StudentsCourses : {}", id);
        studentsCoursesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
