import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";
import {CommonModule} from '@angular/common';
import {ShoppingListAddComponent} from './shopping-list-add.component'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  standalone: true,
  imports: [CommonModule, ShoppingListAddComponent],
})
export class ShoppingListComponent implements OnInit {
  items: Ingredient[] = [];
  selectedItem: Ingredient|null = null;

  constructor(private sls: ShoppingListService) {}

  ngOnInit() {
    this.items = this.sls.getItems();
  }

  onSelectItem(item: Ingredient){
    this.selectedItem = item;
  }

  onCleared(){
    this.selectedItem = null;
  }

}
