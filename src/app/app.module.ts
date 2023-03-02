import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CamaraComponent } from './components/camara/camara.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichadasComponent } from './components/fichadas/fichadas.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PersonaIngresoComponent } from './components/persona-ingreso/persona-ingreso.component';
import { QRCodeModule } from 'angularx-qrcode';
import { QrCodeComponent } from './components/qr-code/qr-code.component';

@NgModule({
  declarations: [
    AppComponent,
    CamaraComponent,
    FichadasComponent,
    PersonaIngresoComponent,
    QrCodeComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    QRCodeModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
