package com.courses.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Answers.
 */
@Entity
@Table(name = "answers")
public class Answers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "answer_content")
    private String answerContent;

    @Column(name = "right_answer")
    private Boolean rightAnswer;

    @ManyToOne
    @JsonIgnoreProperties("answers")
    private Questions questions;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswerContent() {
        return answerContent;
    }

    public Answers answerContent(String answerContent) {
        this.answerContent = answerContent;
        return this;
    }

    public void setAnswerContent(String answerContent) {
        this.answerContent = answerContent;
    }

    public Boolean isRightAnswer() {
        return rightAnswer;
    }

    public Answers rightAnswer(Boolean rightAnswer) {
        this.rightAnswer = rightAnswer;
        return this;
    }

    public void setRightAnswer(Boolean rightAnswer) {
        this.rightAnswer = rightAnswer;
    }

    public Questions getQuestions() {
        return questions;
    }

    public Answers questions(Questions questions) {
        this.questions = questions;
        return this;
    }

    public void setQuestions(Questions questions) {
        this.questions = questions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Answers)) {
            return false;
        }
        return id != null && id.equals(((Answers) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Answers{" +
            "id=" + getId() +
            ", answerContent='" + getAnswerContent() + "'" +
            ", rightAnswer='" + isRightAnswer() + "'" +
            "}";
    }
}
