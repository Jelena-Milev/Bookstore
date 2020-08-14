package com.fon.njt.bookstorage.service;

import com.fon.njt.bookstorage.dto.SoldItemRequestDto;
import com.fon.njt.bookstorage.dto.StorageItemRequestDto;
import com.fon.njt.bookstorage.dto.StorageItemResponseDto;

import java.util.List;

public interface StorageService {

    List<Long> getBestsellersIds(Integer numberOfBestsellers);

    StorageItemResponseDto delete(Long id);

    StorageItemResponseDto save(StorageItemRequestDto dto);

    StorageItemResponseDto updatePiecesAvailable(Long id, StorageItemRequestDto dto);

    List<StorageItemResponseDto> updatePiecesSold(List<SoldItemRequestDto> itemsSoldDtos);

    StorageItemResponseDto getById(Long id);
}
