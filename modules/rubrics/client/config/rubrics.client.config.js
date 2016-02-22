<<<<<<< HEAD

=======
'use strict';

// Configuring the registrants module
angular.module('rubrics').run(['Menus',
  function (Menus) {
    // Add the rubrics dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Review',
      state: 'rubrics',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'rubrics', {
      title: 'Review',
      state: 'review'
    });
  }
]);
>>>>>>> AmyRestructuringThatWorks
