// ==UserScript==
// @name         Canopy Crepes Reskin
// @namespace    https://tampermonkey.net/
// @version      1.0.0
// @description  Reskin images and dialogue in Canopy Crepes
// @match        https://www1.flightrising.com/play/canopy-crepes
// @grant        none
// @run-at       document-start
// @updateURL    https://github.com/gremlincache/canopycrepesreskin/raw/refs/heads/main/Canopy%20Crepes%20Reskin.user.js
// @downloadURL  https://github.com/gremlincache/canopycrepesreskin/raw/refs/heads/main/Canopy%20Crepes%20Reskin.user.js
// ==/UserScript==

(function () {
    'use strict';

    // =========================================================
    // SECTION 1: DIALOGUE REPLACEMENTS
    // NOTE: The ingredient IDs the game uses for order completion are sent from the server and are never affected by this. These replacements are purely visual.
    // =========================================================
    const ORDERS = {
            'Granny Crabny': [
        {
            flavourMatch: `I know you have trouble with big orders so I'll keep it simple`,
            flavourHTML: `I know you have trouble with big orders so I'll keep it simple, dear. Some <strong>violets</strong> in a nice <strong>toasted wrap</strong>, with a <strong>marmalade topping</strong>. Maybe you can get this one right?`,
            clarifyMatch: `Oh dear child, how low do I have to set the bar?`,
            clarifyHTML: `Oh dear child, how low do I have to set the bar? Just 1 serving of <strong class="theme-text-accent-1">Satin Violets</strong>, on a <strong class="theme-text-accent-1">Toasted wrap</strong>, and topped with <strong class="theme-text-accent-1">Heart Rose Marmalade</strong>. Try to remember this time…`,
        },
        {
            flavourMatch: `Hello, dear. I'm thinking I'd like an old favorite…`,
            flavourHTML: `Hello, dear. I'm thinking I'd like an old favorite… I'd like a crepe with lots of crunchy little bits in it, as well as that soft confection. Like <strong>acorns</strong>, some <strong>little round soft pillows</strong>, and those <strong>sweet, dark chips</strong>. Top it with some honey.`,
            clarifyMatch: `Don't make me come back there, not with my back like this!`,
            clarifyHTML: `Don't make me come back there, not with my back like this! I asked for my crepe with 1 serving each of <strong class="theme-text-accent-1">Acorns</strong>, <strong class="theme-text-accent-1">Marshmallows</strong>, and <strong class="theme-text-accent-1">Chocolate Chips</strong>, topped off with <strong class="theme-text-accent-1">Honey Drizzle</strong>.`,
        },
        {
            flavourMatch: `I'll keep it simple. I'd like my crepe with`,
            flavourHTML: `I'll keep it simple. I'd like my crepe with  <strong>chestnuts</strong>, <strong>almonds</strong>, some of that <strong>calming herb</strong>, and some <strong>mint</strong>. Be a dear and smother it in some of that nice, <strong>energizing jam</strong>.`,
            clarifyMatch: `Must I repeat myself? Hmph. Make my crepe with`,
            clarifyHTML: `Must I repeat myself? Hmph. Make my crepe with 1 serving each of <strong class="theme-text-accent-1">Mire Chestnuts</strong>, <strong class="theme-text-accent-1">Luminous Almonds</strong>, <strong class="theme-text-accent-1">Lavender</strong>, and <strong class="theme-text-accent-1">Peppermint</strong>, topped with <strong class="theme-text-accent-1">Charged Duneberry Jam</strong>. Absolutely nothing unnatural!`,
        },
        {
            flavourMatch: `I'd like a little comfort food… My back's got me in knots!`,
            flavourHTML: `I'd like a little comfort food… My back's got me in knots! Give me a crepe with some <strong>little soft pillows</strong>, the <strong>stars</strong>, and find me the freshest <strong>red berries</strong> in there. Two toppings, please! Some <strong>energizing jam</strong> to cheer me up, and some <strong>honey</strong> to soothe.`,
            clarifyMatch: `Hmph, and everyone says I have hearing problems…`,
            clarifyHTML: `Hmph, and everyone says I have hearing problems… Now, listen carefully. I want 1 serving each of <strong class="theme-text-accent-1">Marshmallows</strong>, <strong class="theme-text-accent-1">Konpeitō</strong> and <strong class="theme-text-accent-1">Strawberries</strong>s, topped off with <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> and <strong class="theme-text-accent-1">Honey Drizzle</strong>.`,
        },
        {
            flavourMatch: `I'd like a crepe stuffed with four servings`,
            flavourHTML: `I'd like a crepe stuffed with <strong>four servings of confections</strong> of any variety, and a <strong>sweet, gold topping</strong> to boot! Nobody could mess that order up… I hope.`,
            clarifyMatch: `I see, I must have spoken too soon.`,
            clarifyHTML: `I see, I must have spoken too soon. That was <strong class="theme-text-accent-1">4 servings of Confections</strong> of any variety and <strong class="theme-text-accent-1">Honey Drizzle</strong> topping.`,
        }
    ],

    'Max Granite': [
        {
            flavourMatch: `It was a dark and stormy night when I entered the Crepes shop`,
            flavourHTML: `It was a dark and stormy night when I entered the Crepes shop. I ordered a Crepe with <strong>marshmallows</strong> and <strong>peppered mint</strong>. <strong>Honey</strong> glistened ontop, carrying the recipe's secrets with it into my gut.`,
            clarifyMatch: `I said I ordered 1 serving each of`,
            clarifyHTML: `I said I ordered 1 serving each of <strong class="theme-text-accent-1">Marshmallow</strong> and <strong class="theme-text-accent-1">Peppermint</strong>, and the <strong class="theme-text-accent-1">Honey Drizzle</strong> topping.`,
        },
        {
            flavourMatch: `The case had gone south and I needed a new lead.`,
            flavourHTML: `The case had gone south and I needed a new lead. I couldn't think on an empty stomach so I made my way back to the shop and got myself a crepe stuffed with <strong>two servings worth of floral delights</strong>, topped with <strong>electrifying jam</strong>. The exact contents were a mystery until I took my first bite.`,
            clarifyMatch: `All I could do was repeat myself to the chef.`,
            clarifyHTML: `All I could do was repeat myself to the chef. I restated that I wanted <strong class="theme-text-accent-1">2 servings of any Flower item</strong> on the menu, and a topping of <strong class="theme-text-accent-1">Charged Duneberry Jam</strong>. I hoped they'd listen this time.`,
        },
        {
            flavourMatch: `I shook off cold rain droplets as I stepped inside.`,
            flavourHTML: `I shook off cold rain droplets as I stepped inside. The scent of delicious crepes settled over me like a warm blanket. I ordered one of my favorites, with <strong>marshmallows</strong> and <strong>crunchy chocolate</strong>, finished off with some sweet <strong>golden nectar</strong>.`,
            clarifyMatch: `I asked for the Wingless Crunch.`,
            clarifyHTML: `I asked for the Campfire Delight. It was one of their specialties, with 1 serving of <strong class="theme-text-accent-1">Marshmallows</strong>, 1 of <strong class="theme-text-accent-1">Chocolate Chips</strong>, and their <strong class="theme-text-accent-1">Honey Drizzle</strong> topping.`,
        },
        {
            flavourMatch: `The gale howled outside when I found myself standing in the crepes shop.`,
            flavourHTML: `The gale howled outside when I found myself standing in the crepes shop. It wasn't a coincidence. I had a craving… one that could only be sated with <strong>almonds</strong>, one of them <strong>oak nuts</strong>, and that mouth-watering <strong>nutty spread</strong>.`,
            clarifyMatch: `Yeah, I'd been thinkin' about it all day.`,
            clarifyHTML: `Yeah, I'd been thinkin' about it all day. I ordered 1 serving each of <strong class="theme-text-accent-1">Luminous Almonds</strong> and <strong class="theme-text-accent-1">Acorns</strong>, with the <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong> topping.`,
        },
        {
            flavourMatch: `I walked into the Crepes shop, my stomach growling louder`,
            flavourHTML: `I walked into the Crepes shop, my stomach growling louder than an ill-tempered chimera. I asked for a triple serving of <strong>fresh mint</strong> and their sweetest <strong>viola</strong>, topped with that… <strong>rose marmalade stuff</strong>.`,
            clarifyMatch: `Look, I said. I'm starvin'.`,
            clarifyHTML: `Look, I said. I'm starvin'. I asked for <strong class="theme-text-accent-1">3 servings of Peppermint</strong> with 1 serving of <strong class="theme-text-accent-1">Satin Violets</strong>, and some <strong class="theme-text-accent-1">Heart Rose Marmalade</strong> topping.`,
        },
    ],

    'Gillie': [
        {
            flavourMatch: `Hi. Ready for my order? It's simple.`,
            flavourHTML: `Hi. Ready for my order? It's simple. I'll have some <strong>fruit</strong> in a <strong>toasted wrap</strong>.`,
            clarifyMatch: `Having trouble? Sorry, people say I should be more descriptive.`,
            clarifyHTML: `Having trouble? Sorry, people say I should be more descriptive. I want 1 serving of <strong class="theme-text-accent-1">any Fruit</strong> in a <strong class="theme-text-accent-1">Toasted wrap</strong>, and no toppings.`,
        },
        {
            flavourMatch: `Hello. I'm so hungry…`,
            flavourHTML: `Hello. I'm so hungry… Can I have one each of all the <strong>fruit options</strong> and a topping of <strong>berry jam</strong>? And make it <strong>toasty</strong>.`,
            clarifyMatch: `Sorry, I should have been clearer.`,
            clarifyHTML: `Sorry, I should have been clearer. That's 1 serving each of <strong class="theme-text-accent-1">Strawberries</strong> , <strong class="theme-text-accent-1">Blackberries</strong> , <strong class="theme-text-accent-1">Banana</strong> , and <strong class="theme-text-accent-1">Potash Peach</strong> , with a <strong class="theme-text-accent-1">Toasted</strong>  wrap and <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> topping.`,
        },
        {
            flavourMatch: `Hello, I have an order.`,
            flavourHTML: `Hello, I have an order. <strong>Two helpings of dark berries</strong>, <strong>toasted</strong>, topped with <strong>jam</strong>. Thanks.`,
            clarifyMatch: `I should have been more specific.`,
            clarifyHTML: `I should have been more specific. That's 2 servings of <strong class="theme-text-accent-1">Blackberries</strong> in a <strong class="theme-text-accent-1">Toasted wrap</strong> with <strong class="theme-text-accent-1">Charged Duneberry Jam</strong>. Sorry, I'm always told I should talk more… I have to get back to my shift at the fire station.`,
        },
        {
            flavourMatch: `I know exactly what I want. `,
            flavourHTML: `I know exactly what I want. I'll have those <strong>red berries</strong> in a <strong>toasty crepe</strong> with <strong>jam</strong> on top, please.`,
            clarifyMatch: `You look flustered.`,
            clarifyHTML: `You look flustered. I'll give you my order again. 1 serving of <strong class="theme-text-accent-1">Strawberries</strong> in a <strong class="theme-text-accent-1">Toasted</strong> wrap with <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> on top. Thank you!`,
        },
        {
            flavourMatch: `I'm just cravin' that stew today, ya know?`,
            flavourHTML: `I'm just cravin' that <strong>jam</strong> today, ya know? And <strong>toast</strong> it.`,
            clarifyMatch: `Uh, just the Red Breasted Goose Stew on a toasted wrap.`,
            clarifyHTML: `Uh, just the <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> on a <strong class="theme-text-accent-1">toasted wrap</strong>. Nothin' else`,
        },
    ],

    'Josco': [
        {
            flavourMatch: `Hey there, high roller!`,
            flavourHTML: `Hey there, high roller! My money pouch is feelin' a little light today, so just gimme a serving of those delish <strong>dark bramble berries</strong> and toss on the <strong>duneberry stuff</strong>. I'll be outta yer hair in no time.`,
            clarifyMatch: `Listen friend, I know I only asked for`,
            clarifyHTML: `Listen friend, I know I only asked for 1 serving of <strong class="theme-text-accent-1">Blackberries</strong>, but you don't gotta skimp on the portion size, ya know? Same goes for the <strong class="theme-text-accent-1">Charged Duneberry Jam</strong>, I want that wrap coated!`,
        },
        {
            flavourMatch: `Hey, hi, how ya doin', great,`,
            flavourHTML: `Hey, hi, how ya doin', great, can I get somethin' <strong>tropical and jammy</strong>, <strong>two of the first</strong>, with one o' them <strong>peaches</strong> on top? In a to-go bowl, as long as that don't cost extra.`,
            clarifyMatch: `Thanks a lot—oh, you're not done yet?`,
            clarifyHTML: `Thanks a lot—oh, you're not done yet? That was <strong class="theme-text-accent-1">2 servings of Banana</strong> and 1 serving of <strong class="theme-text-accent-1">Potash Peach</strong>, with <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> on top. Chop chop!`,
        },
        {
            flavourMatch: `Hey there, lemme get a meat crepe.`,
            flavourHTML: `Hey there, lemme get a <strong>fruit</strong> crepe. Some of them <strong>red berries</strong>, an' a fruit <strong>full of potassium</strong>, hah! And add some of them <strong>blackberries</strong>, too.`,
            clarifyMatch: `It's an all-meat crepe, right?`,
            clarifyHTML: `It's an all-fruit crepe, right? That's 1 serving each of <strong class="theme-text-accent-1">Strawberries</strong>, <strong class="theme-text-accent-1">Blackberries</strong>, and <strong class="theme-text-accent-1">Banana</strong>? Fits in one hand, no mess, I can eat it on the go.`,
        },
        {
            flavourMatch: `Hiya, busy day, I got places to be`,
            flavourHTML: `Hiya, busy day, I got places to be and I gotta eat on the go, lemme just get an <strong>straw</strong> and <strong>bramble</strong> berry combo. Heh, you should gimme a discount for the rhyme.`,
            clarifyMatch: `That was 1 serving each of`,
            clarifyHTML: `That was 1 serving each of <strong class="theme-text-accent-1">Blackberries</strong> and <strong class="theme-text-accent-1">Strawberries</strong>. Don't worry, I'll still tip ya.`,
        },
        {
            flavourMatch: `Hey, nice ta meet'cha. Now you meat me!`,
            flavourHTML: `Hey, a crepe without fruit is un-peel-ievable. Ha! Cuz' fruits have... never mind, I don't have time to explain the jokes, and that costs extra anyway. Just gimme a <strong>double helping of fruit</strong> and pour some <strong>jam</strong> on top.`,
            clarifyMatch: `Not done yet? That's`,
            clarifyHTML: `Not done yet? That's <strong class="theme-text-accent-1">2 servings of any Fruit</strong> and <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> to top it off. Don't short-change me on the helpings, got it?`,
        },
    ],

        'Featherica': [
        {
            flavourMatch: `Hello there. I am in need of some nourishment before we open tonight.`,
            flavourHTML: `Hello there. I am in need of some nourishment before we open tonight. Oh, it's my favorite, The Marriage of Faegaro! I would like some <strong>flower seeds</strong> and <strong>cacao</strong>, please. Be a dear, add some <strong>nut spread</strong> to help keep the throat clear. Hee, a little rhyme, just for you, darling.`,
            clarifyMatch: `Oh, never be afraid to ask me for clarification`,
            clarifyHTML: `Oh, never be afraid to ask me for clarification, my dear. I keep to a strict ingredient list, lest I damage my instrument! I would like 1 serving each of <strong class="theme-text-accent-1">Sunflower Seeds</strong> and <strong class="theme-text-accent-1">Chocolate Chips</strong>, with some <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong> as a nice finishing touch, please.`,
        },
        {
            flavourMatch: `Oh, I wish you had made the show last night`,
            flavourHTML: `Oh, I wish you had made the show last night, the prop work with the chandelier was simply marvell–ahem, of course, my order! I'd like some comfort food, perhaps some <strong>chestnuts</strong> and <strong>almonds</strong>, with a little <strong>chocolate</strong> as a treat. Hm, for toppings… I'll be daring, how about some <strong>nut spread</strong>?`,
            clarifyMatch: `I know, I know, it's such a daring departure from my usual go-tos!`,
            clarifyHTML: `I know, I know, it's such a daring departure from my usual go-tos! It's all right, it's all still perfectly safe for my voice. I'll have 1 serving each of <strong class="theme-text-accent-1">Mire Chestnut</strong>, <strong class="theme-text-accent-1">Luminous Almonds</strong>, and <strong class="theme-text-accent-1">Chocolate Chips</strong>, all topped off with a spread of <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong>. Thank you!`,
        },
        {
            flavourMatch: `Ahem, I need pure ingredients today.`,
            flavourHTML: `Ahem, I need pure ingredients today. <strong>Max almonds</strong>, please, with <strong>nut butter</strong>. Thank you.`,
            clarifyMatch: `Sorry, I am supposed to be on vocal rest.`,
            clarifyHTML: `Sorry, I am supposed to be on vocal rest. That's 4 servings of <strong class="theme-text-accent-1">Luminous Almonds</strong> with <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong>.`,
        },
        {
            flavourMatch: `Hello dear, I hope I get to see you at the show tonight!`,
            flavourHTML: `Hello dear, I hope I get to see you at the show tonight! I won't be able to eat much once I'm in costume, so I must fill up now. Let's see, I'll have some <strong>sweet fluff</strong>, <strong>stars</strong>, and a few of those <strong>oak seeds</strong>. Oh, you know how much I adore that <strong>nut spread</strong>, but I'd better also add some <strong>honey</strong> toppings, too.`,
            clarifyMatch: `I suppose I am simply in the mood for a little crunch!`,
            clarifyHTML: `I suppose I am simply in the mood for a little crunch! Don't worry, I won't get my feathers in a… bunch. Heehee. Ahem, that's 1 serving each of <strong class="theme-text-accent-1">Marshmallows</strong>, <strong class="theme-text-accent-1">Konpeitō</strong>, and <strong class="theme-text-accent-1">Acorns</strong>, with both <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong> and <strong class="theme-text-accent-1">Honey Drizzle</strong> on top. Thank you, darling!`,
        },
        {
            flavourMatch: `Stage fright is the last of my worries`,
            flavourHTML: `Stage fright is the last of my worries, but my throat's a bit ticklish today. I'm looking for at least <strong>two servings of some nice baked biscuit</strong> to give it a good scratching! Oh, and coat the dish with some <strong>honey</strong> to help everything slide down smoothly, would you?`,
            clarifyMatch: `Oh dear, I must have stuttered, how dreadful of me!`,
            clarifyHTML: `Oh dear, I must have stuttered, how dreadful of me! That's 2 servings of <strong class="theme-text-accent-1">Grain Crackers</strong>, with a healthy lathering of <strong class="theme-text-accent-1">Honey Drizzle</strong> topping. Quickly now, the stage awaits!`,
        },
    ],

        'Arthur': [
        {
            flavourMatch: `I'm considering a very specific tincture for my hunger today.`,
            flavourHTML: `I'm considering a very specific tincture for my hunger today. Something with crunch, like <strong>seeds</strong>, yet <strong>rich and bittersweet</strong>. And I would like this combination on a <strong>toasty wrap</strong>, bare of any toppings!`,
            clarifyMatch: `Drat, I was too vague again,`,
            clarifyHTML: `Drat, I was too vague again, my potions master is always scolding me for that! I'm simply asking for 1 serving each of<strong class="theme-text-accent-1">Sunflower Seeds</strong> and <strong class="theme-text-accent-1">Chocolate Chips</strong> on a <strong class="theme-text-accent-1">toasted wrap</strong>. No toppings, please.`,
        },
        {
            flavourMatch: `I wonder, do you have a favorite at this delightful shop?`,
            flavourHTML: `Hello, how are you today? I wonder, do you have a favorite at this delightful shop? I think our tastes are probably quite different, but I'd still love to see what you can come up with. Let's do some <strong>nuts</strong> and sweets—specifically, <strong>confections</strong>—with two toppings, one made of <strong>nuts</strong> and the other made of <strong>something made in a hive</strong>!`,
            clarifyMatch: `Looks like you're having trouble.`,
            clarifyHTML: `Looks like you're having trouble. I wanted 1 serving each of <strong class="theme-text-accent-1">any Nut</strong> and <strong class="theme-text-accent-1">any Confection</strong>—your choice—with a topping of <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong> and another topping of <strong class="theme-text-accent-1">Honney Drizzle</strong>. Did you mess that up, or did I? Hm. Doesn't matter!`,
        },
        {
            flavourMatch: `Hi! So nice to see you! I know the exact concoction`,
            flavourHTML: `Hi! So nice to see you! I know the exact concoction I'm craving today. Let's mix a <strong>double helping of chestnuts</strong> with one of those <strong>sturdy oak seeds</strong> for an extra pop, a pair of those <strong>shimmering stars</strong>, and a dusting of something <strong>sweet and golden</strong> on top.`,
            clarifyMatch: `My teacher does always tell me it's important`,
            clarifyHTML: `My teacher does always tell me it's important to be precise in matters of ingredients. I wanted <strong class="theme-text-accent-1">2 servings of Mire Chestnuts</strong>, 1 serving each of <strong class="theme-text-accent-1">Acorns</strong> and <strong class="theme-text-accent-1">Konpeitō</strong>, with a topping of <strong class="theme-text-accent-1">Honey Drizzle</strong>.`,
        },
        {
            flavourMatch: `Greetings! I'm just going to do a novice-level`,
            flavourHTML: `Greetings! I'm just going to do a novice-level mixture today. By that I mean, very easy. Nothing wrong with being a novice! I was one myself, before I graduated to apprentice. Everyone has to start somewhere! So for today, let's start with… ooh, a serving of those <strong>radiant nuts</strong> with some <strong>crackers</strong>, and top it off with that <strong>honey</strong> there.`,
            clarifyMatch: `You might need to study your inventory a bit harder`,
            clarifyHTML: `You might need to study your inventory a bit harder. I love studying! And I can't wait to study the flavor explosion I'll get from 1 serving each of <strong class="theme-text-accent-1">Luminous Almonds</strong> and <strong class="theme-text-accent-1">Grain Crackers</strong> with a topping of <strong class="theme-text-accent-1">Honey Drizzle</strong>!`,
        },
        {
            flavourMatch: `Hello there! I'm in the mood for something delicious`,
            flavourHTML: `Hello there! I'm in the mood for something delicious, I hope you can make it happen! Let's see… Oh, there are so many flavors I'm unfamiliar with. Let's try some <strong>sunflower seeds</strong> mixed with <strong>a nutty spread</strong>, some <strong>grains</strong> for a little crunch, and something <strong>glowing</strong> with a crunch… I think that'll be good, right? Ooh, I'm excited!`,
            clarifyMatch: `Oh, you must not have been listening.`,
            clarifyHTML: `Oh, you must not have been listening. No worries! I wanted 1 serving each of <strong class="theme-text-accent-1">Sunflower Seeds</strong> and <strong class="theme-text-accent-1">Grain Grackers</strong>, and mix in 1 serving of <strong class="theme-text-accent-1">Luminous Almonds</strong> with a topping of <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong>. I can't wait to try it!`,
        },
    ],

        'Clawbellia': [
        {
            flavourMatch: `All right, I've got back-to-back defense cases today`,
            flavourHTML: `All right, I've got back-to-back defense cases today, I need some real fuel. I'll take the Chestnut Champion, with <strong>as many chestnuts as you can lawfully give me</strong> with some <strong>honey</strong> topping and the <strong>nut spread</strong>.`,
            clarifyMatch: `Don't want to risk making any erroneous`,
            clarifyHTML: `Don't want to risk making any erroneous ingredient choices? I'll take <strong class="theme-text-accent-1">4 servings of Mire Chestnuts</strong> in my crepe. For toppings, give me some <strong class="theme-text-accent-1">Honey Drizzle</strong> and <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong>.`,
        },
        {
            flavourMatch: `Ugh, I've gotta rush off`,
            flavourHTML: `Ugh, I've gotta rush off, my clients are really badgering me… Time for some fruity sugar! Load me up with <strong>strawberry</strong>, some <strong>blackberry</strong>, and <strong>peach</strong>. Plain on top is fine, just fast-track my crepe, please!`,
            clarifyMatch: `This wasn't already asked and answered?`,
            clarifyHTML: `This wasn't already asked and answered? Fine, that's a crepe with 1 serving each of <strong class="theme-text-accent-1">Strawberry</strong>, <strong class="theme-text-accent-1">Blackberry</strong>, and <strong class="theme-text-accent-1">Potash Peach</strong>. And no toppings.`,
        },
        {
            flavourMatch: `All my objections were sustained by the judge`,
            flavourHTML: `All my objections were sustained by the judge today. Speaking of which, I could also use some sustenance of the crepes variety! Toss some <strong>violets</strong> and <strong>lavender</strong> into a wrap, and pour on that <strong>marmalade</strong>!`,
            clarifyMatch: `No, I get it! Being a lawyer`,
            clarifyHTML: `No, I get it! Being a lawyer, I really should focus on clarity in my statements. I'm asking for 1 serving each of <strong class="theme-text-accent-1">Satin Violets</strong> and <strong class="theme-text-accent-1">Lavender</strong>, with some <strong class="theme-text-accent-1">Heart Rose Marmalade</strong> topping it off!`,
        },
        {
            flavourMatch: `I'm wiped out, I was up all night prepping`,
            flavourHTML: `I'm wiped out, I was up all night prepping closing statements for today. Something crunchy and crumbly would hit the spot. I'll take some <strong>sunflower seeds</strong>, <strong>almonds</strong>, and <strong>crackers</strong> with a smear of that <strong>nutty spread</strong>.`,
            clarifyMatch: `What, do you want me to get in trouble`,
            clarifyHTML: `What, do you want me to get in trouble for leading the witness? Hah! I'm looking for 1 serving each of <strong class="theme-text-accent-1">Sunflower Seeds</strong>, <strong class="theme-text-accent-1">Luminous Almonds</strong>, and <strong class="theme-text-accent-1">Grain Crackers</strong>. They'll go perfectly with some <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong>.`,
        },
        {
            flavourMatch: `Hey, I'll take a crepe with some snakes and snails`,
            flavourHTML: `Hey, I'll take a crepe with some <strong>chocolate</strong> and <strong>banana</strong>, topped off with <strong>honey</strong> in some <strong>zappy jam</strong>. After dealing with the plaintiff's attorney all day, I'm craving something dense and slimy. Uh… allegedly dense and slimy, that is.`,
            clarifyMatch: `Heh, you can strike that joke from the record`,
            clarifyHTML: `Heh, you can strike that joke from the record. I just want a crepe with 1 serving each of <strong class="theme-text-accent-1">Chocolate Chips</strong> and <strong class="theme-text-accent-1">Banana</strong>, topped off with some <strong class="theme-text-accent-1">Honey Drizzle</strong> and <strong class="theme-text-accent-1">Charged Duneberry Jam</strong>.`,
        },
    ],

        'Geoffrey': [
        {
            flavourMatch: `I'm looking forward to quite a delectable crepe today!`,
            flavourHTML: `I'm looking forward to quite a delectable crepe today! Perchance you could provide your finest samples of <strong>lavender</strong> and <strong>sun facing seeds</strong>, <strong>toasted</strong> to perfection? I need no topping to dilute the flavor!`,
            clarifyMatch: `I apologize for my lack of clarity!`,
            clarifyHTML: `I apologize for my lack of clarity! I am asking for 1 serving each of your finest <strong class="theme-text-accent-1">Lavender</strong> and <strong class="theme-text-accent-1">Sunflower Seeds</strong> on a crisply <strong class="theme-text-accent-1">toasted</strong> wrap, chop chop! Oh, and no topping is required.`,
        },
        {
            flavourMatch: `Hmm, I think today calls for a little indulgence`,
            flavourHTML: `Hmm, I think today calls for a little indulgence, don't you? I would like a <strong>plain crepe</strong>, with <strong>all of the toppings</strong> on it.`,
            clarifyMatch: `Yes, I suppose it is a bit of an unusual treat`,
            clarifyHTML: `Yes, I suppose it is a bit of an unusual treat. I'd like no fillings, but for toppings I'd like <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong>, <strong class="theme-text-accent-1">Charged Duneberry Jam</strong>, <strong class="theme-text-accent-1">Honey Drizzle</strong>, and <strong class="theme-text-accent-1">Heart Rose Marmalade</strong>. Thank you.`,
        },
        {
            flavourMatch: `I will have a crepe with both types of shellfish, please. May I add a slush topping? Thank you.`,
            flavourHTML: `Greetings. I hope your shift is going well thus far. I would adore a bouquet of florals today. I will have a crepe with <strong>blessed and silken flowers</strong>, please. May I add a <strong>marmalade</strong> topping? Thank you.`,
            clarifyMatch: `Sometimes any little treasures from the ocean`,
            clarifyHTML: `Sometimes any little treasures from the flower meadow are just the thing, don't you think? I would love 1 serving each of <strong class="theme-text-accent-1">Satin Violets</strong> and <strong class="theme-text-accent-1">Hallowed Ivy</strong>, with a ladle of <strong class="theme-text-accent-1">Heart Rose Marmalade</strong> on top. Thank you.`,
        },
        {
            flavourMatch: `Well met. May I have a crepe, please`,
            flavourHTML: `Well met. May I have a crepe, please, with helpings of <strong>mint</strong> and <strong>grain</strong>? Perhaps with a modest dusting of <strong>acorns</strong> for a lovely, earthy note. Hmm, and I think those would be complemented by some <strong>nutty butter</strong> and a drizzle of <strong>rose marmalade</strong>.`,
            clarifyMatch: `Forgive me, I cannot help but still seek a little decadence here and there`,
            clarifyHTML: `Forgive me, I cannot help but still seek a little decadence here and there. If you could make me a crepe with 1 serving each of <strong class="theme-text-accent-1">Peppermint</strong>, <strong class="theme-text-accent-1">Grain Crackers</strong>, and <strong class="theme-text-accent-1">Acorns</strong>, topped with <strong class="theme-text-accent-1">Sunkernel Nut Butter</strong> and <strong class="theme-text-accent-1">Heart Rose Marmalade</strong>, I would be most appreciative.`,
        },
        {
            flavourMatch: `Greetings. If I may ask, would you please`,
            flavourHTML: `Greetings. If I may ask, would you please make for me the crepe with <strong>acorns</strong> and <strong>sacred ivy</strong>? Perhaps topped with some <strong>heart rose</strong>. I would be most appreciative.`,
            clarifyMatch: `Ah, no trouble, I am happy to clarify`,
            clarifyHTML: `Ah, no trouble, I am happy to clarify. I would like a crepe with 1 serving each of <strong class="theme-text-accent-1">Acorns</strong> and <strong class="theme-text-accent-1">Hallowed Ivy</strong> to fill it. Then, some <strong class="theme-text-accent-1">Heart Rose Marmalade</strong> for a topping, please.`,
        },
    ],

        'Prof. Nickel': [
        {
            flavourMatch: `Did you know that despite their soft bodies`,
            flavourHTML: `Did you know that despite their soft flesh, the pit of <strong>peaches</strong> can fossilize under the correct conditions? Speaking of which, I would like a serving of such a specimen, as well as the <strong>flowers of a flora with relaxing properties</strong>, with a healthy coating of <strong>jam</strong>, if you could.`,
            clarifyMatch: `I suppose I've let work at the university go to my head again!`,
            clarifyHTML: `I suppose I've let work at the university go to my head again! I'll be more straight forward. I would like 1 serving each of <strong class="theme-text-accent-1">Lavender</strong> and <strong class="theme-text-accent-1">Potash Peach</strong>, with the <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> as a topping.`,
        },
        {
            flavourMatch: `Hello there. It would seem I have forgotten to eat…`,
            flavourHTML: `Hello there. It would seem I have forgotten to eat… again. I am famished. I'll have a crepe, please, with <strong>sacred evergreen</strong>, <strong>red false berries</strong>, and <strong>lavandula flowers</strong>. For a topping, I'd like the <strong>hearty marmalade</strong>.`,
            clarifyMatch: `Apologies, I am hungry, underfed, and overly peckish.`,
            clarifyHTML: `Apologies, I am hungry, underfed, and overly peckish. I would like 1 serving each of <strong class="theme-text-accent-1">Hallowed Ivy</strong>, <strong class="theme-text-accent-1">Strawberries</strong>, and <strong class="theme-text-accent-1">Lavender</strong>. For a topping, please add some <strong class="theme-text-accent-1">Heart Rose Marmalade</strong>. Thank you.`,
        },
        {
            flavourMatch: `Hm… Hmm… Let's see… Ah, sorry`,
            flavourHTML: `Hm… Hmm… Let's see… Ah, sorry, my eyes are quite tired-it's a challenge to read in underground ruins. Well, that's all right, I'll keep it adaptable. Just a crepe with your favorite <strong>fruit and flora</strong> options. For <strong>fillings and toppings</strong>, both.`,
            clarifyMatch: `Oh, sorry, that was unhelpfully mysterious.`,
            clarifyHTML: `Oh, sorry, that was unhelpfully mysterious. I suppose not everyone enjoys excavating information, heh. A little archaeologist humor for you there… Ahem. That is, I'll have 1 serving each of <strong class="theme-text-accent-1">any Fruit</strong> and <strong class="theme-text-accent-1">any Flower</strong> fillings, with the <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> and <strong class="theme-text-accent-1">Heart Rose Marmalade</strong> toppings.`,
        },
        {
            flavourMatch: `My apologies, I seem to have tracked dust`,
            flavourHTML: `My apologies, I seem to have tracked dust all over your floor. I am in search of a filling, fruity crepe. Perhaps something with a… mix of true and false berries. Yes. Perhaps those <strong>dark bramble berries</strong> and some of that <strong>banana</strong>. Smothered in an <strong>eletric jam</strong>, please.`,
            clarifyMatch: `Ah, you should come to my lecture sometime.`,
            clarifyHTML: `Ah, you should come to my lecture sometime. Many fossils reveal fascinating facts about botanical characteristics-oh… Perhaps later. For the crepe, that's 1 serving each of <strong class="theme-text-accent-1">Blackberries</strong> and <strong class="theme-text-accent-1">Banana</strong>, with the <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> topping.`,
        },
        {
            flavourMatch: `Hello there. I would like to place a crepe order.`,
            flavourHTML: `Hello there. I would like to place a crepe order. Hm… I think some fruit and evergreen. Yes, that's the one. I'll have some fruits. I am not picky, <strong>any fruit</strong> will suffice. Fruit, and some <strong>ivy</strong>. Naturally, those call for the <strong>jam and marmalade toppings</strong>.`,
            clarifyMatch: `Ah, I can appreciate your attention to detail.`,
            clarifyHTML: `Ah, I can appreciate your attention to detail. Yes, I would like 1 serving of <strong class="theme-text-accent-1">Hallowed Ivy</strong> with 1 serving of <strong class="theme-text-accent-1">any Fruit</strong> ingredient for filling. Then, for toppings, add <strong class="theme-text-accent-1">Charged Duneberry Jam</strong> and <strong class="theme-text-accent-1">Heart Rose Marmalade</strong>.`,
        },
    ],

        'Scruffles': [
        {
            flavourMatch: `Huff, huff, I hate cardio!`,
            flavourHTML: `Huff, huff, I hate cardio! But I had to rush here between my shifts at the construction site so I could order up a crepe! Don't be fancy, just throw down a serving of <strong>anything floral</strong> into a wrap and chuck some <strong>marmalade</strong> on it!`,
            clarifyMatch: `Hey, bud, we don't hafta make this complicated!`,
            clarifyHTML: `Hey, bud, we don't hafta make this complicated! I just want 1 serving of <strong class="theme-text-accent-1">any Flower</strong> item on the menu, with the <strong class="theme-text-accent-1">Heart Rose Marmalade</strong> topping, let's go!`,
        },
        {
            flavourMatch: `Phew, I've been workin' my tail off all day`,
            flavourHTML: `Phew, I've been workin' my tail off all day, you feel me? I know you do! Gotta refuel with that sweet, sweet fiber! Let's do some <strong>fuzzy fruit and make it a double</strong>. And I want it <strong>crisp</strong>, gotta get crunch on that wrap. Oh, and I love that <strong>jam</strong>, gimme a bunch of that on top!`,
            clarifyMatch: `Ugh, come on, I could eat a whole Emperor`,
            clarifyHTML: `Ugh, come on, I could eat a whole Emperor dragon and come back for thirds. Get it? Thirds? 'Eyyyyy! I want <strong class="theme-text-accent-1">2 servings of Potash Peaches</strong>, with the <strong class="theme-text-accent-1">wrap Toasted</strong>, and just drown the whole thing in <strong class="theme-text-accent-1">Charged Duneberry Jam</strong>.`,
        },
        {
            flavourMatch: `Heyo! I've got a big day of construction comin' up.`,
            flavourHTML: `Heyo! I've got a big day of construction comin' up. You know what that means? That's right! Gotta get that good flower power! Gimme some <strong>lavender</strong>, <strong>mint</strong>, and <strong>violets</strong>. Oh, and <strong>make the lavender a double</strong>. Make sure and cover it with some <strong>marmalade</strong>!`,
            clarifyMatch: `Oh, come on, you've got this! I'm a construction pro`,
            clarifyHTML: `Oh, come on, you've got this! I'm a construction pro, I can build anyone up! HAH! A'ight, that's gonna be <strong class="theme-text-accent-1">2 servings of Lavender</strong>, then 1 serving each of <strong class="theme-text-accent-1">Peppermint</strong> and <strong class="theme-text-accent-1">Satin Violets</strong>. Love those crunchy little guys. Oh, and some <strong class="theme-text-accent-1">Heart Rose Marmalade</strong>!`,
        },
        {
            flavourMatch: `Heyyyyyy, what day is it?! That's right, it's GAINS day!`,
            flavourHTML: `Heyyyyyy, what day is it?! That's right, it's GAINS day! I'm gonna load so many macros I could lift this whole shop off its foundation, hah! Let's do it-gimme some <strong>fuzzy fruit</strong> and <strong>peppery leaves</strong>, and <strong>double 'em both</strong>! Oh yeah, and you guessed it, we're gonna top it with <strong>marmalade</strong> and <strong>boosting jam</strong>.`,
            clarifyMatch: `What, are you getting your listening reps in for some ear gains?`,
            clarifyHTML: `What, are you getting your listening reps in for some ear gains? Hah! I got you SO good. Oh, uh, yeah, I want <strong class="theme-text-accent-1">2 servings each of Potash Peaches</strong> and <strong class="theme-text-accent-1">Peppermint</strong>, and smother the whole thing in <strong class="theme-text-accent-1">Heart Rose Marmalade</strong> and <strong class="theme-text-accent-1">Charged Duneberry Jam</strong>.`,
        },
        {
            flavourMatch: `Hey champ, it's my bulk-up routine today!`,
            flavourHTML: `Hey champ, it's my bulk-up routine today! I've gotta get just the right macro balance, so listen up! Hit me with some <strong>gloomy berries</strong>, <strong>fancy ivy</strong>, and <strong>potassium</strong> in perfectly equal amounts. Yeah, you know what comes next-a nice, heapin' ladleful of <strong>jam</strong>!`,
            clarifyMatch: `Hey, don't look at me like that, it's not bulk-up day every day`,
            clarifyHTML: `Hey, don't look at me like that, it's not bulk-up day every day… Just most days, hah! Yeah, okay, I want 1 serving each of <strong class="theme-text-accent-1">Blackberry</strong>, <strong class="theme-text-accent-1">Hallowed Ivy</strong>, and <strong class="theme-text-accent-1">Banana</strong>. And you know we gotta get that zesty stuff as a finishing touch, so top it with <strong class="theme-text-accent-1">Charged Duneberry Jam</strong>.`,
        },
    ]
    };

    // --- Ingredient name reskin ---
    // These are used to correct the dialogue on failure, when a NPC states what they wanted (that you missed).
    const INGREDIENTS = {
        1: { canonical: 'Leechroot Mushroom', reskin: 'Mire Chestnut' },
        2: { canonical: 'Sweet Grass', reskin: 'Sunflower Seeds' },
        3: { canonical: 'Plantain', reskin: 'Luminous Almonds' },
        4: { canonical: 'Acorn', reskin: '' },

        5: { canonical: 'Pillbug', reskin: 'Marshmallow' },
        6: { canonical: 'Garden Snail', reskin: 'Chocolate Chips' },
        7: { canonical: 'Jungle Mantis Legs', reskin: 'Grain Cracker' },
        8: { canonical: 'Dragonfly', reskin: 'Konpeitō' },

        9: { canonical: 'Heartred Croaker Legs', reskin: 'Strawberry' },
        10: { canonical: 'Green Iguana', reskin: 'Blackberry' },
        11: { canonical: 'Coral Snake', reskin: 'Banana' },
        12: { canonical: 'Brown Bat Wing', reskin: 'Potash Peach' },

        13: { canonical: 'White Reaches Crab', reskin: 'Hallowed Ivy' },
        14: { canonical: 'Jumbo Shrimp', reskin: 'Satin Violets' },
        15: { canonical: 'Red Octopus', reskin: 'Lavender' },
        16: { canonical: 'Pufferfish', reskin: 'Peppermint' },

        17: { canonical: 'Sour Green Applesauce', reskin: 'Sunkernel Nut Butter' },
        18: { canonical: 'Red Breasted Goose Stew', reskin: 'Honey Drizzle' },
        19: { canonical: 'Earthworm Paste', reskin: 'Heart Rose Marmalade' },
        20: { canonical: 'Crystal Jellyfish Slush', reskin: 'Charged Duneberry Jam' },
    };

    // =========================================================
    // SECTION 2: IMAGE REPLACEMENTS
    // NOTE: The ingredient IDs the game uses for order completion are sent from the server and are never affected by this. These replacements are purely visual.
    // =========================================================

    const BASE = 'https://raw.githubusercontent.com/gremlincache/canopycrepesreskin/refs/heads/main/images/';

    const IMAGE_REPLACEMENTS = {
        // ---- Logo ----
        'logo': BASE + 'logo.png',

        // ---- Ingredient pile icons ----
        'ingredient-pile-1': BASE + 'ingredient-pile-1.png',
        'ingredient-pile-2': BASE + 'ingredient-pile-2.png',
        'ingredient-pile-3': BASE + 'ingredient-pile-3.png',
        'ingredient-pile-5': BASE + 'ingredient-pile-5.png',
        'ingredient-pile-6': BASE + 'ingredient-pile-6.png',
        'ingredient-pile-7': BASE + 'ingredient-pile-7.png',
        'ingredient-pile-8': BASE + 'ingredient-pile-8.png',
        'ingredient-pile-9': BASE + 'ingredient-pile-9.png',
        'ingredient-pile-10': BASE + 'ingredient-pile-10.png',
        'ingredient-pile-11': BASE + 'ingredient-pile-11.png',
        'ingredient-pile-12': BASE + 'ingredient-pile-12.png',
        'ingredient-pile-13': BASE + 'ingredient-pile-13.png',
        'ingredient-pile-14': BASE + 'ingredient-pile-14.png',
        'ingredient-pile-15': BASE + 'ingredient-pile-15.png',
        'ingredient-pile-16': BASE + 'ingredient-pile-16.png',
        'ingredient-pile-17': BASE + 'ingredient-pile-17.png',
        'ingredient-pile-18': BASE + 'ingredient-pile-18.png',
        'ingredient-pile-19': BASE + 'ingredient-pile-19.png',
        'ingredient-pile-20': BASE + 'ingredient-pile-20.png',

        // ---- Ingredient label banners ----
        'ingredient-label-1' : BASE + 'ingredient-label-1.png',
        'ingredient-label-2': BASE + 'ingredient-label-2.png',
        'ingredient-label-3': BASE + 'ingredient-label-3.png',
        'ingredient-label-5': BASE + 'ingredient-label-5.png',
        'ingredient-label-6': BASE + 'ingredient-label-6.png',
        'ingredient-label-7': BASE + 'ingredient-label-7.png',
        'ingredient-label-8': BASE + 'ingredient-label-8.png',
        'ingredient-label-9': BASE + 'ingredient-label-9.png',
        'ingredient-label-10': BASE + 'ingredient-label-10.png',
        'ingredient-label-11': BASE + 'ingredient-label-11.png',
        'ingredient-label-12': BASE + 'ingredient-label-12.png',
        'ingredient-label-13': BASE + 'ingredient-label-13.png',
        'ingredient-label-14': BASE + 'ingredient-label-14.png',
        'ingredient-label-15': BASE + 'ingredient-label-15.png',
        'ingredient-label-16': BASE + 'ingredient-label-16.png',
        'ingredient-label-17': BASE + 'ingredient-label-17.png',
        'ingredient-label-18': BASE + 'ingredient-label-18.png',
        'ingredient-label-19': BASE + 'ingredient-label-19.png',
        'ingredient-label-20': BASE + 'ingredient-label-20.png',

        // ---- Ingredients placed on crepe ----
        'ingredient-1-1' : BASE + 'ingredient-1-1.png',
        'ingredient-1-2' : BASE + 'ingredient-1-2.png',
        'ingredient-1-3' : BASE + 'ingredient-1-3.png',
        'ingredient-2-1' : BASE + 'ingredient-2-1.png',
        'ingredient-2-2' : BASE + 'ingredient-2-2.png',
        'ingredient-2-3' : BASE + 'ingredient-2-3.png',
        'ingredient-3-1' : BASE + 'ingredient-3-1.png',
        'ingredient-3-2' : BASE + 'ingredient-3-2.png',
        'ingredient-3-3' : BASE + 'ingredient-3-3.png',
        'ingredient-5-1' : BASE + 'ingredient-5-1.png',
        'ingredient-5-2' : BASE + 'ingredient-5-2.png',
        'ingredient-5-3' : BASE + 'ingredient-5-3.png',
        'ingredient-6-1' : BASE + 'ingredient-6-1.png',
        'ingredient-6-2' : BASE + 'ingredient-6-2.png',
        'ingredient-6-3' : BASE + 'ingredient-6-3.png',
        'ingredient-7-1' : BASE + 'ingredient-7-1.png',
        'ingredient-7-2' : BASE + 'ingredient-7-2.png',
        'ingredient-7-3' : BASE + 'ingredient-7-3.png',
        'ingredient-8-1' : BASE + 'ingredient-8-1.png',
        'ingredient-8-2' : BASE + 'ingredient-8-2.png',
        'ingredient-8-3' : BASE + 'ingredient-8-3.png',
        'ingredient-9-1' : BASE + 'ingredient-9-1.png',
        'ingredient-9-2' : BASE + 'ingredient-9-2.png',
        'ingredient-9-3' : BASE + 'ingredient-9-3.png',
        'ingredient-10-1' : BASE + 'ingredient-10-1.png',
        'ingredient-10-2' : BASE + 'ingredient-10-2.png',
        'ingredient-10-3' : BASE + 'ingredient-10-3.png',
        'ingredient-11-1' : BASE + 'ingredient-11-1.png',
        'ingredient-11-2' : BASE + 'ingredient-11-2.png',
        'ingredient-11-3' : BASE + 'ingredient-11-3.png',
        'ingredient-12-1' : BASE + 'ingredient-12-1.png',
        'ingredient-12-2' : BASE + 'ingredient-12-2.png',
        'ingredient-12-3' : BASE + 'ingredient-12-3.png',
        'ingredient-13-1' : BASE + 'ingredient-13-1.png',
        'ingredient-13-2' : BASE + 'ingredient-13-2.png',
        'ingredient-13-3' : BASE + 'ingredient-13-3.png',
        'ingredient-14-1' : BASE + 'ingredient-14-1.png',
        'ingredient-14-2' : BASE + 'ingredient-14-2.png',
        'ingredient-14-3' : BASE + 'ingredient-14-3.png',
        'ingredient-15-1' : BASE + 'ingredient-15-1.png',
        'ingredient-15-2' : BASE + 'ingredient-15-2.png',
        'ingredient-15-3' : BASE + 'ingredient-15-3.png',
        'ingredient-16-1' : BASE + 'ingredient-16-1.png',
        'ingredient-16-2' : BASE + 'ingredient-16-2.png',
        'ingredient-16-3' : BASE + 'ingredient-16-3.png',

        // ---- Drizzle spritesheets ----
        'ingredient-drizzle-17' : BASE + 'ingredient-drizzle-17.png',
        'ingredient-drizzle-18' : BASE + 'ingredient-drizzle-18.png',
        'ingredient-drizzle-19' : BASE + 'ingredient-drizzle-19.png',
        'ingredient-drizzle-20' : BASE + 'ingredient-drizzle-20.png',

        // --- Ingredient spoon ---
        'cursor-ingredient-17' : BASE + 'cursor-ingredient-17.png',
        'cursor-ingredient-18' : BASE + 'cursor-ingredient-18.png',
        'cursor-ingredient-19' : BASE + 'cursor-ingredient-19.png',
        'cursor-ingredient-20' : BASE + 'cursor-ingredient-20.png',

    };

    // =========================================================
    // SECTION 3: REPLACEMENT LOGIC
    // NOTE: editing the script below might break the replacement logic, so only edit this if you absolutely need to!
    // =========================================================

    // --- Order validation to check for formatting errors or missing entries ---
        function validateOrders() {
            for (const [npc, orders] of Object.entries(ORDERS)) {
                orders.forEach((order, i) => {
                    if (order.flavourMatch && !order.flavourHTML) {
                        console.warn(`[Reskin] ${npc} order ${i}: flavourMatch is set but flavourHTML is missing`);
                    }
                    if (order.clarifyMatch && !order.clarifyHTML) {
                        console.warn(`[Reskin] ${npc} order ${i}: clarifyMatch is set but clarifyHTML is missing`);
                    }

                    if (order.clarifyHTML === ` `) {
                        console.warn(`[Reskin] Empty string in ${npc} order ${i} clarifyHTML`);
                    }

                    if (order.clarifyHTML.trim().length === 0) {
                        console.warn(`[Reskin] Empty string in ${npc} order ${i} clarifyHTML`);
                    }

                    if (order.flavourHTML.trim().length === 0) {
                        console.warn(`[Reskin] Empty string in ${npc} order ${i} flavourHTML`);
                    }

                    for (const field of ['flavourHTML', 'clarifyHTML']) {
                        const html = order[field];
                        if (!html) continue;
                        const opens = (html.match(/<strong/g) || []).length;
                        const closes = (html.match(/<\/strong>/g) || []).length;
                        if (opens !== closes) {
                            console.warn(`[Reskin] Mismatched <strong> tags in ${npc} order ${i} (${field}): ${opens} open, ${closes} close`);
                        }
                        if (html.includes('</div>')) {
                            console.warn(`[Reskin] Stray </div> in ${npc} order ${i} (${field})`);
                        }
                    }
                })
            }
        }

    validateOrders();

    // --- Patch failure dialogue ---
    function patchFailText(node) {
        node.querySelectorAll('strong.theme-text-accent-1').forEach(el => {
            // Check each canonical name and replace if it matches
            for (const { canonical, reskin } of Object.values(INGREDIENTS)) {
                if (!reskin) continue;
                if (el.textContent.trim() === canonical) {
                    el.textContent = reskin;
                    break;
                }
            }
        });
    }

    // --- Dialogue replacement ---
    function patchDialogText(node) {
        if (!node || !node.textContent.trim()) return;

        const nameEl = node.querySelector('.canopy-crepes-dialog-npc-name');
        const npcName = nameEl?.textContent?.trim();

        // Read these BEFORE any modification
        const isClarification = !!node.querySelector('strong.theme-text-accent-1');
        const msgText = node.textContent.replace(npcName ?? '', '').trim();

        // Try full order replacement first
        if (npcName && ORDERS[npcName]) {
            const order = ORDERS[npcName].find(o =>
                isClarification
                    ? msgText.includes(o.clarifyMatch)
                    : msgText.includes(o.flavourMatch)
            );
            if (order) {
                const nameHTML = nameEl?.outerHTML ?? '';
                node.innerHTML = nameHTML + (isClarification ? order.clarifyHTML : order.flavourHTML);
                return;
            }
        }

        // No full order match, patch any accent-styled ingredient names
        patchFailText(node);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const dialogText = document.getElementById('canopy-crepes-dialog-text');
        if (!dialogText) return;

        const observer = new MutationObserver(() => {
            observer.disconnect();
            patchDialogText(dialogText);
            observer.observe(dialogText, {
                childList: true,
                subtree: true,
                characterData: true,
            });
        });

        observer.observe(dialogText, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    });

    // --- Image replacement ---
    const BASE_PATH = '/static/layout/canopy-crepes/';

    function getImageReplacement(url) {
        if (!url || typeof url !== 'string' || !url.includes(BASE_PATH)) return url;
        const name = url.split(BASE_PATH)[1]?.replace(/\.png(\?.*)?$/, '');
        if (name && Object.hasOwn(IMAGE_REPLACEMENTS, name)) {
            return IMAGE_REPLACEMENTS[name];
        }

        return url;
    }

const srcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
Object.defineProperty(HTMLImageElement.prototype, 'src', {
    get: srcDescriptor.get,
    set(value) {
        const replacement = getImageReplacement(value);
        if (replacement !== value) {
            // Set crossOrigin before src so canvas drawImage works
            this.crossOrigin = 'anonymous';
            // Fall back to original if replacement fails to load
            this.onerror = () => {
                this.onerror = null;
                this.crossOrigin = null;
                srcDescriptor.set.call(this, value);
            };
        }
        srcDescriptor.set.call(this, replacement);
    },
    configurable: true,
});

})();
