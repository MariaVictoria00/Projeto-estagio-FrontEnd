<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper pink darken-1">
        <a href="#" class="brand-logo center">Estagiarios</a>
      </div>
    </nav>

    <div class="container">
     

      <form @submit.prevent="salvar">

          <label>Nome</label>
          <input type="text" placeholder="Digite..." v-model="estagiario.nome">
          <label>Telefone</label>
          <input type="number" placeholder="Digite.." v-model="estagiario.telefone">
          <label>E-mail</label>
          <input type="text" placeholder="Digite.." v-model="estagiario.email">
          <label>Foto</label>
          <input type="text" placeholder="url" v-model="estagiario.foto">
          <label>Comrovante de matricula</label>
          <input type="text" placeholder="url" v-model="estagiario.comprovanteDeMatricula">
          <label>Areas de interesse</label>
          <input type="text" placeholder="Digite.." v-model="estagiario.areasDeInteresse">
          <label>Areas de dominio</label>
          <input type="text" placeholder="Digite.." v-model="estagiario.areasDeDominio">


          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

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

            <td>{{estagiario.nome}}</td>
            <td>{{estagiario.telefone}}</td>
            <td>{{estagiario.email}}</td>
            <td>{{estagiario.foto}}</td>
            <td>{{estagiario.comprovanteDeMatricula}}</td>
            <td>{{estagiario.areasDeInteresse}}</td>
            <td>{{estagiario.areasDeDominio}}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>
<script>
 import Controle from './services/estagiarios'
  
  export default {


    data() {
      return{
        estagiario:{
          nome:'',
          telefone: '',
          email: '',
          foto: '',
          comprovanteDeMatricula: '',
          areasDeInteresse: '',
          areasDeDominio: ''
        },

    //armazenar dados da api no array
        estagiarios:[]
      }

    },
    
    //metodo que contem a api
    mounted(){
      Controle.listar().then(resposta =>{
        console.log(resposta.data);
        this.estagiarios=resposta.data;
      })
    },
    methods:{
      salvar(){
        //chamar api
        Controle.salvar(this.estagiario).then(resposta =>{
          alert('Salvo com sucesso');
          this.estagiario= resposta;
        })
      }
    }
  }

</script>

<style>

</style>
