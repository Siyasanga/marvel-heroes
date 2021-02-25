import { Component, OnInit, Input } from '@angular/core';
import { Character } from '../../models/Character';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  @Input() characters: Character[] = [];
  activeCharacter: Character = { id: 0, name: "" };
  
  constructor(private marvelService: MarvelService) { }

  drop(event: CdkDragDrop<Character[]>) {
  }

  ngOnInit(): void {
  }
  
  async getCharacters() {
    this.marvelService.getCharacters().subscribe(heroes => {
      this.characters = heroes
    });
  }
}
