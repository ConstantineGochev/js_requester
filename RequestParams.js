export default class RequestParams {
    constructor(storage, config, headers = {}) {
        this._storage = storage;
        this.config = config;
    
        this._headers = Object.assign(headers, {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
      }
    
      /**
       * 
       * @returns {Object}
       * 
       */
      async get_all_headers() {
        return Object.assign(this._headers, await this.get_auth_header());
      }
    
      /**
       * 
       * @returns {Object}
       * 
       */
      async get_auth_header() {
        const authorization = await this._storage.getItem(`${this.config.domain_prefix}.auth`);
        return authorization ? { 'Authorization': authorization } : {};
      }
    
      /**
       * 
       * @returns {Object}
       * 
       */
      async GET() {
        return {
          headers: await this.get_all_headers(),
          method: 'GET'
        }
      }
    
      /**
       * 
       * @returns {Object}
       * 
       */
      async DELETE() {
        return {
          headers: await this.get_all_headers(),
          method: 'DELETE'
        }
      }
    
      /**
       * 
       * @param {Object} object
       * @returns {Object}
       * 
       */
      async POST(object) {
        return {
          headers: Object.assign(await this.get_all_headers()),
          method: 'POST',
          body: JSON.stringify(object)
        }
      }
}