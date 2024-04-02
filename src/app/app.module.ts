import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoComponent } from './component/todo/todo.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './component/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
