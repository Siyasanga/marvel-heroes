import { Injectable } from '@angular/core';
import { Character } from '../models/Character'
import { CharacterProfile } from '../models/CharacterProfile'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  charactersUrl:string = 'http://localhost:3002/api/marvel/characters';
  profileUrl:string = 'http://localhost:3002/api/marvel/character/profile?characterId=';
  
  
  constructor(private http:HttpClient) { 
  }

  getCharacters(): Observable<Character[]> {
    this.http.get<Character[]>(this.charactersUrl)
    return this.http.get<Character[]>(this.charactersUrl);
  }

  getProfile({id}:Character): Observable<CharacterProfile> {
    this.http.get<CharacterProfile>(this.profileUrl+id);
    return this.http.get<CharacterProfile>(this.profileUrl+id);
  }
}
