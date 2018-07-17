package com.poc.patientportal.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.poc.patientportal.domain.Appointment;
import com.poc.patientportal.domain.User;
import com.poc.patientportal.security.SecurityUtils;
import com.poc.patientportal.service.AppointmentService;
import com.poc.patientportal.service.UserService;
import com.poc.patientportal.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for managing appointments
 */
@RestController
@RequestMapping("/api")
public class AppointmentResource {

    private static final Logger log = LoggerFactory.getLogger(AppointmentResource.class);

    private static final String ENTITY_NAME = "appointment";

    private AppointmentService appointmentService;
    private UserService userService;

    /**
     *
     */
    public AppointmentResource(AppointmentService appointmentService, UserService userService) {
        this.appointmentService = appointmentService;
        this.userService = userService;
    }

    @GetMapping("/appointments")
    @Timed
    public List<Appointment> getAllAppointments() {
        Optional<User> user = userService.getUserWithAuthoritiesByLogin(SecurityUtils.getCurrentUserLogin().get());
        Long userId = user.get().getId();
        return appointmentService.findAllByUser(userId);
    }

    @PostMapping("/appointments")
    @Timed
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody Appointment appointment) throws Exception {
        log.debug("REST request to save Appointment : {}", appointment);
        if (appointment.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new appointment cannot already have an ID")).body(null);
        }
        appointment.setUserId(userService.getUserWithAuthorities().get().getId());
        Appointment newAppointment = appointmentService.save(appointment);
        return ResponseEntity
            .created(new URI("/api/appointments" + newAppointment.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, appointment.getId().toString()))
            .body(newAppointment);
    }
}
