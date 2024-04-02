import { Injectable } from '@angular/core';
import { FormComponent } from './component/form/form.component';

interface TodoItem {
  id: number;
  name: string;
  priority: string;
  description: string;
  date_done: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  editedItem: TodoItem | undefined;

  arr:TodoItem[] = [
    {id:1,
    name: 'Name',
    priority: 'Priority',
    description: 'Description',
    date_done: 'date'
    },
    {id:2,
    name: 'Name2',
    priority: 'Priority',
    description: 'Description',
    date_done: 'date'
    },
    {id:3,
    name: 'Name3',
    priority: 'Priority',
    description: 'Description',
    date_done: 'date'
    },
    {id:4,
    name: 'Name4',
    priority: 'Priority',
    description: 'Description',
    date_done: 'date'
    }
  ] 

  setTodo(value: TodoItem):void {
    this.arr.push(value)
  }

  getTodo():TodoItem[] {
    return this.arr
  }

  remove(value:number):void {
    this.arr = this.arr.filter(elem => elem.id !== value)
    console.log(this.arr)
  }

  edit(value: number): void {
    this.editedItem = this.arr.find(elem => elem.id === value);
  }

  constructor() { }
}
