import app from "./app";
import chalk from "chalk";

const server = app.listen(app.get("port"), () => {
  console.log(
    chalk.greenBright(
      `Listening on port ${app.get("port")} in ${app.get(
        "env"
      )} mode. Open http://localhost:3001/api`
    )
  );
});

export default server;
