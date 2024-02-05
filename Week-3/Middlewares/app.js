let express = require("express");
let app = express();

//bad way to check validation
app.get("/health", (req, res) => {
    const { kidnyId } = req.query;
    const username = req.header('username');
    const password = req.header('password');
    console.log(kidnyId);
    console.log(username);
    console.log(password);
    if (username !== "srijit" || password !== "system") {
        res.status(403).json({
            msg: "user not found",
        });
        return;
    }
    if (kidnyId < 0 || kidnyId > 2) {
        res.status(411).json({
            msg: "wrong input",
        })
        return;
    }

    res.json({
        msg: "Your kidney is fine"
    })
})

app.listen(3000, () => {
    console.log('Connected on port no 3000');
})
