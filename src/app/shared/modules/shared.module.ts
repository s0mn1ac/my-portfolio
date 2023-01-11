/* Angular */
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Transloco */
import { TranslocoModule } from '@ngneat/transloco';

/* Application modules */
import { PipesModule } from './pipes.module';

/* Components */
import { AboutComponent } from "../components/about/about.component";
import { ContactComponent } from "../components/contact/contact.component";
import { FooterComponent } from "../components/footer/footer.component";
import { HomeComponent } from "../components/home/home.component";
import { MyDividerComponent } from "../components/my-divider/my-divider.component";
import { PortfolioComponent } from "../components/portfolio/portfolio.component";
import { TypeDeleteComponent } from "../components/type-delete/type-delete.component";

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    MyDividerComponent,
    PortfolioComponent,
    TypeDeleteComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    CommonModule,
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    MyDividerComponent,
    PortfolioComponent,
    TypeDeleteComponent
  ]
})
export class SharedModule { }
