import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { FavCharacters } from 'src/app/models/fav-characters';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterserviceService } from 'src/app/services/characterservice.service';
import { FavCrudService } from 'src/app/services/fav-crud.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character
  @Input() favs: FavCharacters;
  isFavorite:boolean = false;
  isAuth: boolean = false;
  constructor(private router: Router, private authHelper: AuthService, private favHelper: FavCrudService, private charHelper: CharacterserviceService) { }

  ngOnInit(): void {
    this.favoriteChecker();
    console.log(this.isFavorite);
  }

  favoriteChecker():void{
    if(this.favs){
      this.isFavorite = this.favs.favorites.includes(this.character.id);
    }
    
    this.isAuth = this.authHelper.isAuthenticated();
  }
  navigateToDescription(){
    this.router.navigateByUrl('chardetail/' + this.character.id);
  }
  removeFromFavs(){
    this.character.likes = this.character.likes - 1;
    this.charHelper.updateCharacter(this.character, this.character.$key);
    this.favs.favorites.splice(this.favs.favorites.indexOf(this.character.id),1);
    this.favHelper.updateFavorite(this.favs,this.favs.$key);
    this.isFavorite = false;
  }
  

  addToFavs(){
    if (this.character.haveLike == undefined){
      this.character.haveLike = true;
      this.character.likes = 1;
      this.charHelper.createCharacter(this.character);
      this.favs.favorites.push(this.character.id);
      this.favHelper.updateFavorite(this.favs,this.favs.$key);
    }
    else{
      this.character.likes++;
      this.charHelper.updateCharacter(this.character, this.character.$key);
      this.favs.favorites.push(this.character.id);
      this.favHelper.updateFavorite(this.favs,this.favs.$key);
    }
    this.isFavorite = true;
  }
}
