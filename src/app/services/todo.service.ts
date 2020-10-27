import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/Task';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const {baseUrl: BASE_URL} = environment;



@Injectable({
  providedIn: 'root'
})
export class TodoService {
  tasks: Task[] = [];

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${BASE_URL}/all`);
  }

  getTaskById(id: number): Observable<Task[]>{
    return this.http.get<Task[]>(`${BASE_URL}/show/${id}`);
  }

  addTask(task: Task): Observable<Task[]> {
    return this.http.post<Task[]>(`${BASE_URL}/new`, task);
  }

  doneTask(id: number): Observable<Task[]> {
    return this.http.put<Task[]>(`${BASE_URL}/done/${id}`, null);
  }

  editTask(newTask: Task): Observable<Task[]>{
    return this.http.put<Task[]>(`${BASE_URL}/update/${newTask.id}`, newTask);
  }

  removeTask(id: number): Observable<Task[]> {
    return this.http.delete<Task[]>(`${BASE_URL}/delete/${id}`);
  }

  doneAll(): Observable<Task[]> {
    return this.http.delete<Task[]>(`${BASE_URL}/doneAll`);
  }

}


