# Flight Rising Canopy Crepes Reskin

A Tampermonkey userscript that visually reskins the ingredients in Flight Rising's *Canopy Crepes* minigame, replacing existing ingredients with a sweets theme (fruits, nuts, confections, edible flowers). This was made with a bug-phobia safe mode in mind, so the tray icons, placed toppings, name labels, and NPC dialogue all get swapped for something intended to be friendlier. Most ingredients still exist as food items in the Flight Rising canon, with the exception of Marshmallows, Chocolate Chips and Konpeitō (and maybe Grain Crackers, though granola bars exists).

If you don't like the specific replacements used here, this script is built so you can swap in your own — see [Customizing](#customizing) below.

**This script does not scrape or manipulate the game server in any way**, nor does it provide any gameplay automation. All changes are purely visual. **While this script isn't doing anything that should be detected by the site/server**, there is always a risk with using any type of script or add-on on Flight Rising. Please use it at your own discretion. 

## Features

- New ingredient art
- New ingredient labels
- Replaced order text to correspond to the new labels
- Replacement of the title logo (**does not replace the fairgrounds ticket image where you pick a game**)

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser.
2. Open the raw [Canopy Crepes Reskin.user.js](https://github.com/gremlincache/canopycrepesreskin/raw/refs/heads/main/Canopy%20Crepes%20Reskin.user.js) file, which will trigger a prompt to install the script from Tampermonkey.
3. Click **Install** in Tampermonkey.
4. Done!

## Troubleshooting

### The window doesn't appear at all
The script only runs on `https://www1.flightrising.com/play/canopy-crepes`, so it will not appear on any other page. If you are on the Canopy Crepes page and it still doesn't appear, try disabling and re-enabling the script in Tampermonkey, or check the browser console for errors.

### An order doesn't display the reskinned text
This means I've missed something when it comes to matching the text of that order - either the NPC name or the specific text. Please let me know if this is the case so that I can fix it! Alternatively, you can add it to an NPCs order in the script yourself by editing the dialogue replacements. More on how you do this in the [customization](#customizing) section!


## Feedback and issues

- Open an [issue on GitHub](https://github.com/gremlincache/canopycrepesreskin/issues) if you have a GitHub account
- Poke me on [tumblr](https://gremlincache.tumblr.com) (anonymous asks are open)

I am not an experienced developer, so if something breaks I will do my best but no promises on turnaround time ..b

---

## Customizing

If you're not happy with the art or the dialogue you're more than welcome to use this script as a base to make your own custom replacements! The main part of what you need to change lives at the top of the script, and anything under `REPLACEMENT LOGIC` **should not need to be edited**. 

**You may edit the images** used in this reskin and reuse them for a custom version - **no credits are required**, but they are appreciated.

### 1. Text replacements

Dialogue gets replaced by first looking at the NPC name, and then using a unique string from that order, `flavourMatch`, to identify which order the NPC is placing. The dialogue is then fully replaced by the `flavourHTML`. The same is done for the clarifying text (the dialogue that shows up if you press the 'What?' button), with `clarifyMatch` and `clarifyHTML`. By replacing the contents of `flavourHTML` and `clarifyHTML`, including HTML tags, you can reskin the dialogue. 

```javascript
'Some NPC Name': [
    {
        flavourMatch:  'a short unique snippet from the original flavour text',
        flavourHTML:   'your replacement version of that message',
        clarifyMatch:  'a short unique snippet from the original clarification text',
        clarifyHTML:   'your replacement version of that message',
    },
    // more orders for this NPC...
],
```


If you fail an order, the NPC will say the canonical name of the ingredient you missed. The `INGREDIENTS` object maps each of the game's 20 ingredients to a replacement name. The `canonical` field must match the game's real ingredient name used in dialogue - only edit the `reskin` field. 

```javascript
const INGREDIENTS = {
    1: { canonical: 'Leechroot Mushroom', reskin: 'Mire Chestnut' },
    // change 'Mire Chestnut' to whatever you'd like instead
    ...
};
```

This list is used by the automatic "failure message" patcher, which looks for the game's real ingredient names inside the highlighted text shown when you get an order wrong, and swaps them for your reskin name. You don't need to write anything extra for that to work - just fill in `reskin`  and it happens automatically.

### If you leave a reskin field empty

Leaving `reskin` ingredient field as an empty string (`''`) means that ingredient won't be touched by the dialogue system - it'll keep its original name. The same goes for any order or NPC not listed in `ORDERS`. These will simply display exactly as it does in the base game. Nothing will break, it just won't be reskinned. This means you can build up your customization gradually, testing a few NPCs or orders at a time, rather than needing everything filled in before it works. 

Note that if an order has a valid text match in `flavourMatch` or `clarifyMatch`, but the flavourHTML and clarifyHTML is left empty (`''` or with spaces `'  '`), the original text will be replaced with the **empty content, appearing broken**. If the flavourHTML or clarifyHTML variable is completely removed from an order, the dialogue box may say "undefined". Both of these cases are checked in the `validateOrders` function that runs on startup, and console warnings will appear if this is the case.

### 2. Images (`IMAGE_REPLACEMENTS`)

This object maps each internal image filename (used by the game) to a URL pointing to your own replacement picture.

```javascript
const IMAGE_REPLACEMENTS = {
    'ingredient-pile-1': BASE + 'ingredient-pile-1.png',
    ...
};
```

The `BASE` variable near the top is used since the images in this replacement can be found here in the repository. The full link looks like this: 
`https://raw.githubusercontent.com/gremlincache/canopycrepesreskin/refs/heads/main/images/ingredient-drizzle-20.png`
and since all images share the path `https://raw.githubusercontent.com/gremlincache/canopycrepesreskin/refs/heads/main/images/`, the `BASE` variable holds that instead. If your images do not have a shared base, you can remove this variable and instead use the full link for your images.

**If you want to use your own images:**
1. Upload your replacement PNGs somewhere that gives you a direct, permanent link (a public GitHub repository works well. See the note on GitHub links below).
2. Update `BASE` to point at your folder, or if your images don't share a base for the link, remove it and replace the image names completely.
3. Make sure your filenames either match the pattern already listed (e.g. `ingredient-pile-5.png`, `ingredient-label-5.png`), or replace the contents:

```javascript
// with BASE:
const IMAGE_REPLACEMENTS = {
    'ingredient-pile-1': BASE + 'filename.fileextension',
};

// without BASE:
const IMAGE_REPLACEMENTS = {
    'ingredient-pile-1': 'full image link, including.png or other file extension',
};
```

You don't have to replace every single ingredient. Any image name you leave out of this list will simply show the game's original artwork.

**A note on GitHub links:** if you're hosting your images on GitHub, use a `raw.githubusercontent.com` link rather than the link you get from clicking an image in the file browser (that one usually has an access token attached, which will not allow your images to be replaced). A raw link to an image that is hosted in a folder called images looks like:
```
https://raw.githubusercontent.com/your-username/your-repo/main/images/example.png
```
This only works if your repository is set to **public**.

---

## A note on scope

This script only ever changes what **you** see. It cannot and does not:
- Change how much of an ingredient is needed for an order
- Change scoring, timing, or difficulty
- Send or receive any extra information to/from Flight Rising's servers
- Affect what other players see - this is entirely local to your own browser

If something looks wrong in-game (an order can't seem to be completed, or the description doesn't match what's needed), it's purely cosmetic confusion - the actual required ingredients are always the same ones the game intended, just wearing a different label.

## License

[MIT License](LICENSE)
