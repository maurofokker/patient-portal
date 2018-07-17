import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {Principal} from '../../core/auth/principal.service';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {Appointment} from './appointments.model';
import {AppointmentsService} from './appointments.service';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'jhi-patient-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.css']
})
export class AppointmentsComponent implements OnInit, OnDestroy {
    appointments: Appointment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private appointmentService: AppointmentsService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.appointmentService.query().subscribe(
            (res: HttpResponse<Appointment[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAppointments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Appointment) {
        return item.id;
    }
    registerChangeInAppointments() {
        this.eventSubscriber = this.eventManager.subscribe('appointmentListModification', response => this.loadAll());
    }

    private onSuccess(data, headers) {

        this.appointments = data;
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
