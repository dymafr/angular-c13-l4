import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CocktailService } from "../../shared/services/cocktail.service";

@Component({
  selector: "app-cocktail-form",
  templateUrl: "./cocktail-form.component.html",
  styleUrls: ["./cocktail-form.component.scss"]
})
export class CocktailFormComponent implements OnInit {
  public cocktailForm: FormGroup;

  public get ingredients() {
    return this.cocktailForm.get("ingredients") as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private cocktailService: CocktailService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cocktailForm = this.fb.group({
      name: ["", Validators.required],
      img: ["", Validators.required],
      description: "",
      ingredients: this.fb.array([], Validators.required)
    });
  }

  public addIngredient(): void {
    this.ingredients.push(
      this.fb.group({
        name: ["", Validators.required],
        quantity: [0, Validators.required]
      })
    );
  }

  public submit(): void {
    this.cocktailService.addCocktail(this.cocktailForm.value);
    this.router.navigate([".."], { relativeTo: this.activatedRoute });
  }
}
