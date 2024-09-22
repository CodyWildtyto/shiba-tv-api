import { config } from 'dotenv';
import express from 'express';

import channel from './api/channel';
import video from './api/video';

const app = express();

config();

app.get('/channels', channel.getAll);
app.get('/video', video.getOne);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server ready on port ${port}.`));

export default app;
