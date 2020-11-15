import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Character } from 'src/app/models/character';
import { FavCharacters } from 'src/app/models/fav-characters';
import { CharacterserviceService } from 'src/app/services/characterservice.service';
import { FavCrudService } from 'src/app/services/fav-crud.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  characterArrayTotal: Array<Character> = [];
  currentUserFavs: FavCharacters;
  allLikes: Array<FavCharacters>;
  constructor(private charHelper: CharacterserviceService, private userHelper: FavCrudService) { }

  ngOnInit(): void {
    this.getCurrentFavs();
  }

  getCurrentFavs(){
    this.userHelper.getAllFavorites().subscribe((favs) => {
      this.allLikes = favs.map((element) => ({
        ...element.payload.doc.data(),
        $key: element.payload.doc.id
      } as FavCharacters) 
      );
      this.currentUserFavs = this.allLikes.find((fav) => {
        return fav.userId == JSON.parse(localStorage.getItem('currentUser'))['user']['uid'];
      })
      this.charHelper.getAllCharacters().subscribe((response) => {
        this.characterArrayTotal = response.map((element) => ({
          ...element.payload.doc.data(),
          $key: element.payload.doc.id
        }) as Character)
        console.log(this.characterArrayTotal,'and',this.allLikes);
        this.characterArrayTotal = this.characterArrayTotal.filter((char) => {
          return this.currentUserFavs.favorites.includes(char.id);
        })
      })
  })
}
}
