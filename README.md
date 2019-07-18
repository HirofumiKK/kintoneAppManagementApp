# kintoneAppManagementApp



# Details:
   # Goal:
       * To create an app with customizations that track all the apps and its detail information, along with some analysis.  

   # Context: 
       * As the number of users, and the size of the platform has been expanded. It becomes harder for the system administrator to manage the app. We will need to create a central system where it can monitors all the apps in the domain.

   # Title: 
       * App Management Template.

   # Event: 
       * app.record.index.show

   # Function:
       * Fetches app information within the platform
           * App Name
           * App ID (Unique)
           * Date of creation
           * Date of modified
           * Created By
           * Modified By
           * Space ID
           * Space Name
           * Thread ID

       * Fetches records information from each app:
           * Total numbers of records in each app
           * Most recent updated record
           * Most recent added record
           * Date of the most recent update
           * Date of the most recent added

       * Status: Active / In-active / Delete
           * Active: Date of most recent updated record falls within one year
           * In-active: Date of most recent updated record went above one year
           * Delete: Record is no longer found in the API

       * Analysis:
           * App Level:
               * How many average log-ins for each app per week
               * Average on numbers of the record being created in a week
               * Average on numbers of the record being updated in a week
               * How many comments are generated in each app.
               * # of Total Imports / Exports

   # PC View / Mobile View
       * View - Active
       * View - In-active
       * View - Delete

   # Remarks:
       * User must have admin rights.
       * All the space must be given access to the administrator



# Result
   # Target Audience: 
      - This App Management Template will be used on poc.kintone.com both as a showcase, and a management tool for internal users who uses poc.kintone.com to demo.

   # Create a customized view and place it on to the portal page:
     - Show categories to see which industry would this space apply to.
     - Show description of each space.
     - Show a link for quick access to space.
   

