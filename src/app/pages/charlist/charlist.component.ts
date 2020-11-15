import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/apiresponse';
import { Character } from 'src/app/models/character';
import { FavCharacters } from 'src/app/models/fav-characters';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterserviceService } from 'src/app/services/characterservice.service';
import { FavCrudService } from 'src/app/services/fav-crud.service';
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
  allLikes: Array<FavCharacters>;
  currentUserFavs: FavCharacters;
  back: string;
  next: string;  
  searchQuery: string = '';
  currentPage: number = 1;
  constructor(private charHelper: CharacterserviceService, private apiHelper: RequestService, private userHelper: FavCrudService, private authHelper: AuthService ) { 
    
  }

  ngOnInit(): void { 
    this.generatecharacterArrays(); 
    this.getUserFavs();
  }
  generatecharacterArrays(): void{
    let path =  'https://rickandmortyapi.com/api/character/?page=' + this.currentPage 
    if(this.searchQuery){
      path += `&${this.searchQuery}`;
    }
    console.log(path);
    this.apiHelper.getCharactersPage(path).subscribe((observed) => {
      if(observed){
      this.back = observed.info.prev;
      this.next = observed.info.next;
      this.characterArrayAPI = observed.results;
      this.characterArrayTotal = this.charHelper.uniteCharacterArrays(this.characterArrayFire, this.characterArrayAPI);
      console.log(this.characterArrayAPI);
      }
      else {
        alert('Busqueda Invalida, ningún personaje se adecua a su busqueda');
      }
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

  getUserFavs():void{
    this.userHelper.getAllFavorites().subscribe((favs) => {
      this.allLikes = favs.map((element) => ({
        ...element.payload.doc.data(),
        $key: element.payload.doc.id
      } as FavCharacters) 
      );
      if(this.allLikes && this.authHelper.isAuthenticated()){
        const temporalFavs = this.allLikes.find((element) => {
          return element.userId = JSON.parse(localStorage.getItem('currentUser'))['user']['uid'];
        })
        if(temporalFavs){
          //console.log("Leido");
          this.currentUserFavs = temporalFavs;          
        }
        else{
          this.currentUserFavs = {
            userId: JSON.parse(localStorage.getItem('currentUser'))['user']['uid'],
            favorites: []
          }
          this.userHelper.createFavorite(this.currentUserFavs);
          //console.log("creado por primera vez");
        }
      }
    })
  }

  manageQuery(queryString:string): void{
    this.searchQuery = queryString;
    this.currentPage = 1;
    this.generatecharacterArrays();
  }
  manageNumberChange(newNum: number): void{
    this.currentPage = newNum;
    this.generatecharacterArrays();
  }
} 
