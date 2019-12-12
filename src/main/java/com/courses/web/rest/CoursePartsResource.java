package com.courses.web.rest;

import com.courses.domain.CourseParts;
import com.courses.repository.CoursePartsRepository;
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
 * REST controller for managing {@link com.courses.domain.CourseParts}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CoursePartsResource {

    private final Logger log = LoggerFactory.getLogger(CoursePartsResource.class);

    private static final String ENTITY_NAME = "courseParts";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CoursePartsRepository coursePartsRepository;

    public CoursePartsResource(CoursePartsRepository coursePartsRepository) {
        this.coursePartsRepository = coursePartsRepository;
    }

    /**
     * {@code POST  /course-parts} : Create a new courseParts.
     *
     * @param courseParts the courseParts to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new courseParts, or with status {@code 400 (Bad Request)} if the courseParts has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/course-parts")
    public ResponseEntity<CourseParts> createCourseParts(@RequestBody CourseParts courseParts) throws URISyntaxException {
        log.debug("REST request to save CourseParts : {}", courseParts);
        if (courseParts.getId() != null) {
            throw new BadRequestAlertException("A new courseParts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CourseParts result = coursePartsRepository.save(courseParts);
        return ResponseEntity.created(new URI("/api/course-parts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /course-parts} : Updates an existing courseParts.
     *
     * @param courseParts the courseParts to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courseParts,
     * or with status {@code 400 (Bad Request)} if the courseParts is not valid,
     * or with status {@code 500 (Internal Server Error)} if the courseParts couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/course-parts")
    public ResponseEntity<CourseParts> updateCourseParts(@RequestBody CourseParts courseParts) throws URISyntaxException {
        log.debug("REST request to update CourseParts : {}", courseParts);
        if (courseParts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CourseParts result = coursePartsRepository.save(courseParts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, courseParts.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /course-parts} : get all the courseParts.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of courseParts in body.
     */
    @GetMapping("/course-parts")
    public List<CourseParts> getAllCourseParts(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all CourseParts");
        return coursePartsRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /course-parts/:id} : get the "id" courseParts.
     *
     * @param id the id of the courseParts to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the courseParts, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/course-parts/{id}")
    public ResponseEntity<CourseParts> getCourseParts(@PathVariable Long id) {
        log.debug("REST request to get CourseParts : {}", id);
        Optional<CourseParts> courseParts = coursePartsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(courseParts);
    }

    /**
     * {@code DELETE  /course-parts/:id} : delete the "id" courseParts.
     *
     * @param id the id of the courseParts to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/course-parts/{id}")
    public ResponseEntity<Void> deleteCourseParts(@PathVariable Long id) {
        log.debug("REST request to delete CourseParts : {}", id);
        coursePartsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
