import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportBugsPage } from './report-bugs';

@NgModule({
  declarations: [
    ReportBugsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportBugsPage),
  ],
})
export class ReportBugsPageModule {}
