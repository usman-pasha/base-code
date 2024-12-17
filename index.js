// Package Imports
const { logger, openDataBase } = require("database-connection-function-com")

// Custom Imports
const app = require("./app")
const config = require("./config/index")

const server = app.listen(config.PORT, async() => {
    logger.info(
        `App is running at http://localhost:${config.PORT}`,
        config.PORT,
        app.get("env")
    );
    await openDataBase.openDBConnection(config.DATABASE)
    logger.info("Press CTRL-C to stop\n");
});

server.on("close", () => {
    logger.info("Server closed");
    server.close();
});

process.on("SIGINT", (err) => {
    server.emit("close");
    process.exit(0);
});

