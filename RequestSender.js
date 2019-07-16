import RequestEndpoints from './RequestEndpoints';
import RequestMethods from './RequestMethods';
import RequestParams from './RequestParams';

export default class RequestSender {
    constructor(storage, config, headers = {}) {
        this._storage = storage;
        this.config = config;
        this.RequestParams = new RequestParams(storage, config, headers);
      }
    
      /**
       * 
       * @param {String} endpoint 
       * @param {Enumerator} method 
       * @param {Object} post_obj 
       * @returns {Object}
       * 
       */
      async SendRequest(endpoint, method, post_obj = null,  headers = null) {
        const method_reference = this.RequestParams[method].bind(this.RequestParams);
        let request_headers = await method_reference(post_obj);
    
        if (headers != null) {

          request_headers.headers = Object.assign(request_headers.headers, headers);
        }
        headers = request_headers;
    
        return fetch(endpoint, headers)
          .then((response) => {
            if (!response.ok) {
              return {
                body: {},
                success: response.ok,
                errors: response.json().then((r) => {
                  return r;
                })
              };
            }
            return {
              body: response.json(),
              success: response.ok,
              errors: {}
            };
          });
      }
}