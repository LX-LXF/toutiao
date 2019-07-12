import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://ttapi.research.itcast.cn/mp/v1_0/',
    headers:{
        Authorization:'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm73-toutiao')).token
    }
}) 

instance.interceptors.request.use(config => {
    const user = window.sessionStorage.getItem('hm73-toutiao')
    if(user) {
        config.headers = {
            Authorization:'Bearer ' + JSON.parse(user).token
        }
    }
    return config
} , error => {
    return Promise.reject(error);
})

instance.interceptors.response.use(response => {return response} ,(error) =>{
   if(error.response.status === 401){
        location.hash = '#/login'
   }
   return Promise.reject(error);
} )
export default instance