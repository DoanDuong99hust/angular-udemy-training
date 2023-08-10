import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subcription: Subscription;

  constructor(private slService: ShoppingListService,
              private loggingService: LoggingService) {

  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index)
  }

  ngOnInit(): void {
    this.loggingService.printLog('Hello from Shopping List ngOnInit')
    this.ingredients = this.slService.getIngredients();
    this.subcription = this.slService.ingredientChanged
    .subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients
    })
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
