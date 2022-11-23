import "reflect-metadata";
import { Connection, getConnection, createConnection } from "typeorm";
//
import { User, UserAuth, Article, Comment } from "./entity";

const {
  MYSQL_HOST = "",
  MYSQL_PORT = 3306,
  MYSQL_USERNAME = "",
  MYSQL_PASSWORD = "",
  MYSQL_DATABASE = "",
} = process.env;

let connectionReadyPromise: Promise<Connection> | null = null;

export const prepareConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        console.log(error);
      }

      const connection = await createConnection({
        type: "mysql",
        host: MYSQL_HOST,
        port: Number(MYSQL_PORT),
        username: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        // list of entities
        entities: [User, UserAuth, Article, Comment],
        synchronize: false,
        logging: true,
      });

      return connection;
    })();
  }

  return connectionReadyPromise;
};
