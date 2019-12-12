package com.courses.web.rest;

import com.courses.domain.Courses;
import com.courses.repository.CoursesRepository;
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
 * REST controller for managing {@link com.courses.domain.Courses}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CoursesResource {

    private final Logger log = LoggerFactory.getLogger(CoursesResource.class);

    private static final String ENTITY_NAME = "courses";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoursesRepository coursesRepository;

    public CoursesResource(CoursesRepository coursesRepository) {
        this.coursesRepository = coursesRepository;
    }

    /**
     * {@code POST  /courses} : Create a new courses.
     *
     * @param courses the courses to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new courses, or with status {@code 400 (Bad Request)} if the courses has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/courses")
    public ResponseEntity<Courses> createCourses(@RequestBody Courses courses) throws URISyntaxException {
        log.debug("REST request to save Courses : {}", courses);
        if (courses.getId() != null) {
            throw new BadRequestAlertException("A new courses cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Courses result = coursesRepository.save(courses);
        return ResponseEntity.created(new URI("/api/courses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /courses} : Updates an existing courses.
     *
     * @param courses the courses to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courses,
     * or with status {@code 400 (Bad Request)} if the courses is not valid,
     * or with status {@code 500 (Internal Server Error)} if the courses couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/courses")
    public ResponseEntity<Courses> updateCourses(@RequestBody Courses courses) throws URISyntaxException {
        log.debug("REST request to update Courses : {}", courses);
        if (courses.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Courses result = coursesRepository.save(courses);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, courses.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /courses} : get all the courses.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of courses in body.
     */
    @GetMapping("/courses")
    public List<Courses> getAllCourses() {
        log.debug("REST request to get all Courses");
        return coursesRepository.findAll();
    }

    /**
     * {@code GET  /courses/:id} : get the "id" courses.
     *
     * @param id the id of the courses to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the courses, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/courses/{id}")
    public ResponseEntity<Courses> getCourses(@PathVariable Long id) {
        log.debug("REST request to get Courses : {}", id);
        Optional<Courses> courses = coursesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(courses);
    }

    /**
     * {@code DELETE  /courses/:id} : delete the "id" courses.
     *
     * @param id the id of the courses to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Void> deleteCourses(@PathVariable Long id) {
        log.debug("REST request to delete Courses : {}", id);
        coursesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
