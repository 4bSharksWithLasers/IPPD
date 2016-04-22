'use strict';

// Configuring the registrants module
angular.module('admin').run(['Menus',
  function (Menus) {
    // Add the teams dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'teams',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'teams', {
      title: 'Add Team',
      state: 'addTeam'
    });
    Menus.addSubMenuItem('topbar', 'teams', {
      title: 'Add Affiliation',
      state: 'addAffiliation'
    });
  }
]);
