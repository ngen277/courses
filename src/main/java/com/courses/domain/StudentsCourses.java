package com.courses.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A StudentsCourses.
 */
@Entity
@Table(name = "students_courses")
public class StudentsCourses implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "status")
    private String status;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToMany(mappedBy = "studentsCourses")
    private Set<StudentsTests> userTests = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("userCourses")
    private Students students;

    @ManyToOne
    @JsonIgnoreProperties("userCourses")
    private Courses courses;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public StudentsCourses status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public StudentsCourses registrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
        return this;
    }

    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public StudentsCourses endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Set<StudentsTests> getUserTests() {
        return userTests;
    }

    public StudentsCourses userTests(Set<StudentsTests> studentsTests) {
        this.userTests = studentsTests;
        return this;
    }

    public StudentsCourses addUserTests(StudentsTests studentsTests) {
        this.userTests.add(studentsTests);
        studentsTests.setStudentsCourses(this);
        return this;
    }

    public StudentsCourses removeUserTests(StudentsTests studentsTests) {
        this.userTests.remove(studentsTests);
        studentsTests.setStudentsCourses(null);
        return this;
    }

    public void setUserTests(Set<StudentsTests> studentsTests) {
        this.userTests = studentsTests;
    }

    public Students getStudents() {
        return students;
    }

    public StudentsCourses students(Students students) {
        this.students = students;
        return this;
    }

    public void setStudents(Students students) {
        this.students = students;
    }

    public Courses getCourses() {
        return courses;
    }

    public StudentsCourses courses(Courses courses) {
        this.courses = courses;
        return this;
    }

    public void setCourses(Courses courses) {
        this.courses = courses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentsCourses)) {
            return false;
        }
        return id != null && id.equals(((StudentsCourses) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StudentsCourses{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", registrationDate='" + getRegistrationDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
