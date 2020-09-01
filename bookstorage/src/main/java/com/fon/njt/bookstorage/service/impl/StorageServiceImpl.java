package com.fon.njt.bookstorage.service.impl;

import com.fon.njt.bookstorage.dto.SoldItemRequestDto;
import com.fon.njt.bookstorage.dto.StorageItemRequestDto;
import com.fon.njt.bookstorage.dto.StorageItemResponseDto;
import com.fon.njt.bookstorage.exception.EntityAlreadyExistsException;
import com.fon.njt.bookstorage.exception.EntityNotFoundException;
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
    public StorageItemResponseDto getById(Long id) {
        final StorageItemEntity storageItem = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Storage item for book with id", id));
        return mapper.mapToDto(storageItem);
    }

    @Override
    public List<StorageItemResponseDto> getByIds(List<Long> bookIds) {
        List<StorageItemEntity> storageItems = repository.findByBookIdInAndInStockTrue(bookIds);
        return mapper.mapToDtos(storageItems);
    }

    @Override
    public StorageItemResponseDto getPiecesAvailable(Long id) {
        final StorageItemEntity storageItem = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Storage item for book", id));
        return mapper.mapToDto(storageItem);
    }

    @Override
    public List<Long> getBestsellersIds(Integer numberOfBestsellers) {
        final List<Long> bestSellersIds = repository.getBestSellerIds(numberOfBestsellers);
        return bestSellersIds;
    }

    @Override
    public StorageItemResponseDto save(StorageItemRequestDto dto) {
        if(repository.existsByBookId(dto.getBookId()))
            throw new EntityAlreadyExistsException("Storage item for book with id "+dto.getBookId());
        final StorageItemEntity storageItemToSave = mapper.mapToEntity(dto);
        storageItemToSave.setPiecesSold(0);
        final StorageItemEntity savedStorageItem = repository.save(storageItemToSave);
        return mapper.mapToDto(savedStorageItem);
    }

    @Override
    public StorageItemResponseDto updatePiecesAvailable(Long id, StorageItemRequestDto dto) {
        final StorageItemEntity storageItemToUpdate = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Storage item for book", id));
        storageItemToUpdate.setPiecesAvailable(dto.getPiecesAvailable());
        storageItemToUpdate.setInStock(dto.isInStock());
        final StorageItemEntity updatedStorageItem = repository.save(storageItemToUpdate);
        return mapper.mapToDto(updatedStorageItem);
    }

    @Override
    public List<StorageItemResponseDto> updatePiecesSold(List<SoldItemRequestDto> itemsSoldDtos) {
        List<StorageItemResponseDto> updatedItems = new ArrayList<>(itemsSoldDtos.size());
        for (SoldItemRequestDto itemSoldDto : itemsSoldDtos) {
            final StorageItemEntity storageItem = repository.findById(itemSoldDto.getBookId()).orElseThrow(()->new EntityNotFoundException("Storage item for book", itemSoldDto.getBookId()));

            final Integer updatedPiecesSold = storageItem.getPiecesSold()+itemSoldDto.getPiecesSold();
            storageItem.setPiecesSold(updatedPiecesSold);

            final Integer updatedPiecesAvailable = storageItem.getPiecesAvailable() - itemSoldDto.getPiecesSold();
            storageItem.setPiecesAvailable(updatedPiecesAvailable);

            final StorageItemEntity updatedStorageItem = repository.save(storageItem);
            updatedItems.add(mapper.mapToDto(updatedStorageItem));
        }
        return updatedItems;
    }

    @Override
    public StorageItemResponseDto delete(Long id) {
        final StorageItemEntity storageItemToDelete = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Storage item for book", id));
        storageItemToDelete.setInStock(false);
        final StorageItemEntity deletedStorageItem = repository.save(storageItemToDelete);
        return mapper.mapToDto(deletedStorageItem);
    }
}
