const io = require('socket.io')( 8900, {
    cors: {
        origin: 'http://localhost:5000'
    }
})
let users = []

io.on("connection", (socket) => {
    console.log('Connect server')
    //Add user with socket
    socket.on("addNewuser", (newUserId) => {
        // if user is not added previously
        if (!users.some((user) => user.userId === newUserId)) {
            users.push({ userId: newUserId, socketId: socket.id });
            console.log("New user connected", users);
        }
        // send all active users to new user
        io.emit("getusers", users);
    });
    //Send message
    socket.on("send-message", (data) => {
        const { recieverId } = data;
        const user = users.find((user) => user.userId === recieverId);
        console.log("Sending from socket to :", recieverId)
        console.log("Data: ", data)
        console.log(users)
        if (user) {
          io.to(user.socketId).emit("reciever-message", data);
        }
    });

    //Call user
    socket.on("callUser" , (data)=>{
        const {userToCall} = data 
        const idtoCall = users.find((user)=> user.userId = userToCall);
        console.log("Connection with id: ", idtoCall);
        console.log("Data: ", data)
        if(idtoCall){
            io.to(idtoCall).emit("callUser", 
                {
                    signal : data.signalData ,
                    from : data.from,
                    name : data.name
                }
            )
        }
    })

    socket.on("callAnswers", (data)=>{
        io.to(data.to).emit("callAccepts", data.signal)
    })

    //Disconnect user with socket  
    socket.on("disconnect", () =>{
        console.log("User disconnected : ", socket.id);
        users.filter((user) => user.socketId !== socket.id)
        io.emit("getusers" , users)
    })
})