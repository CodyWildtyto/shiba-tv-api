import { QueryResultRow, sql } from '@vercel/postgres';
import { Request, Response } from 'express';

const parseChannel = (item: QueryResultRow) => ({
    id: item.id,
    kind: `youtube#${item.kind}`,
    snippet: {
        title: item.title,
        description: item.description,
        customUrl: item.custom_url,
        publishedAt: item.published_at,
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
        viewCount: item.view_count,
        subscriberCount: item.subscriber_count,
        videoCount: item.video_count,
    },
});

const getAll = async (req: Request, res: Response) => {
    try {
        const { rows: channels } = await sql`SELECT * FROM Channels;`;

        if (channels?.length) {
            res.json({
                items: channels.map(parseChannel),
            });
        } else {
            res.status(404).send('Channels not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving channels');
    }
};

export default { getAll };
