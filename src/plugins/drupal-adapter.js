/**
 * Wrapper for making Drupal JSONapi calls.
 *
 * Provides a wrapper for calling Drupal entities using the JSONapi module.
 *
 * @constructor
 *
 * @param {object} config
 *   Configuration for the adapater.
 */
const DrupalAdapter = function (config) {
  const settings = Object.assign({}, {
    apiUrl: `${window.location.origin}/jsonapi`
  }, config);

  /**
   * Fetch an entity.
   *
   * @param {string} entity
   *   The entity type.
   * @param {string} bundle
   *   The entity bundle.
   * @param {string} uuid
   *   The uuid of the entity.
   *
   * @return {jQuery.ajax}
   *   jQuery ajax object.
   */
  this.getEntity = (entity, bundle, uuid) => {
    let url = `${settings.apiUrl}/${entity}/${bundle}/${uuid}/`;
    return fetch(url).then(r => r.json());
  };

  /**
   * Fetch entities based on query.
   *
   * @param {string} entity
   *   The entity type.
   * @param {string} bundle
   *   The entity bundle.
   * @param {Array} query
   *   An array of query parameters.
   *
   * @return {jQuery.ajax}
   *   jQuery ajax object.
   */
  this.getEntities = (entity, bundle, query) => {
    let queryString = query.map(i => `[${i.key}]=${i.val}`).join('&');
    let url = `${settings.apiUrl}/${entity}/${bundle}?${queryString}`;
    return fetch(url).then(r => r.json());
  };

  /**
   * Shortcut for getting a node entity.
   *
   * @param {string} contentType
   *   The content type of the node.
   * @param {string} uuid
   *   The uuid of the node.
   *
   * @return {jQuery.ajax}
   *   jQuery ajax object.
   *
   * @fires getEntity
   *
   * @see this.getEntity
   */
  this.getNode = (contentType, uuid) => {
    return this.getEntity('node', contentType, uuid);
  };

  /**
   * Shortcut for getting a node entity.
   *
   * @param {string} contentType
   *   The content type of the node.
   * @param {Array} query
   *   An array of query parameters.
   *
   * @return {jQuery.ajax}
   *   jQuery ajax object.
   *
   * @fires getEntity
   *
   * @see this.getEntity
   */
  this.getNodes = (contentType, query) => {
    return this.getEntities('node', contentType, query);
  };

  /**
   * Get the values of a reference field.
   *
   * @param {Node} entity
   *   The entity to get the values from.
   * @param {string} field
   *   The field name.
   *
   * @return {jQuery.ajax}
   *   jQuery ajax object.
   */
  this.getReferenceFieldValues = (entity, field) => {
    return fetch(entity.relationships[field].links.related).then(r => r.json());
  };
};

const install = (Vue, options) => {
  Vue.prototype.DrupalAdapter = new DrupalAdapter(options);
};

// For debugging
window.DA = new DrupalAdapter();

export {
  DrupalAdapter,
  install
};
