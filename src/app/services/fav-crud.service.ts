import { Injectable } from '@angular/core';
import { FavCharacters } from '../models/fav-characters';

import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FavCrudService {
  private FavoriteCollection: AngularFirestoreCollection<FavCharacters>
  constructor(private db: AngularFirestore) {
    this.FavoriteCollection = this.db.collection<FavCharacters>('favorites')
   }

   getAllFavorites():Observable<DocumentChangeAction<FavCharacters>[]>{
     return this.FavoriteCollection.snapshotChanges();
   }

   createFavorite(newFavorite: FavCharacters):Promise<DocumentReference>{
      return this.FavoriteCollection.add(newFavorite);
   }

   updateFavorite(newFavorite:FavCharacters, iD : string){
     return this.FavoriteCollection.doc<FavCharacters>(iD).update(newFavorite);
   }

   
}
