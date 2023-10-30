package ru.isu.project.model;


import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "file_name")
    private String fileName;
    
    @Column(name = "mime_type")
    private String mimeType;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "price")
    private Double price;
    
    @Column(name = "description")
    private String description;
    
    public String getFileName() {
        return fileName;
    }

    public void setFilePath(String file_name) {
        this.fileName = file_name;
    }
    
    public String getMimeType() {
        return mimeType;
    }
        
    public void mimeType(String mime_type) {
        this.mimeType = mime_type;
    }

    public Product(String name, Double price,String description, String file_name, String mime_type) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.fileName = file_name;
        this.mimeType = mime_type;
    }
    
    @Override
    public int hashCode(){
        return Objects.hash(name,id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Product other = (Product) obj;
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        return this.id == other.id && Objects.equals(this.id, other.id);
    }
    

    
}
