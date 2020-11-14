import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filterForm: FormGroup = null;
  constructor(private fb: FormBuilder) { }
  @Output() queryOUT = new EventEmitter<string>();
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.filterForm = this.fb.group({
      status : '',
      specie: '',
      type: '',
      gender: '',
      searchQuery: '',
    })
  }

  onSubmit(): void{
    let query: string = '';
    if(this.filterForm.get('status').value){
      query += `status=${this.filterForm.get('status').value}&`;
    }
    if(this.filterForm.get('specie').value){
      query += `species=${this.filterForm.get('specie').value}&`;
    }
    if(this.filterForm.get('type').value){
      query += `type=${this.filterForm.get('type').value}&`;
    }
    if(this.filterForm.get('gender').value){
      query += `gender=${this.filterForm.get('gender').value}&`;
    }
    if(this.filterForm.get('searchQuery').value){
      query += `name=${this.filterForm.get('searchQuery').value}&`;
    }
    if(query){
      query = query.substring(0,(query.length - 1));
    }
    console.log(query);
    this.queryOUT.emit(query);
  }
}
