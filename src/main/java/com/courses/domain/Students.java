package com.courses.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Students.
 */
@Entity
@Table(name = "students")
public class Students implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login")
    private String login;

    @Column(name = "password")
    private String password;

    @Column(name = "surname")
    private String surname;

    @Column(name = "name")
    private String name;

    @Column(name = "middlename")
    private String middlename;

    @Column(name = "ngroup")
    private String ngroup;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Column(name = "sex")
    private String sex;

    @Column(name = "email")
    private String email;

    @Column(name = "is_admin")
    private Boolean isAdmin;

    @OneToOne
    @JoinColumn(unique = true)
    private CorrectCodes studentCode;

    @OneToMany(mappedBy = "students")
    private Set<StudentsCourses> userCourses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public Students login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public Students password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSurname() {
        return surname;
    }

    public Students surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getName() {
        return name;
    }

    public Students name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMiddlename() {
        return middlename;
    }

    public Students middlename(String middlename) {
        this.middlename = middlename;
        return this;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public String getNgroup() {
        return ngroup;
    }

    public Students ngroup(String ngroup) {
        this.ngroup = ngroup;
        return this;
    }

    public void setNgroup(String ngroup) {
        this.ngroup = ngroup;
    }

    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    public Students registrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
        return this;
    }

    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getSex() {
        return sex;
    }

    public Students sex(String sex) {
        this.sex = sex;
        return this;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getEmail() {
        return email;
    }

    public Students email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isIsAdmin() {
        return isAdmin;
    }

    public Students isAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
        return this;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public CorrectCodes getStudentCode() {
        return studentCode;
    }

    public Students studentCode(CorrectCodes correctCodes) {
        this.studentCode = correctCodes;
        return this;
    }

    public void setStudentCode(CorrectCodes correctCodes) {
        this.studentCode = correctCodes;
    }

    public Set<StudentsCourses> getUserCourses() {
        return userCourses;
    }

    public Students userCourses(Set<StudentsCourses> studentsCourses) {
        this.userCourses = studentsCourses;
        return this;
    }

    public Students addUserCourses(StudentsCourses studentsCourses) {
        this.userCourses.add(studentsCourses);
        studentsCourses.setStudents(this);
        return this;
    }

    public Students removeUserCourses(StudentsCourses studentsCourses) {
        this.userCourses.remove(studentsCourses);
        studentsCourses.setStudents(null);
        return this;
    }

    public void setUserCourses(Set<StudentsCourses> studentsCourses) {
        this.userCourses = studentsCourses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Students)) {
            return false;
        }
        return id != null && id.equals(((Students) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Students{" +
            "id=" + getId() +
            ", login='" + getLogin() + "'" +
            ", password='" + getPassword() + "'" +
            ", surname='" + getSurname() + "'" +
            ", name='" + getName() + "'" +
            ", middlename='" + getMiddlename() + "'" +
            ", ngroup='" + getNgroup() + "'" +
            ", registrationDate='" + getRegistrationDate() + "'" +
            ", sex='" + getSex() + "'" +
            ", email='" + getEmail() + "'" +
            ", isAdmin='" + isIsAdmin() + "'" +
            "}";
    }
}
