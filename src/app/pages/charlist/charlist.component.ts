import { Component, OnInit,SimpleChanges } from '@angular/core';
import { APIResponse } from 'src/app/models/apiresponse';
import { Character } from 'src/app/models/character';
import { CharacterserviceService } from 'src/app/services/characterservice.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-charlist',
  templateUrl: './charlist.component.html',
  styleUrls: ['./charlist.component.scss']
})
export class CharlistComponent implements OnInit {
  characterArrayAPI: Array<Character> = [];
  characterArrayFire: Array<Character> = [];
  characterArrayTotal: Array<Character> = [];
  searchQuery: string = '';
  currentPage: number = 1;
  constructor(private charHelper: CharacterserviceService, private apiHelper: RequestService) { 
    
  }

  ngOnInit(): void { 
    this.generatecharacterArrays(); 
  }
  generatecharacterArrays(): void{
    const path =  'https://rickandmortyapi.com/api/character/?page' + this.currentPage + this.searchQuery
    this.apiHelper.getCharactersByQuery(path).subscribe((observed) => {
      this.characterArrayAPI = observed.results;
      this.characterArrayTotal = this.charHelper.uniteCharacterArrays(this.characterArrayFire, this.characterArrayAPI);
    })
    this.charHelper.getAllCharacters().subscribe((characters) => {
      this.characterArrayFire = characters.map((element) => ({
        ...element.payload.doc.data(),
        $key: element.payload.doc.id
      } as Character)
      );
      this.characterArrayTotal = this.charHelper.uniteCharacterArrays(this.characterArrayFire, this.characterArrayAPI);
    })
  }
} 
