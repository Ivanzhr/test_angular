import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

interface TodoItem {
  id: number;
  name: string;
  priority: string;
  description: string;
  date_done: any;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  public checkingForBtn:boolean = true;

  public obj = {
    id: 0,
    name: '',
    priority: 'терміново',
    description: '',
    date_done: new Date().toISOString().split('T')[0]
  }

  public inputValue: any | null = null;
  public selectValue: string = 'name'

  public selectedTimetValue: string = 'all'
  public sortValue: string = 'none'

  constructor(private arrTodo: ServiceService){}

  addTodo(){
    if(this.obj.name !== '' && this.obj.description !== ''){
    const todoItem: TodoItem = {
      id: this.arrTodo.arr.length + 1, 
      name: this.obj.name,
      priority: this.obj.priority,
      description: this.obj.description,
      date_done: this.obj.date_done 
    };
    this.arrTodo.setTodo(todoItem);
    this.obj.name = '';
    this.obj.priority = 'терміново';
    this.obj.description = '';
    this.obj.date_done = new Date().toISOString().split('T')[0]
    console.log(this.obj.date_done);
  }}

  changeTodoItem(){
    this.checkingForBtn = true;
    const todoItem: TodoItem = { 
      id: this.obj.id, 
      name: this.obj.name,
      priority: this.obj.priority,
      description: this.obj.description,
      date_done: this.obj.date_done 
    };
    this.arrTodo.saveEdit(todoItem)
    this.obj.name = '';
    this.obj.priority = 'urgently';
    this.obj.description = '';
    this.obj.date_done = new Date().toISOString().split('T')[0]
    console.log(todoItem)
  }

  search():void{
    if(this.inputValue !== null){
      this.arrTodo.search(this.inputValue, this.selectValue);
    }
  }

  selectTimeForView():void {
    this.arrTodo.getForView(this.selectedTimetValue)
  }

  sort():void{
    this.arrTodo.getToSort(this.sortValue)
    console.log(this.sortValue)
  }

  ngOnInit(){
    this.arrTodo.data$.subscribe(data => {
      this.obj = data;
      this.checkingForBtn = false
      console.log(this.obj.id)
    });
    
  }


}

