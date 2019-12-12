package com.courses.repository;
import com.courses.domain.CorrectCodes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CorrectCodes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CorrectCodesRepository extends JpaRepository<CorrectCodes, Long> {

}
