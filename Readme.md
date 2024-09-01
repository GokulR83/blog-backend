 # Backend for Blog Website and its a personal project
## About this Project
This is personal project which helps me understand the concept of REST API, I have learned many about handling request and sending optimal response to the client and also build the login/signup from the scratch and handling the form data with user uploaded image and finally created a features for any user can create account and start creating the blogs and able to manage the all the blogs
## setup of this Project
### Install All the Packages
`npm install`
### Setup your Own .Env File
```
PORT = 8000
DATABASE_URL = your mongoDB URL

JWT_SECRET = You can give any string
JWT_EXPIRE = (Expire time) => "5d"

Get all the cloudinary details from the cloudinary website
CLOUDINARY_CLOUD_NAME= name of cloud
CLOUDINARY_API_KEY= cloud api key
CLOUDINARY_API_SECRET= api secret
```
## To Run This API
- for simple
`npm start`
- for dev mode
`npm run dev`


## Routes
    - api/auth
      - /login
      - /signup
      - /logout
      - /refetch
    - api/user
      - /:userId (for fetching the user)
      - /update/:userId (for update the current user)
      - /delete/:userId (for delete the user)
      - /upload/:userId (for uploading the profile Image)
    - api/blog
    - /:blogId (for fetching the blog)
    - / (for fetching all the blogs)
    - /create/:userId (for Creating New Blog)
    - /:blogId (for deleting the blog)

## Contact Me
If you guys find anything that i need to improve, give any suggestions or feedback about this project fell free to mail me 
`withgokulr@gmail.com`