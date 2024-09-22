import { QueryResultRow, sql } from '@vercel/postgres';
import { Request, Response } from 'express';

const parseVideo = (item: QueryResultRow) => ({
    id: {
        kind: `youtube#${item.kind}`,
        videoId: item.id,
    },
    snippet: {
        publishedAt: item.published_at,
        channelId: item.channel_id,
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
        channelTitle: item.channel_title,
        publishTime: item.publish_time,
    },
});

const getOne = async (req: Request, res: Response) => {
    try {
        const { channelId } = req.query;
        const { rows: videos } =
            await sql`SELECT * FROM Videos WHERE channel_id = ${
                channelId as string
            };`;

        if (videos?.length) {
            res.json({
                items: videos.map(parseVideo),
            });
        } else {
            res.status(404).send('Videos not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving videos');
    }
};

export default {
    getOne,
};
