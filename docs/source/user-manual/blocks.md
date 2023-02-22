---
myst:
  html_meta:
    "description": "User manual for how to edit blocks in Volto, the Plone 6 frontend."
    "property=og:description": "User manual for how to edit blocks in Volto, the Plone 6 frontend."
    "property=og:title": "How to edit content using Volto blocks"
    "keywords": "Volto, Plone, frontend, React, User manual, edit blocks"
---

(edit-content-using-blocks-label)=

# Edit content using blocks

Volto features the [Pastanaga UI](https://github.com/plone/pastanaga), allowing you to visually compose a page using blocks.
The blocks editor allows you to add, modify, reorder, and delete blocks given your requirements.
Blocks provide the user the ability to display content in a specific way, although they can also define behavior and have specific features.


(manage-blocks-label)=

## Manage blocks

In Volto, "blocks" are individual pieces of content that can be added to a page or other content area.
These blocks can be used to add different types of content—such as text, images, or multimedia—and can be arranged and customized to create a wide range of different layouts.

Blocks are a key feature of Volto, and are designed to make it easy for users to add and manage content on their website.
They are created using React components, which are modular pieces of code that can be easily reused and customized.


(create-a-block-label)=

### Create a block

To create or add an empty block after an existing block, click in the block, then hit the {kbd}`Enter` key.
A new empty block appears.

```{image} ../_static/user-manual/blocks/add-new-block.gif
:alt: Add new block
```

```{note}
There is a new experimental feature that places a `+` below a block when it is active or moused over, and when clicked inserts an empty block below the current block.

See https://github.com/plone/volto/pull/3815 for details of the feature and how to enable it.
```

(configure-a-block-label)=

### Configure a block

When you select a block, its block editor appears in the right margin of the page.
Almost all blocks have some configuration options.


(rearrange-blocks-label)=

### Rearrange blocks

To rearrange blocks, to the right of the block you want to move, click on its drag handle, move the block where you want it in the page, and release the drag handle.


(delete-a-block-label)=

### Delete a block

To delete a block, to the right of the block, click its delete button, a trash can icon.


(default-block-types-label)=

## Default block types

Volto offers several default block types out of the box.
You can access and choose a block type to add to your content type when you have an empty block in it.

Now with your empty block available, you can select its type in one of two ways.

1.  Click the `+` button to the left of the empty block.

    ```{image} ../_static/user-manual/blocks/block-left-add-icon.png
    :alt: Add block button
    ```

2. Type `/` inside the empty block to open the block types menu.
   You can type a few letters to filter available block types.
   You can use the up and down arrow keys to navigate within the list of block types.
   To select the block type, you can click or tap on it, or use the {kbd}`Enter` key.

    ```{image} ../_static/user-manual/blocks/block-types-menu.png
    :alt: Block types menu
    ```


(user-manual-description-block-label)=

### Description block

A description block accepts plain text.
When displayed, it appears as the description in the page, and for search engine optimization in HTML meta tags as `<meta name="description" content="DESCRIPTION_TEXT" data-react-helmet="true">` and `<meta property="og:description" content="DESCRIPTION_TEXT" data-react-helmet="true">`.


(user-manual-grid-block-label)=

### Grid block

A grid block creates a single row of columns in a grid, which can be used to display content in a structured, organized way.
You can select the number of columns to insert.

```{image} ../_static/user-manual/blocks/grid-block-number-of-columns.png
:alt: Choose the number of columns to insert in a grid block.
```

After choosing the number of columns to insert in a grid block, you can manage the columns.

```{image} ../_static/user-manual/blocks/grid-block-manage-blocks.png
:alt: Add a specific block type into a grid block's column
```

-   Specify the block type in a column by clicking its `+` button.
-   Rearrange the order of columns in the grid block by dragging and dropping them.
-   Add a column to the grid block by clicking the `+` button above and to the left of it.
-   Remove a column from a grid block by clicking its `×` button.


(user-manual-html-block-label)=

### HTML block

An HTML block allows users to add custom HTML code to a page.
This can be useful for adding custom functionality or styling to a page, or for integrating with external services or applications.
For example, you can insert an HTML snippet or widget from a third party service to embed a calendar, payment or donation button, or social media into a page.

```{image} ../_static/user-manual/blocks/html-block.png
:alt: HTML block
```

To use an HTML block, you need to have some knowledge of how to write HTML, unless you are provided an HTML code snippet from a third party that you can copy and paste into the block.


(user-manual-hero-block-label)=

### Hero block

A hero block creates a full-width banner or header for a page.
It is typically used to highlight important content or to create a visual impact at the top of a page.

```{image} ../_static/user-manual/blocks/hero-block.png
:alt: Hero block
```

Hero blocks typically include a background image or color.
They can also include a title, description, and links to other pages in your site.

You can use the block editor to configure its options.
You can set the background image or color, its title and description, and links.
For links, you can enter an external URL or select a page in your site by clicking the list icon, and give the link a title.


(user-manual-image-block-label)=

### Image block

An image block lets a user insert an image into a page and configure its attributes.

```{image} ../_static/user-manual/blocks/image-block.png
:alt: Image block
```

After inserting an image block, an image must be specified by any of the following methods.
-   Choose an existing image in the site by clicking the block's list icon.
-   Upload a new image by either clicking the block's upload icon or drag and drop.
-   Enter a remote image's URL in the block's text area.
    Click the arrow icon to save the URL.

Once you have specified an image, its configurable options become available.
```{image} ../_static/user-manual/blocks/image-block-configuration-options.png
:alt: Image block configuration options
```

Source
: The path or URL to the image.

Alt text
: Alternative text (alt text) is used by screen readers and search engines to describe the image.
  Alt text should not be used for decorative images, as it adds noise to the screen reader.

Alignment
: Options for alignment include left, right, center, and full width.

Image size
: The image size determines its relative display width, either small, medium, or large.

Link to
: You can enter a URL in the text field, or click the list icon and choose a page in your website, as the target for a link.
  You can optionally have the link open in a new tab when the user clicks it by checking the checkbox {guilabel}`Open in a new tab`.


(user-manual-images-grid-block-label)=

### Images grid block

An images grid block displays a row of images on a page.
It is typically used to showcase a collection of images in a visually appealing way.
It can be configured to display the images in different layouts and styles.

```{image} ../_static/user-manual/blocks/images-grid-block-number-of-columns.png
:alt: Choose the number of images to insert in an images grid block.
```

After choosing the number of images to insert in an images grid block, you can configure the images exactly as you would configure a single image in an image block.

```{image} ../_static/user-manual/blocks/image-block-configuration-options.png
:alt: Image block configuration options
```

Source
: The path or URL to the image.

Alt text
: Alternative text (alt text) is used by screen readers and search engines to describe the image.
  Alt text should not be used for decorative images, as it adds noise to the screen reader.

Alignment
: Options for alignment include left, right, center, and full width.

Image size
: The image size determines its relative display width, either small, medium, or large.

Link to
: You can enter a URL in the text field, or click the list icon and choose a page in your website, as the target for a link.
  You can optionally have the link open in a new tab when the user clicks it by checking the checkbox {guilabel}`Open in a new tab`.

You can also manage the images in the images grid block.

```{image} ../_static/user-manual/blocks/images-grid-block-manage-images.png
:alt: Manage images in an images gride block
```

-   Rearrange the order of images in the images grid block by dragging and dropping them.
-   Add an image to the images grid block by clicking the `+` button above and to the left of it.
-   Remove an image from an images grid block by clicking its `×` button.


After inserting an image grid block, an image must be specified by any of the following methods.


(user-manual-listing-block-label)=

### Listing block

A listing block allows users to display a list of content items in your Plone site on a page.
A site editor can configure the criteria to use for retrieving content items, including text, title, dates, and creator.
The retrieved results can be configured with a sort order, limit of results, and whether to batch the results with pagination.

```{image} ../_static/user-manual/blocks/listing-block.png
:alt: Listing block
```

The listing block has several configuration options.

```{image} ../_static/user-manual/blocks/listing-block-configuration.png
:alt: Listing block configuration
```

Variation
: Options for variation include {guilabel}`Default`, {guilabel}`Image gallery`, and {guilabel}`Summary`.

Headline
: Optionally add a headline to the listing block.

Headline level
: Headline level sets the level of the headline to either {guilabel}`H2` or {guilabel}`H3`.

Criteria
: Add criteria for the search.
  Options include searching metadata, dates, and text.
  Each criterion has its own options.
  For example, you can configure a search for content that was created between two dates, or for its location within a path of your Plone site.

Sort on
: Sort the retrieved results by a given option.
  Options include metadata, dates, and text.

Results limit
: Limit the number of results returned.

Item batch size
: Batch the search result items into a specified batch size.


(user-manual-maps-block-label)=

### Maps block

A map block allows a user to add a map to a page.
It is typically used to display a geographic location or region, or provide travel directions.

```{image} ../_static/user-manual/blocks/maps-block.png
:alt: Maps block
```

To use a map block, the third party map service must provide a snippet of HTML code that you can copy and paste into the map block.
Usually the snippet includes an `<iframe>` HTML tag.
After you paste the snippet into the map block's configuration, you will see additional options.

```{image} ../_static/user-manual/blocks/map-blocks-configuration.png
:alt: Maps block configuration
```

Maps URL
: The URL of the map.

Alt text
: Alternative text to display in search engine results and to screen readers.

Alignment
: Options for alignment include left, right, center, and full width.


(user-manual-search-block-label)=

### Search block

A search block provides a search interface for visitors to find content in a Plone site.
A site editor can configure its search criteria and facets across numerous parameters, including text, status, dates, and creator.
Search results can be configured with a sort order, limit of results, and whether to batch the results with pagination.
A site editor can choose which search controls to offer to the visitor, including sort order and total results.

```{image} ../_static/user-manual/blocks/search-block.png
:alt: Search block
```

You can configure the search block by modifying its options in the block editor.

```{image} ../_static/user-manual/blocks/search-block-configuration.png
:alt: Search block configuration
```

```{todo}
Add omitted configuration options.
```


#### Basic options

Variation
: Options for variation include {guilabel}`Facets on right side`, {guilabel}`Facets on right side`, and {guilabel}`Facets on top`.

Results template
: Options for results template include {guilabel}`Default`, {guilabel}`Image gallery`, and {guilabel}`Summary`.

Headline
: The value to display above the search box as a heading.


#### Base search query options

Criteria
: Add criteria for the search.
  Options include searching metadata, dates, and text.
  Each criterion has its own options.
  For example, you can configure a search for content that was created between two dates, or for its location within a path of your Plone site.

Sort on
: Sort the search results according to the selected option.
  Optionally sort results in reverse order by checking the checkbox {guilabel}`Reversed order`.

Results limit
: Limit the number of results returned.

Item batch size
: Batch the search result items into a specified batch size.


#### Facets

Section title
: ```{todo}
  This needs content.
  ```

Facets
: Click the button {guilabel}`Add Facet` to add a facet to the search.
  The first facet appears as "FACET #1".
  You can add many facets, reorder them by drag and drop, and delete them.

Label
: ```{todo}
  This needs content.
  ```

Field
: ```{todo}
  This needs content.
  ```

Facet widget
: ```{todo}
  This needs content.
  ```

Multiple choices?
: ```{todo}
  This needs content.
  ```

Hide facet?
: Toggle to show or hide the facet.
  Hidden facets will still filter the results if proper parameters are passed in URLs


#### Controls

You can configure which search controls to offer to the site visitor.

Show sorting?
: Toggle to show or hide the sorting control.

Show search input?
: Toggle to show or hide the search input field.

Show search button?
: Toggle to show or hide the search button.
  When the button is present, the auto-complete search feature is disabled, and the query is issued when the visitor types the {kbd}`Enter` key.

Show total results?
: Toggle to show or hide the search results total count.


#### Views

Available views
: Options include {guilabel}`Default`, {guilabel}`Image gallery`, and {guilabel}`Summary`.


(user-manual-table-block-label)=

### Table block

A table block inserts a table with two rows and two columns of cells to hold data, with the first row as the header row.
It is typically used to display structured data in a clear and organized way.
It can be configured to display the data in different styles and layouts.

```{image} ../_static/user-manual/blocks/table-block.png
:alt: Table block
```

You can use the editor at the top of table to add rows and columns to the table, and to delete rows and columns.

To enter data, click in a cell, and type.
You can optionally format data.

The table block has several configuration options.

```{image} ../_static/user-manual/blocks/table-block-configuration.png
:alt: Table block configuration
```

Hide headers
: Toggle to show or hide the table header row.

Make the table sortable
: Toggle to enable or disable sorting the table by the values in its columns.
  When enabled, a visitor may click a column's header to sort by that column.

Fixed width table cells
: When enabled, the columns are fixed to an equal percentage width of the table.
  For example, a table with four columns would have each of its columns fixed at 25% of the table width.

Divide each row into separate cells
: When enabled, the cells in a row are separated by a vertical border.

Stripe alternate rows with color
: When enabled, the rows in the table body are striped with alternating colors.

Make the table compact
: When enabled, padding of cells is reduced, giving a more compact appearance.

Reduce complexity
: When enabled, the top, left, and right table borders are removed.

Table color inverted
: When enabled, the table color is inverted.


(user-manual-table-of-contents-block-label)=

### Table of contents block

A table of contents (TOC) block creates a list of links to the titles and subtitles of text blocks in a page.
A TOC block makes it easier for a visitor to navigate to a section of a long or complex page.
It can be configured to display the links in different styles and layouts.

To use a TOC block, you must first have text blocks with titles or subtitles in your page.
When you add a TOC block to the page, a table of contents is automatically populated with the titles and subtitles in a bulleted list, with subtitles indented.

```{image} ../_static/user-manual/blocks/table-of-contents-block.png
:alt: Table of contents block
```

The TOC block has several configuration options.

```{image} ../_static/user-manual/blocks/table-of-contents-block-configuration.png
:alt: Table of contents block configuration
```

Variation
: Toggles the display of the TOC to be a listing (default) or horizontal as tabs.

Block title
: Optionally add a title above the table of contents.

Hide title
: When enabled, it hides the title.

Ordered
: When enabled, it changes the listing to a numbered (ordered) list.

Entries
: Selects which heading levels to display.
  Currently only heading levels `H2` (titles) and `H3` (subtitles) are supported.


(user-manual-teaser-block-label)=

### Teaser block

A teaser block displays a summary or teaser of a content item—such as an article or blog post—on a website, and links to the full content item.
When the visitor clicks or taps on the teaser block, they will visit the full content item.
A teaser block typically includes a title, an excerpt or summary of the content, and a thumbnail image or other visual element.

```{image} ../_static/user-manual/blocks/teaser-block.png
:alt: Teaser block
```

The teaser block has several configuration options.

```{image} ../_static/user-manual/blocks/teaser-block-configuration.png
:alt: Teaser block
```

Target
: The target is either an existing content item in your Plone site that can be selected by clicking the list icon, or an external URL that can be typed into the text field and saved by clicking the right arrow when it appears after you start typing.

Title
: The title is the title of the content item.

head title
: The head title is a heading that appears above the title.

Description
: The description is plain text that summarizes or describes the content item.

Image override
: The image override is either an existing image in your Plone site that can be selected by clicking the list icon, or an external URL of an image that can be typed into the text field and saved by clicking the right arrow when it appears after you start typing.


(user-manual-teaser-grid-block-label)=

### Teaser grid block

```{todo}
Needs content.
```


(user-manual-text-grid-block-label)=

### Text block

```{todo}
Needs content.
```


(user-manual-video-block-label)=

### Video block

A video block allows an editor to insert a video in to a page.
Enter the URL of a video hosted by a third party, and click the right arrow to save it.
A preview of the video displays.

```{image} ../_static/user-manual/blocks/video-block.png
:alt: Video block
```

The video block has several configuration options.

```{image} ../_static/user-manual/blocks/video-block-configuration.png
:alt: Video block configuration
```

Video URL
: The URL of the video.

Preview Image URL
: Optionally set a preview image.
  You can enter a URL of an image in the text field, or click the list icon and choose an image in your website.

Alignment
: Options for alignment include left, right, center, and full width.
