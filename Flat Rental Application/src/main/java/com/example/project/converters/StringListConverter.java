package com.example.project.converters;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    @Override
    public String convertToDatabaseColumn(List<String> list) {
        return list == null || list.isEmpty() ? null : String.join(",", list);
    }

    @Override
    public List<String> convertToEntityAttribute(String data) {
        return (data == null || data.isEmpty()) ? List.of() : Arrays.asList(data.split(","));
    }
}
