import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ingredient } from "../interfaces/ingredient.interface";

@Injectable({ providedIn: "root" })
export class PanierService {
  public ingredients$: BehaviorSubject<Ingredient[]> = new BehaviorSubject(
    null
  );

  constructor() {}

  addPanier(ingredients: Ingredient[]): void {
    const currentValue = this.ingredients$.value;
    if (currentValue) {
      const obj = [...currentValue, ...ingredients].reduce((acc, value) => {
        if (acc[value.name]) {
          acc[value.name] += value.quantity;
        } else {
          acc[value.name] = value.quantity;
        }
        return acc;
      }, {});
      const result = Object.keys(obj).map(key => ({
        name: key,
        quantity: obj[key]
      }));
      this.ingredients$.next(result);
    } else {
      this.ingredients$.next(ingredients);
    }
  }
}
