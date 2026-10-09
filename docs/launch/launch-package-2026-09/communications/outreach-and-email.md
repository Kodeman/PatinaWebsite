# Patina — personal invitations and member letters

Prepared 11 September 2026. Complete copy for founder review and delivery planning. Nothing in this file has been sent or scheduled. The website is live; the app and marketplace are pre-launch.

These letters follow the [messaging system](../../../messaging/patina-messaging-system.md), the [confirmed launch direction](../../../../design-proposals/living-study/PRODUCTION-BRIEF.md), and the current [Founding Circle benefits](../../../../src/components/studio/FoundingInvitation.tsx). They begin with Leah’s relationships, then support Kody’s individual designer and maker conversations. They do not enroll invitation recipients in an ongoing email audience.

## How the correspondence works

The opening invitation comes from the person who knows the recipient. Once someone joins or applies, Kody is the welcoming voice. Leah brings the design perspective; Kody leads the building story and reviews applications with her.

Use **Kody at Patina <hello@patina.cloud>** for Kody’s letters, with replies to **hello@patina.cloud**. Leah’s personal invitation should come from her existing relationship mailbox, or **Leah at Patina <hello@patina.cloud>** if she is sending through the verified Patina domain. Do not imply that a new Leah mailbox has been provisioned.

The immediate messages already exist. Keep them in the signup flow rather than sending a second welcome:

- [Founding Circle: A first letter from Kody](../../../../src/lib/emails/founding-welcome.ts).
- [Designer and maker application acknowledgements](../../../../src/lib/emails/application-received.ts).
- [Rendered signup email review](../../living-study/email-review/index.html).

The ten messages below are additional copy. Day 7, Day 21, and the monthly question are proposed manual communications, not an implemented automation. Kody owns sending and replies; Leah reviews design language and helps interpret responses. The Designer’s Eye is a separate newsletter and keeps its separate double opt-in.

| ID | Audience and trigger | Timing | Primary action |
| --- | --- | --- | --- |
| EMAIL-01 | Appropriate existing Leah client relationship | First invitation wave | Join the Founding Circle |
| EMAIL-02 | EMAIL-01 recipient who has not joined, replied, or declined | One follow-up, 7–10 days later | Join the Founding Circle |
| EMAIL-03 | A warm Kody contact who may know an interested person | After initial client invitations | Forward the invitation |
| EMAIL-04 | A designer selected by Kody and Leah for individual outreach | Supporting trade wave | Apply to the Founding 50 |
| EMAIL-05 | EMAIL-04 recipient with no reply or application | One follow-up, 7–10 days later | Apply to the Founding 50 |
| EMAIL-06 | A maker selected for individual outreach | Supporting maker wave | Apply to Partner |
| EMAIL-07 | EMAIL-06 recipient with no reply or application | One follow-up, 10–14 days later | Apply to Partner |
| EMAIL-08 | Founding Circle member after the immediate welcome | Day 7 after joining | Reply about a piece they have kept |
| EMAIL-09 | Founding Circle member still receiving studio notes | Day 21 after joining | Reply about a future designer conversation |
| EMAIL-10 | Founding Circle member eligible for the first monthly question | By Day 30, then monthly | Reply with one area to explore |

**Suppression and stop rules:** before every send, exclude opted-out addresses, bounces, complaints, duplicates, test accounts, and people who asked for no follow-up. Stop invitation follow-ups when someone replies, joins, or applies; respond personally to the conversation. Stop after the one follow-up even if there is silence. A contact appearing in two audience lists receives one appropriate invitation, chosen by the existing relationship. Do not send all three audience paths to the same person.

For member letters, skip the generic prompt if the member has already answered it or is discussing the same subject with a founder. Allow at least seven days between planned member letters; if a monthly send collides with Day 21, delay the monthly letter within that member’s first 30 days or skip Day 21. Process a reply asking to stop before another send and preserve that preference when moving to any future campaign tool. Do not add applicants to consumer nurture without their separate choice.

Use the exact opt-out sentence provided in each manual email. If a campaign platform is later used, replace it with that platform’s tested working unsubscribe mechanism. No automated preferences endpoint is assumed here.

Optional personalization belongs **before** the body: a recipient’s preferred name and one truthful sentence about a real conversation, project, or piece of work. The copy below works without those additions. Do not invent familiarity, praise a portfolio that has not been reviewed, or place private client details in tracking URLs.

## EMAIL-01 — Leah’s client invitation

**From:** Leah  
**Subject:** Something Kody and I are building  
**Preheader:** A personal invitation to Patina’s Founding Circle.  
**Primary CTA:** Join the Founding Circle  
**Destination:** https://patina.cloud/founding?utm_source=leah_client_invitation&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_01

Hi,

I wanted you to see something Kody and I have been working on.

Through Middlewest Studio, I spend a lot of time thinking about what makes a piece right for a room. Its size and material matter. So do the things you already love, the way you live, and what you want the room to become.

We’re building Patina to bring more of that designer’s eye within reach. A more personal way to discover furniture, with a path to working with a designer when you want to take things further.

Our new website is open. The app and marketplace are still in development, and we’re inviting a Founding Circle of up to 200 people into that process.

You’ll hear from us as we build, be invited to answer monthly questions, and get first access when the app launches. Your founding status stays with you. We’ll also offer recognition at launch to members who would like it.

I’d love to have your perspective there.

[Join the Founding Circle](https://patina.cloud/founding?utm_source=leah_client_invitation&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_01)

Warmly,  
Leah

Patina · Madison, Wisconsin · hello@patina.cloud  
If you’d prefer not to receive another Patina invitation, reply and let me know.

## EMAIL-02 — Leah’s one follow-up

**From:** Leah  
**Subject:** One more note about Patina  
**Preheader:** You’re welcome to help shape it, wherever you call home.  
**Primary CTA:** Join the Founding Circle  
**Destination:** https://patina.cloud/founding?utm_source=leah_client_invitation&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_02

Hi,

One more note about the Patina invitation I sent.

You don’t need a room underway or a polished opinion about design to take part. The things you notice while living with furniture are useful to us: what you keep, what you struggle to find, and what makes a room feel like yours.

The Founding Circle is a way to bring those thoughts into what Kody and I are building. The app and marketplace are pre-launch; members get first access when the app launches.

If it sounds like something you’d enjoy, the invitation is here.

[Join the Founding Circle](https://patina.cloud/founding?utm_source=leah_client_invitation&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_02)

Warmly,  
Leah

Patina · Madison, Wisconsin · hello@patina.cloud  
This is my last follow-up to this invitation. If you’d prefer no future Patina invitations, reply and let me know.

## EMAIL-03 — Kody’s warm referral request

**From:** Kody at Patina  
**Subject:** Someone who might enjoy helping us build  
**Preheader:** An introduction to Patina, if a person comes to mind.  
**Primary CTA:** Forward this invitation  
**Member destination inside the forward:** https://patina.cloud/founding?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_03

Hi,

Leah and I have opened the new Patina website, and we’re beginning with people who care about the things they bring into their homes.

I’m building Patina because I keep seeing a gap in the tools around creative work. They can feel sterile, even when the work itself is personal. Leah brings the judgment of a working designer. We want that judgment, and the care behind a piece of furniture, to have more room in the experience.

If someone comes to mind who would enjoy being part of that, would you forward the short invitation below? There’s no need to share their details with us. They can take a look and decide for themselves.

Thank you for helping us find our first circle.

Warmly,  
Kody

**A short invitation to forward**

Patina is building a more personal way to discover furniture, guided by working designers and the care behind the pieces. Based in Madison, its Founding Circle is open wherever you live. Members help shape the work through studio updates and monthly questions, with first access when the app launches. The app and marketplace are pre-launch.

[Join the Founding Circle](https://patina.cloud/founding?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_03)

Patina · Madison, Wisconsin · hello@patina.cloud  
If you’d prefer not to receive further Patina invitations, reply and let me know.

## EMAIL-04 — Designer invitation

**From:** Kody at Patina  
**Subject:** Your judgment belongs in the tools  
**Preheader:** An invitation to help shape Patina’s Founding 50.  
**Primary CTA:** Apply to the Founding 50  
**Destination:** https://patina.cloud/designers?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_04#apply

Hello,

I’m Kody, co-founder of Patina. I’m building it with Leah Kochaver, who runs Middlewest Studio in Madison.

We’re inviting 50 working designers to help shape a furniture platform while it is still being built. The questions are familiar to a design practice: how to describe what you see, what a sourcing tool needs to understand, and what you would want to know about a client before the first conversation.

Leah’s practice gives us a starting point. Your experience can help us see where that starting point needs to go further.

The Founding 50 offers a voice in the tools and the language behind them, a peer cohort, and monthly conversations with us. There is no fee to join the program. The public app and marketplace remain pre-launch; applying begins a conversation about fit and participation.

You can read the invitation and tell us about your practice here. I review applications with Leah, and we respond within seven days with an invitation to talk or an update on timing.

[Apply to the Founding 50](https://patina.cloud/designers?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_04#apply)

Warmly,  
Kody

Patina · Madison, Wisconsin · hello@patina.cloud  
If this is not relevant to your practice, reply and I won’t follow up.

## EMAIL-05 — Designer follow-up

**From:** Kody at Patina  
**Subject:** A practical question for the Founding 50  
**Preheader:** What gets lost between a saved piece and a real project?  
**Primary CTA:** Apply to the Founding 50  
**Destination:** https://patina.cloud/designers?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_05#apply

Hello,

A final follow-up to my invitation to Patina’s Founding 50.

One part of the work is especially interesting to us: what needs to travel with a client from their early furniture discoveries into a conversation with a designer. The saved piece matters, but so does why they saved it, what they already own, and what the room needs to do.

We want working designers involved in shaping that handoff. The program is an opportunity to contribute your judgment while the app and marketplace are still in development.

If that is work you’d like to help shape, the application is here.

[Apply to the Founding 50](https://patina.cloud/designers?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_05#apply)

Warmly,  
Kody

Patina · Madison, Wisconsin · hello@patina.cloud  
This is my last follow-up to this invitation. Reply if you’d prefer no future Patina invitations.

## EMAIL-06 — Maker invitation

**From:** Kody at Patina  
**Subject:** The work behind a piece deserves room  
**Preheader:** An invitation to help shape Patina’s first maker group.  
**Primary CTA:** Apply to Partner  
**Destination:** https://patina.cloud/makers/apply?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_06

Hello,

I’m Kody, one of Patina’s founders. Leah and I are building a furniture platform in Madison, and we’re inviting 15 founding makers to help shape it.

We want the decisions behind a piece to be part of how people discover it. Why that timber. How the joint is made. What the finish will feel like after years of use. Those details help a person understand the work they are considering.

Leah brings the perspective of a working interior designer through Middlewest Studio. I’m building the tools around that judgment, with room for makers to explain their own materials, methods, and point of view.

The app and marketplace are pre-launch. This is an invitation to introduce your workshop and discuss what a partnership could look like. There are no sponsored placements or pay-to-play slots.

Tell us what you make, where you work, and where we can see it. I’ll review your application with Leah, and we’ll respond within two weeks with next steps or an update on timing.

[Apply to Partner](https://patina.cloud/makers/apply?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_06)

Warmly,  
Kody

Patina · Madison, Wisconsin · hello@patina.cloud  
If this is not relevant to your workshop, reply and I won’t follow up.

## EMAIL-07 — Maker follow-up

**From:** Kody at Patina  
**Subject:** A closer look at your work  
**Preheader:** One final note about Patina’s founding maker invitation.  
**Primary CTA:** Apply to Partner  
**Destination:** https://patina.cloud/makers/apply?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_07

Hello,

I’m following up once on my invitation to introduce your workshop to Patina.

A useful starting point is one piece and one decision behind it: a material you chose, a detail you kept refining, or something you wish people understood before they bought furniture.

Our application gives you room to share that story alongside your workshop details. It helps Leah and me understand the work before a conversation about fit.

The app and marketplace are still in development. We’re bringing the first maker group into that building process, with craft at the center of how placement is considered.

[Apply to Partner](https://patina.cloud/makers/apply?utm_source=founder_outreach&utm_medium=email&utm_campaign=living_study_launch&utm_content=email_07)

Warmly,  
Kody

Patina · Madison, Wisconsin · hello@patina.cloud  
This is my last follow-up to this invitation. Reply if you’d prefer no future Patina invitations.

## EMAIL-08 — Day 7: the piece that stayed

**From:** Kody at Patina  
**Subject:** The piece you’ve kept  
**Preheader:** A small question about what earns a place at home.  
**Primary CTA:** Reply and tell me about it  
**Reply destination:** hello@patina.cloud

Hi,

I’d like to start with something you already own.

Think of a piece of furniture you’ve kept for a long time, or one you hope to keep. It might be beautifully made. It might carry a family story. It might simply be the chair everyone ends up in.

What has made it stay?

That question matters to the Patina we’re building. A piece has a life beyond the first photograph or the day it arrives. We want to understand what makes it earn its place in yours.

Reply and tell me about it. A sentence is plenty; no photograph needed.

Warmly,  
Kody

Patina · Madison, Wisconsin · hello@patina.cloud  
You’re receiving this as a Founding Circle member. To stop these studio notes, reply with “unsubscribe.”

## EMAIL-09 — Day 21: the conversation worth carrying

**From:** Kody at Patina  
**Subject:** Before the first design conversation  
**Preheader:** What would you want a designer to know about you?  
**Primary CTA:** Reply with the first thing you’d share  
**Reply destination:** hello@patina.cloud

Hi,

One idea runs through Patina: you should be able to explore furniture on your own terms, then carry what you’ve discovered into a conversation with a designer when you want more help.

Leah’s work reminds me how much of a room begins with the person living in it. A piece you’ve inherited. The light you love in the afternoon. The way everyone gathers in the kitchen even when there are chairs somewhere else.

As we think about that future handoff, I’d like your perspective. Before a first conversation with a designer, what would you want them to know about your home or the way you live?

Reply with the first thing you’d share. You don’t need to send a floor plan, an address, or private project details.

The app and marketplace are still in development. These conversations help us keep the people who will use Patina close to the work.

Warmly,  
Kody

Patina · Madison, Wisconsin · hello@patina.cloud  
You’re receiving this as a Founding Circle member. To stop these studio notes, reply with “unsubscribe.”

## EMAIL-10 — First monthly question: where to look closer

**From:** Kody at Patina  
**Subject:** Where should we look closer?  
**Preheader:** The first monthly question for the Founding Circle.  
**Primary CTA:** Reply with your choice and why  
**Reply destination:** hello@patina.cloud

Hi,

Here’s our first monthly question for the Founding Circle.

As Leah and I think about the furniture and maker stories to explore, which part of home would you most like us to look at more closely?

1. A chair you can settle into every day.
2. A table that makes room for people to gather.
3. Storage that is useful and worth looking at.

Reply with 1, 2, or 3, and a few words about what matters to you. If something else is on your mind, tell us that instead.

We’re using these replies to understand what deserves more attention as we build. This is a question about direction; the app and marketplace are still pre-launch.

In our next monthly note, we’ll share what we heard and explain what it helped us decide, including anything we’re still working through.

Warmly,  
Kody

Patina · Madison, Wisconsin · hello@patina.cloud  
You’re receiving this as a Founding Circle member. To stop these studio notes, reply with “unsubscribe.”

## Making the monthly promise useful

Before EMAIL-10 is sent, put the next monthly review on Kody and Leah’s calendar. Keep a simple private reply log: topic, preference, reason, follow-up owed, and whether someone has separately agreed to an attributed quote. No public name is inferred from membership.

The next note should contain one actual finding, one decision, and one honest unresolved point. Write it after reviewing the replies. If no replies arrive, say what the founders considered themselves and keep the invitation open; do not manufacture a consensus. If the sample is small, use “Among the replies we received…” rather than a claim about all members. Member participation is input, not a promise that every suggestion will be built.

Recognition is a separate later choice. Before publishing any founding member’s name, ask how they want to be credited, or whether they prefer to remain private. Do not use a signup email address as public recognition text.

## Tracking handoff

Asset IDs are stable so attribution can be added without changing the words. Use the launch package’s link registry when placing these messages in a sender. A link may identify EMAIL-01 or a generic channel; it must not contain a recipient’s name, email, or project. Forwarded links indicate the invitation source, not the identity of the person who forwarded them. Reply-led member letters need no tracking link to perform their main job.
