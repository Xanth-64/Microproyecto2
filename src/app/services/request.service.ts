import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { APIResponse } from '../models/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public getCharactersPage(pageQuery: string): Observable<APIResponse>{
    return this.http.get<APIResponse>(pageQuery);
  }

  public getCharactersByQuery(queryString: string): Observable<APIResponse>{
    try {
      return this.http.get<APIResponse>(`https://rickandmortyapi.com/api/character/?${queryString}`);
    } catch (error) {
      return null;
    }
    
  }

  public getCharacterById(iD: number): Observable<APIResponse>{
    return this.http.get<APIResponse>(`https://rickandmortyapi.com/api/character/?${iD}`);
  }

  public getAllCharacters():Observable<APIResponse>{
    return this.http.get<APIResponse>('https://rickandmortyapi.com/api/character');
  }  
}

  
