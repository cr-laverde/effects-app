import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import * as usersActions from "../actions";
import { loadUsersError, loadUsersSuccess } from "../actions";

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {}

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType( usersActions.loadUsers ), // se valida que sólo se escuche la acción deseada
            tap( data => console.log('effect tap', data) ), // informativo, imprime como va fluyenod la información en el observable
            mergeMap(
                () => this.userService.getUsers()
                    .pipe(
                        map( users => loadUsersSuccess({ users: users }) ),
                        catchError( err => of(loadUsersError({ payload: err })) )
                    )
            ) // dispara un nuevo observable y lo mezcla con el anterior
        )
    );
}