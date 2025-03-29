package com.example.project.services.serviceImp;

import com.example.project.DTO.BookingDTO;
import com.example.project.entities.Booking;
import com.example.project.entities.Owner;
import com.example.project.entities.enums.BookingStatus;
import com.example.project.entities.Flat;
import com.example.project.entities.Tenant;
import com.example.project.entities.enums.FlatStatus;
import com.example.project.repositories.BookingRepository;
import com.example.project.repositories.FlatRepository;
import com.example.project.repositories.OwnerRepository;
import com.example.project.repositories.TenantRepository;
import com.example.project.services.interfaces.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private FlatRepository flatRepository;
    @Autowired
    private OwnerRepository ownerRepository;

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Tenant tenant = tenantRepository.findById(bookingDTO.getTenantId())
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        Flat flat = flatRepository.findById(bookingDTO.getFlatId())
                .orElseThrow(() -> new RuntimeException("Flat not found"));

        if (flat.getStatus() != FlatStatus.AVAILABLE) {
            throw new RuntimeException("Flat is not available for booking");
        }

        Booking booking = new Booking();
        booking.setTenant(tenant);
        booking.setFlat(flat);
        booking.setStartDate(bookingDTO.getStartDate());
        booking.setEndDate(bookingDTO.getEndDate());
        booking.setStatus(BookingStatus.PENDING);

        Booking savedBooking = bookingRepository.save(booking);

        return new BookingDTO(
                savedBooking.getId(),
                savedBooking.getTenant().getId(),
                savedBooking.getFlat().getId(),
                savedBooking.getStartDate(),
                savedBooking.getEndDate(),
                savedBooking.getStatus()
        );
    }

    @Override
    public BookingDTO getBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        return new BookingDTO(
                booking.getId(),
                booking.getTenant().getId(),
                booking.getFlat().getId(),
                booking.getStartDate(),
                booking.getEndDate(),
                booking.getStatus()
        );
    }

@Override
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(booking -> new BookingDTO(
                        booking.getId(),
                        booking.getTenant().getId(),
                        booking.getFlat().getId(),
                        booking.getStartDate(),
                        booking.getEndDate(),
                        booking.getStatus()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingDTO> getBookingsByTenant(Long tenantId) {

        Tenant tenant = tenantRepository.findById(tenantId)
                .orElseThrow(() -> new RuntimeException("Tenant not found"));

        return bookingRepository.findByTenant(tenant).stream()
                .map(booking -> new BookingDTO(
                        booking.getId(),
                        booking.getTenant().getId(),
                        booking.getFlat().getId(),
                        booking.getStartDate(),
                        booking.getEndDate(),
                        booking.getStatus()
                ))
                .collect(Collectors.toList());
    }


    @Override
    public void cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.CANCELED) {
            throw new RuntimeException("Booking is already canceled.");
        }

        booking.setStatus(BookingStatus.CANCELED);
        bookingRepository.save(booking);
    }


    @Override
    public List<BookingDTO> getBookingsByOwner(Long ownerId) {

        Owner owner = ownerRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        //Find all bookings where the flat belongs to this owner
        return bookingRepository.findByFlatOwner(owner).stream()
                .map(booking -> new BookingDTO(
                        booking.getId(),
                        booking.getTenant().getId(),
                        booking.getFlat().getId(),
                        booking.getStartDate(),
                        booking.getEndDate(),
                        booking.getStatus()
                ))
                .collect(Collectors.toList());
    }


    @Override
    public void updateBookingStatus(Long bookingId, BookingStatus status) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(()->new RuntimeException("Booking not found"));

        booking.setStatus(status);
        bookingRepository.save(booking);
    }
}
