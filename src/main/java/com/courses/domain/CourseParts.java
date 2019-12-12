package com.courses.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A CourseParts.
 */
@Entity
@Table(name = "course_parts")
public class CourseParts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "npart")
    private Integer npart;

    @Column(name = "download_link")
    private String downloadLink;

    @Column(name = "download_description")
    private String downloadDescription;

    @Column(name = "test_name")
    private String testName;

    @Column(name = "test_question_count")
    private Integer testQuestionCount;

    @OneToMany(mappedBy = "courseParts")
    private Set<Questions> questions = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "course_parts_user_tests",
               joinColumns = @JoinColumn(name = "course_parts_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_tests_id", referencedColumnName = "id"))
    private Set<StudentsTests> userTests = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("courseParts")
    private Courses courses;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNpart() {
        return npart;
    }

    public CourseParts npart(Integer npart) {
        this.npart = npart;
        return this;
    }

    public void setNpart(Integer npart) {
        this.npart = npart;
    }

    public String getDownloadLink() {
        return downloadLink;
    }

    public CourseParts downloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
        return this;
    }

    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }

    public String getDownloadDescription() {
        return downloadDescription;
    }

    public CourseParts downloadDescription(String downloadDescription) {
        this.downloadDescription = downloadDescription;
        return this;
    }

    public void setDownloadDescription(String downloadDescription) {
        this.downloadDescription = downloadDescription;
    }

    public String getTestName() {
        return testName;
    }

    public CourseParts testName(String testName) {
        this.testName = testName;
        return this;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public Integer getTestQuestionCount() {
        return testQuestionCount;
    }

    public CourseParts testQuestionCount(Integer testQuestionCount) {
        this.testQuestionCount = testQuestionCount;
        return this;
    }

    public void setTestQuestionCount(Integer testQuestionCount) {
        this.testQuestionCount = testQuestionCount;
    }

    public Set<Questions> getQuestions() {
        return questions;
    }

    public CourseParts questions(Set<Questions> questions) {
        this.questions = questions;
        return this;
    }

    public CourseParts addQuestions(Questions questions) {
        this.questions.add(questions);
        questions.setCourseParts(this);
        return this;
    }

    public CourseParts removeQuestions(Questions questions) {
        this.questions.remove(questions);
        questions.setCourseParts(null);
        return this;
    }

    public void setQuestions(Set<Questions> questions) {
        this.questions = questions;
    }

    public Set<StudentsTests> getUserTests() {
        return userTests;
    }

    public CourseParts userTests(Set<StudentsTests> studentsTests) {
        this.userTests = studentsTests;
        return this;
    }

    public CourseParts addUserTests(StudentsTests studentsTests) {
        this.userTests.add(studentsTests);
        studentsTests.getCourseParts().add(this);
        return this;
    }

    public CourseParts removeUserTests(StudentsTests studentsTests) {
        this.userTests.remove(studentsTests);
        studentsTests.getCourseParts().remove(this);
        return this;
    }

    public void setUserTests(Set<StudentsTests> studentsTests) {
        this.userTests = studentsTests;
    }

    public Courses getCourses() {
        return courses;
    }

    public CourseParts courses(Courses courses) {
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
        if (!(o instanceof CourseParts)) {
            return false;
        }
        return id != null && id.equals(((CourseParts) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CourseParts{" +
            "id=" + getId() +
            ", npart=" + getNpart() +
            ", downloadLink='" + getDownloadLink() + "'" +
            ", downloadDescription='" + getDownloadDescription() + "'" +
            ", testName='" + getTestName() + "'" +
            ", testQuestionCount=" + getTestQuestionCount() +
            "}";
    }
}
