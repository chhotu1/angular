import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AdminModule } from './admin/admin.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module'
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent} from './auth/register/register.component'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChatComponent } from './chat/chat.component';
import { AuthModule } from './auth/auth.module';
import { from } from 'rxjs';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuardGuard } from './guard/role-guard.guard';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    ChatComponent,
    // LoginComponent,
    // RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    AppRoutingModule,
    AdminModule,
    HomeModule,
    UserModule
    // AuthModule
  ],
  providers: [AuthGuard,RoleGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
