# Node Hub

A simple nodejs HTTP server that can run on something with node, like a Raspberry Pi, to intercept non-HTTPS events from a local network and relay them to initialstate.com over HTTPS.

## Purpose of project
To provide a means for low-powered networked devices to communicate event data to Initial State without having the overhead of TLS on the local network while still using TLS from the hub over the Internet to initialstate.com

## Getting started

This is a nodejs express application that can be run inside a resin.io container. To setup the application on a Raspberry Pi with resin.io, follow instructions here: http://docs.resin.io/#/pages/installing/gettingStarted.md

Recommended that the repo be forked before doing work to make working with resin.io easier.
