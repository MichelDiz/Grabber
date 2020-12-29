# Grabber

Under Construction

The intention of this application is to "grab" comments from live chat in live streams. And save them all in Dgraph to later use.

# For now

Install Deno JS first. Also, I use yarn.

I'm using a modified Deno lib called youtube-deno-master. But you can use the published one for now.

Go to ./googlelogin (I'll change this name to dashboard)

Run

```
yarn & yarn build:To:Deno
```

No go back to root and start the Deno server

```
cd ..

deno run --unstable --allow-net --allow-read main.ts

```

Access http://localhost:8008