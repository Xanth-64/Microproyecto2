import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Character } from '../models/character';
@Injectable({
  providedIn: 'root'
})
export class CharacterserviceService {
  private CharacterCollection: AngularFirestoreCollection<Character>
  constructor(private db: AngularFirestore) { 
    this.CharacterCollection = db.collection<Character>('characters')
  }


  getAllCharacters(): Observable<DocumentChangeAction<Character>[]> {
    return this.CharacterCollection.snapshotChanges();
  }

  createCharacter(newChar: Character): Promise<DocumentReference>{
    return this.CharacterCollection.add(newChar);
  }

  updateCharacter(newChar: Character, iD: string): Promise<void>{
    return this.CharacterCollection.doc<Character>(iD).update(newChar)
  }

  uniteCharacterArrays(fireArr: Array<Character>, apiArr: Array<Character>): Array<Character>{

    return apiArr.map((character) => {
      const tempArr = fireArr.find((element) => {
        element.id = character.id;
      })
      if(tempArr){ return tempArr};
      return character;
    })
  }  
}
