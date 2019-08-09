<template>

  <div>
    <h2>{{title}}</h2>
    <ul>
      <li>
        <input type="text" v-model="val" placeholder="请输入要学习的东东">
      </li>
      <li :class="{done:todo.done}" v-for="(todo,i) in todos" :key="todo.title">
          {{i+1}} : {{todo.title}}
          <switch :checked="todo.done" @change="switchChange(i)" />
      </li>
      <li>
        {{active}}/{{total}}
      </li>
    </ul>
    <button type="primary" @click="add">添加</button>
    <button @click="clear">清除</button>
    

  </div>
</template>

<script>
export default {
  props: ["title"],
  methods:{
    switchChange(i){
      // e.mp 小程序事件
      this.todos[i].done = !this.todos[i].done
    },
    clear(){
      this.todos = this.todos.filter(v=>!v.done)
    },
    add(){
      if(this.val){
        this.todos.push({
          title:this.val,
          done:false
        })
        this.val = ''
      }
    }
  },
  computed:{
    total(){
      return this.todos.length
    },
    active(){
      return this.todos.filter(v=>!v.done).length
    }
  },
  data() {
    return {
      val:'',
      todos: [
        { title: "学习vuejs", done: true },
        { title: "学习mpvue2.0", done: false },
        { title: "学习云开发", done: false }
      ]
    };
  }
};
</script>

<style>
h2{
  text-align: center;
  font-size:18px;
  font-weight: bold;
}
ul{
  padding-left:20px;
}
.done{
  color:red;
  text-decoration: line-through;
}
</style>
