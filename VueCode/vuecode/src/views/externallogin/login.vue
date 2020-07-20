<!-- Copyright (c) Microsoft Corporation.
     Licensed under the MIT License. -->
<template>
<div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container">
      <a href="/" class="navbar-brand">Javascript SPA Graph Tutorial</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul id="authenticated-nav" class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link" href="https://developer.microsoft.com/graph/docs/concepts/overview" target="_blank">
              <i class="fas fa-external-link-alt mr-1"></i>Docs
            </a>
          </li>
          <li id="account-nav" class="nav-item"></li>
        </ul>
      </div>
    </div>
  </nav>

  <main id="main-container" role="main" class="container">

  </main>
  </div>
<!--MS Outlook,starts here-->
    <!--HeadPArt-->
    <!-- <link rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
    crossorigin="anonymous">
<link href="style.css" rel="stylesheet" type="text/css" /> -->
    <!--Head part ends-->

      <!-- Bootstrap/jQuery -->
  <!-- <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
  integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
  crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
  integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
  crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
  integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
  crossorigin="anonymous"></script> -->

<!-- Moment.js -->
<!-- <script src="https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js"></script> -->

<!-- MSAL -->
<!-- <script src="https://cdn.jsdelivr.net/npm/bluebird@3.7.2/js/browser/bluebird.min.js"></script>
<script src="https://alcdn.msftauth.net/lib/1.2.1/js/msal.js"
  integrity="sha384-9TV1245fz+BaI+VvCjMYL0YDMElLBwNS84v3mY57pXNOt6xcUYch2QLImaTahcOP"
  crossorigin="anonymous"></script> -->

<!-- Graph SDK -->
<!-- <script src="https://cdn.jsdelivr.net/npm/@microsoft/microsoft-graph-client/lib/graph-js-sdk.js"></script>

<script src="./msconfig/config.js"></script>
<script src="ui.js"></script>
<script src="./msconfig/auth.js"></script>
<script src="graph.js"></script> -->
    <!--MS Outlook, ends here-->
  
</template>

<script>
// Select DOM elements to work with
export default {
    data(){
        return {
            authenticatedNav : '',
            accountNav : '',
            mainContainer : '',
            Views : { error: 1, home: 2, calendar: 3 }
        }
    },
     methods : {
         gotoSignIn(){
             this.signIn()
         },

          signIn() {
            // TEMPORARY
            // this.updatePage({name: 'Megan Bowen', userName: 'meganb@contoso.com'});
                    // Login
                    try {
                         this.msalClient.loginPopup(this.loginRequest);
                        console.log('id_token acquired at: ' + new Date().toString());
                        if (this.msalClient.getAccount()) {
                        this.updatePage(this.msalClient.getAccount(), this.Views.home);
                        }
                    } catch (error) {
                        console.log(error);
                        this.updatePage(null,this.Views.error, {
                        message: 'Error logging in',
                        debug: error
                        });
                    }

        },
        signOut() {
            // TEMPORARY
            // this.updatePage();
            this.msalClient.logout();
        },
        createElement(type, className, text) 
        {
        var element = document.createElement(type);
        element.className = className;

        if (text) {
            var textNode = document.createTextNode(text);
            element.appendChild(textNode);
        }

        return element;
        },

        showAuthenticatedNav(account, view) {
        this.authenticatedNav.innerHTML = '';

        if (account) {
            // Add Calendar link
            var calendarNav = this.createElement('li', 'nav-item');

            var calendarLink = this.createElement('button',
            `btn btn-link nav-link${view === this.Views.calendar ? ' active' : '' }`,
            'Calendar');
            calendarLink.setAttribute('onclick', 'getEvents();');
            calendarNav.appendChild(calendarLink);

            this.authenticatedNav.appendChild(calendarNav);
        }
        },

        showAccountNav(account) {
            this.accountNav.innerHTML = '';

        if (account) {
            // Show the "signed-in" nav
            this.accountNav.className = 'nav-item dropdown';

            var dropdown = this.createElement('a', 'nav-link dropdown-toggle');
            dropdown.setAttribute('data-toggle', 'dropdown');
            dropdown.setAttribute('role', 'button');
            this.accountNav.appendChild(dropdown);

            var userIcon = this.createElement('i',
            'far fa-user-circle fa-lg rounded-circle align-self-center');
            userIcon.style.width = '32px';
            dropdown.appendChild(userIcon);

            var menu = this.createElement('div', 'dropdown-menu dropdown-menu-right');
            dropdown.appendChild(menu);

            var userName = this.createElement('h5', 'dropdown-item-text mb-0', account.name);
            menu.appendChild(userName);

            var userEmail = this.createElement('p', 'dropdown-item-text text-muted mb-0', account.userName);
            menu.appendChild(userEmail);

            var divider = this.createElement('div', 'dropdown-divider');
            menu.appendChild(divider);

            var signOutButton = this.createElement('button', 'dropdown-item', 'Sign out');
            signOutButton.setAttribute('onclick', 'signOut();');
            menu.appendChild(signOutButton);
        } else {
            // Show a "sign in" button
            this.accountNav.className = 'nav-item';

            var signInButton = this.createElement('button', 'btn btn-link nav-link', 'Sign in');
            signInButton.setAttribute('onclick', 'gotoSignIn();');
            this.accountNav.appendChild(signInButton);
        }
        },

        showWelcomeMessage(account) {
        // Create jumbotron
        var jumbotron = this.createElement('div', 'jumbotron');

        var heading = this.createElement('h1', null, 'JavaScript SPA Graph Tutorial');
        jumbotron.appendChild(heading);

        var lead = this.createElement('p', 'lead',
            'This sample app shows how to use the Microsoft Graph API to access' +
            ' a user\'s data from JavaScript.');
        jumbotron.appendChild(lead);

        if (account) {
            // Welcome the user by name
            var welcomeMessage = this.createElement('h4', null, `Welcome ${account.name}!`);
            jumbotron.appendChild(welcomeMessage);

            var callToAction = this.createElement('p', null,
            'Use the navigation bar at the top of the page to get started.');
            jumbotron.appendChild(callToAction);
        } else {
            // Show a sign in button in the jumbotron
            var signInButton = this.createElement('v-btn', 'btn btn-primary btn-large',
            'Click here to sign in');
            signInButton.setAttribute('onclick', 'gotoSignIn();')
            jumbotron.appendChild(signInButton);
        }

        this.mainContainer.innerHTML = '';
        this.mainContainer.appendChild(jumbotron);
        },

        showError(error) {
        var alert = this.createElement('div', 'alert alert-danger');

        var message = this.createElement('p', 'mb-3', error.message);
        alert.appendChild(message);

        if (error.debug)
        {
            var pre = this.createElement('pre', 'alert-pre border bg-light p-2');
            alert.appendChild(pre);

            var code = this.createElement('code', 'text-break text-wrap',
            JSON.stringify(error.debug, null, 2));
            pre.appendChild(code);
        }

        this.mainContainer.innerHTML = '';
        this.mainContainer.appendChild(alert);
        },

        updatePage(account, view, data) {
        if (!view || !account) {
            view = this.Views.home;
        }

        this.showAccountNav(account);
        this.showAuthenticatedNav(account, view);

        switch (view) {
            case this.Views.error:
            this.showError(data);
            break;
            case this.Views.home:
            this.showWelcomeMessage(account);
            break;
            case this.Views.calendar:
            break;
        }
        }

    },
    mounted(){
        this.authenticatedNav   =   document.getElementById('authenticated-nav');
        this.accountNav = document.getElementById('account-nav');
        this.mainContainer = document.getElementById('main-container');
        console.log(this.authenticatedNav,this.accountNav)
        this.updatePage(null, this.Views.home);
    },
}
</script>

<style scoped>
body {
  padding-top: 70px;
}

</style>