import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { loadUsers, loadUsersSuccess, loadUsersError } from '../actions';

export interface UsersState {
    users: User[];
    loaded: boolean;
    loading: boolean;
    error: any 
}

export const usersInitialState: UsersState = {
    users: [],
    loaded: false,
    loading: false,
    error: null
}

const _usersReducer = createReducer(usersInitialState,

    on(loadUsers, state => ({ ...state, loading: true})),

    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: [ ...users ],
        loading: false,
        loaded: true,
    })),

    on(loadUsersError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
    })),

);

export function usersReducer(state: UsersState | undefined, action: Action) {
    return _usersReducer(state, action);
}