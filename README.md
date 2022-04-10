# Elden Ring Cheat Sheet

To view the cheat sheet [click here](https://roundtable-hold.github.io/tracker/).

This checklist was created by adopting the source code from the [Dark Souls 3 Cheat Sheet](https://github.com/ZKjellberg/dark-souls-3-cheat-sheet) created by [ZKjellberg](https://github.com/zkjellberg).

The walkthrough is thanks to [Athrek](https://www.reddit.com/r/Roundtable_Guides/comments/tiouti/guide_to_the_intended_route_through_the_game/).

## Contribution Guide

If you are interested in contributing to this guide, please do so. Follow this step by step guide and reach out to me on discord if you have any questions Azy#9592

Please join the development discord and ask if someone is already working on your project https://discord.gg/VQzQgD3cCW

1. Make a github account.
2. Click "Issues" and check if an issue describing what you want is already open.
3. If there isn't one. Create a new issue and click "Assign to self" so other people know what you are working on.
4. Download and install [Github Desktop](https://desktop.github.com/) and then sign in with your github account.
5. Then you will need to fork this project. That will create your own project that you download and make changes to. Later you'll submit a request to bring those changes back here and onto the website. To fork this project click the fork button on the top right of the page.
6. All information for the website is stored in `data`. Each `.yaml` file is a different page. You can either add to existing files are create a new one. Don't edit `index.html` as that is automatically generated based off of the stuff in `data`. The data has to be in a specific format:

Each page of the site starts like this:

```yaml
title: "Weapons"
id: weapons
table_widths: [6, 4, 2]
sections:
```

`title` is what appears on the page and the navigation bar. `id` has to be unique across all pages. `table_widths` is the proportional width of each column in the table. The numbers must add up to 12. Here we are saying there will be 3 columns, the first column is 6/12=50%, the 2nd column is 33%, and the 3rd column is 16%.

Eeach section on a page starts like this:

```yaml
  -
    title: "Daggers"
    link: "https://eldenring.wiki.fextralife.com/Daggers"
    items:
      - [4, "Dagger"]
      - [1, "You can embed links like this: <a href=\"https://eldenring.wiki.fextralife.com/Black+Knife\"Black Knife</a>"]
      - "You can put arbitrary text inbetween the checklists like this"
      - [3, "You can put any html in here, <b>Bold!</b>, <i>Italic</i>, etc."]
  -
    title: "Table example"
    table: ["Column 1", "Column 2", "Column 3"] # If you don't want the table to have headers put "table: 3" instead where 3 is the number of columns
    items:
      - [2, "Include a string for each column", "This is going in the second column", "And this the third"]
```

The first number in each item is the id. All ids have to be unique within a page. ids are used to keep track of users progress and do not effect the order of the elements on the page. If an id is already present you should never change it. You will see ids that look like this: `"1_12"`, this is a hold over from an old way of tracking ids. They look like this so that we wouldn't break user's existitng progress. ids can be anything as long as they are unique, but it's simplest to just count up. If you are adding a new line find the biggest number in that section and increase it by 1.

If you added a new page you need to put your page in `pages.yaml` for it to show up.

7. Once you are done with your changes double click `generate.bat` to see what it will look like. This requires you to have [python3](https://www.python.org/downloads/) installed.
8. If you are happy with it open github desktop and describe what you added in the bottom left where there is a text box labeled "Description".
9. Push the button in the bottom left that says "Commit to gh-pages"
10. Push the button in the top right that says "Push origin"
11. Go to Branch -> Create Pull Request
12. In the webpage that opens describe your changes and why you want them published to the website
13. Hit create pull request
14. I will look them over and add them to the website if they are good.
15. Thanks for contributing!

## Recommended Working Environment

You are welcome to use whatever software you want to edit the site. But if you are unsure or want a seemless editing environment this is what I recommend.

1. Get [VSCode](https://code.visualstudio.com/). Then click File -> Open Folder and navigate to `tracker`.
2. Press `ctrl+P` and type or paste in `Extensions: Show Recommended Extensions`
3. Install `Live Server` and  `Run on Save` from the menu that opens.
4. Click the button on the bottom right that says `Go Live`. This will open your webbrowser to a local copy of the site.
5. Click `View -> Output` then in the dropdown on the right select `Run On Save`.
6. Whenever you save a `.yaml` file the webpage should automatically refresh. If there is an error it will appear at the bottom describing what you did wrong. You may need to run `generate.bat` once to get the correct dependencies installed.