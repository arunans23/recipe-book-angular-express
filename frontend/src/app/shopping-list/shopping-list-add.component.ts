import {Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ShoppingListAddComponent implements OnChanges {
  @Input('item')item: Ingredient;
  @Output() cleared = new EventEmitter();
  isAdd = true;

  constructor(private sls: ShoppingListService) { }

  ngOnChanges(changes: SimpleChanges){
    if (changes['item'].currentValue === null){
      this.item = {name: null, amount: null}
      this.isAdd = true;
    } else {
      this.isAdd = false;
    }
  }

  onSubmit(ingredient: Ingredient){
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
    if(!this.isAdd){
      this.sls.editItem(this.item, newIngredient);
      this.onClear();
    }else {
      this.item = newIngredient;
      this.sls.addItem(this.item);
    }
  }

  onDelete(){
    this.sls.deleteItem(this.item);
    this.onClear();
  }

  onClear(){
    this.isAdd = true;
    this.cleared.emit(null);
  }
}
