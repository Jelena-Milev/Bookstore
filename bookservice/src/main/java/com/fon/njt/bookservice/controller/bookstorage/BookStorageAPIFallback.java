package com.fon.njt.bookservice.controller.bookstorage;

import com.fon.njt.bookservice.dto.request.StorageItemRequestDto;
import com.fon.njt.bookservice.dto.response.StorageItemResponseDto;
import com.fon.njt.bookservice.exception.OperationNotAvailableException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BookStorageAPIFallback implements BookStorageAPI {

    @Override
    public List<Long> getBestsellersIds(Integer numberOfBestsellers) {
        return new ArrayList<>();
    }

    @Override
    public StorageItemResponseDto getBookPiecesAvailable(Long id) {
        return null;
    }

    @Override
    public StorageItemResponseDto createBookStorageItem(StorageItemRequestDto dto) {
        return null;
    }

    @Override
    public StorageItemResponseDto updatePiecesAvailable(Long id, StorageItemRequestDto dto) {
        return null;
    }

    @Override
    public StorageItemResponseDto deleteBookStorageItem(Long id) {
        return null;
    }
}
