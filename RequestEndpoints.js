export default class RequestEndpoins {
    constructor(config) {
        const {api_host} = config;
        this.routes = {
            //no params or query
            Register: `${api_host}signup`,
            Login: `${api_host}login`,

            //with params 
            GetCurrenencyInfo: `${api_host}something/{0}`

        }
    }

      /**
   * 
   * @param {String} route_name 
   * @param {Array} params 
   * @param {Array} query 
   * @returns {String}
   * 
   */
  GetRoute(route_name, params, query) {
    let raw_route = this.routes[route_name];
    let url = raw_route;

    if (params) {
      url = this.replace_params(raw_route, params);
    }
    if (query) {
      url += this.process_query(query);
    }

    return url;
  }

    /**
   *
   * @param {Array} query
   * @returns {String}
   * 
   */
  process_query(query) {
    // Remove empty, undefined, null and e.g. items from array
    let filtered_query = [];

    if (query != undefined) {
        filtered_query = query.filter(function (e) { return e });
    }

    // Create Key-value pairs
    let query_kvp = '';
    for (let i = 0; i < filtered_query.length; i++) {
      if (i !== filtered_query.length - 1) {
        query_kvp += `${filtered_query[i]}&`;
      }
      else {
        query_kvp += filtered_query[i];
      }
    }

    // Build final query
    const final_query = `?${query_kvp}`;
    return final_query;
  }

  /**
   * 
   * @param {String} route 
   * @param {Array} params 
   * @returns {String}
   * 
   */
  replace_params(route, params) {
    // Count parameters with regex e.g. {param} || {id}
    const pattern = /{(\w+)}/g;
    const matches = route.match(pattern);
    const params_count = matches == null ? 0 : matches.length;

    // If params length is different from passed params - throw
    if (params.length != params_count) {
      throw "Parameters length is different from passed parameters!"
    }

    // Replace all placeholder params with passed params
    const replaced_url = this.format(route, params);

    return replaced_url
  }

  /**
   * 
   * @param {String} source 
   * @param {Array} params 
   * @returns {String}
   * 
   */
  format(source, params) {
    // Replace every {0},{1} with passed params
    for (let i = 0; i <= params.length; i++) {
      source = source.replace(new RegExp("\\{" + i + "\\}", "g"), params[i])
    }
    return source;
  }
}