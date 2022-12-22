---
myst:
  html_meta:
    "description": "User manual for how to edit blocks in Volto, the Plone 6 frontend."
    "property=og:description": "User manual for how to edit blocks in Volto, the Plone 6 frontend."
    "property=og:title": "How to edit content using Volto blocks"
    "keywords": "Volto, Plone, frontend, React, User manual, edit blocks"
---

# Edit content using blocks

```{todo}
This page needs content
```

Volto features the [Pastanaga UI](https://github.com/plone/pastanaga), allowing you to visually compose a page using blocks.
The blocks editor allows you to add, modify, reorder, and delete blocks given your requirements.
Blocks provide the user the ability to display content in a specific way, although they can also define behavior and have specific features.

## Choose a pre-built block type

In Volto, "blocks" are individual pieces of content that can be added to a page or other content area.
These blocks can be used to add different types of content, such as text, images, or multimedia, and can be arranged and customized to create a wide range of different layouts and designs.

Blocks are a key feature of Volto, and are designed to make it easy for users to add and manage content on their website.
They are created using React components, which are modular pieces of code that can be easily reused and customized.

Volto offers several default block types out of the box.
You can access and choose a block type to add to your content type when you have an empty block in it.

To create an empty block after an existing block, click in the block, then hit the {kbd}`Enter` key.
A new empty block appears.

```{image} ../_static/user-manual/blocks/add_new_block.gif
:alt: add new block
```

```{note}
There is a new experimental feature that places a `+` below every block in a content type.

See https://github.com/plone/volto/pull/3815 for details of the feature and how to enable it.
```

Now with your empty block available, you can select its type in one of two ways.
1.  Click the `+` button on the left-hand side of the empty block.
    ```{image} ../_static/user-manual/blocks/block_left_plus_icon.png
    :alt: Plus button
    ```
2. Type `/` inside empty block to open the blocks menu.
    ```{image} ../_static/user-manual/blocks/blocks_type_menu.png
    :alt: Types of blocks menu
    ```


(user-manual-description-block-label)=

## Description Block

These blocks allow users to add text content to a page. They can be configured to display different fonts, sizes, and colors, and they can also include links and formatting options like bold and italic.

(user-manual-grid-block-label)=

## Grid Block

In Volto, a "grid block" is a type of block that allows users to create a grid of rows, which can be used to display content in a structured, organized way.

Grid blocks are useful for creating layouts that require multiple columns.
They can be used to display a variety of different types of content, including text, images, and multimedia.
They are a flexible and powerful tool for creating custom layouts in Volto and can be used to create a wide range of different designs and layouts.

```{image} ../_static/user-manual/blocks/grid_block.png
:alt: Grid block
```


(user-manual-html-block-label)=

## HTML Block

An HTML block is a type of block in Volto that allows users to add custom HTML code to a page.
This can be useful for adding custom functionality or styling to a page, or for integrating with external services or applications.

To use an HTML block, you will need to have some knowledge of HTML, as you will need to write the HTML code that you want to include on the page.
You can then use the HTML block editor to enter the code and configure any necessary options.

Overall, HTML blocks are a powerful tool for adding custom functionality and styling to a page in Volto.
They allow users to extend the capabilities of the platform and integrate with external services, and they can be used to create rich, interactive web applications. However, they do require some knowledge of HTML, so they may not be suitable for users who are not familiar with this language.

```{image} ../_static/user-manual/blocks/html_block.png
:alt: HTML block
```


(user-manual-hero-block-label)=

## Hero Block

A hero block is a type of block in Volto that is used to create a full-width banner or header for a page.
It is typically used to highlight important content or to create a visual impact at the top of a page.

Hero blocks typically include a background image or color, and they can also include text.
To use a hero block in Volto, you can add it to your page by choosing from the list of blocks.
You can then use the block editor to configure the various options available for the hero block, such as the background image or color, the layout of the content, and the text.

Overall, hero blocks are a useful tool for creating visually striking headers or banners for a page in Volto.
They allow users to highlight important content and create a professional, polished look for their site.

```{image} ../_static/user-manual/blocks/hero_block.png
:alt: Hero block
```


(user-manual-image-block-label)=

## Image Block

These blocks allow users to add images to a page.
They can be configured to display the image at different sizes and positions, and they can also include alt text and captions.
It is a simple and straightforward way to include an image on a page.

To use an image block in Volto, you will need to select the image that you want to include on the page and add it to the block. You can then use the block editor to configure the various options available for the image, such as its size, alignment, and any additional styling options.

Some common options for configuring an image block in Volto include:

- Image size: You can choose the size of the image, which will determine how much space it takes up on the page.

- Image alignment: You can choose how the image should be aligned on the page, such as to the left, right, or center.

- Alt text: You can add alt text to the image, which is used by screen readers and search engines to describe the image.

Overall, image blocks are a simple and effective way to add images to a page in Volto.
They allow users to include a single image on a page with minimal effort, and they are easy to customize to suit the specific needs and goals of a project.

```{image} ../_static/user-manual/blocks/image_block.png
:alt: Image block
```


(user-manual-images-grid-block-label)=

## Images grid Block

An images grid block is a type of block in Volto that allows users to display a grid of images on a page.
It is typically used to showcase a collection of images in a visually appealing way, and it can be configured to display the images in different layouts and styles.

To use an images grid block in Volto, you will need to select the images that you want to include in the grid and add them to the block.
You can then use the block editor to configure the various options available for the grid, such as the layout of the images, and the size.

Overall, images grid blocks are a useful tool for displaying collections of images in a visually appealing way in Volto.
They allow users to create professional, polished galleries of images on their site, and they are easy to customize to suit the specific needs and goals of a project.

```{image} ../_static/user-manual/blocks/images_grid_block.png
:alt: Images Grid block
```


(user-manual-listing-block-label)=

## Listing Block

A listing block is a type of block in Volto that allows users to display a list of items on a page.
It is typically used to showcase a collection of items in a structured, organized way, and it can be configured to display the items in different layouts and styles.

```{image} ../_static/user-manual/blocks/listing_block.png
:alt: Listing block
```


(user-manual-maps-block-label)=

## Maps Block

A map block is a type of block in Volto that allows users to add a map to a page.
It is typically used to display a geographic location or region, and it can be configured to display different types of maps and include markers and other features.

To use a map block in Volto, you will need to choose the map provider that you want to use (either Google Maps or OpenStreetMap), and set the desired location and zoom level for the map.

Overall, map blocks are a useful tool for displaying maps and geographic information in Volto. They allow users to add maps to a page with minimal effort, and they are easy to customize to suit the specific needs and goals of a project.

```{image} ../_static/user-manual/blocks/maps_block.png
:alt: Maps block
```


(user-manual-video-block-label)=

## Video Block

 These blocks allow users to add video content to a page.
 They can be configured to display the video at different sizes and positions, and they can also include controls for playback and volume.

```{image} ../_static/user-manual/blocks/video_block.png
:alt: Video block
```


(user-manual-table-block-label)=

## Table Block

A table block is a type of block in Volto that allows users to create tables of data, with rows and columns of cells.
It is typically used to display structured data in a clear and organized way, and it can be configured to display the data in different styles and layouts.

You can use the editor (at the top of table) to add rows and columns to the table, and to enter the data for each cell.
You can also use the editor to configure the various options available for the table, such as the layout and style of the data.

Overall, table blocks are a useful tool for displaying structured data in a clear and organized way in Volto. They allow users to create professional-looking tables with minimal effort, and they are easy to customize to suit the specific needs and goals of a project.

```{image} ../_static/user-manual/blocks/table_block.png
:alt: Table block
```


(user-manual-table-of-contents-block-label)=

## Table of Contents Block

A table of contents (TOC) block is a type of block in Volto that allows users to create a list of links to different sections of a page.
It is typically used to provide a way for users to quickly navigate to different parts of a long or complex page, and it can be configured to display the links in different styles and layouts.

To use a TOC block in Volto, you will need to define the different sections of the page that you want to include in the TOC.
You can do this by adding headings to the page, which will be used to create the links in the TOC.
You can then add the TOC block to the page and use the block editor to configure the various options available for the TOC.

Overall, TOC blocks are a useful tool for providing a way for users to navigate long or complex pages in Volto.
They allow users to create professional-looking TOCs with minimal effort, and they are easy to customize to suit the specific needs and goals of a project.

```{image} ../_static/user-manual/blocks/table_of_contents_block.png
:alt: Table of Contents block
```


(user-manual-teaser-block-label)=

## Teaser Block

Teaser block is a type of block that is used to display a summary or teaser of a content item, such as an article or blog post, on a website.
The teaser block typically includes a title, an excerpt or summary of the content, and a thumbnail image or other visual element.

In the Volto UI, the teaser block is a pre-defined block that can be added to a website.
To add a teaser block to a website, you can select it from list of Blocks into the desired location on the page.
You can then configure the teaser block by selecting the content item that you want to display as a teaser, and modifying the appearance and layout of the teaser block as needed.

Overall, the teaser block is a useful tool for displaying summary or teaser information about a content item on a website, and it can be used to promote or highlight specific content items.

```{image} ../_static/user-manual/blocks/teaser_block.png
:alt: Teaser block
```


(user-manual-search-block-label)=

## Search Block

A search block is a type of block that provides a search interface for users to search for content on a website.
The search block typically includes a search field and a search button, and it allows users to enter a search query and search the website for content that matches the query.

To add a search block to a website in the Volto UI, you can choose from the list of blocks into the desired location on the page.
You can then configure the search block by modifying its settings and options from the Block editor, such as the search field label, sort options, facets, show search button and more.

The search block is a useful tool for helping users find content on a website, and it can be used on the homepage or other pages of a website to provide search functionality.

```{image} ../_static/user-manual/blocks/search_block.png
:alt: Search block
```