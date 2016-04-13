'use strict';



describe('Registrants E2E Tests:', function(){
  //this.timeout(100000);

  var registrant = {
    email: 'e2eregEmail@email.com',
    affiliation: 'e2erefaff'
  };

  var completedRating = {
    team: 'e2eunitCompletedRatingTeam',
    presentationType: 'e2eunitPresentTest',
    email: 'e2eunitCompletedRatingEmailTest',
    ratedItems: [{
      rubricItem: 'e2eunitItemTest',
      rating: 3
    }],
    issuesIdentified: 'e2eunitTestIssue',
    recommendedActions: [{
      recommendation: 'e2eunitTestRecommendation',
      urgency: false
    }]

  };

  var signout = function () {
    // Make sure user is signed out first
    browser.get('http://localhost:3001/authentication/signout');
    // Delete all cookies
    browser.driver.manage().deleteAllCookies();
  };

  it('Should go to the register page', function(){
    browser.get('http://localhost:3001/');
    //click 'Register'
    element(by.buttonText('Register')).click();
    //go to register page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/register');
  });

  it('Should not go to select Presentation if only email is submitted', function(){
    browser.get('http://localhost:3001/register');
    //click 'Register'
    element(by.model('email')).sendKeys(registrant.email);
    element(by.css('#register-submit')).click();
    //go to register page
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/register');
  });

  it('Should move on if both email, and affiliation are provided', function(){
    browser.get('http://localhost:3001/register');
    //Fill in email
    element(by.model('email')).sendKeys(registrant.email);
    //select dropdown and then affilation
    element(by.css('#register-affiliation')).click();
    element(by.model('affiliation'))
      .all(by.tagName('option'))
      .get(1)
      .click().then();
    element(by.css('#register-submit')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/selectPresentation');

  });

  it('Should not keep going if only presentationType is selected', function(){
    browser.get('http://localhost:3001/selectPresentation');
     //select presentation type
    element(by.css('#presentationType')).click();
    element(by.model('presentationType'))
      .all(by.tagName('option'))
      .get(1)
      .click().then();

    element(by.css('#selectPresentationType-submit')).click();


    expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/selectPresentation');
  });

  it('Should move on if both presentationType and Team name are selected', function(){
    browser.get('http://localhost:3001/register');
    //Fill in email
    element(by.model('email')).sendKeys(registrant.email);
    //select dropdown and then affilation
    element(by.css('#register-affiliation')).click();
    element(by.model('affiliation'))
      .all(by.tagName('option'))
      .get(1)
      .click().then();
    element(by.css('#register-submit')).click();
     //select presentation type
    element(by.css('#team')).click();
    element(by.model('team'))
      .all(by.tagName('option'))
      .get(1)
      .click().then();

    element(by.css('#presentationType')).click();
    element(by.model('presentationType'))
      .all(by.tagName('option'))
      .get(1)
      .click().then();

    element(by.css('#selectPresentationType-submit')).click();

    //check to make sure moved on to other url.
    expect(browser.getCurrentUrl() === 'http://localhost:3001/selectPresentation').toBe(false);
    //keep going? Now in edit Rubric page
    var url = browser.getCurrentUrl();
  //sumbit values

    //ratings
      //click panes
    element(by.css('#showDescription-click')).click();
    browser.sleep(500);
    element(by.css('#showDescription-click')).click();
    browser.sleep(500);
    element(by.css('#threeStar-click')).click();
    browser.sleep(500);
      //click stars

    //issues
    element(by.css('#issuesIdentified')).sendKeys('No issues identified. Keep up the good work!');
    browser.sleep(500);
    //recommendations
    element(by.model('recommendationText')).sendKeys('Recommendation1');
    element(by.css('#addRecommendation-button')).click();
    browser.sleep(500);
    element(by.css('#recommendationText-area')).sendKeys('Recommendation2');
    element(by.css('#addRecommendation-button')).click();
    browser.sleep(500);
    element(by.css('#recommendationText-area')).sendKeys('Recommendation3');
    element(by.css('#addRecommendation-button')).click();
    browser.sleep(500);
    element(by.css('#clicktourgent-button')).click();
    browser.sleep(500);
    element(by.css('#unclicktourgent-button')).click();
    browser.sleep(500);
    element(by.css('#editItem-button')).click();
    browser.sleep(500);
    element(by.css('#removeItem-button')).click();
    browser.sleep(500);



    //click preview submission
    element(by.css('#previewSubmission-button')).click();
    browser.sleep(500);
    expect(browser.getCurrentUrl() === url); //check to make sure we haven't left the page

    //click on edit submission
    element(by.css('#editSubmission-button')).click();
    browser.sleep(500);
    expect(browser.getCurrentUrl() === url); //check to make sure we haven't left the page

    //click on preview again
    element(by.css('#previewSubmission-button')).click();
    browser.sleep(500);
    expect(browser.getCurrentUrl() === url);

    //click submit
    element(by.css('#rubricSubmit-button')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/selectPresentation'); //should be at selectPresentation
  });

// describe('Admin E2E Testing', function(){
//   //click Admin button
//   it('Should go to adminHome', function(){
//     browser.get('http://localhost:3001');
//     element(by.css('#admin-button')).click();
//     expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/adminHome'); //should route to adminHome
//   });
//
// });
//  it('Should m')

  /*
  it('Should ', function(){

  })
  */
});

//
// describe('Users E2E Tests:', function () {
//   var user1 = {
//     firstName: 'test',
//     lastName: 'user',
//     email: 'test.user@meanjs.com',
//     username: 'testUser',
//     password: 'P@$$w0rd!!'
//   };
//
//   var user2 = {
//     firstName: 'test',
//     lastName: 'user2',
//     email: 'test.user2@meanjs.com',
//     username: 'testUser2',
//     password: 'P@$$w0rd!!'
//   };
//
//   var signout = function () {
//     // Make sure user is signed out first
//     browser.get('http://localhost:3001/authentication/signout');
//     // Delete all cookies
//     browser.driver.manage().deleteAllCookies();
//   };
//
//   describe('Signup Validation', function () {
//     it('Should report missing first name', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Password
//       element(by.model('credentials.password')).sendKeys(user1.password);
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // First Name Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('First name is required.');
//     });
//
//     it('Should report missing last name', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Password
//       element(by.model('credentials.password')).sendKeys(user1.password);
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Last Name Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Last name is required.');
//     });
//
//     it('Should report missing email address', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Password
//       element(by.model('credentials.password')).sendKeys(user1.password);
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Email address error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Email address is required.');
//     });
//
//     it('Should report invalid email address - "123"', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys('123');
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Password
//       element(by.model('credentials.password')).sendKeys(user1.password);
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Email address error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Email address is invalid.');
//     });
//
//     /**
//      * Note: 123@123 is a valid email adress according to HTML5.
//      * However, 123@123@123 is an invalid email address.
//      */
//     it('Should report invalid email address - "123@123@123"', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys('123@123@123');
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Password
//       element(by.model('credentials.password')).sendKeys(user1.password);
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Email address error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Email address is invalid.');
//     });
//
//     it('Should report missing username', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Password
//       element(by.model('credentials.password')).sendKeys(user1.password);
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Username Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Username is required.');
//     });
//
//     it('Should report a password with less than 10 characters long - "P@$$w0rd!"', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Invalid Password
//       element(by.model('credentials.password')).sendKeys('P@$$w0rd!');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must be at least 10 characters long.');
//     });
//
//     it('Should report a password with greater than 128 characters long.', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Invalid Password
//       element(by.model('credentials.password')).sendKeys(')!/uLT="lh&:`6X!]|15o!$!TJf,.13l?vG].-j],lFPe/QhwN#{Z<[*1nX@n1^?WW-%_.*D)m$toB+N7z}kcN#B_d(f41h%w@0F!]igtSQ1gl~6sEV&r~}~1ub>If1c+');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must be fewer than 128 characters.');
//     });
//
//     it('Should report a password with more than 3 or more repeating characters - "P@$$w0rd!!!"', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Invalid Password
//       element(by.model('credentials.password')).sendKeys('P@$$w0rd!!!');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password may not contain sequences of three or more repeated characters.');
//     });
//
//     it('Should report a password with no uppercase letters - "p@$$w0rd!!"', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Invalid Password
//       element(by.model('credentials.password')).sendKeys('p@$$w0rd!!');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must contain at least one uppercase letter.');
//     });
//
//     it('Should report a password with less than one number - "P@$$word!!"', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Invalid Password
//       element(by.model('credentials.password')).sendKeys('P@$$word!!');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must contain at least one number.');
//     });
//
//     it('Should report a password with less than one special character - "Passw0rdss"', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Invalid Password
//       element(by.model('credentials.password')).sendKeys('Passw0rdss');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must contain at least one special character.');
//     });
//
//     it('Should Successfully register new user', function () {
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter FirstName
//       element(by.model('credentials.firstName')).sendKeys(user1.firstName);
//       // Enter LastName
//       element(by.model('credentials.lastName')).sendKeys(user1.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter UserName
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Password
//       element(by.model('credentials.password')).sendKeys(user1.password);
//       // Click Submit button
//       element(by.css('button[type="submit"]')).click();
//       expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/');
//     });
//
//     it('Should report Email already exists', function () {
//       // Make sure user is signed out first
//       signout();
//       // Signup
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user2.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user2.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user1.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user2.username);
//       // Enter Invalid Password
//       element(by.model('credentials.password')).sendKeys(user2.password);
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('strong')).get(0).getText()).toBe('Email already exists');
//     });
//
//     it('Should report Username already exists', function () {
//       // Signup
//       browser.get('http://localhost:3001/authentication/signup');
//       // Enter First Name
//       element(by.model('credentials.firstName')).sendKeys(user2.firstName);
//       // Enter Last Name
//       element(by.model('credentials.lastName')).sendKeys(user2.lastName);
//       // Enter Email
//       element(by.model('credentials.email')).sendKeys(user2.email);
//       // Enter Username
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Invalid Password
//       element(by.model('credentials.password')).sendKeys(user2.password);
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('strong')).get(0).getText()).toBe('Username already exists');
//     });
//
//   });
//
//   describe('Signin Validation', function () {
//
//     it('Should report missing credentials', function () {
//       //Make sure user is signed out first
//       signout();
//       //Sign in
//       browser.get('http://localhost:3001/authentication/signin');
//       // Click Submit button
//       element(by.css('button[type="submit"]')).click();
//       // Username Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Username is required.');
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(1).getText()).toBe('Password is required.');
//     });
//
//     it('Verify that the user is logged in', function() {
//       //Make sure user is signed out first
//       signout();
//       //Sign in
//       browser.get('http://localhost:3001/authentication/signin');
//       // Enter UserName
//       element(by.model('credentials.username')).sendKeys(user1.username);
//       // Enter Password
//       element(by.model('credentials.password')).sendKeys(user1.password);
//       // Click Submit button
//       element(by.css('button[type="submit"]')).click();
//       expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/');
//     });
//
//   });
//
//   describe ('Change Password Settings Validation', function () {
//
//     it('Should report missing passwords', function () {
//       browser.get('http://localhost:3001/settings/password');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Errors
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Your current password is required.');
//       expect(element.all(by.css('.error-text')).get(1).getText()).toBe('Enter a new password.');
//       expect(element.all(by.css('.error-text')).get(2).getText()).toBe('Verify your new password.');
//     });
//
//     it('Should report a password with less than 10 characters long - "P@$$w0rd!"', function () {
//       browser.get('http://localhost:3001/settings/password');
//       // Enter Current Password
//       element(by.model('passwordDetails.currentPassword')).sendKeys(user1.password);
//       // Enter Invalid Password
//       element(by.model('passwordDetails.newPassword')).sendKeys('P@$$w0rd!');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must be at least 10 characters long.');
//     });
//
//     it('Should report a password with greater than 128 characters long.', function () {
//       browser.get('http://localhost:3001/settings/password');
//       // Enter Current Password
//       element(by.model('passwordDetails.currentPassword')).sendKeys(user1.password);
//       // Enter Invalid Password
//       element(by.model('passwordDetails.newPassword')).sendKeys(')!/uLT="lh&:`6X!]|15o!$!TJf,.13l?vG].-j],lFPe/QhwN#{Z<[*1nX@n1^?WW-%_.*D)m$toB+N7z}kcN#B_d(f41h%w@0F!]igtSQ1gl~6sEV&r~}~1ub>If1c+');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must be fewer than 128 characters.');
//     });
//
//     it('Should report a password with more than 3 or more repeating characters - "P@$$w0rd!!!"', function () {
//       browser.get('http://localhost:3001/settings/password');
//       // Enter Current Password
//       element(by.model('passwordDetails.currentPassword')).sendKeys(user1.password);
//       // Enter Invalid Password
//       element(by.model('passwordDetails.newPassword')).sendKeys('P@$$w0rd!!!');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password may not contain sequences of three or more repeated characters.');
//     });
//
//     it('Should report a password with no uppercase letters - "p@$$w0rd!!"', function () {
//       browser.get('http://localhost:3001/settings/password');
//       // Enter Current Password
//       element(by.model('passwordDetails.currentPassword')).sendKeys(user1.password);
//       // Enter Invalid Password
//       element(by.model('passwordDetails.newPassword')).sendKeys('p@$$w0rd!!');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must contain at least one uppercase letter.');
//     });
//
//     it('Should report a password with less than one number - "P@$$word!!"', function () {
//       browser.get('http://localhost:3001/settings/password');
//       // Enter Current Password
//       element(by.model('passwordDetails.currentPassword')).sendKeys(user1.password);
//       // Enter Invalid Password
//       element(by.model('passwordDetails.newPassword')).sendKeys('P@$$word!!');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must contain at least one number.');
//     });
//
//     it('Should report a password with less than one special character - "Passw0rdss"', function () {
//       browser.get('http://localhost:3001/settings/password');
//       // Enter Current Password
//       element(by.model('passwordDetails.currentPassword')).sendKeys(user1.password);
//       // Enter Invalid Password
//       element(by.model('passwordDetails.newPassword')).sendKeys('Passw0rdss');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Error
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('The password must contain at least one special character.');
//     });
//
//     it('Should report passwords do not match', function () {
//       browser.get('http://localhost:3001/settings/password');
//       // Enter Current Password
//       element(by.model('passwordDetails.currentPassword')).sendKeys(user1.password);
//       // Enter New Password
//       element(by.model('passwordDetails.newPassword')).sendKeys('P@$$w0rds!!');
//       // Verify New Password
//       element(by.model('passwordDetails.verifyPassword')).sendKeys(user1.password);
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Errors
//       expect(element.all(by.css('.error-text')).get(0).getText()).toBe('Passwords do not match.');
//     });
//
//     it('Should change the password to - "P@$$w0rds!!"', function () {
//       browser.get('http://localhost:3001/settings/password');
//       // Enter Current Password
//       element(by.model('passwordDetails.currentPassword')).sendKeys(user1.password);
//       // Enter New Password
//       element(by.model('passwordDetails.newPassword')).sendKeys('P@$$w0rds!!');
//       // Verify New Password
//       element(by.model('passwordDetails.verifyPassword')).sendKeys('P@$$w0rds!!');
//       // Click Submit button
//       element(by.css('button[type=submit]')).click();
//       // Password Changed
//       expect(element.all(by.css('.text-success')).get(0).getText()).toBe('Password Changed Successfully');
//     });
//   });
// });
