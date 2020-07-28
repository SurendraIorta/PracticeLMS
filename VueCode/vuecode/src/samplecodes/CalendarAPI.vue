<template>
    <div>

    <p>Google Calendar API Quickstart</p>

    <!--Add buttons to initiate auth sequence and sign out-->
    <button id="authorize_button" style="display: none;">Authorize</button>
    <button id="signout_button" style="display: none;">Sign Out</button>

    <pre id="content" style="white-space: pre-wrap;"></pre>    
  
    </div>
</template>

<script>
export default {
    data(){
        return {
            // Client ID and API key from the Developer Console
        "CLIENT_ID" : '469435283693-fvgcp0ksig5tgr7o4qhmr3a9a8s2f4dc.apps.googleusercontent.com',
        "API_KEY" : 'AIzaSyCqBd1BQ7pcj_e0XbxHTkAEtVzT4sIxGDs',

        // Array of API discovery doc URLs for APIs used by the quickstart
        "DISCOVERY_DOCS" : ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],

        // Authorization scopes required by the API; multiple scopes can be
        // included, separated by spaces.
        "SCOPES" : "https://www.googleapis.com/auth/calendar.readonly",

        "authorizeButton" : document.getElementById('authorize_button'),
        "signoutButton" : document.getElementById('signout_button')
        }
    },
     methods:{    
      /**
       *  On load, called to load the auth2 library and API client library.
       */
      handleClientLoad() {
       this.gapi.load('client:auth2', this.initClient);
      },

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      initClient() {
        this.gapi.client.init({
          apiKey: this.API_KEY,
          clientId: this.CLIENT_ID,
          discoveryDocs: this.DISCOVERY_DOCS,
          scope: this.SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

          // Handle the initial sign-in state.
          this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());
          this.authorizeButton.onclick = this.handleAuthClick;
          this.signoutButton.onclick = this.handleSignoutClick;
        }, function(error) {
          this.appendPre(JSON.stringify(error, null, 2));
        });
      },

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          this.authorizeButton.style.display = 'none';
          this.signoutButton.style.display = 'block';
          this.listUpcomingEvents();
        } else {
          this.authorizeButton.style.display = 'block';
          this.signoutButton.style.display = 'none';
        }
      },

      /**
       *  Sign in the user upon button click.
       */
      handleAuthClick(event) {
          console.log(event);
        this.gapi.auth2.getAuthInstance().signIn();
      },

      /**
       *  Sign out the user upon button click.
       */
       handleSignoutClick(event) {
           console.log(event);
        this.gapi.auth2.getAuthInstance().signOut();
      },

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      },

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      listUpcomingEvents() {
        this.gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          this.appendPre('Upcoming events:');

          if (events.length > 0) {
            for (let i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              this.appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            this.appendPre('No upcoming events found.');
          }
        });
      }
}
}
</script>

<style scoped>

</style>