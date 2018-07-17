package com.poc.patientportal.repository;

import java.util.List;

import com.poc.patientportal.domain.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
	List<Appointment> findByUserId(Long userId);
}
