import {http} from './config'

//importando metodos da api
export default{
    listar:()=>{
        return http.get('estagiarios')
    },
    salvar:(estagiario)=>{
        return http.post('estagiario',estagiario)
    },
    atualizar:(estagiario)=>{
        return http.put('estagiario',estagiario)
    }
}