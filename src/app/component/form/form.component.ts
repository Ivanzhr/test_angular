import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

interface TodoItem {
  id: number;
  name: string;
  priority: string;
  description: string;
  date_done: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  public obj = {
    name: '',
    priority: '',
    description: '',
    date_done: ''
  }

  constructor(private arrTodo: ServiceService){}

  addTodo(){
    if(Object.values(this.obj).every(value => value)){
    const todoItem: TodoItem = {
      id: this.arrTodo.arr.length + 1, 
      name: this.obj.name,
      priority: this.obj.priority,
      description: this.obj.description,
      date_done: this.obj.date_done
    };
    this.arrTodo.setTodo(todoItem);
    this.obj.name = '';
      this.obj.priority = '';
      this.obj.description = '';
      this.obj.date_done = '';
    console.log(this.arrTodo);
  }}

  addItemInForm(){
    console.log('a')
  }

}

