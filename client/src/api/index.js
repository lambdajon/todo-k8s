import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 50000,
});

export default class API {
  static listTodos() {
    return api.get(`/todos`)
  }
  static createTodo(data) {
    return api.post(`/todos`, data)
  }
  static loadTodo(id){
    return api.get(`/todos/${id}`)
  }
  static updateTodo(id,data){
    return api.put(`/todos/${id}`, data)
  }
}