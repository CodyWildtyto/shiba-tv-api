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
const parseChannel = (item) => ({
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
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: channels } = yield (0, postgres_1.sql) `SELECT * FROM Channels;`;
        if (channels === null || channels === void 0 ? void 0 : channels.length) {
            res.json({
                items: channels.map(parseChannel),
            });
        }
        else {
            res.status(404).send('Channels not found');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving channels');
    }
});
exports.default = { getAll };
