---
layout: post
title: "You learn something new every day - Overlaying videos with ffmpeg"
date: 2012-03-14 18:22:43 +0000
comments: true
categories: ylsned
---

ffmpeg (http://ffmpeg.org/) is, without a doubt, the best video conversion tool available. Got something preferred? You're either wrong, or (more likely), the tool you're using actually uses ffmpeg in the background. Unfortunately, it's not the most well-documented tool available, so some tasks (like overlaying two videos so they play side-by-side) can be somewhat difficult. Through pure coincidence and nothing else, this is how you do said overlay. In this example, two videos will be scaled down to 640x360, then overlaid such that they appear side-by-side.
1. ffmpeg.exe -i Left_side_video.avi -vf scale=640:360,pad=1280:360:0:0:black -r 30 Left_side_video_small.avi
2. ffmpeg.exe -i Right_side_video.avi -vf scale=640:360 -r 30 Right_side_video_small.avi
3. ffmpeg.exe -i Left_side_video_small.avi -vf "movie=Right_side_video_small.avi [mv]; [in][mv] overlay=640:0" -r 30 Video_Comparison.avi

* The -i argument specifies the input video.
* The -r argument specifies frame rate. For this to work properly, both videos must be exactly the same framerate.
* The -vf arguments are the video filter arguments. There are tonnes of these (check the docs) that can do a tonne of things. Very handy.

That's it.