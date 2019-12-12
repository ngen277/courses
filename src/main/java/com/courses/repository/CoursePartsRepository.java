package com.courses.repository;
import com.courses.domain.CourseParts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the CourseParts entity.
 */
@Repository
public interface CoursePartsRepository extends JpaRepository<CourseParts, Long> {

    @Query(value = "select distinct courseParts from CourseParts courseParts left join fetch courseParts.userTests",
        countQuery = "select count(distinct courseParts) from CourseParts courseParts")
    Page<CourseParts> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct courseParts from CourseParts courseParts left join fetch courseParts.userTests")
    List<CourseParts> findAllWithEagerRelationships();

    @Query("select courseParts from CourseParts courseParts left join fetch courseParts.userTests where courseParts.id =:id")
    Optional<CourseParts> findOneWithEagerRelationships(@Param("id") Long id);

}
