import {AppAction, AppActions, AppStore} from "./_types";

export function makeAction<T extends keyof AppActions>(name: T, data: AppActions[T]): AppAction<T> {
    return {type: name, data};
}

export const reduxCommits: {
    [ActionName in keyof AppActions]?: ((state: AppStore, data: AppAction<ActionName>) => AppStore)
} = {}

export function registerCommit<ActionName extends keyof AppActions>(
    actionName: ActionName,
    functor: (state: AppStore, data: AppAction<ActionName>) => AppStore
) {
    reduxCommits[actionName] = functor;
}