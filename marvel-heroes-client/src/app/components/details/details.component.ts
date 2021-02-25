import { Component, OnInit, Input } from '@angular/core';
import { CharacterProfile } from '../../models/CharacterProfile'
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Character } from '../../models/Character'
import { MarvelService } from '../../services/marvel.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  constructor(private marvelService: MarvelService){ }

  @Input() profile: CharacterProfile = {
    name: "Siya",
    imagePath:"http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/standard_medium.jpg",
    stories: [
      {name: "X-Men: Alpha (1995) #1", title: "A Beginning", description: ""},
      {name: "Uncanny X-Men (1963) #402", title: "Utility of Myth", description: "The X-Men begin to investigate the X-Corps after t…scover that Banshee has been employing criminals."},
      {name: "Uncanny X-Men (1963) #404", title: "Army Ants", description: "Banshee loses control over the former villains in the X-Corps, costing Sunpyre her life."}
    ],
    comics: [
      {issueNumber: 1, title: "A Beginning", description: ""},
      {issueNumber: 3, title: "Utility of Myth", description: "The X-Men begin to investigate the X-Corps after t…scover that Banshee has been employing criminals."},
      {issueNumber: 3, title: "Army Ants", description: "Banshee loses control over the former villains in the X-Corps, costing Sunpyre her life."}
    ]
  };

  activeCharacter: Character  = { id: 1111, name: "Siya"}

  onInit() {
    this.activeCharacter = { id: 1111, name: "Siya"};
  }


  drop(event: CdkDragDrop<Character>) {
    this.getProfile(event.item.dropContainer.data[event.previousIndex]);
  }

  ngOnInit(): void {
  }

  getProfile(character:Character) {
    this.marvelService.getProfile(character).subscribe(profile => {
      this.profile = profile
    });
  }
}
