package com.courses.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Courses.
 */
@Entity
@Table(name = "courses")
public class Courses implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "annotation")
    private String annotation;

    @Column(name = "full_description")
    private String fullDescription;

    @Column(name = "picture_link")
    private String pictureLink;

    @Column(name = "period")
    private Float period;

    @OneToMany(mappedBy = "courses")
    private Set<StudentsCourses> userCourses = new HashSet<>();

    @OneToMany(mappedBy = "courses")
    private Set<CourseParts> courseParts = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("courses")
    private Teachers teachers;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Courses name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAnnotation() {
        return annotation;
    }

    public Courses annotation(String annotation) {
        this.annotation = annotation;
        return this;
    }

    public void setAnnotation(String annotation) {
        this.annotation = annotation;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public Courses fullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
        return this;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public String getPictureLink() {
        return pictureLink;
    }

    public Courses pictureLink(String pictureLink) {
        this.pictureLink = pictureLink;
        return this;
    }

    public void setPictureLink(String pictureLink) {
        this.pictureLink = pictureLink;
    }

    public Float getPeriod() {
        return period;
    }

    public Courses period(Float period) {
        this.period = period;
        return this;
    }

    public void setPeriod(Float period) {
        this.period = period;
    }

    public Set<StudentsCourses> getUserCourses() {
        return userCourses;
    }

    public Courses userCourses(Set<StudentsCourses> studentsCourses) {
        this.userCourses = studentsCourses;
        return this;
    }

    public Courses addUserCourses(StudentsCourses studentsCourses) {
        this.userCourses.add(studentsCourses);
        studentsCourses.setCourses(this);
        return this;
    }

    public Courses removeUserCourses(StudentsCourses studentsCourses) {
        this.userCourses.remove(studentsCourses);
        studentsCourses.setCourses(null);
        return this;
    }

    public void setUserCourses(Set<StudentsCourses> studentsCourses) {
        this.userCourses = studentsCourses;
    }

    public Set<CourseParts> getCourseParts() {
        return courseParts;
    }

    public Courses courseParts(Set<CourseParts> courseParts) {
        this.courseParts = courseParts;
        return this;
    }

    public Courses addCourseParts(CourseParts courseParts) {
        this.courseParts.add(courseParts);
        courseParts.setCourses(this);
        return this;
    }

    public Courses removeCourseParts(CourseParts courseParts) {
        this.courseParts.remove(courseParts);
        courseParts.setCourses(null);
        return this;
    }

    public void setCourseParts(Set<CourseParts> courseParts) {
        this.courseParts = courseParts;
    }

    public Teachers getTeachers() {
        return teachers;
    }

    public Courses teachers(Teachers teachers) {
        this.teachers = teachers;
        return this;
    }

    public void setTeachers(Teachers teachers) {
        this.teachers = teachers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Courses)) {
            return false;
        }
        return id != null && id.equals(((Courses) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Courses{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", annotation='" + getAnnotation() + "'" +
            ", fullDescription='" + getFullDescription() + "'" +
            ", pictureLink='" + getPictureLink() + "'" +
            ", period=" + getPeriod() +
            "}";
    }
}
