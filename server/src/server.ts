import express from "express";
import cors from "cors"
import { PrismaClient } from "@prisma/client";

import { convertHourStringToMinutes } from './utils/convertHoursStringToMinutes';
import { convertMinutesToHourString } from './utils/convertMinutesToHoursString';

const app = express();
app.use(cors())
app.use(express.json())
const prisma = new PrismaClient()

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true

        }
      }
    }
  })
  return res.json(games)
})


app.get('/games/:id/ads', async (req, res) => {
  const gameId: string = req.params.id
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      gameId: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return res.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),

    }
  }))
})

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  return res.json({
    discord: ad.discord
  })

})


app.post('/games/:gameId/ads', async (req, res) => {
  const gameId = req.params.gameId
  const body = req.body
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  })
  return res.status(201).json(ad)
})


app.listen(3333);
