<script setup lang="ts">
import useTodos from './composables/useTodos';

const input = ref('');
const { todos, addTodo, updateTodo, deleteTodo } = useTodos();

const handleClick = () => {
  addTodo(input.value)
  input.value = ''
}
</script>

<template>
  <div class="container">
    <NCard class="cards">
      <h1>My Todos</h1>
      <div class="add-todo">
        <input v-model="input" placeholder="Add a new todo..." />
        <NButton @click="handleClick">Add</NButton>
      </div>
      <NCard
        class="card"
        v-for="todo in todos"
        :key="todo.id"
        @click="() => updateTodo(todo.id)"
      >
        <h4 :class="todo.completed ? 'complete' : ''">{{ todo.item }}</h4>
        <p @click="() => deleteTodo(todo.id)">x</p>
      </NCard>
    </NCard>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  margin: 0 auto;
  max-width: 50%;
}
.cards {
  padding: 2em;
}
.add-todo {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}
.add-todo input {
  outline: none;
}
.card {
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.complete {
  text-decoration: line-through;
}
</style>
