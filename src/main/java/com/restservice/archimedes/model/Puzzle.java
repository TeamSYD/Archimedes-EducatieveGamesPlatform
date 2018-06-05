package com.restservice.archimedes.model;

        import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
        import org.springframework.data.annotation.CreatedDate;
        import org.springframework.data.annotation.LastModifiedDate;
        import org.springframework.data.jpa.domain.support.AuditingEntityListener;

        import javax.persistence.*;
        import javax.validation.constraints.NotBlank;
        import java.io.Serializable;
        import java.util.Date;

@Entity
@Table(name = "puzzle")
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
public class Puzzle extends Rule implements Serializable{

    @NotBlank
    private Boolean cardOrder;

    @NotBlank
    private int fillerAmount;

    public Boolean getCardOrder() {
        return cardOrder;
    }

    public void setCardOrder(Boolean cardOrder) {
        this.cardOrder = cardOrder;
    }

    public int getFillerAmount() {
        return fillerAmount;
    }

    public void setFillerAmount(int fillerAmount) {
        this.fillerAmount = fillerAmount;
    }
}
