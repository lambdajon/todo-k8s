import axios from 'axios';

export default class API {
  static listTodos() {
    return axios.get(`/api/todos`)
  }
  static createTodo(data) {
    return axios.post(`/api/todos/add`, data)
  }
  static loadTodo(id){
    return axios.get(`/api/todos/${id}`)
  }
  static updateTodo(id,data){
    return axios.post(`/api/todos/${id}`)
  }
}