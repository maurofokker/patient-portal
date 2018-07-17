import { NgModule } from '@angular/core';

import { PatientPortalSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PatientPortalSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PatientPortalSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PatientPortalSharedCommonModule {}
