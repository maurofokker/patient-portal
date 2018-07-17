import { IUser } from 'app/core';

export class Appointment implements IUser {
    constructor(
        public id?: number,
        public reason?: string,
        public insuranceChange?: boolean,
        public phoneNumber?: string,
        public userAppointment?: IUser,
    ) {
        this.insuranceChange = false;
    }
}
