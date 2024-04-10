import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface TodoItem {
  id: number;
  name: string;
  priority: string
  description: string;
  date_done: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // editedItem: TodoItem | undefined;

  today = new Date();

  arr: TodoItem[] = [
    {
      id: 1,
      name: 'Презентація',
      priority: 'низький',
      description: 'Підготувати інформаційну презентацію для наступного збору',
      date_done: '2024-04-16'
    },
    {
      id: 2,
      name: 'Електронна пошта',
      priority: 'середній',
      description: 'Перевірити та відповісти на електронні листи',
      date_done: '2024-04-13'
    },
    {
      id: 3,
      name: 'Спорт',
      priority: 'терміново',
      description: 'Зайнятися фізичною активністю протягом 30 хвилин.',
      date_done: '2024-04-15'
    },
    {
      id: 4,
      name: 'Покупки',
      priority: 'високий',
      description: 'Зробити список покупок для супермаркету',
      date_done: '2024-05-10'
    },
    {
      id: 5,
      name: 'Прибирання',
      priority: 'низький',
      description: 'Прибрати робоче місце або оселю',
      date_done: '2024-04-25'
    },
    {
      id: 6,
      name: 'Робота',
      priority: 'низький',
      description: 'Переглянути і підготувати необхідні матеріали для наступного робочого проєкту',
      date_done: '2024-06-14'
    },
    {
      id: 7,
      name: 'Робота',
      priority: 'високий',
      description: 'Підготувати список подяки або повідомлення для колег, які допомогли у минулому тижні',
      date_done: '2024-05-25'
    },
    {
      id: 8,
      name: 'Особистіть',
      priority: 'середній',
      description: 'Провести аналіз власних цілей та планів на майбутнє',
      date_done: '2024-07-26'
    }
  ]

  searchArr = [...this.arr]

  setTodo(value: TodoItem): void {
    this.arr.push(value)
    console.log(this.arr)
  }

  getTodo(): TodoItem[] {
    return this.arr
  }

  remove(value: number): void {
    this.arr = this.arr.filter(elem => elem.id !== value)
    console.log(this.arr)
  }

  getSearch() {
    return this.searchArr
  }

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  edit(value: number): void {
    const editedItem = this.arr.find(elem => elem.id === value);
    const itemCopy = JSON.parse(JSON.stringify(editedItem))
    this.dataSubject.next(itemCopy);
    console.log(itemCopy)
  }

  saveEdit(value:any){
    const index = this.arr.findIndex(elem => elem.id === value.id);
    this.arr[index] = value;
    console.log(this.arr)
  }

  private dataSubjectForSearch = new Subject<any>();
  dataForSearch$ = this.dataSubjectForSearch.asObservable();

  search(inputValue: string, selectValue: string) {
    this.searchArr = this.arr.filter(elem => elem[selectValue as keyof TodoItem] === inputValue);
    this.dataSubjectForSearch.next(this.searchArr)
  }

  getForView(value: string) {
    this.searchArr = [...this.arr]
    if (value === 'day') {
      this.searchArr = this.searchArr.filter(elem => {
        const itemDate = new Date(elem.date_done);
        return itemDate.getDate() === this.today.getDate() &&
          itemDate.getMonth() === this.today.getMonth() &&
          itemDate.getFullYear() === this.today.getFullYear();
      });
      console.log(this.searchArr);
    } else if (value === 'week') {
      const nextMonthFirstDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1);
      const endOfWeek = new Date(nextMonthFirstDay.getTime() - 86400000 * (nextMonthFirstDay.getDay() + 1));
      this.searchArr = this.searchArr.filter(elem => {
        const itemDate = new Date(elem.date_done);
        return itemDate <= endOfWeek;
      });
      console.log(this.searchArr);
    } else if (value === 'mounth') {
      const nextMonthFirstDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1);
      const endOfMonth = new Date(nextMonthFirstDay.getTime() - 86400000);
      this.searchArr = this.searchArr.filter(elem => {
        const itemDate = new Date(elem.date_done);
        return itemDate <= endOfMonth;
      });
      console.log(this.searchArr);
    } 
    this.dataSubjectForSearch.next(this.searchArr)
  }

  getToSort(elem: string):void {
    if (elem === 'priority') {
      this.searchArr.sort((a, b) => {
        if (a.priority === b.priority) {
          return 0;
        } else if (a.priority === 'низький' && b.priority !== 'низький') {
          return 1;
        } else if (a.priority === 'середній' && (b.priority === 'високий' || b.priority === 'терміново')) {
          return 1;
        } else if (a.priority === 'високий' && b.priority === 'терміново') {
          return 1;
        } else {
          return -1;
        }
      });
    } else if (elem === 'date_done') {
      this.searchArr.sort((a, b) => {
        const dateA = new Date(a.date_done).getTime();
        const dateB = new Date(b.date_done).getTime();

        return dateA - dateB;
      })
    } else {
      this.searchArr.sort((a, b) => {
        return a.id - b.id;
      })
    }
    this.dataSubjectForSearch.next(this.searchArr)
    console.log(this.searchArr)
  }
  constructor() { }
}
