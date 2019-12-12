package com.courses.repository;
import com.courses.domain.StudentsCourses;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StudentsCourses entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentsCoursesRepository extends JpaRepository<StudentsCourses, Long> {

}
