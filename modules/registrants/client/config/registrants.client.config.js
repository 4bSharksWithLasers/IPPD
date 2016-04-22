'use strict';

// Configuring the registrants module
angular.module('registrants').run(['Menus',
  function (Menus) {
    // Add the registrants dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Register',
      state: 'registrants',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'registrants', {
      title: 'Register',
      state: 'register'
    });
  }
]);
