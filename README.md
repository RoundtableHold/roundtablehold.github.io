# Elden Ring Cheat Sheet

To view the site [click here](https://roundtablehold.net/).

This checklist was created by adopting the source code from the [Dark Souls 3 Cheat Sheet](https://github.com/ZKjellberg/dark-souls-3-cheat-sheet) created by [ZKjellberg](https://github.com/zkjellberg).

The walkthrough is thanks to [Athrek](https://www.reddit.com/r/Roundtable_Guides/comments/tiouti/guide_to_the_intended_route_through_the_game/).

## Contribution Guide

If you are interested in contributing to this guide, please do so. Follow this step by step guide and reach out to me on discord if you have any questions Azy#9592. There is no coding required.

Please join the development discord, introduce yourself, and announce what you will be working on (or ask for a task if you are unsure) https://discord.gg/VQzQgD3cCW

This can be a little confusing at first so please feel free to ask questions in the discord. Everyone has been able to figure it out eventually and someone will definitely be able to help.

1. Make a github account.
2. Click "Issues" and check if an issue describing what you want is already open.
3. If there isn't one. Create a new issue so other people know what you are working on.
4. Download and install [Github Desktop](https://desktop.github.com/) and then sign in with your github account.
5. Then you will need to fork this project. That will create your own project that you download and make changes to. Later you'll submit a request to bring those changes back here and onto the website. To fork this project click the fork button on the top right of the page.
6. Once your fork is created click the green "Code" button and click "Open with Github Desktop". Take note of where you put the folder.
1. Install [python3](https://www.python.org/downloads/).
12. Run `install_dependencies.bat` once by double clicking it. You shouldn't ever have to do this again, this will install all of the dependencies you need
7. Get [VSCode](https://code.visualstudio.com/). Then click File -> Open Folder and navigate to the project.
8. Press `ctrl+P` and type or paste in `Extensions: Show Recommended Extensions`
9. Install `Live Server` and  `Run on Save` from the menu that opens.
10. Click the button on the bottom right that says `Go Live`. This will open your webbrowser to a local copy of the site.
11. Click `View -> Output` then in the dropdown on the right select `Run On Save`.
13. Whenever you save a `.yaml` file the webpage should automatically refresh. If there is an error it will appear at the bottom describing what you did wrong.
14. All information for the website is stored in `data`. Each `.yaml` file is a different page. You can either add to existing files are create a new one. Don't edit anything outside the `data` directory as it is all automatically generated based off of the stuff in `data` so your changes will be overwritten. The data has to be in a specific format:

Each page of the site starts like this:

```yaml
title: Landmarks & Locations
id: caves
icon: '/map/icons/MENU_MAP_30.png'
table_widths: [4, 2, 3, 3]
sections:
```

`title` is what appears on the page and the navigation bar. `id` has to be unique across all pages. `table_widths` is the proportional width of each column in the table. The numbers must add up to 12. Here we are saying there will be 4 columns, the first column is 4/12=33%, the 2nd column is 16.66%, and the 3rd and 4th columns are 25%.

`sections:` is a list of each grouping for the page. For instance, "Limgrave" and "Weeping Peninsula"

Eeach section on a page starts like this:

```yaml
  -
    title: "Limgrave"
    table: ["Name", "Type", "Bosses", "Notes"]
    items:
      - id: "1_1"
        data: ["Stranded Graveyard", "Cave", "Soldier of Godrick", ""]
        icon: '/map/icons/edited/MENU_MAP_13.png'
        cords: [3766, 7373]
        map_icon_size: 50
      - id: "1_5"
        data: ["Groveside Cave", "Cave", "Beastman of Farum Azula", ""]
        icon: '/map/icons/edited/MENU_MAP_13.png'
        cords: [3664, 7065]
        map_icon_size: 50
      - id: "1_3"
        data: ["Coastal Cave", "Cave", "Demi-Human Chief (x2)", "Related to Boc's questline."]
        icon: '/map/icons/edited/MENU_MAP_13.png'
        cords: [3497, 7347]
        map_icon_size: 50
```

`title:` is the section title

`table:` is the table headers that appear at the top of the section

`items:` is a list of each checkbox

All `id:`s have to be unique within a page. ids are used to keep track of users progress and do not effect the order of the elements on the page. If an id is already present you should never change it. You will see ids that look like this: `"1_12"`, this is a hold over from an old way of tracking ids. They look like this so that we wouldn't break user's existitng progress. ids can be anything as long as they are unique, but it's simplest to just count up. If you are adding a new line find the biggest number in the file and increase it by 1.

`data` is a list of the content that should appear for each item. For some pages it will have just 1 element. If you want a table it will have an element for each column like we have here.

`icon` is the image that will appear next to the checkbox.

`cords` is the location for the item on the interactive map.

To add things to the map, make sure you visit the map page once and move around slightly, then go to the options page and find in the textbox where it looks something like this:
`"previousPosition":["8.00","2325.34","-6015.03"]}`. Put your cursor after the `]` at the end and paste in `, "devMode": true`. Then hit "Import textbox". This enables development mode for the map and lets you add things to it.

Now go to the map and click where you want an icon to go. A box will popup. The contents of this box will be automatically added to your clipboard.

Go to the `.yaml` file and find the item you are trying to add to the map, position your cursor on the end of the `data:` line after the `]` and press ctrl+v to paste. After you save the icon should appear on the map.

The text that appears in the popup is the first element of `data`. If you want to change it just add `map_title: "My example title"` to the item.

The icon that appears is the nearest instance of `icon` to the item. It first checks the item, then the section, then the page. But if you'd like to change this simply add a `map_icon`. `map_icon` is checked before `icon` so it overrides it. This is checked first at the item, then the section, then the page. So for instance if you add `map_icon` to the page every item on the page will get that icon.

If you added a new page you need to put your page in `pages.yaml` for it to show up.

15. Once you are happy with your changes open github desktop and click the button in the middle top that says "Current Branch main". Then at the bottom click "Choose a branch to merge into main" then select "upstream/main". This downloads the latest changes from the repo.
16. Now describe what you added in the bottom left where there is a text box next to your icon.
17. Push the button in the bottom left that says "Commit to main"
18. Push the button in the top right that says "Push origin"
19. Go to Branch -> Create Pull Request
20. In the webpage that opens describe your changes and why you want them published to the website
21. Hit create pull request
22. I will look them over and add them to the website if they are good.
23. Thanks for contributing!
24. Going forward before you begin working on anything always pull from upstream/main like you did in step 15.