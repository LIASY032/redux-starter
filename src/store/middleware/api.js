import axios from "axios"

const api = (store) => (next) => async (action) => {
    if (action.type !== 'apiCallBegan') {
        return next(action);
    
    
       
    }

    next(action)
    const { url, method, data, onSuccess, onError } = action.payload
    try {
        const response = await axios.request({ baseURL: "http://localhost:9001/api", url, method, data })
        store.dispatch({type: onSuccess, payload: response.data})
    } catch (error) {
        store.dispatch({type: onError, payload: error})
   }
}


export default api