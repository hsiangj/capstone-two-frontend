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

  /** Plaid */
  static async createLinkToken(data={}) {
    let res = await this.request('plaid/create_link_token', data, 'post');
    return res;
  }

  static async exchangePublicToken(data) {
    let res = await this.request('plaid/exchange_public_token', data, 'post');
    return res.accessToken;
  }

  static async getAccountNum(data) {
    let res = await this.request('plaid/auth/get', data, 'post');
    return res;
  }

  /** Account */
  static async getAllAccounts(id) {
    let res = await this.request(`users/${id}/accounts`);
    return res.accounts;
  }

  static async deleteAccount(user_id, account_id, data) {
    let res = await this.request(`users/${user_id}/accounts/${account_id}`, data,'delete');
    return res;
  }

  /** Expenses */
  static async getAllExpenses(id) {
    let res = await this.request(`users/${id}/expenses`);
    return res.expenses;
  }

  static async addExpense(userId, data) {
    let res = await this.request(`users/${userId}/expenses`, data, 'post');
    return res.expense;
  }
}

export default ExpenseBudApi;