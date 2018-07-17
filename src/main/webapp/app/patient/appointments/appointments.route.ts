import { Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsPopupComponent } from './appointments-dialog.component';
import { UserRouteAccessService } from 'app/core';

export const appointmentsRoute: Routes = [
    {
        path: 'patient-appointments',
        component: AppointmentsComponent,
        data: {
            authorities: ['ROLE_PATIENT'],
            pageTitle: 'Appointments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appointmentsPopupRoute: Routes = [
    {
        path: 'patient-appointments-new',
        component: AppointmentsPopupComponent,
        data: {
            authorities: ['ROLE_PATIENT'],
            pageTitle: 'Appointments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
