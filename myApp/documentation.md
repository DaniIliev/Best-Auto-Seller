This site will help you not only to sell your car, but also to find a new, nicer one.

1.Best-autos-seller
*car sales site
2.BACK-END
*Node.js
*Firebase
*user data storage in localhost
3.FRONT-END
*Angular
4.Description
*This is Angular based website(Single Page Application), where you can sell and buy a cars. It is a project for the course "Angular - Front-End" in Sofia University(SoftUni). The whole project is using TypeScript. The back-end is written in Node.js and the front-end is written in Angular. 
5. PAGES {

    1. Register Page
   -Reactiveform
   -all fields are required
   -Email-validation with attribute directive
   -checking if the passwords are the same
   -after successful registration page redirect to user information
    2. Information about user [profile]
   firstRegistretion{
   -Reactiveform
   -all fields muss be required
   -the user must fill in his personal data
   -redirect to catalog page
   }
   readOnlyMode{
   -fetching user detail data --- user.localId == localId
   -find user autos --- fetching allAutos and filtering - auto.userId == localId
   }
   editMode{
   -Reactiveform
   -all fields are required
   -username - minlength(4)
   -path editDetailsAboutUser(userId)
   }
    3. Catalog page (available to all users)
   -fetching all car listings from the server (getAllAutos)
   -use structural directives to add the cars in Dom layout
   -details buttom redirect to car/details
    4. Details page (available to all users)
   -shows the complete data about the car
   if there is a logged-in user, the post can be liked and unliked, comments can be added.
   -the owner of the post has the right to change the details of the car, as well as to delete the car
   the following service calls are made:
   1.1 get Auto by id (fetchAuto())
   1.2 get all comments (getAllComments())
   1.3 get all likes (getLikes())
   1.4 post comment (postComment())
   1.5 post like (postLike())
   1.6 post unLike (unLike())
   contacts button redirect to the owner information
    5. Information about owner [Contacts] (available to all users)
   -contains the user data and his ads car
   the following service calls are made:
   getAllUserDetails and filtering - user.userId == ownerId
   fetching allAutos and filtering - auto.userId == ownerId
    6. Edit page (only if the user is owner)
    - fetchAuto(activatedRoute.snapshot.params['autoId'])
  -set Form-value
  -edit details
  -make patch calls editAuto(autId)
  -redirect to details about current auto

    7. Delete (only if the user is owner)
   -if owner confirms the deletion
    8. Search page (all users can search)
   -the user selects the desired brand
   fetching allAutos and filtering - auto.brand == selected
    9. Create page
   -template driven form
   -all fields are required
   postAuto(data)
   redirect to catalog page
    10. Login page
    -template driven form
    -Email-validation with attribute directive
}
6.Instalation
*Clone the repository
*Run npm install
*Run ng serve in the client (link: 'http://localhost:4200/')
