import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { Direction } from "@angular/cdk/bidi";

import {
  LocaleService,
  TranslationService,
  SearchService,
  L10N_CONFIG,
  L10nConfigRef
} from "angular-l10n";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular";
  dir: Direction;

  constructor(
    @Inject(L10N_CONFIG) private configuration: L10nConfigRef,
    private locale: LocaleService,
    private translation: TranslationService,
    private search: SearchService
  ) {}

  ngOnInit() {
    this.search.updateHead("app");

    this.translation.translationChanged().subscribe(() => {
      this.dir = this.locale.getLanguageDirection() as Direction;
    });

    this.translation.translationError.subscribe(error => {
      if (error) {
        console.log(error);
      }
    });
  }

  selectLocale(
    language: string,
    country: string,
    numberingSystem: string,
    currency: string,
    zoneName: string
  ): void {
    this.locale.setDefaultLocale(language, country, "", numberingSystem);
    this.locale.setCurrentCurrency(currency);
    this.locale.setCurrentTimezone(zoneName);
  }
}
