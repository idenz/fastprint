const app = require("./Applications");
const config = require('./Config/app.config');

/** Fungsi Untuk Start Server Backend */
app.listen(config.port, () => {
    console.log(`server started at port ${config.port}: Restful API`);
})

/** Fungsi Untuk Start Server Frontend */