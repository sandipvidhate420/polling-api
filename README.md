# polling-api

This is a backend project intended to used at platforms where polling/voting type of situation is expected. With this API you can
- Create your own questions
- Delete the questions: (optional: A question can’t be deleted if one of it’s options has votes)
- Add Options to the questions
- View questions along with its options
- Delete Options (optional: An option can’t be deleted if it has even one vote given to it)
- Add Votes to the options

# Important Link:

- Hosting Link:  https://polling-api.onrender.com/

# Important endpoints of the API
- Create your own questions: https://polling-api.onrender.com/question/create
- Delete the questions: https://polling-api.onrender.com/question/:id/delete
- Add Options to the questions: https://polling-api.onrender.com/question/:id/options/create
- View questions along with its options: https://polling-api.onrender.com/question/:id
- Add Votes to the options: https://polling-api.onrender.com/option/:id/delete
- Delete Options: https://polling-api.onrender.com/option/:id/add_vote



# Tech Stack:
- NodeJS
- MongoDB
- express
- JS
