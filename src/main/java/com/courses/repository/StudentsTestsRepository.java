package com.courses.repository;
import com.courses.domain.StudentsTests;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StudentsTests entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentsTestsRepository extends JpaRepository<StudentsTests, Long> {

}
