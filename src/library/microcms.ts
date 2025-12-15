// src/library/microcms.ts

import { createClient, type MicroCMSQueries } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// --- お知らせ用 ---
export type News = {
  id: string;
  createdAt: string;
  title: string;
  content: string;
};
export const getNews = async (queries?: MicroCMSQueries) => {
  return await client.getList<News>({ endpoint: "news", queries });
};

// --- 団紹介用 (ここにSNSなども含めます) ---
export type About = {
  createdAt: string;
  introduction: string;
  profile: string;
  activity: string;
  message: string;
  // ★追加: 連絡先情報 (ない場合もあるので ? をつけます)
  email?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
};
export const getAbout = async (queries?: MicroCMSQueries) => {
  return await client.getObject<About>({ endpoint: "about", queries });
};

// --- 演奏会用 ---
export type Concert = {
  id: string;
  title: string;
  date: string;
  ticketUrl?: string;
  image?: { url: string };
  content: string;
};
export const getConcerts = async (queries?: MicroCMSQueries) => {
  return await client.getList<Concert>({
    endpoint: "concert",
    queries: { orders: '-date', ...queries },
  });
};

// --- 活動報告用 ---
export type Activity = {
  id: string;
  createdAt: string;
  publishedAt: string;
  title: string;
  thumbnail?: { url: string };
  content: string;
};
export const getActivities = async (queries?: MicroCMSQueries) => {
  return await client.getList<Activity>({ endpoint: "activity", queries });
};