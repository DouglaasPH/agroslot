package io.github.douglaasph.agroslot.bucket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.MediaType;

import java.io.InputStream;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BucketFile {
    private String name;
    private InputStream is;
    private MediaType type;
    private Long size;
}
