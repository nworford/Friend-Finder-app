# friend-finder

This app contains a survey that will match you with a compatible friend.



ABOUT Friend Finder:

Friend Finder was a Node.js and Express.js homework assignment. Instructions were as follows:

Overview

In this activity, you'll build a compatibility-based "FriendFinder" application -- basically a dating app. This full-stack site will take in results from your users' surveys, then compare their answers with those from other users. The app will then display the name and picture of the user with the best overall match. 

You will use Express to handle routing. Make sure you deploy your app to Heroku so other users can fill it out.


Before You Begin


Check out this demo version of the site. Use this as a model for how we expect your assignment look and operate.
Create a folder called FriendFinder. Inside the folder, organize your directories so it matches the following:


  FriendFinder
    - app
      - data
        - friends.js
      - public
        - home.html
        - survey.html
      - routing
        - apiRoutes.js
        - htmlRoutes.js
    - node_modules
    - package.json
    - server.js

Instructions


Your survey should have 10 questions of your choosing. Each answer should be on a scale of 1 to 5 based on how much the user agrees or disagrees with a question.
Your server.js file should require the basic npm packages we've used in class: express, body-parser and path.
Your htmlRoutes.js file should include two routes:



A GET Route to /survey which should display the survey page.
A default, catch-all route that leads to home.html which displays the home page. 



Your apiRoutes.js file should contain two routes:



A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 



You should save your application's data inside of app/data/friends.js as an array of objects. Each of these objects should roughly follow the format below.


{
  "name":"Ahmed",
  "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}

Determine the user's most compatible friend using the following as a guide:



Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).
With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.


Example: 


User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]

User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]

Total Difference: 2 + 1 + 2 = 5





Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on. 
The closest match will be the user with the least amount of difference.



Once you've found the current user's most compatible friend, display the result as a modal pop-up.


The modal should display both the name and picture of the closest match. 





TECH USED: Node.js, Express.js
HIGHLIGHT CODE:


// console.log(friends);

router.get("/friends", (req, res) => {

    // res.send("home");

    res.render("friends", {friends:friends});

});



router.post("/friends", formParser, (req, res) => {

    // res.sendFile(path.join(__dirname, "../public/survey.html"));

    var newFriend = {

        name:req.body.name,

        photo:req.body.photo,

        scores:[]

    };

    var i = 1;

    while(req.body["q" + i]){

        newFriend.scores.push(req.body["q" + i]);

        i++;

    }

    var bestie = matcher(newFriend, friends);

    friends.push(newFriend);

    var text = "module.exports=" + JSON.stringify(friends);

    fs.writeFile(path.join(__dirname, "../data/friends.js"), text, (error)=>{

        if(error){

            return console.log(error);

        }

        console.log("Friends updated.");

        if(bestie === null){

            res.render("first");

        }

        else {

                res.render("results", bestie);

            // res.send("Your best match is: " + bestie.name + " with a score of: " + bestie.difference);

        }

    });

});


CONCLUSION: 
	In completing this assignment, I got an introduction into how to use Node.js and Express.js servers.

GRADE: A

INSTRUCTOR COMMENT:

from David Hammond 
March 3rd, 11:36 am

Good work, everything working as expected. Thanks for also submitting and adding to your portfolio! My main critique is remember this was to be deployed with data already incorporated. In terms of your API List what you did was fine and actually more work, They were trying to get you to use res.json(data), so that you can just pass raw json back and in your case you took the time to pass it to a handlebars view which is fine, just be aware of how to simply pass json data back as well if need be. Overall great work!

FUTURE DEVELOPMENT:
