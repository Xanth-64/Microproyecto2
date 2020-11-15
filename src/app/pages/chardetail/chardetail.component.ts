import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { ActivatedRoute } from '@angular/router';
import { CharacterserviceService } from 'src/app/services/characterservice.service';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-chardetail',
  templateUrl: './chardetail.component.html',
  styleUrls: ['./chardetail.component.scss']
})
export class ChardetailComponent implements OnInit {
  characterArrayFire: Array<Character> = [];
  currentChat: Character;
  constructor(private charHelper: CharacterserviceService,private apiHelper: RequestService, private route: ActivatedRoute,) { }
  characterId: string;
  ngOnInit(): void {
    this.getNecesaryInfo()
  }

  getNecesaryInfo():void{
    this.route.paramMap.subscribe((params) => {
      this.characterId = params.get('currentCharId');
      this.apiHelper.getCharacterById(this.characterId).subscribe((character) =>{
        if(!this.currentChat){
          this.currentChat = character;
          console.log(character);
        }
        if(this.characterArrayFire){
          const tempChar = this.characterArrayFire.find((char) => {
            return char.id = this.currentChat.id;
          })
          if(tempChar){
            this.currentChat = tempChar;
          }
        }
      })
    })
    this.charHelper.getAllCharacters().subscribe((characters) => {
      this.characterArrayFire = characters.map((element) => ({
        ...element.payload.doc.data(),
        $key: element.payload.doc.id
      } as Character)
      );
      this.route.paramMap.subscribe((params) => {
        this.characterId = params.get('currentCharId');
        const tempChar = this.characterArrayFire.find((char) => {
          return char.id = parseInt(this.characterId);
        })
        if(tempChar){
          this.currentChat = tempChar;
        }
      })
    })
  }
}
