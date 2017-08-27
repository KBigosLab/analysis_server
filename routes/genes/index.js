
module.exports = {
  // Default title that shows up on a page when none is specified
  defaultTitle: '',

  // Default template used for rendering pages
  defaultApp: 'common',

  // Handler for setting up and routing all HTTP requests
  request: 'request',

  // Roles defines permissions for various server requests
  require: 'Roles',

  // Handler for broadcasting synchronization messages across
  // multiple client instances
  sync: 'sync',

  // Tab routes
  tabRoutes: '/www/tabs',

  // Custom routes
  customRouters: {get: {
//    '/www/*': '/srcrouter',
  }},
}

