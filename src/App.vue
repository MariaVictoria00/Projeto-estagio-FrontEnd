<template>
  <div id="app" >
    <nav>
      <div class="nav-wrapper pink darken-1 col s12 m12 l12">
        <a href="#" class="brand-logo center">Estagiarios</a>
      </div>
    </nav>
    


    <div class="container col s12 m12 l12">
      
     
      <form class="container col s12 m12 l12" @submit.prevent="salvar">

          <label>Nome</label>
          <input class="col s12 m12 l12"  required="" type="text" placeholder="Digite..." v-model="estagiario.nome">
          <label>Telefone</label>
          <input class="col s12 m12 l12" required="" maxlength="12" type="number" placeholder="Digite.." v-model="estagiario.telefone">
          <label>E-mail</label>
          <input class="col s12 m12 l12"  required="" type="text" placeholder="Digite.." v-model="estagiario.email">
          <label> Foto</label>   
          <input class="col s12 m12 l12"  required="" type="url"  placeholder="url" v-model="estagiario.foto">
          <label>Comprovante de matricula</label>
          <input class="col s12 m12 l12"  required="" type="url" placeholder="url" v-model="estagiario.comprovanteDeMatricula"> 
          <label>Areas de interesse</label>
          <input class="col s12 m12 l12" required="" type="text" placeholder="Digite.." v-model="estagiario.areasDeInteresse">
          <label>Areas de dominio</label>
          <input class="col s12 m12 l12"  required="" type="text" placeholder="Digite.." v-model="estagiario.areasDeDominio">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
     
      </form>

      <table class="responsive-table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>TELEFONE</th>
            <th>E-MAIL</th>
            <th>FOTO</th>
            <th>MATRICULA</th>
            <th>A.INTERESSE</th>
            <th>A.DOMINIO</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="estagiario of estagiarios" :key="estagiario.id">

            <td>{{estagiario.nome | truncate(7) }}</td>
            <td>{{estagiario.telefone | truncate(7) }}</td>
            <td>{{estagiario.email | truncate(7) }}</td>
            <td><img src="estagiario.foto"></td>
            <td><img src="estagiario.comprovanteDeMatricula "></td>
            <td>{{estagiario.areasDeInteresse | truncate(8) }}</td>
            <td>{{estagiario.areasDeDominio| truncate(7) }}</td>
            <td>
              <button @click="editar(estagiario)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(estagiario)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
 
 import Controle from './services/estagiarios'
  
  export default{
    data() {
      return{
        estagiario:{
          id:'',
          nome:'',
          telefone: '',
          email: '',
          foto: '',
          comprovanteDeMatricula: '',
          areasDeInteresse: '',
          areasDeDominio: ''
        },

        estagiarios:[]   //armazenar dados da api no array
      }

    },
    //metodo que contem a api
    mounted(){
      this.listar()
    },
    methods:{
    
      //atualizar a pagina remotamente
      listar(){
         Controle.listar().then(resposta =>{
         this.estagiarios=resposta.data; 
       })
      },

      salvar(){
        if(!this.estagiario.id){
         //chamar api
         Controle.salvar(this.estagiario).then(resposta =>{
          this.estagiario = {}  //limpar campos ao salvar 
          alert('Salvo com sucesso');
          this.estagiario= resposta;
          this.listar()
        })
      }else{
         Controle.atualizar(this.estagiario).then(resposta =>{
          this.estagiario = {}  //limpar campos ao salvar 
          alert('Atualizado com sucesso');
          this.estagiario= resposta;
          this.listar()
        })
      }
       
      },

      editar(estagiario) {
        this.estagiario = estagiario;
      },

      remover(estagiario) {
        if(confirm('Deseja remover o estagiario?')) {
          Controle.apagar(estagiario).then(resposta =>{
          this.estagiario= resposta;
          this.listar()
        })
        }
        
      },
      
      
      
    },
    filters:{
      truncate:function(str, length){
        var output=str;
        if(output.length>length){
          output=output.substring(0,length)+'...';
        }
          return output;
    },
    }

  }

  

</script>


<style>
html{
overflow-y:auto;
overflow-x: hidden; 

}
  .container {
  padding-top: 10px;
  font-size:12px;
  white-space: 12px;
 
 }




</style>
