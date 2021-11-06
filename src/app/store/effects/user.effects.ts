import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { loadUserError, loadUserSuccess } from "../actions";
import * as usersActions from "../actions";

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {}

    loadUser$ = createEffect(
        () => this.actions$.pipe(
            ofType( usersActions.loadUser ), // se valida que sólo se escuche la acción deseada
            tap( data => console.log('effect tap', data) ), // informativo, imprime como va fluyenod la información en el observable
            mergeMap(
                ( action ) => this.userService.getUserById( action.id )
                    .pipe(
                        map( user => loadUserSuccess({ user: user }) ),
                        catchError( err => of(loadUserError({ payload: err })) )
                    )
            ) // dispara un nuevo observable y lo mezcla con el anterior
        )
    );
}