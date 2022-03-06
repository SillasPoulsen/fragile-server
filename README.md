# fragile-server

# fragile-client
# M3 - `README.md` Example



# Fragile 


Live version : 
https://app.netlify.com/sites/inspiring-shirley-2099b2/overview

## Description

Fragile - An app to improve your mental health. 



## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Homepage** - As a "anonymous" user you'll be able to log in and sign up. If you are logged in, you'll be able to see all your subscriptions and get inspired to find new subscriptions. 
- **Signup:**  As a user you are introduced to the app and as a first time user you'll be guided trough the  the experience of the app. 
- **Login:** As a user I can login to the platform so that I can access my current "paths" and view content and go to my profile.  
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Profile Page**: As a logged in user I can visit my profile page so that I can see my "notes". 
- **View Path:** As a logged in user I can see the subscriptions I have taken, I can see earlier notes that I have written and I can create a new entry.
- **New journal:** As a logged in user I can add a journal to my chosen path. There will be an "guided session", and after that i can enter my response, and post either public or private. 
- **Public journals :** As a user I can see other peoples entries to the "guided session" I have just completed, I can then like the notes

## Backlog

- Add Premium (stripe intergration)
- Animations
- Custom loading
- Socket API to let you know if your entry has ben upvoted in real time. 



# Client / Frontend

## React Router Routes (React App)

| Path                            | Component              | Permissions                | Behavior                                                     |
| ------------------------------- | ---------------------- | -------------------------- | ------------------------------------------------------------ |
| `/login`                        | LoginPage              | anon only `<AnonRoute>`    | Login form, navigates to home page after login.              |
| `/signup`                       | SignupPage             | anon only `<AnonRoute>`    | Signup form, navigates to home page after signup.            |
| `/`                             | HomePage               | public `<Route>`           | Home page.                                                   |
| `/user-profile`                 | ProfilePage            | user only `<PrivateRoute>` | User profile for the current user, subscriptions, and notes. |
| `/user-profile/edit`            | EditProfilePage        | user only `<PrivateRoute>` | Edit user profile form.                                      |
| `/notes`                        | View                   | user only `<PrivateRoute>` | I can see earlier journals                                   |
|                                 |                        |                            |                                                              |
| `/notes/public`                 | publicJournals         | user only `<PrivateRoute>` | Read and up/downvote answers to the audio you just listented to. |
| ```/journey/:journeyname/:id``` | Episode in the journey | user only `<PrivateRoute>` | You can consume the audio related to the episode, and write your note. |
|                                 |                        |                            |                                                              |

## Components

Pages:

- HomePage
- LoginPage
- SignupPage
- IntroductionPage
- JourneyPage
- AudioPage
- NotesPage
- ProfilePage
- ErrorPage

Component

- AudioPlayer
- IsAnon
- IsPrivate
- JourneyCard
- Landingpage
- Navbar

## Services

- **Auth Service**

  - ```
    authService
    ```

    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

  

# Server / Backend

## Models

**User model**

```
 {
 email: { type: String, unique: true, required: true },
 password: { type: String, required: true },
 name: { type: String, required: true },
 image: { type: String, default: "https://i.imgur.com/yWHfhiG.png" },
 subscriptions: [{ type: Schema.Types.ObjectId, ref: "Journey" }],
 hasDone: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
 }
```

**Journey model**

```
 {
  belongsTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  name: { type: String },
  feeling: {
    type: String,
    enum: ["Stress", "Anxiety", "Depression", "Happiness"],
  },
  description: { type: String },
  episodes: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
},
```

**Note model**

```
{
 creator: { type: Schema.Types.ObjectId, ref: "User" },
episode: { type: Schema.Types.ObjectId, ref: "Episode" },
textInput: { type: String },
scaleInput: { type: String },
public: { type: Boolean },
upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
}
```



**Episode model**

```
{
belongsTo: { type: Schema.Types.ObjectId, ref: "Journey" },
audioUrl: { type: String, required: true },
title: { type: String },
description: { type: String },
notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
  },
}
```



## API Endpoints (backend routes)

| HTTP Method | URL                | Request Body                             | Success status | Error Status | Description                                                  |
| ----------- | ------------------ | ---------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile`    | Saved session                            | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`     | {name, email, password}                  | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`      | {username, password}                     | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`     |                                          | 204            | 400          | Logs out the user                                            |
| GET         | `/api/notes`       |                                          |                | 400          | Show all notes                                               |
| Post        | ``/api/notes``     |                                          |                |              | Up vote or down vote a note from somebody else.              |
| GET         | `/api/notes/:id`   |                                          |                |              | Show specific note                                           |
| POST        | `/api/notes`       | {creator, audio, textInput, scaleInput } | 201            | 400          | Create and save a new note                                   |
| PUT         | `/api/notes/:id`   | { textInput, scaleInput }                | 200            | 400          | edit note                                                    |
| GET         | `/api/journey/:id` |                                          |                |              | show the next episode in the journey.                        |



### Git

Url to my repositories and my deployed project

Client repository Link: https://github.com/SillasPoulsen/fragile-client

Server repository Link: https://github.com/SillasPoulsen/fragile-server

Deployed App Link: https://inspiring-shirley-2099b2.netlify.app/


