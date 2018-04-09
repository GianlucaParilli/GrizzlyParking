import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaysurveyPage } from './daysurvey';

@NgModule({
  declarations: [
    DaysurveyPage,
  ],
  imports: [
    IonicPageModule.forChild(DaysurveyPage),
  ],
})
export class DaysurveyPageModule {}
