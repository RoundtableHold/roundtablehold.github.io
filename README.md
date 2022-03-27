# Elden Ring Cheat Sheet

To view the cheat sheet [click here](https://roundtable-hold.github.io/tracker/).

This checklist was created by adopting the source code from the [Dark Souls 3 Cheat Sheet](https://github.com/ZKjellberg/dark-souls-3-cheat-sheet) created by [ZKjellberg](https://github.com/zkjellberg).

The walkthrough is thanks to [Athrek](https://www.reddit.com/r/Roundtable_Guides/comments/tiouti/guide_to_the_intended_route_through_the_game/).

## Contribution Guide

If you are interested in contributing to this guide, please do so. Follow this step by step guide and reach out to me on discord if you have any questions Azy#9592

1. Make a github account.
2. Download and install [Github Desktop](https://desktop.github.com/) and then sign in with your github account.
3. Then you will need to fork this project. That will create your own project that you download and make changes to. Later you'll submit a request to bring those changes back here and onto the website. To fork this project click the fork button on the top right of the page.
4. All information for the website is stored in `data`. Each `.yaml` file is a different page. You can either add to existing files are create a new one. Don't edit `index.html` as that is automatically generated based off of the stuff in `data`. The data has to be in a specific format:

Each page of the site starts like this:
```yaml
title: "Weapons"
id: weapons
sections:
```

Eeach section on a page starts like this:
```yaml
  -
    title: "Daggers"
    id: daggers
    link: "https://eldenring.wiki.fextralife.com/Daggers"
    num: 1
    items:
      - [1, "f_weap", "Dagger"]
      - [3, "f_weap", "You can embed links like this: <a href=\"https://eldenring.wiki.fextralife.com/Black+Knife\"Black Knife</a>"]
      - "You can put arbitrary text inbetween the checklists like this"
      - [4, "f_weap", "You can put any html in here, <b>Bold!</b>, <i>Italic</i>, etc."]
  -
    title: "Table example"
    id: table_example
    num: 2
    table: ["Column 1", "Column 2", "Column 3"] # If you don't want the table to have headers put "table: 3" instead where 3 is the number of columns
    items:
      - [1, "", "Include a string for each column", "This is going in the second column", "And this the third"]
```

All ids have to be unique and the `num:` field also has to be unique. Within an item the first number has to be uinque as well. If you are adding a new line find the biggest number in that section and increase it by 1. The numbers do not have to be in order and you should not ever change an existing number because it will break everyones saved progress.

The second field in an item (e.g. `"f_weap"`) is used for the filtering system. The full list of filter classes is:

| Class   | Description |
|---      |--- |
| f_boss  | Boss fights |
| f_miss  | Content that can be permanently missed |
| f_npc   | NPC side quests |
| f_seed | Golden Seeds |
| f_tear  | Sacred Tears |
| f_tome  | Sorcery Scrolls, Pyromancy Tomes, and Divine Tomes |
| f_gest  | Gestures |
| f_sorc  | Sorceries |
| f_mirac | Miracles |
| f_talisman  | Talismans |
| f_weap  | Weapons, Spell Tools, and Shields |
| f_arm   | Armor Sets or individual pieces |
| f_stone   | Weapon Upgrade Stones |
| f_ash   | Ashes of War |
| f_spirit   | Spirit Ashes |
| f_misc  | *any other items* |

If none of these filter classes match, use `""`, or consider adding a new one.

In addition to the filter classes, there is a second type of classes used to control the visibility of entries based on which playthrough the user is on:

| Class  | Description |
|---     |--- |
| h_ng+  | items hidden on NG+ and beyond, e.g., Ashen Estus Flask |
| s_ng+  | items shown on NG+ and beyond, e.g., +1 rings |
| s_ng++ | items shown on NG++ and beyond, e.g., +2 rings |

If you added a new page you need to put your page in `pages.yaml` for it to show up.

5. Once you are done with your changes double click `generate.bat` to see what it will look like. This requires you to have (python3)[https://www.python.org/downloads/] installed.
6. If you are happy with it open github desktop and describe what you added in the bottom left where there is a text box labeled "Description".
7. Push the button in the bottom left that says "Commit to gh-pages"
8. Push the button in the top right that says "Push origin"
9. Go to Branch -> Create Pull Request
10. In the webpage that opens describe your changes and why you want them published to the website
11. Hit create pull request
12. I will look them over and add them to the website if they are good.
13. Thanks for contributing!
