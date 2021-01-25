import axios from 'axios';

const api = axios

export default class API {
  static listTodos() {
    return api.get(`/api/todos`)
  }
  static createTodo(data) {
    return api.post(`/api/todos`, data)
  }
  static loadTodo(id){
    return api.get(`/api/todos/${id}`)
  }
  static updateTodo(id,data){
    return api.put(`/api/todos/${id}`, data)
  }
}