import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import {cors} from "hono/cors"
// Create the main Hono app
//tells ts to  understand that toml has been injected in this code
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}
}>();

app.use('/*',cors())
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

export default app;
