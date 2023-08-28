import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class ExpenseBudApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  /** User */

  static async register(data) {
    let res = await this.request(`auth/register`, data, 'post')
    return res.token;
  }

  static async login(data){
    let res = await this.request(`auth/login`, data, 'post')
    return res.token;
  }

  static async getCurrentUser(id){
    let res = await this.request(`users/${id}`);
    return res.user;
  }

  static async updateProfile(id, data) {
    let res = await this.request(`users/${id}`, data, 'patch');
    return res.user;
  }

  /** Budget */

  static async getAllBudgets(id) {
    let res = await this.request(`users/${id}/budgets`);
    return res.budgets;
  }

  static async updateBudget(userId, budgetId, data) {
    let res = await this.request(`users/${userId}/budgets/${budgetId}`, data, 'patch');
    return res.budget;
  }

  static async addBudget(userId, data) {
    let res = await this.request(`users/${userId}/budgets`, data, 'post');
    return res.budget;
  }

  /** Category */

  static async getAllCategories() {
    let res = await this.request(`categories`);
    return res.categories;
  }

}

export default ExpenseBudApi;