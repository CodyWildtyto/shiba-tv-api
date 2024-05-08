require('dotenv').config();

const express = require('express');
const app = express();
const { sql } = require('@vercel/postgres');

app.get('/channels', async (req, res) => {
    try {
        const { rows: channels } = await sql`SELECT * FROM Channels;`;

        if (channels?.length) {
            res.json({
                items: channels.map((item) => ({
                    id: item.id,
                    kind: `youtube#${item.kind}`,
                    snippet: {
                        title: item.title,
                        description: item.description,
                        customUrl: item.customurl,
                        publishedAt: item.publishedat,
                        thumbnails: {
                            default: {
                                url: `${item.thumbnail_url}s88-c-k-c0x00ffffff-no-rj`,
                            },
                            medium: {
                                url: `${item.thumbnail_url}s240-c-k-c0x00ffffff-no-rj`,
                            },
                            high: {
                                url: `${item.thumbnail_url}s800-c-k-c0x00ffffff-no-rj`,
                            },
                        },
                    },
                    statistics: {
                        viewCount: item.viewcount,
                        subscriberCount: item.subscribercount,
                        videoCount: item.videocount,
                    },
                })),
            });
        } else {
            res.status(404).send('Channels not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving channels');
    }
});

app.get('/video', async (req, res) => {
    try {
        const { channelId } = req.query;
        const { rows: videos } =
            await sql`SELECT * FROM Videos WHERE channelid = ${channelId};`;

        if (videos?.length) {
            res.json({
                items: videos.map((item) => ({
                    id: {
                        kind: `youtube#${item.kind}`,
                        videoId: item.id,
                    },
                    snippet: {
                        publishedAt: item.publishedat,
                        channelId: item.channelid,
                        title: item.title,
                        description: item.description,
                        thumbnails: {
                            default: {
                                url: `https://i.ytimg.com/vi/${item.id}/default.jpg`,
                            },
                            medium: {
                                url: `https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`,
                            },
                            high: {
                                url: `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
                            },
                        },
                        channelTitle: item.channeltitle,
                        publishTime: item.publishtime,
                    },
                })),
            });
        } else {
            res.status(404).send('Videos not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving videos');
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server ready on port ${port}.`));

module.exports = app;
