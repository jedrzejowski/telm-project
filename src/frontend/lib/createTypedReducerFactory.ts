import * as sagaEffects from "redux-saga/effects";
import {useDispatch, useSelector} from "react-redux";
import {throws} from "assert";

interface Dictionary<T = any> {
    [name: string]: T
}

interface Action<Actions extends Dictionary, Key extends keyof Actions> {
    type: Key
    data: Actions[Key]
}

type SagaEffectFunctor<State extends Dictionary, Actions extends Dictionary> =
    <Key extends keyof Actions>(
        pattern: Key | ((name: Key, data: Actions[Key]) => boolean),
        f: (data: Actions[Key]) => Generator<any, any, any>
    ) => void

export interface TypedReducer<State extends Dictionary, Actions extends Dictionary> {

    makeAction: <Key extends keyof Actions>(name: Key, data: Actions[Key]) => Action<Actions, Key>

    useDispatch: () => <Key extends keyof Actions>(key: Key, data: Actions[Key]) => void

    useSelector: <T>(functor: (state: State) => T, equalityFn?: (left: T, right: T) => boolean) => T

    setReducer: <Key extends keyof Actions>(key: Key, reducer: (state: State, data: Actions[Key]) => State) => void

    sagaTakeLeading: SagaEffectFunctor<State, Actions>
    sagaTakeEvery: SagaEffectFunctor<State, Actions>

    mySaga: () => Generator
    myApp: (state: State | undefined, action: Action<Actions, any>) => State

    sagaPut: <Key extends keyof Actions>(name: Key, data: Actions[Key]) => ReturnType<typeof sagaEffects.put>

    ref: {
        stateSelector: (state: any) => State
    }
}

let i = 0;

export default function <State extends Dictionary, Actions extends Dictionary>(args: {
    prefix?: string
    initState: State,
    // sagaEffects?:
    // sagaCatch?: (error: any) => void
}): TypedReducer<State, Actions> {
    const {
        initState,
        prefix = `PREFIX${++i}_`
    } = args;

    const ref: TypedReducer<State, Actions>["ref"] = {
        stateSelector: () => {
            throw new Error("this typed reducer was not combined");
        }
    }

    const reducers: { [Key in keyof Actions]?: ((state: State, data: Actions[Key]) => State) } = {};
    const sagas: (() => void)[] = [];

    function makeAppAction<Key extends keyof Actions>(key: Key, data: Actions[Key]): Action<Actions, Key> {
        // @ts-ignore
        return {type: prefix + key, data};
    }

    function useAppDispatch() {
        const dispatch = useDispatch();

        return <Key extends keyof Actions>(key: Key, data: Actions[Key]) => {
            dispatch(makeAppAction(key, data));
        }
    }

    function useAppSelector<T>(functor: (state: State) => T, equalityFn?: (left: T, right: T) => boolean): T {
        return useSelector(state => functor(ref.stateSelector(state)), equalityFn)
    }

    function setReducer<Key extends keyof Actions>(key: Key, reducer: (state: State, data: Actions[Key]) => State) {

        if (reducers[prefix + key]) {
            console.warn("overriding key " + key);
        }

        // @ts-ignore
        reducers[prefix + key] = reducer;
    }

    function wrapSaga(sagaF: any): SagaEffectFunctor<State, Actions> {
        return (pattern, myF) => {
            let saga_pattern: any;

            if (typeof pattern === "string") {
                saga_pattern = prefix + pattern;
            } else if (typeof pattern === "function") {
                saga_pattern = (action: Action<Actions, any>) => {
                    if (action.type.substr(0, prefix.length) !== prefix) {
                        return false
                    } else {
                        return pattern(action.type.substr(prefix.length), action.data);
                    }
                }
            } else {
                throw new Error();
            }

            sagas.push(() => sagaF(saga_pattern, (action: any) => myF(action.data)));
        }
    }

    const sagaTakeLeading = wrapSaga(sagaEffects.takeLeading);
    const sagaTakeEvery = wrapSaga(sagaEffects.takeEvery);

    function* mySaga() {
        for (const saga of sagas) {
            yield saga();
        }
    }

    function myApp(state: State = initState, action: Action<Actions, any>): State {
        const reducer = reducers[action.type];
        if (reducer) {
            return reducer(state, action.data);
        } else {
            return state;
        }
    }

    return {
        useDispatch: useAppDispatch,
        makeAction: makeAppAction,
        useSelector: useAppSelector,
        setReducer,
        sagaTakeLeading,
        sagaTakeEvery,
        mySaga,
        myApp,
        ref,
        // @ts-ignore
        sagaPut: (key, data) => sagaEffects.put(makeAppAction(key, data))
    }
}


export type UnWrapSaga<T extends (...args: any[]) => any> = ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>;