---
layout: post
title: "Connecting PC Headset Mic to Mixer (Steinberg CI1)"
---

This is what I would thoroughly classify under, "rare, but irksome" problems.

I've got a Steinberg CI1 mixer that I use as an input for my guitar, and have my KRK studio monitors plugged into for output. It's plugged into my computer as well, so I can either run the guitar to the monitors, or my PC's sound (or both). The mixer uses either line-level or +48V phantom power for the inputs. Which is great for a guitar, or for a professional microphone, but the microphones in PC headsets (mostly condenser mics, which are fairly cheap) run at the +5V supplied by a computer's soundcard. Which is... awkward, and since I just bought a shiny new Razer Blackshark headset, I figured I should find a way to plug the PC mic into the mixer, for convenience and whatnot.

So, I found a way. It takes the mic signal from the 3.5mm TRS connector from the headset, amplifies it, and outputs to a 1/4" TS connector (although it could just as easily be a 3.5mm TS jack, if that's what you required). Pretty simple, parts list as follows:

* 3.5mm female TRS connector jack
* 1/4" male TS connector (with some cable attached, I just used part of an old guitar cable)
* 10uF capacitor (I'd say 16V+, the one I've used is 100V, but that's overkill, just what I had)
* 2.2kOhm resistor
* 9V battery connector

The circuit diagram is as follows:

![Circuit diagram for amp](/assets/images/PC-Headset-to-Mixer-Diagram.jpg)

That's uhh... That's pretty much it. I put it into a fancy little project box, to make it fancy, as below. Aside from that, just connect the 9V battery whenever you need to use the mic, plug your headset into the 3.5mm end, then plug the 1/4" side into the mixer, and you should be good to go!

![Picture of amp](/assets/images/PC-Headset-to-Mixer-Picture.jpg)

Fancy.
