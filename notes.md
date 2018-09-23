I guess this is my attempt at non-linear, interactive fiction, where you read the posts of fake accounts, chat with chat bots, and try to accumulate likes/karma/whatever. And while it claims to help connect people, it just isolates you from other humans because it takes place entirely in the web browser and you're just talking with robots. Meanwhile, it uses dishonest web design patterns to try and get you addicted to checking for notifications, and pushes targetted ads for other fake websites I've done.



as you start off, you're presented with a slew of marketing material. at first glance, it seems that the point of the website is a social network that connects people.

right off the bat, it appears that gaining points/karma/likes rewards you. (need some extrinsic motivation here, besides the addicting properties)

quickly, it appears that some of the accounts are robots, and others are humans (they're all robots; but it would be interesting if players are hooked up randomly to other actual human players. or, the easy version of this is to hook them up to firebase where i can talk to them)

it also appears that there are several overlapping factions of people, corresponding to different ads:
  - conservative news junkies (news)
  - crypto get-rich-quick folks (finance)
  - cult devotees (spirituality)
  - fuckbois (dating)
  - train enthusiasts
  - "I'm just trying to sell shit" (market place)
  - bot hunters
  - wrestlers building up a match

there are also many individual characters:
  - dream journal
  - video game fan website
  - hot sauce
  - someone who builds a quick raport with you, but dissapointingly turns out to be a bot

and depending on the info you give up, you see targetted ads:
  - fastcashmoneyplus.biz
  - fakebullshit.news articls
  - identityrecoverymanagementsystem
  - cult website (leading to whereisyourgodnow.xyz)
  - penis pills/weight loss
  - camwhore
  - hotsauce
  - t shirts that you can actually buy
  - web development services circa 1997 (j geoff, heaven's gate)


names:
  socialworld
  friendworld.social
  friendzone

overarching theme:
  the mysterious creator is just trying to sell you various shit
  there are some saps floating around the website
  story here is that fastcash is buying a lot of advertising - espescially on fake bullshit.
    this means that fakebullshit is trying to get clicks to make fastcash ad revenue
    fastcash is really the base of the ad ecosystem

marketing
  Friend world: a place to meet friends
    - startupy manifesto article talking about the importance of making new friends. Effect of meaningful friendships on health; other social networks just want to get you addicted. They're free because you're the product.
    - our stringent moderation policies ensure that you only see the best content
    - our promise to you: we'll never sell your data or show you targetted ads

other quirks:
  cursing on public posts can get you banned for life after some warnings
  cursing in chats are bleeped out
  random things will get flagged as curses/nudity; temporary ban
    "You're accaount has been deactivated.<a>view our guidlines</a>. if you think there has been a mistake, please contact a moderator"

bot behavior/culture
  - call each other by shortened versions of their screen names
  - they clearly lie/exagerate about their personal lives; stories are inconsistent from thread to thread: "I have a great life because a, b, c"; "I have a great live because A B D"
  - some profiles are private; and you can't see their messages - it creates a hole in the dialog until you're friends with them
  - default: bot's are scheduled to check posts at certain time, and just give an automatic response to whatever was posted last. They check certain groups at certain times. mods maybe check every 5 minutes, so you always get a fresh response.
  - some instances where bots clearly have multiple accounts to support their arguments. all some accounts do is agree with other single accounts

quests:
  - start with access to general
    - ads are mostly for identitymanagementrecoverysystems
    - you want to get invited to next some other group
    - as part of the progress, someone asks you to find out all you can about some joe schmo
    - similarity in the ad language and request ("dig up some dirt on this guy"; "find out who this person *really* is") makes it clear that you're supposed to use id-mgmt-rec-sys
    - maybe id-mgmt-rec-sys spits out the friendworld screen name of joe schmo
    - you have to contact joe schmo
  - you end up in finance
    - people want you to click their fcmp link
    - you get something if you post the special text from the fastcash wallet

profile
  * based on what they fill out, they get access to a group
  link to profile pic
  bio
  gender
  age
  list of posts
  occupation
  hobbies & interests
  favorite websites
  favorite books
  favorite movies
  favorite tv shows
  favorite video games
  religious views
  political views


sections
  * made up of posts -> posts have single thread of comments
  dating
    - over 18 prompt
    - some users use the ok emoji to indicate anal sex - get comments asking if they're conservative
  politics
    - some comments use ok emojis to indicate crypto facism - "you know that means anal sex, right?"
    - one racist/socialist asshole who won't shut up about UBI
    - back and forth on the semantics of whether suspected terrorist has rights, or some free speach thing. basically, a grand-scheme-of-things-semantics argument vs a knee jerk gut reaction argument
    - "listen fake news fan..."; "what are you talking about? You're literally posting an article from a website calle fakebullshit.news!"; "It's a little something called *irony*"
  finance
    - a lot of people talking about fastcash
    - a discussion about whether NOT is a security, or if the creator is perpetuating securities fraud
  general
    - the numbers game "post the next number: 1"
    - "what are you doing now?" thread
  sports
    - queer deathmatch promotion - a lot of the wrestlers are fucking/jealous/etc.
    - they have their own meaning for the ok sign
    - revolves around a g1-esq deathmatch tournament over 7 days
      - 4-man round robin (4 groups, 3 days); 4 man round robin (2 groups, 3 days); final 1-1
      - one user posts results/recaps
      - one wrestler actually commits murder; article on fakebullshit shows up, detailing the fued; some comments claiming it's all a work; unclear if it's actually a work



gameplay
  - you start off with access to general
  - there's some other group you want to get access to, but it's invite only
  - you need to talk to people to get invited to other groups
  - if people don't like you, they won't give you any information
  - you need to figure out what they want to talk about, and give them the right answers
    - ex: start off with access to general; message someone; ask if they know the admin to politics; they don't but some other guy might; you ask that other guy, and need to get on his good side; he tells you to talk to someone else "and let me know what he says"; you talk to the other guy, but they don't like you. you go back a step, and they tell you someone else
  - sometimes you need a certain number of likes to get something
  - you get more likes depending on whether you post stuff the group likes, and whether you've talked to people and they like you

  = for most bots it makes sense to only have a limted number of things they can do, even in the groups. a lot of the conversations are clearly the bots talking to each other, but they make unique conversation

  = there needs to be a distribution of how much time i put into the bots
    - 1 bot with incredibly deep dialog possabilities (admin?)
    - 5 or 6 with a reasonably large amount of depth. pretty much one
    - 10 or 20 that are pretty flat, but coherent responses. like side characters in shenmue
    - 30 or 50 that just spit out markvov text

  - every once in a while group members start a mutiny, and create another group

  everyone is given "special referral link"
  "Congratulations! You've been selected to participate in an exciting new social network as a beta user. This is very exclusive opportunity to meet vibrant, intelligent, and friendly people. Engage in collegial and unique discussion. "
  "Be respectful of other users. if they don't respond right away, they will eventually"
  "Be sure to follow the moderation policy. We have very strict enforcememt guidlines"

chat tips/things to make obvious:
  - say hi
  - a/s/l
  - people respond to emoticons
  - talk about things that interest them -- what they're talking about in public forums
  - the more likes you have, the more likely someone responds
  - people have certain hours during which they'll respond to you

to get points, you post stuff
likes are a function of who you're friends with, and what words they pick up on
when you get new connections, they retroactively like your posts
most users will follow you back

people will follow you if you post in public forums
people will follow you if you message them
  some people will be trolls, and won't leave you alone
  some people won't message you
  if you're a woman and post in dating, you'll get a lot of fuckbois messaging you. some will be malicious if you reject them or don't respond.
  if you're a man, no women daters will respond to you. if they do, it will be lackluster sometimes men will message you.

posting in public forum

