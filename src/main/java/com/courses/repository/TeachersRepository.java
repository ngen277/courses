package com.courses.repository;
import com.courses.domain.Teachers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Teachers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeachersRepository extends JpaRepository<Teachers, Long> {

}
