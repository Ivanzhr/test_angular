import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

interface TodoItem {
  id: number;
  name: string;
  priority: string
  description: string;
  date_done: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  
  public todoArr: TodoItem[] = [];
  
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.todoArr = this.service.getTodo();
    this.service.dataForSearch$.subscribe(data => {
      this.todoArr = data
    })
  }

  deleteItem(item:number){
    this.service.remove(item)
    this.todoArr = this.service.getTodo();
  }

  editItem(item:number) {
    this.service.edit(item)
  }
}
