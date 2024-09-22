"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = require("@vercel/postgres");
const parseVideo = (item) => ({
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
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { channelId } = req.query;
        const { rows: videos } = yield (0, postgres_1.sql) `SELECT * FROM Videos WHERE channel_id = ${channelId};`;
        if (videos === null || videos === void 0 ? void 0 : videos.length) {
            res.json({
                items: videos.map(parseVideo),
            });
        }
        else {
            res.status(404).send('Videos not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving videos');
    }
});
exports.default = {
    getOne,
};
