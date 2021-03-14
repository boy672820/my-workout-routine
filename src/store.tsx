import React, { createContext, Dispatch, useReducer, useContext } from "react"


// Types.
type State = {
    user: number
}
type Action = { type: string }
type dispatchType = Dispatch<Action>


// Create context.
export const storeStateContext = createContext<State | null>( null )
export const storeDispatchContext = createContext<dispatchType | null>( null )

function reducer( state: State, action: Action ): State {
    switch ( action.type ) {
        case 'LOGIN':
            return { user: 1 }

        case 'LOGOUT':
            return { user: 0 }

        default:
            throw new Error( 'Unhandled action' )
    }
}

export function StoreProvider( { children }: { children: React.ReactNode } ) {
    const [ state, dispatch ] = useReducer( reducer, { user: 0 } )

    return (
        <storeStateContext.Provider value={ state }>
            <storeDispatchContext.Provider value={ dispatch }>
                { children }
            </storeDispatchContext.Provider>
        </storeStateContext.Provider>
    )
}

export function useStoreState() {
    const state = useContext( storeStateContext )

    if ( ! state ) throw new Error( 'Cannot find StoreProvider.' )

    return state
}

export function useStoreDispatch() {
    const dispatch = useContext( storeDispatchContext )

    if ( ! dispatch ) throw new Error( 'Cannot find StoreProvider.' )

    return dispatch
}