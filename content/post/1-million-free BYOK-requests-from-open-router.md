

## [Openrouter](https://openrouter.ai/) an LLM chat API aggregator, [announced](https://openrouter.ai/announcements/1-million-free-byok-requests-per-month) that they have opened up 1 million free BYOK (bring your own keys) requests per month. 

This slashes their standard platform fee of 5%, allowing users to still use their all in one API but get billed through their Openai or anthropic accounts. This is perfect for those of us who have lingering balances spread across developer accounts and a good excuse to make your switch. 


## How to BYOKs

### How to get an openai API key

- Head to [openais developer center](https://platform.openai.com/)  and sign in or create an account.

- Go into settings under organizations, click api keys

<img src="/img/posts/Inlines/1-million-free BYOK-requests-from-open-router/api-keys.png" 
     alt="Where to find openais API keys in the settings." 
     style="max-width: 100%; height: auto;">
![[api-keys.png]]

- Finally click the top right `create new secret key`

You'll have your API key!

#### How to get free 250k daily chat-gpt 5 tokens per day!

- [Checkout my blogpost to set it up](https://graham-space.pages.dev/p/unlock-free-daily-gpt-5-tokens-how-to-get-250k-from-openai/)



## how to get an anthropic API key

- Go to [anthropics developer console](https://console.anthropic.com/) and sign in. 

- clicking the expansion arrow at the top left, click API keys which is under the manage section:

<img src="/img/posts/Inlines/1-million-free BYOK-requests-from-open-router/anthropic-api.png" 
     alt="Where to find anthropics API keys in the settings." 
     style="max-width: 100%; height: auto;">
![[anthropic-api.png]]

- create your anthropic API key.


## Connecting your keys to Openrouter

- in your Openrouter settings, select integrations and from the list input your API keys.

<img src="/img/posts/Inlines/1-million-free BYOK-requests-from-open-router/openrouter-byok.png" 
     alt="Where to find anthropics API keys in the settings." 
     style="max-width: 100%; height: auto;">
![[openrouter-byok.png]]

### Configuration of presets (mandaory)

Sometimes you have to learn things the hard way and that was me a few hours ago when I zapped away a dollar in credits when I went through the hassle of getting my openai account verified to use the free daily 250k tokens for GPT 5.

One of the amazing features of Openrouter is that they will choose the best provider of each models which you can configure from the fastest to the cheapest, however to make sure it routes through your BYOK key:

- Go into settings > presets > add presets 

In your new preset you're going to want to:

- give it a `name` (name it around the model you want to use, for easy configuration)
- select the `model` you want to use
- then enable `provider routing`

![[Pasted image 20251006222901.png]]



## How to get a discount on Openrouter's general use on all models

Another 
