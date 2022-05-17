#!/usr/bin/env python
from gimpfu import *
import os
#
def batchShadow(sourceFolder, targetFolder, subs):
    """Adds a drop shadow to all pngs in source directory, creating
    new files in target directory. Arguments are the two directory
    paths and whether or not to include subdirectories (TRUE or FALSE)
    Subdirectories are recreated as-is in target directory."""
    #
    sourceImages = [] #The pngs to be edited
    #
    if not os.path.isdir(targetFolder): #If targetFolder doesn't exist yet
        os.makedirs(targetFolder) #Create it
    #
    #Get the pngs for sourceImages
    for item in os.listdir(sourceFolder): #All files and folders in source directory
        if item.endswith('.png'): #If the item is a png file
            sourceImages.append(item) #Add to array of images
        elif os.path.isdir(os.path.join(sourceFolder, item)) and subs: #If the item is a subfolder, and if subs is true
            batchShadow(os.path.join(sourceFolder, item), os.path.join(targetFolder, item), subs) #Recursively call the whole function on the subfolder
    #
    #Loop through images and run drop shadow function
    for image in sourceImages:
        print(dropShadow(sourceFolder, targetFolder, image)) #Run dropShadow and print each success to the console
#
def dropShadow(sourceFolder, targetFolder, image):
    imagePath = os.path.join(sourceFolder, image) #Creates a complete path to the image
    img = pdb.file_png_load(imagePath, imagePath) #img is a new, active gimp project of the image file
    draw = img.active_drawable #drawables are layers, and the pngs open with only one layer; draw is set to be that layer
    margin = 50 #Size of margin to be created
    pdb.gimp_image_resize(img, img.width+margin*2, img.height+margin*2, margin, margin) #Empty margin to increase workspace
    shadow = pdb.gimp_layer_new(img, img.width, img.height, 1, 'shadow', 100, 0) #Creates a new layer object the height and width of the image, called 'shadow'
    pdb.gimp_image_insert_layer(img, shadow, None, 1) #Inserts shadow as a layer into img
    pdb.gimp_image_select_item(img, 0, draw) #"Alpha to selection" on draw layer - selects all the content in it
    pdb.gimp_selection_grow(img, 3) #Grows selection by 6
    pdb.gimp_context_set_background((254, 241, 229)) #Sets background color to white, if it wasn't yet
    pdb.gimp_edit_bucket_fill(shadow, 1, 0, 100, 0, FALSE, 0, 0) #Fills selection with white on the shadow layer
    pdb.gimp_selection_none(img) #Unselects all
    pdb.plug_in_gauss(img, shadow, 10, 10, 0) #Blurs shadow layer
    # pdb.gimp_image_select_item(img, 0, draw) #"Alpha to selection" on draw layer again
    # pdb.gimp_edit_clear(shadow) #Delete background so it's just the edges
    # pdb.gimp_selection_none(img) #Unselects all
    pdb.gimp_layer_set_opacity(shadow, 80) #80% opacity for shadow layer
    merged = pdb.gimp_image_merge_visible_layers(img, CLIP_TO_IMAGE) #Merges shadow layer and main image layer into one layer
    pdb.plug_in_autocrop(img, merged) #Crop img to content
    targetImagePath = os.path.join(targetFolder, image) #Creates a complete path to the new image to be created
    pdb.file_png_save_defaults(img, merged, targetImagePath, '?') #Save to png
    pdb.gimp_image_delete(img) #Delete gimp project to free resources
    return targetImagePath
#
register(
    "batchShadow",              #name
    "Batch Drop Shadow",        #blurb
    "Batch Drop Shadow",        #help
    "Olivia Cucina",            #author
    "Olivia Cucina",            #copyright
    "May 2022",                 #date
    "<Toolbox>/Image/Shadows",  #menupath
    "",                         #imagetypes (no image required)
    [
    ( PF_DIRNAME, "sourceFolder", "Directory of originals", "" ),
    ( PF_DIRNAME, "targetFolder", "Working/target directory", "" ),
    ( PF_BOOL, "subs", "Whether to include subdirectories (TRUE or FALSE)", "" )
    ],                          #params
    [],                         #results
    batchShadow,                #function
)
#
main()