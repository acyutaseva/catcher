/* global app */

/**
 * Email Resource
 */

app.service('Email', ['$resource', function($resource) {

  const Email = $resource('email/:id', { id: ''}, {
    update: {
      method: 'PUT',
      params: {}
    }
  });

  Email.read = function(id, cb) {
    return Email.get({id: id}, (email) => {
      const events = email.headers['x-events'] ? JSON.parse(email.headers['x-events']) : {};
      if (events.open) fetch(events.open, {method: 'POST'});
      cb(email);
    });
  };

  return Email;

}]);
