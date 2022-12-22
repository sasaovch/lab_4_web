package com.lab4.backend.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.lab4.backend.backend.model.Attempt;
import com.lab4.backend.backend.model.User;

@Repository
public interface AttemptRepository extends PagingAndSortingRepository<Attempt, Long>{
    void deleteAllByUser(User user);
    Page<Attempt> findAllByUser(User user, Pageable pageable);

    void save(Attempt attempt);
}
