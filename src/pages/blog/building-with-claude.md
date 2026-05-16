---
layout: ../../layouts/PostLayout.astro
title: Building this site with Claude Code
date: 2026-05-16
description: What it's actually like to build a personal website with an AI coding assistant — including the parts where nothing works.
---

I've wanted to rebuild hartings.dev for a while. The old version was embarrassingly sparse, and every time I sat down to fix it, I'd spend an hour bikeshedding over the stack and then close the laptop. This time I decided to try something different: hand the wheel to Claude Code and see how far we'd get.

Spoiler: we got pretty far. But not without some friction.

## The setup

The site runs in a Docker sandbox environment — Claude Code has access to the filesystem, a bash shell, and not much else. The project itself is straightforward: Astro for static site generation, Tailwind CSS for styling, deployed to Cloudflare Pages. Nothing exotic.

What _was_ exotic was the environment. The workspace is mounted from a Windows host into a Linux container, and this caused the first real headache almost immediately.

## The symlink problem

After the initial scaffolding, Claude tried to run `npm run dev`. Nothing happened. A quick look revealed the culprit: `node_modules/.bin/` was completely empty.

On a normal Linux system, `npm install` creates symlinks in `.bin/` pointing to each package's CLI entry point. But the project directory lives on an NTFS-formatted Windows drive, mounted into the container. NTFS doesn't support Unix symlinks — so npm silently skips creating them. The Astro binary simply didn't exist at the path npm expected it.

Running `npm install` again to fix it? Also failed:

```
npm error code EPERM
npm error syscall symlink
npm error Error: EPERM: operation not permitted, symlink
```

The fix was blunt but effective: update `package.json` to call the Astro binary directly via `node`:

```json
"dev": "node node_modules/astro/astro.js dev --host"
```

Not pretty, but it works. And it'll keep working — on Cloudflare Pages, `npm install` runs in a real Linux environment where symlinks behave normally.

## The invisible dev server

With the script fixed, Claude started the dev server — and got no output. Just the two npm lines and then silence:

```
> hartings-dev@0.0.1 dev
> node node_modules/astro/astro.js dev --host
```

This turned out to be a combination of two things. First, Astro's startup output relies on ANSI escape codes and cursor manipulation that doesn't render properly in a non-TTY context. Second, the first startup genuinely takes around 50 seconds because of the Tailwind integration hook — which, without any visible feedback, looks exactly like a crash.

The server was running fine. It just wasn't saying so.

Confirming this took a detour through background processes dying as zombies, `stdbuf` to force unbuffered output, port checks with `curl`, and eventually finding HTTP 200 on port 4321. Sometimes you have to infer that things are working from the absence of errors.

## Claude didn't know it was inside a sandbox

Here's a subtle but recurring issue: Claude didn't seem to fully grasp that it was already running inside a Docker sandbox. When the dev server wasn't reachable from the browser, it started suggesting things like running a Docker container, exposing ports via Docker flags, checking container networking — all reasonable advice if you're working _outside_ a container. But we were already inside one.

The sandbox does support port publishing (`sbx ports sandbox --publish 4321:4321`), which is exactly the right tool for this. But Claude reached for Docker-specific solutions first, which sent us down a few dead ends before the actual fix clicked into place.

This probably comes down to context: the sandbox looks like a regular Linux shell from the inside, and without explicit signals that it's a managed sandbox environment, the model falls back on the most common explanation for "container-like environment" — which is Docker. A small but telling gap between what the model assumes and what's actually true.

## Loops

A few times during the debugging sessions, Claude got into loops — trying the same approach in slightly different ways, hitting the same wall, and trying again. Starting the dev server in the background, not getting output, checking the port, finding nothing, starting it again. Repeat.

These loops didn't resolve themselves. The only way out was stepping back and reframing the problem — which in practice meant me interrupting and asking it to think differently. Once redirected, it usually found the right path quickly. But left to its own devices, it would keep iterating on a broken approach rather than questioning the approach itself.

## The actual building part

Once the environment was stable, the rest went smoothly. Claude read through the codebase, caught a CSS bug (a `position: absolute` element on a parent without `position: relative` — the kind of thing that's easy to miss), and started updating content based on my LinkedIn PDF.

The content update was the most useful part. I uploaded my profile as a PDF, Claude extracted the relevant details — work history, projects, education — and rewrote the About and Projects pages accordingly. It asked clarifying questions where the LinkedIn descriptions were vague or where the NDA for my current project needed careful wording.

A few rounds of back-and-forth on project descriptions, some favicon tweaking, fixing the navigation's `mix-blend-difference` that was bleeding through the hero heading — and the site was actually in a state I wasn't embarrassed by.

## What would make the sandbox better

The experience left me with a wishlist for the sandbox environment.

The biggest one: it should be easier to run Claude Code in a Docker sandbox without friction. The symlink issue, the port publishing confusion, the non-TTY output — these are all solvable problems, but they currently require working knowledge of the environment to debug. Removing these hurdles would make the combination of Docker sandbox + Claude genuinely seamless: productive, isolated, and secure, without the hassle.

The second one: persistent sandbox configurations. Right now, every session starts cold — no tools pre-installed, no environment state carried over. Being able to define a reusable configuration (installed packages, environment variables, MCP plugins) that gets applied automatically would eliminate a lot of repetitive setup. The sandbox is already a great foundation for safe AI-assisted work. A bit more configurability would make it the obvious default.

## What I think about AI-assisted development

The sandbox friction was real, but mostly environmental. The moments where Claude got stuck — the loops, the Docker misdiagnosis — were also the most instructive. They're not reasons to avoid AI-assisted development. They're just honest reminders that the model works best when the context is clear and there's a human nearby to redirect when things go sideways.

What worked well: content tasks, catching subtle bugs, iterating on copy. What needed more hand-holding: environment debugging and anything where the model had to infer state it couldn't directly observe.

Mostly though, it got a site that had been sitting empty for years into a state worth shipping. That's enough for me.

---

_A note on this post: I gave Claude a list of bullet points covering the key moments and frustrations from our session, and it turned them into the text you just read. The struggles are real — Claude was there for all of them._
