---
layout: ../../layouts/PostLayout.astro
title: "Self-hosting: worth it, but not for everyone"
date: 2025-12-28
description: Why I started self-hosting, what's running, and an honest take on whether it's actually worth the effort.
---

I run my own mail server. My own password manager. My own reverse proxy, auth layer, and a handful of smaller tools. At some point I stopped counting how many services I maintain and started just calling it "the infrastructure."

This didn't happen all at once. It grew — organically, slowly, one frustrated SaaS limitation at a time.

## Why I started

The honest answer is: privacy, cost, curiosity, and feature gaps. Roughly in that order depending on the day.

The privacy angle is obvious. The cost argument gets more interesting the longer you run things — a VPS plus a bit of time often beats per-seat SaaS pricing once you hit a certain scale. But the feature gaps are what actually pushed me over the line.

Mail archiving was the concrete example. What I wanted wasn't available through my provider without a significant upgrade, and even then the tooling was mediocre. With Mailcow and Sieve filters that automatically archive all incoming and outgoing mail, I have exactly the archiving setup I want, configured the way I want it. That's hard to put a price on.

## What's running

The current stack, roughly:

- **Mailcow** — mail server, handles everything including archiving
- **Vaultwarden** — self-hosted Bitwarden-compatible password manager
- **Authentik** — SSO and identity provider
- **Traefik** — reverse proxy, handles routing and TLS for everything
- **Various small tools** — link sharing, document sharing, things that accumulated over time

Hardware is split between a home server and a VPS, depending on what makes sense for each service. Latency-sensitive or externally-facing things go on the VPS; things that only I use can live at home.

It's also worth noting that a good chunk of this infrastructure doesn't just serve me personally — a number of services run for the small business I handle IT for as well. That changes the calculus slightly: reliability matters more when other people depend on it, and the effort of maintaining things properly becomes easier to justify.

Traefik deserves a specific mention because it genuinely makes the multi-service setup manageable. Routing new services through it is painless, TLS just works, and the dashboard gives a clear picture of what's running. It's one of those tools that makes the rest of the stack feel more coherent.

## The Keycloak detour

Early on I set up Keycloak as the identity provider. This was a mistake — not because Keycloak is bad, but because it was overkill. The complexity was significant, some services didn't integrate cleanly, and I spent more time wrestling with Keycloak than actually doing the things Keycloak was supposed to enable.

I eventually replaced it with Authentik. Same core job, considerably less friction. Sometimes the right call is the simpler tool.

This is probably the most honest lesson from running your own infrastructure: you will occasionally pick the wrong thing, and the cost of that is real. Not catastrophic, but real. With SaaS you outsource that decision; with self-hosting you own it.

## The thing that still bothers me

None of this is infrastructure as code.

It grew organically — a service here, a config change there, decisions made and mostly forgotten. It works, and it's reasonably stable, but it's not reproducible in the way I'd want it to be. If I had to rebuild from scratch, it would take longer than it should.

Moving to something like Ansible or Terraform is on the list. The overhead felt too large when I started, and now it's a historical debt I'm slowly making peace with. At some point the cost of not having it will outweigh the cost of doing it properly.

## Would I recommend it?

Only if you genuinely want to do it — or have a specific reason you have to.

Self-hosting is more work than SaaS. Full stop. You own the updates, the backups, the outages, the weird edge cases that only happen to you because you're running an unusual combination of services. There's no support ticket to file.

But if you're curious about how this stuff works, care about where your data lives, or have a feature requirement that no off-the-shelf tool quite covers — it's genuinely rewarding. The infrastructure does exactly what you tell it to. When something breaks, you can find out why. And over time you end up with a setup that fits you precisely, instead of one that fits everyone approximately.

That trade-off is worth it for some people. Just go in with your eyes open.
