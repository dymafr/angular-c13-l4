import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Cocktail } from "../../shared/interfaces/cocktail.interface";
import { CocktailService } from "../../shared/services/cocktail.service";
import { PanierService } from "../../shared/services/panier.service";

@Component({
  selector: "app-cocktail-details",
  templateUrl: "./cocktail-details.component.html",
  styleUrls: ["./cocktail-details.component.scss"]
})
export class CocktailDetailsComponent implements OnInit {
  public cocktail: Cocktail;

  constructor(
    private cocktailService: CocktailService,
    private panierService: PanierService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.cocktail = this.cocktailService.getCocktail(+paramMap.get("index"));
    });
  }

  public addToPanier() {
    this.panierService.addPanier(this.cocktail.ingredients);
  }
}
