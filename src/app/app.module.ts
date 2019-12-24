import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { environment } from "../environments/environment";
import { ChildModule} from "./child.module"
import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  LocalizationExtraModule,
  LocaleSeoModule,
  LocaleValidationModule,
  StorageStrategy,
  ProviderType,
  ISOCode,
  LogLevel
} from "angular-l10n";

const l10nConfig: L10nConfig = {
  logger: {
    level: environment.production ? LogLevel.Off : LogLevel.Warn
  },
  locale: {
    languages: [{ code: "en", dir: "ltr" }, { code: "ar", dir: "rtl" }],
    defaultLocale: {
      languageCode: "en",
      countryCode: "US",
      numberingSystem: "latn"
    },
    currency: "USD",
    timezone: "America/Los_Angeles",
    storage: StorageStrategy.Cookie,
    cookieExpiration: 30
  },
  translation: {
    providers: [
      {
        type: ProviderType.Static,
        prefix: "./assets/localization/localization-login-"
      }
    ],
    caching: true,
    version: "8.0.0",
    rollbackOnError: true,
    composedKeySeparator: ".",
    missingValue: "No key",
    i18nPlural: true
  },
  localizedRouting: {
    format: [ISOCode.Language, ISOCode.Country],
    defaultRouting: false,
    schema: [
      {
        text: "English",
        languageCode: "en",
        countryCode: "US",
        numberingSystem: "latn",
        currency: "USD",
        timezone: "America/Los_Angeles"
      },
      {
        text: "العربية",
        languageCode: "ar",
        countryCode: "JO",
        numberingSystem: "arab",
        currency: "JOR",
        timezone: "Asia/Amman"
      }
    ]
  }
};

// Advanced initialization.
export function initL10n(l10nLoader: L10nLoader): Function {
  return () => l10nLoader.load();
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    LocalizationModule.forRoot(l10nConfig),
    LocalizationExtraModule,
    LocaleSeoModule.forRoot(),
    LocaleValidationModule.forRoot(),
    ChildModule
  ],
  providers: [{
            provide: APP_INITIALIZER,
            useFactory: initL10n,
            deps: [L10nLoader],
            multi: true
        }],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
