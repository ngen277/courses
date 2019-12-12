package com.courses.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A StudentsTests.
 */
@Entity
@Table(name = "students_tests")
public class StudentsTests implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "attemps")
    private Integer attemps;

    @Column(name = "percent")
    private Integer percent;

    @Column(name = "last_test_date")
    private LocalDate lastTestDate;

    @ManyToOne
    @JsonIgnoreProperties("userTests")
    private StudentsCourses studentsCourses;

    @ManyToMany(mappedBy = "userTests")
    @JsonIgnore
    private Set<CourseParts> courseParts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAttemps() {
        return attemps;
    }

    public StudentsTests attemps(Integer attemps) {
        this.attemps = attemps;
        return this;
    }

    public void setAttemps(Integer attemps) {
        this.attemps = attemps;
    }

    public Integer getPercent() {
        return percent;
    }

    public StudentsTests percent(Integer percent) {
        this.percent = percent;
        return this;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }

    public LocalDate getLastTestDate() {
        return lastTestDate;
    }

    public StudentsTests lastTestDate(LocalDate lastTestDate) {
        this.lastTestDate = lastTestDate;
        return this;
    }

    public void setLastTestDate(LocalDate lastTestDate) {
        this.lastTestDate = lastTestDate;
    }

    public StudentsCourses getStudentsCourses() {
        return studentsCourses;
    }

    public StudentsTests studentsCourses(StudentsCourses studentsCourses) {
        this.studentsCourses = studentsCourses;
        return this;
    }

    public void setStudentsCourses(StudentsCourses studentsCourses) {
        this.studentsCourses = studentsCourses;
    }

    public Set<CourseParts> getCourseParts() {
        return courseParts;
    }

    public StudentsTests courseParts(Set<CourseParts> courseParts) {
        this.courseParts = courseParts;
        return this;
    }

    public StudentsTests addCourseParts(CourseParts courseParts) {
        this.courseParts.add(courseParts);
        courseParts.getUserTests().add(this);
        return this;
    }

    public StudentsTests removeCourseParts(CourseParts courseParts) {
        this.courseParts.remove(courseParts);
        courseParts.getUserTests().remove(this);
        return this;
    }

    public void setCourseParts(Set<CourseParts> courseParts) {
        this.courseParts = courseParts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentsTests)) {
            return false;
        }
        return id != null && id.equals(((StudentsTests) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StudentsTests{" +
            "id=" + getId() +
            ", attemps=" + getAttemps() +
            ", percent=" + getPercent() +
            ", lastTestDate='" + getLastTestDate() + "'" +
            "}";
    }
}
