import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { AuthGuard } from '@core/guards/auth.guard';
import { AppLoaderModule } from '@shared/components/app-loader/loader.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppLoaderModule
  ],
  providers: [ AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
