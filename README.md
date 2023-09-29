# 🌟 WishJourney: : Your Travel Dreams Visualized 🌟
Hey there! Welcome to my second project 'WishJourney'~

💎 [Click here](https://project02-wishjourney.onrender.com) to see my live project!

📢 Tools used: JavaScript, Node.js, Express, EJS, Postgres, CSS

🖥 Dependencies Used: Express, EJS, EJS layouts, noDemon, PostgreSQL, method-override, bcrypt, express-session, dotenv


![](/public/images/landing2.png)

## 🌍 About 
 WishJourney began as a solution to a common traveler's dilemma: how to organize and visualize future travel plans in one consolidated space. From a developer's standpoint, the goal was simple - design a user-friendly platform where users can curate their travel aspirations. This web application streamlines the planning process, allowing users to detail destinations, set budgets, and jot down essential notes. It’s not just about listing places; it's about building a personal roadmap to the world's wonders. Dive in, contribute, or simply explore! ✨

## 🎯 Inspiration Behind WishJourney 
Creating WishJourney was a labor of love, driven by the passion for travel and the joy of building. I believe the beauty of travel lies not just in the journey but also in its planning - in the hours spent looking at pictures of destinations, reading about hidden gems, and daydreaming about the adventures that await. WishJourney is built on this very idea of turning the joy of travel planning into a visual and interactive experience.

## 🌈 Key Features
- Personalized Dashboard: The heart of the app. Tailor-made for each user to add, view, and edit their dream destinations.

- Deep Dive into Details: More than just names and dates. Add nuances to each destination like budgets, travel partners, personal notes, and inspirations.

- Visual Treat: A vibrant display of all your dream destinations. Let the images inspire and remind you of why you dreamt of that place.

- Flexible & Intuitive: Life’s unpredictable. So, whether it's a change in plans or a change in heart, editing your plans is a breeze.

- Privacy-Centric: Built with a deep commitment to protect user data, ensuring your dreams and plans remain yours.

- A Landing Page that Resonates: Every time you revisit, the landing page serves as an inspirational reminder - "Wish it. Plan it. Journey it."

## ♨️ User Guide

### 1. Landing Page

#### Visual Introduction

Upon visiting WishJourney, you're greeted with a captivating hero image and our headline: Wish it. Plan it. Journey it. Delve into the world of organized travel planning right from this page.

#### Create My Travel List Button

Central to the page, this blue button beckons you to start your journey. Clicking it directs you to the login page.

![](/public/images/landing2.png)

---

### 2. Login & Sign-Up

#### Login

For existing users, enter your email and password to access your personalized travel dashboard.

![](/public/images/login.png)

#### Sign-Up

New to WishJourney? No worries! Click on the sign-up link below the login form.
Provide your desired name, email, and a secure password to create an account.
Once registered, you'll be directed to your personal trip dashboard.

![](/public/images/Sign_up.png)

---

### 3. Personal Trip Dashboard

#### Intuitive Layout

See all your dream destinations at a glance, displayed as vibrant cubes, each presenting an image and destination name.

![](/public/images/dashboard.png)

#### Adding a Trip

Click the 'Add Trip' button to document a new travel destination.
You'll be directed to a form requesting details like destination name, image URL, target visit date, duration, travel partner, budget estimate, and any personal notes or highlights.
Once filled out, hit save to see this destination added to your dashboard.

![](/public/images/add_trip.png)

#### Navigating Individual Trips
Clicking on any destination cube opens its detailed view. Here you'll find all the specifics you’ve input, from budget estimates to personal highlights.
Two buttons, 'Edit' and 'Delete', allow you to modify or remove the trip, respectively.

![](/public/images/show.png)

---

### 4. Navigation Bar/Header

![](/public/images/nav_bar.png)

#### Logo and Title

The top right corner showcases the WishJourney logo and title. Clicking on this anytime takes you back to the landing page.

#### Profile & Dashboard Links

The 'MyDashboard' link is your quick gateway back to your personal dashboard from anywhere on the platform.
'MyProfile' leads you to a page displaying your account details, namely name and email.

#### Logout/Login

For logged-in users, the 'Logout' button on the top right corner ensures a smooth exit from your session.
Visitors not logged in will see a 'Login' button, guiding them to the login page.

---

### 5. Profile Management

#### Profile Overview

Accessible via the 'MyProfile' link, this page displays your name and email.

![](/public/images/profile.png)

#### Edit Profile

Clicking the 'Edit' button at the page's bottom leads to an edit form. Here, you can update your name, email, or even change your password. Once modifications are made, you'll be redirected to your dashboard, with the changes saved.

![](/public/images/edit_profile.png)

---

## 🏆 Reflecting on My Development Journey 

### ✏️ Planning 

#### ER Diagram

The creation of the two entities, Users and Destinations, stemmed from the core idea of the WishJourney application: to allow users to list their travel wishes. The Users entity was a foundational requirement for any application to manage user access and personalize user experiences. On the other hand, Destinations was the embodiment of the application's purpose. Each attribute in the Destinations table was selected based on what a traveler would typically consider or note down when thinking about future trips.

![](/public/images/ERDiagram.png)

#### Wireframe

Creating a wireframe prior to the development of my web app was an invaluable step in my design process. This preliminary sketch allowed me to visualize the layout and structure of each page, ensuring that I had a clear roadmap before diving into the actual development. By doing so, I could identify potential design challenges early on and address them proactively. Furthermore, the wireframe guided my decisions regarding consistent styling, especially for forms. I noticed that many pages shared similar form elements, so adopting a consistent CSS styling for these forms not only provided a cohesive user experience but also streamlined my development process. 

![](/public/images/wireframe1.jpg)

![](/public/images/wireframe2.jpg)

---

### 💛 Favourite Code

When I was developing WishJourney, I anticipated challenges, but user authentication was an unexpected deep dive. Here's what stood out for me:

- The Power of bcrypt: Using bcrypt to hash passwords was a revelation. Instead of storing raw passwords, I stored encrypted ones. This was my first real tryst with cybersecurity, understanding the paramount importance of safeguarding user data.
```
// if have matching email, check password
const userInputPw = req.body.password;
const hashedPwFromDb = dbRes.rows[0].password_digest;

bcrypt.compare(userInputPw, hashedPwFromDb, (err, result) => {
    if (err) {
        console.log(err);
    }

    if (result) {
        req.session.userId = dbRes.rows[0].userid
            return res.redirect('/dashboard')
    } else {
        return res.render('form_login', {errorMessage: 'Incorrect password. Try again.' })
    }
})

```

- Session Management: Assigning a user ID upon login and maintaining it throughout the session felt like giving a personal touch to each user's experience. This ID became the linchpin for many features, from profile management to personal dashboards.
```
function setCurrentUser(req, res, next) {

    // make userId available to all EJS
    res.locals.userId = req.session.userId;

    // if not logged in, move to the next station
    if (!req.session.userId) {
        return next ()
    }

    // if logged in, extract user details from db and make them global.
    const values = [req.session.userId];
    const sql = `SELECT * FROM users WHERE userid = $1;`

    database.query(sql, values, (err, dbRes) => {
        if (err) {
            console.log(err)
            process.exit(1)
        } else {
            const user = dbRes.rows[0];
            res.locals.user = user;
        }
        next()
    })  
}
```

- Global Accessibility vs. Authorization: Making user details globally accessible was powerful, but ensuring only the right user accessed them added a layer of sophistication. The blend of setCurrentUser and ensureLoggedIn functions was like creating a secure, personalized pathway for each user.
```
function ensureLoggedIn(req, res, next) {
    if (req.session.userId) {
        return next()
    }

    res.redirect('/login')
}

```

Looking back, the complexity of user authentication was overwhelming initially. But piecing it together, witnessing abstract logic become tangible features, was deeply gratifying. It wasn't just about "logging in"; it was a dance of logic, security, and user experience.

---

### 🚀 Challenges and Lessons Learned

### 1. Building a Solid Database Foundation🚊

Defining a robust database structure was crucial. But deciding on the right entities, their attributes, and data types was daunting. I was acutely aware that a shaky foundation would necessitate repeated revisions during the development phase. Therefore, rather than rushing into coding, I prioritized planning. I recognized the importance of a robust foundation and spent considerable time laying it out.


### 2. Achieving Uniform Styling Across Multiple Pages 💡

With over nine pages, each requiring distinct styling, I faced an uphill task, especially with the tight deadline (2 days). Moreover, the need to style them uniformly while maintaining their unique elements was challenging.

My initial wireframe sketches became my north star. They helped me visualize the end goal for each page, identify common sections, and structure my EJS templates uniformly. This universal CSS stylesheet became my time-saving hack, enhancing uniformity across diverse structures.

### 3. Staying Organized with Trello ✨

Looking back to my first project, managing multiple aspects of the project, from bug fixes to enhancements, was overwhelming. Remembering every minute detail was practically impossible.

As suggested by my instructor, adopting the Trello board has transformed my project management approach. The visual nature of Kanban made it easy to track progress, prioritize tasks, and even keep all related research and notes at my fingertips.


## 🌈 Bugs To Fix

### Date Format in Destination Detail Page

Issue: The target visit date currently displayed on an individual destination detail page is in the format: Tue Jul 15 2025 00:00:00 GMT+1000 (Australian Eastern Standard Time). This representation is not very user-friendly and could be visually unappealing to some users.

### Date Field in Edit Destination Page

Issue: When users attempt to edit their destination details, the date form field does not auto-populate with the previously saved date. This forces users to manually re-enter the target visit date every time they make an edit, which can be cumbersome and inefficient.

Proposed Solution: I am exploring integrating the day.js external module to handle and convert dates into a more user-friendly format. This is part of my ongoing efforts to improve the app's functionalities and is marked as a top priority in my enhancement objectives.

### Travel Partner Selection in Edit Form

Issue: When users edit a destination, the drop-down box for selecting the travel partner doesn't retain the previously chosen option. This requires users to manually select their travel partner each time they update destination details, which can be an inconvenience.



## ✅ Future Features

1. Direct Image Upload: Simplify destination personalization by allowing users to upload images directly.
2. Multi-device Optimization: Seamless WishJourney experience across desktops, tablets, and mobiles.
3. Explore Page: Discover and get inspired by other users' travel wish lists and suggested destinations.
4. Public Sharing Feature: Share your travel dreams with friends, family, or the WishJourney community.
5. Interactive Map: Visualize your travel destinations on an integrated map for a richer planning experience.