import { createContext, useEffect, useReducer } from 'react'
import { getData } from '../utils/fetchData'
import reducers from './Reducers'


export const DataContext = createContext()

export const DataProvider = ({children}) => {

    const initialState = { notify: {} , auth: {} , cart: [] , modal: {} }

    const [state , dispatch] = useReducer(reducers , initialState)

    const { cart } = state

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')

        if(firstLogin) {
            getData('auth/accessToken').then(res => {
                if(res.err) return localStorage.removeItem('firstLogin')

                dispatch({ type: 'AUTH' ,  payload: {
                    token: res.access_token,
                    user: res.user
                }})
            })
        }
    })

    useEffect(() => {
        const eshop_cart01 = JSON.parse(localStorage.getItem('eshop_cart01'))

        if(eshop_cart01) dispatch({ type: 'ADD_CART', payload: eshop_cart01 })
    }, [])

    useEffect(() => {
        localStorage.setItem('eshop_cart01', JSON.stringify(cart))
    }, [cart])

    return(
        <DataContext.Provider value={[state , dispatch]}>
            {children}
        </DataContext.Provider>
    )
}