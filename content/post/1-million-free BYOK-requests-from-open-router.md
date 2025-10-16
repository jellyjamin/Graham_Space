---
title: "OpenRouter BYOK: Get 1 Million Free Requests with Your OpenAI & Anthropic Keys"
date: 2025-10-06
lastmod: 2025-10-06
description: Leverage OpenRouter's BYOK for 1 million free requests! Connect your OpenAI and Anthropic API keys and save on LLM costs. A guide to using OpenRouter with your own keys.
summary: Unlock 1 million free LLM requests on OpenRouter by using your own OpenAI and Anthropic API keys (BYOK). Save on API costs and simplify LLM access.
keywords:
  - OpenRouter BYOK
  - OpenAI API key
  - Anthropic API key
  - LLM API aggregator
  - free API requests
  - BYOK
tags:
  - OpenRouter
  - LLM
categories:
  - AI
  - Agents
draft: false
featured: true
image: /img/posts/headers/1-million-free BYOK-requests-from-open-router/or-annou.png
image_alt: "OpenRouter BYOK: Connect your OpenAI and Anthropic keys for 1 million free LLM requests."
toc: true
reading_time: true
math: false
author: Jake Graham
---

## [Openrouter](https://openrouter.ai/) an LLM chat API aggregator, [announced](https://openrouter.ai/announcements/1-million-free-byok-requests-per-month) that they have opened up 1 million free BYOK (bring your own keys) requests per month. 

This slashes their standard platform fee of 5%, allowing users to utilize their all-in-one API while still being billed through their OpenAI or Anthropic accounts. This is perfect for those of us who have lingering balances spread across developer accounts and is a good excuse to make the switch. 


## How to BYOKs

### How to get an OpenAI API key

- Head to [openais developer center](https://platform.openai.com/)  and sign in or create an account.

- Go into settings under organizations, click api keys

<img src="/img/posts/Inlines/1-million-free BYOK-requests-from-open-router/api-keys.png" 
     alt="OpenAI API Keys: Location of your secret keys in the OpenAI developer settings." 
     style="max-width: 100%; height: auto;">

- Finally, click the top right `create new secret key`

You'll have your API key!

#### How to get free 250k daily ChatGPT 5 tokens per day!

- [Checkout my blogpost to set it up](https://graham-space.pages.dev/p/unlock-free-daily-gpt-5-tokens-how-to-get-250k-from-openai/)


## how to get an anthropic API key

- Go to [anthropics developer console](https://console.anthropic.com/) and sign in. 

- Clicking the expansion arrow at the top left, click API keys, which is under the manage section:

<img src="/img/posts/Inlines/1-million-free BYOK-requests-from-open-router/anthropic-api.png" 
     alt="Anthropic API Keys: Where to find your API keys in the Anthropic console." 
     style="max-width: 100%; height: auto;">

- Create your anthropic API key.


## Connecting your keys to Openrouter

- In your Openrouter settings, select integrations and from the list input your API keys.

<img src="/img/posts/Inlines/1-million-free BYOK-requests-from-open-router/openrouter-byok.png" 
     alt="OpenRouter Integrations: Connecting your OpenAI and Anthropic API keys in OpenRouter settings for BYOK."
     style="max-width: 100%; height: auto;">

### Configuration of presets (mandatory)

Sometimes you have to learn things the hard way, and that was me a few hours ago when I zapped away a dollar in credits when I went through the hassle of getting my OpenAI account verified to use the free daily 250k tokens for GPT 5.

One of the amazing features of Openrouter is that they will choose the best provider of each model which you can configure from the fastest to the cheapest; however, to make sure it routes through your BYOK key:

- Go into settings > presets > add presets 

In your new preset, you're going to want to:

- give it a `name` (name it around the model you want to use, for easy configuration)
- select the `model` you want to use
- then enable `provider routing`

<img src="/img/posts/Inlines/1-million-free BYOK-requests-from-open-router/or-preset.png" 
     alt="OpenRouter Preset Configuration: Setting up provider routing to use your BYOK keys for specific models (e.g., ChatGPT)."
     style="max-width: 100%; height: auto;">

- Under provider routing, make sure to select the actual developing company as the provider under the `only` option 

Then save the preset, you will use the preset's name, for example, `@preset/chat-gpt-free` as your model. 


## How to get a discount on Openrouter's general use on all models

Another cost savings you can get for your agents is by getting 1% discount on their 5% platform fee, simply by: 

- going into settings > Training, Logging, & Privacy, then toggling `Enable input/output logging for all requests` on.

<img src="/img/posts/Inlines/1-million-free BYOK-requests-from-open-router/or-discount.png" 
     alt="OpenRouter Discount: Enabling input/output logging to receive a 1% discount on OpenRouter's platform fee."
     style="max-width: 100%; height: auto;">



