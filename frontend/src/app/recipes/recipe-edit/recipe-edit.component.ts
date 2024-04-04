import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";
import {Recipe} from "../recipe";
import {FormArray, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RecipeEditComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  private recipeIndex: number;
  private recipe: Recipe;
  private isNew = true;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private sls: RecipeService,
              private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
    (params: any) => {
      if (params.hasOwnProperty('id')){
        this.isNew = false;
        this.recipeIndex = +params['id'];
        this.recipe = this.sls.getRecipe(this.recipeIndex);
      } else {
        this.isNew = true;
        this.recipe = null;
      }
      this.initForm();
    }

    );
  }

  onSubmit(){
    const newRecipe = this.recipeForm.value;
    if (this.isNew){
      this.sls.addRecipe(newRecipe);
    } else {
      this.sls.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel(){
    this.navigateBack();
  }

  onAddItem(name: string, amount: string){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [Validators.required, Validators.pattern("\\d+")])
      })
    )
  }

  onRemoveItem(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm(){
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    let recipeIngredients : FormArray = new FormArray([]);

    if(!this.isNew){
      if (this.recipe.hasOwnProperty('ingredients')){
        for (let i = 0; i < this.recipe.ingredients.length; i++){
          recipeIngredients.push(
            new FormGroup({
                name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
                amount: new FormControl(this.recipe.ingredients[i].amount, [Validators.required, Validators.pattern("\\d+")])
              }
            )
          )
        }
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;


    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  private navigateBack(){
    this.router.navigate(['../']);
  }

  get formData() { 
    return <FormArray>this.recipeForm.get('ingredients'); 
  }

}
