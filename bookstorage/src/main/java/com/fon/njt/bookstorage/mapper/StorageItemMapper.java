package com.fon.njt.bookstorage.mapper;

import com.fon.njt.bookstorage.dto.StorageItemRequestDto;
import com.fon.njt.bookstorage.dto.StorageItemResponseDto;
import com.fon.njt.bookstorage.model.StorageItemEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StorageItemMapper {

    StorageItemResponseDto mapToDto(StorageItemEntity entity);

    StorageItemEntity mapToEntity(StorageItemRequestDto dto);
}
