Hosted online at: https://docs.google.com/document/d/1cj-VyT9jPUF0jLR2TfWqsjkDyFmWtaenzg2vMOjJZzM/edit?usp=sharing

Copy here dated at 23 Nov 2016.

## Don’t leave me hanging
A webapp that lets you high five someone anywhere in the world. ‘Cause why the hell not?


### I. General
Problem
Nobody wants to be left hanging when they’re hollaing for a high five. With this app you’re not dependent on people in the same room anymore. ‘Cause fuck’em. Now, the whole world can give you some love.


Target audience
Awesome people with frequent awesome moments that need awesome high fives, that should be responded to with awesome high fives and not be left hanging ‘cause there’s no one around to give some love. That’s so not awesome.


Goals
In the opening screen you have two choices: 
ask for a high five (“Don’t leave me hanging”)
answer a hanging high five (“Give some love”)
Of course you can always ask for a high five, so the first button is always active. But, you can only answer a high five when there’s one hanging. So the second button is only active when there’s a high five hanging somewhere in the world.


When you ask for a high five the next screen will start a timer. It shows “the time hanging”. It also shows a “give up”-button if you feel you’re left hanging too long and want to go back to the screen where you can ask for a new high five or answer someone else’s.


When your high five is answered though, the next screen appears. It will play a high five sound and shows you the name of the user that responded to your high five, their location and the time you were left hanging:  . When you click the screen, you will go back to the screen where you can ask for and respond to a high five again.


On the other hand when you answer a high five the next screen will play a high five sound and show you the name of the user that was hanging, their location and the time you left them hanging: “You left name from location hanging for x amount of time”. When you click the screen, you will go back to the screen where you can ask for and respond to a high five again.


For this app you have to registrate. So we can show you your hanging high five on all your devices. You log in with your email and password. When your hanging high five is answered you get a notification through email. 


On you profile page you can see your name and email and all the high fives you asked for and answered with the user, location and hanging-time. Fastest on top. You also see your ranking in the world: who has had the most successful high fives through this app?  


II. Business model
Revenue
We get revenue in levels of awesomeness. Getting a high five from Dubai is worth at least over 9000, right?


Costs
Over 9000. We’re paying NYCDA and BSSA to build this app in two weeks. Also, we don’t have any income for these two weeks. And don’t get us started on all the lempers and burgers we’ll need from the food truck outside. But we’ll be swimming in awesomecoins afterwards. Worth it. Close enough. Just saying.


Market research:
Current competition
Paperplanes.world
Real high fives from real people IRL


How our app is different from currently available competitors
Paperplanes only have stamps with locations on them. With our app you also see how long it took ‘till someone answered you hanging high five and the name of the user that answered. Making it that much more personal and special.
For real high fives you need real people that want to be around you. This app makes sure your high five will be answered, irrespective of your shitty personality. Additional bonus: receiving high fives from anywhere in the world wherever you are. You cosmopolitan, you!


Current supply / demand for our app
Everybody needs love. Everybody needs high fives.


III. Technical Specifications
In the webapp version we will make a login system, eventually we want to move to a native mobile app.


Data
3 models:
+ Users
    * Id (Unique)
    * Name
    * Email (Unique)
    * Password
    * Timestamps
+ High Fives Asking (HFAsking)
    * Id (Unique)
    * Location = String(city, country)
    * UserId (Unique)
    * HFGivingId (Unique)
    * Timestamps
+ High Fives Giving (HFGiving)
    * Id (Unique)
    * Location = String(city, country)
    * UserId (Unique)
    * HFAskingId (Unique)
    * Timestamps


A relational database makes sense here. The relationships are:
1 - m
    User hasMany HFAsking
    HFAsking belongsTo User
1 - m
    User hasMany HFGiving
    HFGiving belongsTo User
1 - 1
    HFAsking hasOne HFGiving
    HFGiving belongsTo HFAsking


Views
Page 0. Login / Register
    Form1: Login
        Email
        Password
    Form2: Register
        Name
        Email
        Password
        Confirm password


Page 1. Index
    Button('don\'t leave me hanging')
    Button('give some love')


Page 2. Waiting
    TimerWaiting
    Quotes about waiting, occasionally
    Button('Give up')


Page 3. YAAAAY!
    Highfive sound
    HFAsking: You were left hanging by #{name} for {time}, #{location}
    HFgiving: You left #{name} hanging for {time}, #{location}


Page 4. Profile
    Leaderboard Ranking
    HFGiving.count()
    HFAsking.count()
    Change userdata
        Password
        Email
        Logout


Dataflow
0. Login / register => create session
1. Ask for highfive => create new HFAsking
1. Give a highfive => create new HFGiving
2. Wait until matched
3. GOTO YAAAAY! => update database
4. Again, again, let's go again

Have a timeline of milestones to reach, including deadlines:
- Create milestones that represent the discrete blocks of functionality.

Sprint 1: Mon 21 Nov - Fri 25 Nov, 6 PM 
MVP ready (not styled and polished, but all basic functions works.)

Database set up:
- database 
- path to database
- models: user, HFAsking, HFGiving
- relations
Express settings
Routes set up

- Base (‘/index’)
- register
    - login
    - logout
    - timer
    - Don’t leave me hanging (new HFAsking)
- Give some love (new HFgiving)
- high five received success
- high five given success
    - profile
Views set up
- Includes
- Login / register
- Index
- Timer
- HFAsking success
- HFGiving success
- Profile
The coding starts:
Landing - Register: create user, start session
Landing - Login: find user, start session
Index - Don’t leave me hanging button: Create HFAsking
Index - Give some love button: Create HFGiving
HFAsking success: Find matching HFGiving id
HFGiving success: Find matching HFAsking id
Profile - show name, email: Find user
Profile - change name form: Find user update name
Profile - change email form: Find user update email (if unique)
Profile - change password form: Find user update password
Profile - logout: destroy session
Timer - counter: start = current time - createdAt
Timer - give up button: back to index


Sprint 2: Mon 28 Nov - Fri 2 Dec, 6 PM
Decide on steps Monday Nov 28th at 10 am: stand up
Roughly:
Materialize
Sound effect high five
Styling
Photoshop high five etc


