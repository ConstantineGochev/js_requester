import RequestEndpoints from './RequestEndpoints';
import RequestMethods from './RequestMethods';
import RequestSender from './RequestSender';

export default class Requester {
    constructor(storage, config, headers = {}) {
      this.request_sender = new RequestSender(storage, config, headers);
      this.request_endpoints = new RequestEndpoints(config);
    }

  /**
   * 
   * @param {Object} user_obj 

   * @returns {Promise}
   * 
   */
  register(user_obj) {
    return this.request_sender.SendRequest(
      this.request_endpoints.GetRoute("Register"),
      RequestMethods.POST,
      user_obj).then(res => res);
  }

  /**
   * 
   * @param {Object} userObj
   * @returns {Promise}
   * 
   */
  login(user_obj) {
    return this.request_sender.SendRequest(
      this.request_endpoints.GetRoute("Login"),
      RequestMethods.POST,
      user_obj).then(res => res);
  }
}