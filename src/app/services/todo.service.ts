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

  getTasks(): Observable<any>{
    return this.http.get(`${BASE_URL}/all`);
  }

  getTaskById(id: number): Observable<any>{
    return this.http.get(`${BASE_URL}/show/${id}`);
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(`${BASE_URL}/new`, task);
  }

  doneTask(id: number): Observable<any> {
    return this.http.put(`${BASE_URL}/done/${id}`, null);
  }

  editTask(newTask: Task): Observable<any>{
    return this.http.put(`${BASE_URL}/update/${newTask.id}`, newTask);
  }

  removeTask(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/delete/${id}`);
  }

  removeAll(): Observable<any> {
    return this.http.delete(BASE_URL);
  }

}


