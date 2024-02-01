/* Angular */
import { Injectable } from '@angular/core';

/* RxJs */
import { catchError, map, mergeMap, of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { changeLanguageError, changeLanguageLoad, changeLanguageSuccess } from './language.actions';
import { LanguageService } from 'src/app/shared/services/language.service';

/* Services */

@Injectable()
export class LanguageEffects {


  /* ----- Change Language -------------------------------------------------------------------------------------------------------------- */

  changeLanguageLoad$: CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeLanguageLoad),
      mergeMap(({ language }) => this.languageService.changeLanguage(language)
        .pipe(
          map(() => changeLanguageSuccess({ language })),
          catchError((error) => of(changeLanguageError({ error })))
        )
      )
    );
  });


  constructor(
    private readonly actions$: Actions,
    private readonly languageService: LanguageService
  ) { }

}
