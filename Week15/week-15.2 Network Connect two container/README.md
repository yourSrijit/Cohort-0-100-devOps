# Network
In Docker, a network is a powerful feature that allows containers to communicate with each other and with the outside world.
Docker containers can’t talk to each other by default.
localhost on a docker container means it's own network and not the network of the host machine

## Types of networks
- Bridge: The default network driver for containers. When you run a container without specifying a network, it's attached to a bridge network. It provides a private internal network on the host machine, and containers on the same bridge network can communicate with each other.
- Host: Removes network isolation between the container and the Docker host, and uses the host's networking directly. This is useful for services that need to handle lots of traffic or need to expose many ports.

### 1. Create a image of this current of this project
`
docker build -t node_app .
`
### 2. Create a mongo container with Network and Volume 
`
docker run -d -v volume_db:/data/db --name mongo_network --network my_network -p 27017:27017 mongo
`
### 3. Run the created image 
Now you need to run the mongo_app image and create a container but you hava to change something in the db url
Insted of uisng this url
 `const mongoUrl: string = 'mongodb://mongo:27017/myDatabase';` 

you need to use this url 
` const mongoUrl: string = 'mongodb://mongo_network:27017/myDatabase';`

You have to change the localhost with the mongo container name and now run the project node js image

`
docker run -d -p 3000:3000 --network my_network node_app 
`
Now do operation using postman on post 3000 .Try to insert data into db and get users..Enjoy
on port `http://localhost:3000/user` try to add some data and get log like this 
```
{
    "message": "User created",
    "user": {
        "name": "SrijitBera",
        "age": 22,
        "email": "berasrijit1@gmail.com",
        "_id": "66cb039b6cf50f7ed1a0e0c1",
        "__v": 0
    }
}
```
Also get the data from  `/users/` route