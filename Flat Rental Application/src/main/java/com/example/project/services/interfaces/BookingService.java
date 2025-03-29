package com.example.project.services.interfaces;

import com.example.project.DTO.BookingDTO;
import com.example.project.entities.enums.BookingStatus;

import java.util.List;

public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO);
    BookingDTO getBooking(Long id);
    List<BookingDTO> getAllBookings();

    List<BookingDTO> getBookingsByTenant(Long tenantId);

    void cancelBooking(Long bookingId);

    List<BookingDTO> getBookingsByOwner(Long ownerId);

    void updateBookingStatus(Long bookingId, BookingStatus status);
}
