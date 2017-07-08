import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { HttpModule }          from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent }      from './home.component';
import { ExperienceComponent } from './experience.component'
import { HttpService } from './http.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        HomeComponent, ExperienceComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        HttpService
    ]
})
export class HomeModule {
}
