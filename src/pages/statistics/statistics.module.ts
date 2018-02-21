import { ProgressBarModule } from 'angular-progress-bar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatisticsPage } from './statistics';

@NgModule({
  declarations: [
    StatisticsPage,
  ],
  imports: [
    ProgressBarModule,
    IonicPageModule.forChild(StatisticsPage),
  ],
})
export class StatisticsPageModule {}
