package com.fon.njt.bookstorage.service.impl;

import com.fon.njt.bookstorage.dto.SoldItemRequestDto;
import com.fon.njt.bookstorage.dto.StorageItemRequestDto;
import com.fon.njt.bookstorage.dto.StorageItemResponseDto;
import com.fon.njt.bookstorage.mapper.StorageItemMapper;
import com.fon.njt.bookstorage.model.StorageItemEntity;
import com.fon.njt.bookstorage.repository.StorageItemRepository;
import com.fon.njt.bookstorage.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StorageServiceImpl implements StorageService {

    private final StorageItemRepository repository;
    private final StorageItemMapper mapper;

    @Autowired
    public StorageServiceImpl(StorageItemRepository repository, StorageItemMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<Long> getBestsellersIds(Integer numberOfBestsellers) {
        List<Long> bestSellersIds = repository.getBestSellerIds(numberOfBestsellers);
        return bestSellersIds;
    }

    @Override
    public StorageItemResponseDto delete(Long id) {
        final StorageItemEntity storageItemToDelete = repository.findById(id).get();
        storageItemToDelete.setInStock(false);
        final StorageItemEntity deletedStorageItem = repository.save(storageItemToDelete);
        return mapper.mapToDto(deletedStorageItem);
    }

    @Override
    public StorageItemResponseDto save(StorageItemRequestDto dto) {
        final StorageItemEntity storageItemToSave = mapper.mapToEntity(dto);
        storageItemToSave.setPiecesSold(0);
        final StorageItemEntity savedStorageItem = repository.save(storageItemToSave);
        return mapper.mapToDto(savedStorageItem);
    }

    @Override
    public StorageItemResponseDto updatePiecesAvailable(Long id, Integer piecesAvailable) {
        final StorageItemEntity storageItemToUpdate = repository.findById(id).get();
        storageItemToUpdate.setPiecesAvailable(piecesAvailable);
        final StorageItemEntity updatedStorageItem = repository.save(storageItemToUpdate);
        return mapper.mapToDto(updatedStorageItem);
    }

    @Override
    public List<StorageItemResponseDto> updatePiecesSold(List<SoldItemRequestDto> itemsSoldDtos) {
        List<StorageItemResponseDto> updatedItems = new ArrayList<>(itemsSoldDtos.size());
        for (SoldItemRequestDto itemSoldDto : itemsSoldDtos) {
            final StorageItemEntity storageItem = repository.findById(itemSoldDto.getBookId()).get();

            final Integer updatedPiecesSold = storageItem.getPiecesSold()+itemSoldDto.getPiecesSold();
            storageItem.setPiecesSold(updatedPiecesSold);

            final Integer updatedPiecesAvailable = storageItem.getPiecesAvailable() - itemSoldDto.getPiecesSold();
            storageItem.setPiecesAvailable(updatedPiecesAvailable);

            final StorageItemEntity updatedStorageItem = repository.save(storageItem);
            updatedItems.add(mapper.mapToDto(updatedStorageItem));
        }
        return updatedItems;
    }
}
