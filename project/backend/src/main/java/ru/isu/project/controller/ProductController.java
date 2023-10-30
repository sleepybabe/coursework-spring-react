package ru.isu.project.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ru.isu.project.model.Menu;
import ru.isu.project.model.MessageResponse;
import ru.isu.project.model.Product;
import ru.isu.project.model.ProductRequest;
import ru.isu.project.model.ProductResponse;
import ru.isu.project.service.MenuService;
import ru.isu.project.service.ProductService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @Autowired
    private MenuService menuService;

    
    @Value("${file.upload.directory}")
    private String uploadDirectory;
    
    @GetMapping("/products")
    public ResponseEntity<List<Product>> findAllProducts(){
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/productsNotInMenu")
    public ResponseEntity<List<Product>> findProductsNotInMenu(){
        return ResponseEntity.ok(productService.findProductsNotInMenu());
    }
    
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> findProductById(@PathVariable("id") Long id){
        return ResponseEntity.ok(productService.findProductById(id));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id){
        productService.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Продукт успешно удален"));
    }
    
    @GetMapping("/productFile/{productId}")
    public ResponseEntity<ProductResponse> getFileByProductId(@PathVariable Long productId) throws IOException {
        Product product = productService.findById(productId).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        String fileName = product.getFileName();
        String filePath = uploadDirectory + "/" + fileName;
        File file = new File(filePath);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        byte[] fileContent = Files.readAllBytes(Path.of(filePath));
        String base64File = Base64.getEncoder().encodeToString(fileContent);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);
        ProductResponse productResponse = new ProductResponse(product, base64File);
        return ResponseEntity.ok(productResponse);
    }
    
    @GetMapping("/productsFiles")
    public ResponseEntity<List<ProductResponse>> getFilesAndProducts() throws IOException {
        Menu menu = menuService.findMenu();
        List<Product> products = menuService.findProductsByMenuId(menu.getId());
        
        if (products == null) {
            return ResponseEntity.notFound().build();
        }
        List<ProductResponse> productsFile = new ArrayList<>();
        
        for(Product product : products){
            String fileName = product.getFileName();
            String filePath = uploadDirectory + "/" + fileName;

            File file = new File(filePath);
            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }
            byte[] fileContent = Files.readAllBytes(Path.of(filePath));
            String base64File = Base64.getEncoder().encodeToString(fileContent);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName);

            ProductResponse prFile = new ProductResponse(product, base64File);
            productsFile.add(prFile);
        }
        return ResponseEntity.ok(productsFile);
    }

    @PostMapping(value = "/addProduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> createProduct(
            @RequestParam String name, 
            @RequestParam Double price,
            @RequestParam String description, 
            @RequestParam MultipartFile file) throws IOException {
        
        String fileName = file.getOriginalFilename();
        Path filePath = Path.of(uploadDirectory, fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        String mimeType = file.getContentType();
        Product createdProduct = new Product(name, price,description, fileName, mimeType);
        productService.save(createdProduct);
        return ResponseEntity.ok(createdProduct);
    }
    
    @PostMapping("/updateProduct/{productId}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long productId,
            @RequestBody ProductRequest product){

        Product newproduct = productService.findById(productId).orElse(null);
        if (newproduct == null) {
            return ResponseEntity.notFound().build();
        }

        newproduct.setName(product.getName());
        newproduct.setPrice(product.getPrice());
        newproduct.setDescription(product.getDescription());

        productService.save(newproduct);
        return ResponseEntity.ok(newproduct);
    }

    
}
