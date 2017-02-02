< !DOCTYPE html >
    <
    html >

    <
    head >
    <
    meta charset = "utf-8" >

    <
    title class = "app-name" > UFOCO < /title> <
    meta name = "viewport"
content = "width=device-width, initial-scale=1" >

    <!-- gulp-replace: css start -->
    <
    link rel = "stylesheet"
href = "./lib/normalize.custom.css" >

    <
    link rel = "stylesheet"
href = "./lib/emojify-base.min.css" >
    <
    link rel = "stylesheet"
href = "./lib/emojify-emoticons.min.css" >
    <
    link rel = "stylesheet"
href = "./lib/emojify.min.css" >

    <
    link rel = "stylesheet"
href = "./lib/mdl/material.css" >
    <
    link rel = "stylesheet"
href = "./lib/getmdl-select/getmdl-select.min.css" >

    <
    link rel = "stylesheet"
href = "./css/lib-overwrite.css" >
    <
    link rel = "stylesheet"
href = "./css/fonts.css" >
    <
    link rel = "stylesheet"
href = "./css/global.css" >
    <
    link rel = "stylesheet"
href = "./css/header.css" >
    <
    link rel = "stylesheet"
href = "./css/workspace.css" >
    <
    link rel = "stylesheet"
href = "./css/wysiwyg-content.css" >
    <
    link rel = "stylesheet"
href = "./css/toolbar.css" >
    <
    link rel = "stylesheet"
href = "./css/context-info.css" >
    <
    link rel = "stylesheet"
href = "./css/dialogs.css" >
    <!-- gulp-replace: css end -->

    <
    link rel = "stylesheet"
href = ""
id = "ui-theme-sheet" >

    <
    /head>

<
body class = ""
data - dialog = ""
data - linuxcontrolsside = "left" >

    <!-- Fixed header -->
    <
    section class = "mdl-layout mdl-js-layout mdl-layout--fixed-header" >
    <
    header class = "mdl-layout__header " >
    <
    div class = "tab-bar" >

    <
    div class = "window-controls" >
    <
    ul class = "remove-list-style" >
    <
    li class = "close" > < i class = "material-icons" > close < /i></li >
    <
    li class = "minimize" > < i class = "material-icons" > remove < /i></li >
    <
    li class = "toggle-maximize" > < i class = "material-icons" > crop_square < /i></li >

    <
    li class = "toggle-fullscreen protected-id"
id = "fullscreen-window-control" >
    <
    i class = "material-icons" > fullscreen < /i> <
    /li> <
    li class = "toggle-always-on-top protected-id"
id = "always-on-top-window-control" >
    <
    i class = "material-icons" > filter_tilt_shift < /i> <
    /li> <
    /ul>

<
div class = "mdl-tooltip"
for = "fullscreen-window-control" >
<
span > Fullscreen < /span> — <
    span class = "windows-os linux-os" > F11 < /span> <
    span class = "osx-os" > ⌘ ^ F < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "always-on-top-window-control" >
<
span > Always on Top < /span> <
    /div> <
    /div>

<
ul id = "tab-model-container"
hidden >
    <
    li class = "tab "
data - id = "" >
    <
    span class = "file-name" > Untitled - < /span> <
    i class = "material-icons close-tab" > close < /i> <
    i class = "material-icons close-tab-cancel" > reply < /i> <
    i class = "material-icons close-tab-confirm" > close < /i> <
    /li> <
    /ul>

<
ul class = "tabs-list remove-list-style" >

    <
    /ul>

<
span class = "tab-bar-button tab-bar-secondary-button hover-effects add-tab-button" >
    <
    i class = "material-icons" > add < /i> <
    /span> <
    /div>

<
div class = "main-menu" >
    <
    ul class = "remove-list-style" >
    <
    li class = "hover-effects protected-id"
id = "menu-new-doc" >
    <
    i class = "material-icons" > add < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-open-doc" >
    <
    i class = "material-icons" > folder_open < /i> <
    /li> <
    li class = "hover-effects protected-id "
id = "menu-open-doc-folder" >
    <
    i class = "material-icons" > call_missed_outgoing < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-save-as" >
    <
    i class = "material-icons" > archive < /i> <
    /li> <
    li class = "hover-effects protected-id "
id = "menu-save" >
    <
    i class = "material-icons" > file_download < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-close-all-docs" >
    <
    i class = "material-icons" > highlight_off < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-search" >
    <
    i class = "material-icons" > search < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-table-content" >
    <
    i class = "material-icons" > line_weight < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-doc-info" >
    <
    i class = "material-icons" > info_outline < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-print" >
    <
    i class = "material-icons" > print < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-settings" >
    <
    i class = "material-icons" > settings < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-shortcuts" >
    <
    i class = "material-icons" > swap_calls < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-quick-guide" >
    <
    i class = "material-icons" > import_contacts < /i> <
    /li> <
    li class = "hover-effects protected-id"
id = "menu-about" >
    <
    i class = "material-icons" > favorite_border < /i> <
    /li> <
    /ul>

<
div class = "mdl-tooltip"
for = "menu-new-doc" >
<
span > New Document < /span> — <
    span class = "windows-os linux-os" > Ctrl + N / Ctrl + T < /span> <
    span class = "osx-os" > ⌘N / ⌘T < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-open-doc" >
<
span > Open Document < /span> — <
    span class = "windows-os linux-os" > Ctrl + O < /span> <
    span class = "osx-os" > ⌘O < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-open-doc-folder" >
<
span > Open Containing Folder < /span> — <
    span class = "windows-os linux-os" > Ctrl + Shift + O < /span> <
    span class = "osx-os" > ⌘⇧O < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-save-as" >
<
span > Save As < /span> — <
    span class = "windows-os linux-os" > Ctrl + Shift + S < /span> <
    span class = "osx-os" > ⌘⇧S < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-save" >
<
span > Save < /span> — <
    span class = "windows-os linux-os" > Ctrl + S < /span> <
    span class = "osx-os" > ⌘S < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-close-all-docs" >
<
span > Close All Documents < /span> — <
    span class = "windows-os linux-os" > Ctrl + Shift + W < /span> <
    span class = "osx-os" > ⌘⇧W < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-search" >
<
span > Search / Replace < /span> — <
    span class = "windows-os linux-os" > Ctrl + F < /span> <
    span class = "osx-os" > ⌘F < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-table-content" >
<
span > Table of Content < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-doc-info" >
<
span > Document Info < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-print" >
<
span > Print Document Info < /span> — <
    span class = "windows-os linux-os" > Ctrl + P < /span> <
    span class = "osx-os" > ⌘P < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-settings" >
<
span > Settings < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-shortcuts" >
<
span > Keyboard Shortcuts < /span> — <
    span class = "windows-os linux-os" > Ctrl + Space < /span> <
    span class = "osx-os" > ^ Space < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-quick-guide" >
<
span > Quick Guide < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "menu-about" >
<
span > About < span class = "app-name" > < /span></span >
    <
    /div> <
    /div>

<
/header>



<!-- Tab contents -->
<
main class = "mdl-layout__content" >
    <!-- Tab content container model -->
    <!-- <p><br></p> : Default innerHTML to force default tag to paragraph.
    Do not
break HTML code lines here to preserve the strLastSavedContent system. -->
    <
    section class = "content-container" >
    <
    div class = "wysiwyg-content"
contenteditable = "false" >
    <
    p > < br > < /p> <
    /div> <
    /section> <
    /main> <
    /section>



<
div id = "global-unsaved-mark"
class = "protected-id " > < /div>



<
div id = "minor-info-bar"
class = "protected-id " > < /div>



<
section id = "toolbar"
class = "protected-id "
data - view = "tools-list" >
    <
    div class = "tools-list-view" >
    <
    ul class = "remove-list-style" >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-h1"
data - tag = "h1" > < i class = "material-icons" > title < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-h2"
data - tag = "h2" > < i class = "material-icons" > title < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-h3"
data - tag = "h3" > < i class = "material-icons" > title < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-h4"
data - tag = "h4" > < i class = "material-icons" > title < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-h5"
data - tag = "h5" > < i class = "material-icons" > title < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-h6"
data - tag = "h6" > < i class = "material-icons" > title < /i></li >

    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-paragraph"
data - tag = "p" > < i class = "material-icons" > local_parking < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-quote"
data - tag = "blockquote" > < i class = "material-icons" > format_quote < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-unordered-list"
data - cmd = "insertList"
data - cmdcheck = "insertUnorderedList" > < i class = "material-icons" > format_list_bulleted < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-ordered-list"
data - cmd = "insertList"
data - cmdparam = "true"
data - cmdcheck = "insertOrderedList" > < i class = "material-icons" > format_list_numbered < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "tool-remote-image" > < i class = "material-icons" > compare < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "tool-remote-video" > < i class = "material-icons" > play_circle_outline < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "tool-remote-embed" > < i class = "material-icons" > queue < /i></li >

    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-bold"
data - cmd = "bold" > < i class = "material-icons" > format_bold < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-italic"
data - cmd = "italic" > < i class = "material-icons" > format_italic < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-underline"
data - cmd = "underline" > < i class = "material-icons" > format_underlined < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-strike"
data - cmd = "strikethrough"
data - cmdcheck = "strikeThrough" > < i class = "material-icons" > strikethrough_s < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "tool-apply-link" > < i class = "material-icons" > link < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-superscript"
data - cmd = "superscript" > < i class = "material-icons" > arrow_drop_up < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id "
id = "tool-subscript"
data - cmd = "subscript" > < i class = "material-icons" > arrow_drop_down < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "tool-clear"
data - cmd = "removeFormat" > < i class = "material-icons" > format_clear < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "tool-emojis"
hidden > < i class = "material-icons" > tag_faces < /i></li >
    <
    /ul>

<
div class = "mdl-tooltip"
for = "tool-h1" >
<
span > Heading XL < /span> — <
    span class = "windows-os linux-os" > Ctrl + 1 < /span> <
    span class = "osx-os" > ⌘1 < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-h2" >
<
span > Heading L < /span> — <
    span class = "windows-os linux-os" > Ctrl + 2 < /span> <
    span class = "osx-os" > ⌘2 < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-h3" >
<
span > Heading M < /span> — <
    span class = "windows-os linux-os" > Ctrl + 3 < /span> <
    span class = "osx-os" > ⌘3 < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-h4" >
<
span > Heading S < /span> — <
    span class = "windows-os linux-os" > Ctrl + 4 < /span> <
    span class = "osx-os" > ⌘4 < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-h5" >
<
span > Heading XS < /span> — <
    span class = "windows-os linux-os" > Ctrl + 5 < /span> <
    span class = "osx-os" > ⌘5 < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-h6" >
<
span > Heading XXS < /span> — <
    span class = "windows-os linux-os" > Ctrl + 6 < /span> <
    span class = "osx-os" > ⌘6 < /span> <
    /div>

<
div class = "mdl-tooltip"
for = "tool-paragraph" >
<
span > Paragraph < /span> — <
    span class = "windows-os linux-os" > Ctrl + Shift + P < /span> <
    span class = "osx-os" > ⌘⇧P < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-quote" >
<
span > Quote < /span> — <
    span class = "windows-os linux-os" > Ctrl + Shift + Q < /span> <
    span class = "osx-os" > ⌘⇧Q < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-unordered-list" >
<
span > Unordered List < /span> — <
    span class = "windows-os linux-os" > Ctrl + Shift + L < /span> <
    span class = "osx-os" > ⌘⇧L < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-ordered-list" >
<
span > Ordered List < /span> — <
    span class = "windows-os linux-os" > Ctrl + Alt + L < /span> <
    span class = "osx-os" > ⌘⌥L < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-remote-image" >
<
span > Image via URL < /span> — <
    span class = "windows-os linux-os" > Ctrl + Alt + I < /span> <
    span class = "osx-os" > ⌘⌥I < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-remote-video" >
<
span >
    YouTube / Vimeo / Dailymotion / Twitch < br >
    video via URL <
    /span> — <
    span class = "windows-os linux-os" > Ctrl + Alt + V < /span> <
    span class = "osx-os" > ⌘⌥V < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-remote-embed" >
<
span > Embed Content < /span> <
    /div>

<
div class = "mdl-tooltip"
for = "tool-bold" >
<
span > Bold < /span> — <
    span class = "windows-os linux-os" > Ctrl + B < /span> <
    span class = "osx-os" > ⌘B < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-italic" >
<
span > Italic < /span> — <
    span class = "windows-os linux-os" > Ctrl + I < /span> <
    span class = "osx-os" > ⌘I < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-underline" >
<
span > Underline < /span> — <
    span class = "windows-os linux-os" > Ctrl + U < /span> <
    span class = "osx-os" > ⌘U < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-strike" >
<
span > Strikethrough < /span> — <
    span class = "windows-os linux-os" > Ctrl + Alt + S < /span> <
    span class = "osx-os" > ⌘⌥S < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-apply-link" >
<
span > Apply Link < /span> — <
    span class = "windows-os linux-os" > Ctrl + L < /span> <
    span class = "osx-os" > ⌘L < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-superscript" >
<
span > Superscript < /span> — <
    span class = "windows-os linux-os" > Ctrl + Shift + Up < /span> <
    span class = "osx-os" > ⌘⇧Up < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-subscript" >
<
span > Subscript < /span> — <
    span class = "windows-os linux-os" > Ctrl + Shift + Down < /span> <
    span class = "osx-os" > ⌘⇧Down < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-clear" >
<
span > Clear Format < /span> — <
    span class = "windows-os linux-os" > Ctrl + Shift + C < /span> <
    span class = "osx-os" > ⌘⇧C < /span> <
    /div> <
    div class = "mdl-tooltip"
for = "tool-emojis" >
<
span > Insert Emojis < /span> <
    /div> <
    /div>

<
div class = "tool-view inline-form remote-image-view" >
    <
    div class = "toolbar-button icon" > < i class = "material-icons" > compare < /i></div >
    <
    input type = "text"
placeholder = "Image URL" >
    <
    div class = "toolbar-button hover-effects cancel-tool" > < i class = "material-icons" > close < /i></div >
    <
    div class = "toolbar-button hover-effects validate-tool" > < i class = "material-icons" > check < /i></div >
    <
    /div>

<
div class = "tool-view inline-form remote-video-view" >
    <
    div class = "toolbar-button icon" > < i class = "material-icons" > play_circle_outline < /i></div >
    <
    input type = "text"
placeholder = "Video URL" >
    <
    div class = "toolbar-button hover-effects cancel-tool" > < i class = "material-icons" > close < /i></div >
    <
    div class = "toolbar-button hover-effects validate-tool" > < i class = "material-icons" > check < /i></div >
    <
    /div>

<
div class = "tool-view inline-form remote-embed-view" >
    <
    div class = "toolbar-button icon" > < i class = "material-icons" > queue < /i></div >
    <
    input type = "text"
placeholder = "Embed code : <iframe..." >
    <
    div class = "toolbar-button hover-effects cancel-tool" > < i class = "material-icons" > close < /i></div >
    <
    div class = "toolbar-button hover-effects validate-tool" > < i class = "material-icons" > check < /i></div >
    <
    /div>

<
div class = "tool-view inline-form apply-link-view" >
    <
    div class = "toolbar-button icon" > < i class = "material-icons" > link < /i></div >
    <
    input type = "text"
placeholder = "URL" >
    <
    div class = "toolbar-button hover-effects cancel-tool" > < i class = "material-icons" > close < /i></div >
    <
    div class = "toolbar-button hover-effects validate-tool" > < i class = "material-icons" > check < /i></div >
    <
    /div>

<
div class = "tool-view emojis-view" >
    <
    div class = "inline-form" >
    <
    div class = "toolbar-button hover-effects cancel-tool" > < i class = "material-icons" > keyboard_arrow_left < /i></div >
    <
    div class = "toolbar-button icon" > < i class = "material-icons" > tag_faces < /i></div >
    <
    input type = "text"
placeholder = "Search emoji" >
    <
    div class = "toolbar-button hover-effects search-button" > < i class = "material-icons" > search < /i></div >
    <
    /div>

<
div class = "category-buttons" >
    <
    ul class = "remove-list-style" >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "emojis-category-link-people"
data - anchor = "#emojis-category-title-people" > < i class = "material-icons" > face < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "emojis-category-link-nature"
data - anchor = "#emojis-category-title-nature" > < i class = "material-icons" > filter_vintage < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "emojis-category-link-foods"
data - anchor = "#emojis-category-title-foods" > < i class = "material-icons" > cake < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "emojis-category-link-activity"
data - anchor = "#emojis-category-title-activity" > < i class = "material-icons" > directions_run < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "emojis-category-link-places"
data - anchor = "#emojis-category-title-places" > < i class = "material-icons" > location_city < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "emojis-category-link-objects"
data - anchor = "#emojis-category-title-objects" > < i class = "material-icons" > watch < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "emojis-category-link-symbols"
data - anchor = "#emojis-category-title-symbols" > < i class = "material-icons" > lens < /i></li >
    <
    li class = "toolbar-button hover-effects protected-id"
id = "emojis-category-link-flags"
data - anchor = "#emojis-category-title-flags" > < i class = "material-icons" > flag < /i></li >
    <
    /ul> <
    div class = "mdl-tooltip"
for = "emojis-category-link-people" > People < /div> <
    div class = "mdl-tooltip"
for = "emojis-category-link-nature" > Nature < /div> <
    div class = "mdl-tooltip"
for = "emojis-category-link-foods" > Foods < /div> <
    div class = "mdl-tooltip"
for = "emojis-category-link-activity" > Activity < /div> <
    div class = "mdl-tooltip"
for = "emojis-category-link-places" > Places < /div> <
    div class = "mdl-tooltip"
for = "emojis-category-link-objects" > Objects < /div> <
    div class = "mdl-tooltip"
for = "emojis-category-link-symbols" > Symbols < /div> <
    div class = "mdl-tooltip"
for = "emojis-category-link-flags" > Flags < /div> <
    /div>

<
div class = "emojis-list" >
    <
    div id = "emoji-model-container"
hidden >
    <
    div class = "toolbar-button hover-effects emoji-button" > < /div> <
    /div>

<
div class = "category-title protected-id"
id = "emojis-category-title-people" > People < /div> <
    div class = "category-title protected-id"
id = "emojis-category-title-nature" > Nature < /div> <
    div class = "category-title protected-id"
id = "emojis-category-title-foods" > Foods < /div> <
    div class = "category-title protected-id"
id = "emojis-category-title-activity" > Activity < /div> <
    div class = "category-title protected-id"
id = "emojis-category-title-places" > Places < /div> <
    div class = "category-title protected-id"
id = "emojis-category-title-objects" > Objects < /div> <
    div class = "category-title protected-id"
id = "emojis-category-title-symbols" > Symbols < /div> <
    div class = "category-title protected-id"
id = "emojis-category-title-flags" > Flags < /div> <
    /div> <
    /div> <
    /section>




<
section id = "context-menu"
class = "menu-list protected-id "
data - target = "" >
    <
    div class = "options tab-view" >
    <
    div class = "label" > Tab options < /div> <
    ul class = "remove-list-style" >
    <
    li class = "menu-list-item hover-effects copy" >
    <
    span class = "hl" > Copy < /span> document path <
    /li> <
    li class = "menu-list-item hover-effects close-tabs" >
    <
    span class = "hl" > Close all < /span> documents <
    /li> <
    /ul> <
    /div>

<
div class = "options text-view" >
    <
    div class = "label" > Text options < /div> <
    ul class = "remove-list-style" >
    <
    li class = "menu-list-item hover-effects select-all" >
    <
    span class = "hl" > Select < /span> all <
    /li> <
    li class = "menu-list-item hover-effects copy-selection" >
    <
    span class = "hl" > Copy < /span> selection <
    /li> <
    li class = "menu-list-item hover-effects paste" >
    <
    span class = "hl" > Paste < /span> <
    /li> <
    /ul> <
    /div>

<
div class = "options a-view" >
    <
    div class = "label" > Link options < /div> <
    ul class = "remove-list-style" >
    <
    li class = "menu-list-item hover-effects copy" >
    <
    span class = "hl" > Copy < /span> link address <
    /li> <
    li class = "hover-effects open" >
    <
    a class = "menu-list-item no-context-menu"
href = ""
target = "_blank" >
    <
    span class = "hl" > Open < /span> link <
    /a> <
    /li> <
    /ul> <
    /div>

<
div class = "options anchor-link-view" >
    <
    div class = "label" > Anchor link options < /div> <
    ul class = "remove-list-style" >
    <
    li class = "menu-list-item hover-effects copy" >
    <
    span class = "hl" > Copy < /span> anchor address <
    /li> <
    li class = "menu-list-item hover-effects go-to-anchor"
data - anchor = "" >
    <
    span class = "hl" > Go to < /span> anchor <
    /li> <
    /ul> <
    /div>

<
div class = "options anchor-view" >
    <
    div class = "label" > Anchor options < /div> <
    ul class = "remove-list-style" >
    <
    li class = "menu-list-item hover-effects copy" >
    <
    span class = "hl" > Copy < /span> anchor address <
    /li> <
    /ul> <
    /div>

<
div class = "options img-view" >
    <
    div class = "label" > Image options < /div> <
    ul class = "remove-list-style" >
    <
    li class = "menu-list-item hover-effects copy" >
    <
    span class = "hl" > Copy < /span> image address <
    /li> <
    li class = "hover-effects open" >
    <
    a class = "menu-list-item no-context-menu"
href = ""
target = "_blank" >
    <
    span class = "hl" > Open < /span> image <
    /a> <
    /li> <
    /ul> <
    /div>

<
div class = "options emoji-view" >
    <
    div class = "label" > Emoji option < /div> <
    ul class = "remove-list-style" >
    <
    li class = "menu-list-item hover-effects copy" >
    <
    span class = "hl" > Copy < /span> emoji identifier <
    /li> <
    /ul> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-top dialog-h-center protected-id"
id = "save-as-dialog" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > archive < /i> <
    h2 class = "mdl-card__title-text no-context-info" > Save As < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    div class = "mdl-card__supporting-text wysiwyg-content" >
    <
    p >
    <
    span class = "hl" > HTML format < /span> : Recommended for most users. All tools supported. Themes compatible. Document theme selection only available for this format. <
    /p> <
    p >
    <
    span class = "hl" > Markdown format < /span> : Outputs Markdown file. Not themes compatible. <
    /p> <
    p >
    <
    i class = "material-icons" > info < /i> For final work, always verify that your document looks the way you want to. <
    /p> <
    /div>

<
ul class = "mdl-list" >
    <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" >

    <!-- To set a field as invalid, use "is-invalid" CSS class -->
    <
    div class = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
    <
    input class = "mdl-textfield__input protected-id"
type = "text"
id = "save-path-field" >
    <
    label class = "mdl-textfield__label"
for = "save-path-field" > Destination file path < /label> <
    /div> <
    div class = "mdl-tooltip"
for = "save-path-field" > < /div>

<
/span> <
/li> <
li class = "mdl-list__item preview-list-label" >
    <
    span class = "mdl-list__item-primary-content" >
    Document theme↴(always more to come) <
    /span> <
    /li> <
    /ul> <
    ul class = "mdl-list preview-list" >

    <
    li class = "mdl-list__item preview-list-item no-context-info "
data - slug = ""
hidden >
    <
    span class = "mdl-list__item-primary-content" > < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    img src = ""
alt = "Document theme preview image"
hidden >
    <
    /span> <
    /li>

<
/ul>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--colored close-dialog-button" >
    Cancel <
    /span> <
    span class = "mdl-button mdl-button--raised mdl-button--colored hover-effects save-button" >
    Save <
    /span> <
    /div> <
    /section>




<!-- http://stackoverflow.com/questions/16090487/find-a-string-of-text-in-an-element-and-wrap-some-span-tags-round-it -->
<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-bottom dialog-h-center protected-id"
id = "search-dialog" >

    <
    div class = "overflow-y-section" >

    <
    ul class = "mdl-list" >
    <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" >

    <
    div class = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label search-field-container" >
    <
    input class = "mdl-textfield__input protected-id"
type = "text"
id = "search-field" >
    <
    label class = "mdl-textfield__label"
for = "search-field" > Search... < /label> <
    /div>

<
/span> <
span class = "mdl-list__item-primary-content" >

    <
    div class = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label replace-field-container" >
    <
    input class = "mdl-textfield__input protected-id"
type = "text"
id = "replace-field" >
    <
    label class = "mdl-textfield__label"
for = "replace-field" > Replace by... < /label> <
    /div>

<
/span> <
/li> <
li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" >
    <
    span class = "inline-label" > Case sensitive < /span> <
    span >
    <
    label class = "mdl-switch mdl-js-switch mdl-js-ripple-effect"
for = "switch-search-case-sensitive" >
<
input type = "checkbox"
id = "switch-search-case-sensitive"
class = "mdl-switch__input protected-id"
checked >
    <
    /label> <
    /span> <
    /span> <
    span class = "mdl-list__item-primary-content" >
    <
    span class = "inline-label" > Results < /span> <
    span >
    <
    span class = "search-results-total" > 0 < /span> <
    /span> <
    /span> <
    /li> <
    /ul>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--colored close-dialog-button" >
    Close <
    /span> <
    span class = "mdl-button mdl-button--raised mdl-button--colored hover-effects find-all-button" >
    Find All <
    /span> <
    span class = "mdl-button mdl-button--colored replace-all-button" >
    Replace all <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-small dialog-top dialog-right protected-id"
id = "table-content-dialog"
data - view = "" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > line_weight < /i> <
    h2 class = "mdl-card__title-text no-context-info" > Table of Content < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    div class = "no-headings-view" >
    <
    div class = "mdl-card__supporting-text wysiwyg-content" >
    <
    p >
    <
    span class = "hl" > Add some titles < /span> to view the table of content. <
    /p> <
    /div> <
    /div>

<
div class = "headings-list-view" >
    <
    ul id = "heading-item-model-container"
hidden >
    <
    li class = "mdl-list__item hover-effects " >
    <
    span class = "mdl-list__item-primary-content" > < /span> <
    span class = "mdl-list__item-secondary-action" > < /span> <
    /li> <
    /ul>

<
ul class = "mdl-list headings-list" >

    <
    /ul> <
    /div>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--colored close-dialog-button" >
    Close <
    /span> <
    span class = "mdl-button mdl-button--colored refresh-button" >
    Refresh <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-small dialog-bottom dialog-right protected-id"
id = "doc-info-dialog" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > info < /i> <
    h2 class = "mdl-card__title-text no-context-info" > Document Information < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    ul class = "mdl-list" >
    <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Document Theme < /span> <
    span class = "mdl-list__item-secondary-action doc-theme-name" > < /span> <
    /li>

<
li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Paragraphs < /span> <
    span class = "mdl-list__item-secondary-action paragraphs-number" > < /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Sentences < /span> <
    span class = "mdl-list__item-secondary-action sentences-number" > < /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Words < /span> <
    span class = "mdl-list__item-secondary-action words-number" > < /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Characters < /span> <
    span class = "mdl-list__item-secondary-action characters-number" > < /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Characters, with spaces < /span> <
    span class = "mdl-list__item-secondary-action characters-spaces-number" > < /span> <
    /li> <
    /ul>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--colored close-dialog-button" >
    Close <
    /span> <
    span class = "mdl-button mdl-button--colored recount-button" >
    Recount <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-top dialog-h-center protected-id "
id = "settings-dialog" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > settings < /i> <
    h2 class = "mdl-card__title-text no-context-info" > Settings < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    div class = "mdl-card__supporting-text wysiwyg-content" >
    <
    p >
    <
    span class = "hl" > * < /span> : Settings with an asterisk <span class="hl">need <span class="app-name"></span > restart to be applied < /span>. <
    /p> <
    /div>

<
ul class = "mdl-list" >
    <
    li class = "mdl-list__item select-section" >
    <
    span class = "mdl-list__item-primary-content" >

    <
    div class = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select" >
    <
    input class = "mdl-textfield__input protected-id"
type = "text"
id = "select-ui-lang"
value = ""
readonly tabIndex = "-1" >
    <
    label
for = "select-ui-lang" >
<
i class = "mdl-icon-toggle__label material-icons" > keyboard_arrow_down < /i> <
    /label> <
    label
for = "select-ui-lang"
class = "mdl-textfield__label" > Interface language(more soon) < /label> <
    ul
for = "select-ui-lang"
class = "mdl-menu mdl-menu--bottom-left mdl-js-menu" >
    <
    li class = "mdl-menu__item"
data - slug = ""
hidden > < /li> <
    /ul> <
    /div>

<
/span> <
/li> <
li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Auto - update check at startup < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    label class = "mdl-switch mdl-js-switch mdl-js-ripple-effect"
for = "switch-auto-update-check" >
<
input type = "checkbox"
id = "switch-auto-update-check"
class = "mdl-switch__input protected-id" >
    <
    /label> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Native window frame * < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    label class = "mdl-switch mdl-js-switch mdl-js-ripple-effect"
for = "switch-window-frame" >
<
input type = "checkbox"
id = "switch-window-frame"
class = "mdl-switch__input protected-id" >
    <
    /label> <
    /span> <
    /li> <
    li class = "mdl-list__item linux-os" >
    <
    span class = "mdl-list__item-primary-content" > Window controls to the right(Linux only)(non - frame mode only) < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    label class = "mdl-switch mdl-js-switch mdl-js-ripple-effect"
for = "switch-linux-controls-right" >
<
input type = "checkbox"
id = "switch-linux-controls-right"
class = "mdl-switch__input protected-id" >
    <
    /label> <
    /span> <
    /li> <
    /ul>

<
ul class = "mdl-list" >
    <
    li class = "mdl-list__item preview-list-label" >
    <
    span class = "mdl-list__item-primary-content" >
    Interface theme↴(more soon) <
    /span> <
    /li> <
    /ul> <
    ul class = "mdl-list preview-list" >

    <
    li class = "mdl-list__item preview-list-item no-context-info "
data - slug = ""
hidden >
    <
    span class = "mdl-list__item-primary-content" > < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    img src = ""
alt = "Interface theme preview image"
hidden >
    <
    /span> <
    /li>

<
/ul>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--colored close-dialog-button" >
    Close <
    /span> <
    span class = "mdl-button mdl-button--colored reset-button" >
    Reset <
    /span> <
    span class = "mdl-button mdl-button--colored settings-folder-button" >
    Open Settings Folder <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-top dialog-h-center protected-id"
id = "shortcuts-dialog" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > swap_calls < /i> <
    h2 class = "mdl-card__title-text no-context-info" > Keyboard Shortcuts < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    ul class = "shortcuts-lists remove-list-style" >

    <
    li class = "shortcuts-list" >
    <
    h6 class = "no-context-info" > Window < /h6> <
    ul class = "mdl-list" >
    <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Toggle Fullscreen < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > F11 < /kbd> <
    kbd class = "osx-os" > ⌘ ^ F < /kbd> <
    /span> <
    /li> <
    /ul> <
    /li>

<
li class = "shortcuts-list" >
    <
    h6 class = "no-context-info" > Dialogs < /h6> <
    ul class = "mdl-list" >
    <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Switch to Next Text Field < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Tab < /kbd> <
    kbd class = "osx-os" > ⇥ < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Switch to Previous Text Field < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Shift + Tab < /kbd> <
    kbd class = "osx-os" > ⇧⇥ < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Close / Cancel Current Action < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd > Escape < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Current Dialog Default Action < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd > Enter < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Keyboard Shortcuts List(this dialog) < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Space < /kbd> <
    kbd class = "osx-os" > ^ Space < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Context Menu < /span> <
    span class = "mdl-list__item-secondary-action" >
    Mouse Right Click <
    /span> <
    /li> <
    /ul> <
    /li>

<
li class = "shortcuts-list" >
    <
    h6 class = "no-context-info" > Documents < /h6> <
    ul class = "mdl-list" >
    <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > New Document < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    span class = "windows-os linux-os" >
    <
    kbd > Ctrl + N < /kbd> / < kbd > Ctrl + T < /kbd> <
    /span> <
    span class = "osx-os" >
    <
    kbd > ⌘N < /kbd> / < kbd > ⌘T < /kbd> <
    /span> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Open Document < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + O < /kbd> <
    kbd class = "osx-os" > ⌘O < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Open Containing Folder < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + O < /kbd> <
    kbd class = "osx-os" > ⌘⇧O < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Save As... < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + S < /kbd> <
    kbd class = "osx-os" > ⌘⇧S < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Save < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + S < /kbd> <
    kbd class = "osx-os" > ⌘S < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Close Documents < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    span class = "italic" > (on a document tab) < /span> Mouse Middle Click <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Close Current Document < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + W < /kbd> <
    kbd class = "osx-os" > ⌘W < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Close All Documents < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + W < /kbd> <
    kbd class = "osx-os" > ⌘⇧W < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Search / Replace < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + F < /kbd> <
    kbd class = "osx-os" > ⌘F < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Print Document Info < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + P < /kbd> <
    kbd class = "osx-os" > ⌘P < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Switch to Next Document < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Tab < /kbd> <
    kbd class = "osx-os" > ^ ⇥ < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Switch to Previous Document < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + Tab < /kbd> <
    kbd class = "osx-os" > ⇧ ^ ⇥ < /kbd> <
    /span> <
    /li> <
    /ul> <
    /li>

<
li class = "shortcuts-list" >
    <
    h6 class = "no-context-info" > Editor < /h6> <
    ul class = "mdl-list" >

    <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Heading XL < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + 1 < /kbd> <
    kbd class = "osx-os" > ⌘1 < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Heading L < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + 2 < /kbd> <
    kbd class = "osx-os" > ⌘2 < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Heading M < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + 3 < /kbd> <
    kbd class = "osx-os" > ⌘3 < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Heading S < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + 4 < /kbd> <
    kbd class = "osx-os" > ⌘4 < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Heading XS < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + 5 < /kbd> <
    kbd class = "osx-os" > ⌘5 < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Heading XXS < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + 6 < /kbd> <
    kbd class = "osx-os" > ⌘6 < /kbd> <
    /span> <
    /li>

<
li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Paragraph < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + P < /kbd> <
    kbd class = "osx-os" > ⌘⇧P < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > New Line in Paragraph < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Shift + Enter < /kbd> <
    kbd class = "osx-os" > ⇧Enter < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Quote < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + Q < /kbd> <
    kbd class = "osx-os" > ⌘⇧Q < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Unordered List < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + L < /kbd> <
    kbd class = "osx-os" > ⌘⇧L < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Ordered List < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Alt + L < /kbd> <
    kbd class = "osx-os" > ⌘⌥L < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Image via URL < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Alt + I < /kbd> <
    kbd class = "osx-os" > ⌘⌥I < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > YouTube / Vimeo / Dailymotion / Twitch video via URL < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Alt + V < /kbd> <
    kbd class = "osx-os" > ⌘⌥V < /kbd> <
    /span> <
    /li>

<
li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Bold < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + B < /kbd> <
    kbd class = "osx-os" > ⌘B < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Italic < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + I < /kbd> <
    kbd class = "osx-os" > ⌘I < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Underline < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + U < /kbd> <
    kbd class = "osx-os" > ⌘U < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Strikethrough < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Alt + S < /kbd> <
    kbd class = "osx-os" > ⌘⌥S < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Apply Link < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + L < /kbd> <
    kbd class = "osx-os" > ⌘L < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Superscript < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + Up < /kbd> <
    kbd class = "osx-os" > ⌘⇧Up < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Subscript < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + Down < /kbd> <
    kbd class = "osx-os" > ⌘⇧Down < /kbd> <
    /span> <
    /li> <
    li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Clear Format < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd class = "windows-os linux-os" > Ctrl + Shift + C < /kbd> <
    kbd class = "osx-os" > ⌘⇧C < /kbd> <
    /span> <
    /li>

<
li class = "mdl-list__item" >
    <
    span class = "mdl-list__item-primary-content" > Force Toolbar Display < /span> <
    span class = "mdl-list__item-secondary-action" >
    <
    kbd > Alt < /kbd> <
    /span> <
    /li>

<
/ul> <
/li>

<
/ul>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--raised mdl-button--colored hover-effects close-dialog-button" >
    Close <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-top dialog-h-center protected-id"
id = "about-dialog"
data - state = "" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > favorite < /i> <
    h2 class = "mdl-card__title-text no-context-info" > About < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    img src = "../img/uncolored-logo.svg"
class = "logo no-context-info"
alt = "(Un)colored logo" >

    <
    div class = "mdl-card__supporting-text update-check" >
    version < span class = "app-version hl" > < /span> — <span class="hl">Beta</span >
    <
    div class = "loading-text" > Checking
for update... < /div> <
    i class = "material-icons loading-icon" > timelapse < /i> <
    div class = "up-to-date" > Update checked. < span class = "app-name" > < /span> is up to date.</div >
    <
    div class = "new-update" > A new update is available. < br >
    <
    span class = "fake-link show-update-dialog" > Open detailed dialog < /span> <
    /div> <
    /div>

<
div class = "mdl-card__supporting-text wysiwyg-content ajax-error" >
    <
    p >
    The update check failed. < br > Here are some possible reasons:
    <
    /p> <
    ul >
    <
    li > You have no Internet access < /li> <
    li > A firewall is blocking < span class = "app-name" > < /span> Internet access</li >
    <
    li > The remote server is down or in maintenance(Try to access < a class = "no-context-menu"
        href = "https://github.com/n457/Uncolored/blob/master/CHANGELOG.md"
        target = "_blank" > https: //github.com/n457/Uncolored/blob/master/CHANGELOG.md</a>                        )</li>
        <
        /ul> <
        /div>

        <
        div class = "mdl-card__supporting-text author-info" >
        <
        a class = "author-avatar no-context-menu"
        target = "_blank"
        href = "https://github.com/n457" > < /a> <
        p >
        Created with so much < i class = "material-icons" > favorite < /i> by <a class="no-context-menu" target="_blank" href="https:/ / github.com / n457 ">n457</a> <
        /p> <
        /div>

        <
        div class = "mdl-card__supporting-text wysiwyg-content" >
        <
        p >
        <
        span class = "hl" > Special thanks to: < /span> Thomas Guilleminot (OS X packages & document theme creation) • Antoine Boquet (document theme creation) <
        /p>

        <
        p class = "hl" > Thanks to creators and contributors of these projects that(Un) colored uses: < /p> <
        p >
        <
        a class = "no-context-menu"
        href = "https://sacha.me/Countable/"
        target = "_blank" > Countable.js < /a> • <
        a class = "no-context-menu"
        href = "https://cure53.de/purify"
        target = "_blank" > DOMPurify < /a> • <
        a class = "no-context-menu"
        href = "http://electron.atom.io/"
        target = "_blank" > Electron < /a> • <
        a class = "no-context-menu"
        href = "https://github.com/electron-userland/electron-builder"
        target = "_blank" > electron - builder < /a> • <
        a class = "no-context-menu"
        href = "http://hassankhan.me/emojify.js/"
        target = "_blank" > emojify.js < /a> • <
        a class = "no-context-menu"
        href = "https://github.com/padolsey/findAndReplaceDOMText"
        target = "_blank" > findAndReplaceDOMText < /a> • <
        a class = "no-context-menu"
        href = "https://github.com/toddmotto/foreach"
        target = "_blank" > foreach.js < /a> • <
        a class = "no-context-menu"
        href = "http://creativeit.github.io/getmdl-select/"
        target = "_blank" > getmdl - select < /a> • <
        a class = "no-context-menu"
        href = "https://sindresorhus.com/github-markdown-css/"
        target = "_blank" > github - markdown - css < /a> • <
        a class = "no-context-menu"
        href = "https://github.com/Zod-/jsVideoUrlParser"
        target = "_blank" > jsVideoUrlParser < /a> • <
        a class = "no-context-menu"
        href = "http://n457.github.io/LightRange.js/"
        target = "_blank" > LightRange.js < /a> • <
        a class = "no-context-menu"
        href = "https://github.com/chjj/marked"
        target = "_blank" > marked < /a> • <
        a class = "no-context-menu"
        href = "https://getmdl.io/"
        target = "_blank" > Material Design Lite < /a> • <
        a class = "no-context-menu"
        href = "https://craig.is/killing/mice"
        target = "_blank" > Mousetrap < /a> • <
        a class = "no-context-menu"
        href = "https://github.com/ccampbell/mousetrap/tree/master/plugins/global-bind"
        target = "_blank" > Mousetrap Global Bind < /a> • <
        a class = "no-context-menu"
        href = "http://necolas.github.io/normalize.css/"
        target = "_blank" > Normalize.css < /a> • <
        a class = "no-context-menu"
        href = "https://github.com/ded/reqwest"
        target = "_blank" > reqwest < /a> • <
        a class = "no-context-menu"
        href = "http://rubaxa.github.io/Sortable/"
        target = "_blank" > Sortable < /a> • <
        a class = "no-context-menu"
        href = "http://domchristie.github.io/to-markdown/"
        target = "_blank" > to - markdown < /a> • <
        a class = "no-context-menu"
        href = "https://gist.github.com/alexey-bass/1115557"
        target = "_blank" > versions - compare < /a> • <
        a class = "no-context-menu"
        href = "http://wysiwygjs.github.io/"
        target = "_blank" > wysiwyg.js < /a> • <
        a class = "no-context-menu"
        href = "https://zengabor.github.io/zenscroll/"
        target = "_blank" > Zenscroll < /a> <
        /p> <
        /div>

        <
        div class = "mdl-card__supporting-text wysiwyg-content" >
        <
        p >
        <
        span class = "hl" > < span class = "app-name" > < /span> is free and open source</span > .Making applications like this < span class = "hl" > takes time < /span>. If you like this app, please consider to donate to <span class="hl">support my work</span > ;) < br > If you don 't know how much to give, 6 € is a reasonnable amount (will be automatically converted into your currency). Have a nice day ! <
    /p> <
    /div>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--raised mdl-button--colored hover-effects close-dialog-button" >
    Close <
    /span> <
    a target = "_blank"
class = "mdl-button mdl-button--colored no-context-menu donate"
href = "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=n457%2econtact%40gmail%2ecom&lc=FR&item_name=n457%20%2f%20Bertrand%20Vignaud%2dLerouge&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted" >
    Support(Un) colored <
    /a> <
    span class = "mdl-button mdl-button--colored recheck" >
    Update recheck <
    /span> <
    span class = "mdl-button mdl-button--colored app-folder-button" >
    Open App Folder <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-top dialog-h-center protected-id"
id = "print-dialog" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > print < /i> <
    h2 class = "mdl-card__title-text no-context-info" > Print a Document < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    div class = "mdl-card__supporting-text wysiwyg-content" >
    <
    p >
    To print your document, save it as a < span class = "hl" > HTML document < /span>, open it <span class="hl">in your Web browser</span > and use the < kbd class = "windows-os linux-os" > Ctrl + P < /kbd><kbd class="osx-os">⌘P</kbd > keyboard shortcut. <
    /p> <
    /div>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--raised mdl-button--colored hover-effects close-dialog-button" >
    OK <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-top dialog-h-center protected-id"
id = "unsaved-docs-dialog" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > warning < /i> <
    h2 class = "mdl-card__title-text no-context-info" > Unsaved Documents < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    div class = "mdl-card__supporting-text wysiwyg-content" >
    <
    p >
    One or several documents are still < span class = "hl" > unsaved < /span>.<br> You can close all documents <span class="hl">all by once</span > without saving their changes or < span class = "hl" > one by one < /span>. <
    /p> <
    /div>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--colored close-dialog-button cancel-all" >
    Cancel all <
    /span> <
    span class = "mdl-button mdl-button--colored close-dialog-button" >
    Close dialog <
    /span> <
    /div> <
    div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--colored close-dialog-button force-close-all" >
    Force close all <
    /span> <
    span class = "mdl-button mdl-button--colored quit-app" >
    Quit < span class = "app-name" > < /span> <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-top dialog-h-center protected-id"
id = "new-update-dialog" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > change_history < /i> <
    h2 class = "mdl-card__title-text no-context-info" > New Update Available < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    div class = "mdl-card__supporting-text wysiwyg-content" >
    <
    p >
    <
    span class = "hl" > A new version of < span class = "app-name" > < /span> is released (version <span class="last-version"></span > ) < /span><br> <
a class = "no-context-menu"
target = "_blank"
href = "https://n457.github.io/Uncolored/" > Download the latest version here < /a> <
    /p> <
    /div>

<
div class = "mdl-card__supporting-text wysiwyg-content release-notes" > < /div>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--raised mdl-button--colored hover-effects close-dialog-button" >
    OK <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-top dialog-h-center protected-id"
id = "priority-info-dialog" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > whatshot < /i> <
    h2 class = "mdl-card__title-text no-context-info" > Priority Information < /h2> <
    /div>

<
div class = "mdl-card__supporting-text wysiwyg-content overflow-y-section" > < /div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--raised mdl-button--colored hover-effects close-dialog-button" >
    OK <
    /span> <
    /div> <
    /section>




<
section class = "mdl-card mdl-shadow--6dp dialog-large dialog-top dialog-h-center protected-id"
id = "io-error-dialog" >
    <
    div class = "mdl-card__title" >
    <
    i class = "material-icons" > report < /i> <
    h2 class = "mdl-card__title-text no-context-info" > Oops! < /h2> <
    /div>

<
div class = "overflow-y-section" >

    <
    div class = "mdl-card__supporting-text wysiwyg-content" >
    <
    p >
    <
    span class = "hl" > Don 't panic ;)</span> <
    /p> <
    p >
    There has been a < span class = "hl" > file reading or writing error < /span>.<br> It means that <span class="app-name"></span > < span class = "hl" > can 't read</span> the content of one or several of its files, <span class="hl">edit them</span>                    or <span class="hl">create them</span>.<br> Don'
t worry we will find a solution. <
    /p>

<
p >
    This error can appear when you
try to < span class = "hl" > open < /span>, or <span class="hl">save a document</span > , < span class = "hl" > with or without a theme < /span>. <
    /p> <
    p >
    In these cases, encountering this error means that the documents you 're trying to save or open, are probably located in a <span class="hl">restricted location</span> on your computer.<br> <
    span class = "hl" > The easy and recommended way to solve this error is to choose another saving location or move the documents you 're trying to open and retry opening them.</span> <
    /p>

<
p >
    Else, encountering this error means that < span class = "app-name" > < /span> is probably installed in a <span class="hl">restricted location</span > on your computer. < br >
    <
    span class = "hl" > The easy and recommended way to solve this error is to uninstall the application and reinstall it into a more common location. < /span> <
    /p> <
    div class = "windows-os" >
    <
    p >
    On windows, you can < span class = "hl" > ALTERNATIVELY < /span> run <span class="app-name"></span > as administrator
if the user account you are using allows you to do so. <
    /p> <
    img class = "no-context-info"
src = "../img/windows-run-admin.png"
alt = "Right click, run as administrator" >
    <
    /div> <
    /div>

<
/div>

<
div class = "mdl-card__actions mdl-card--border" >
    <
    span class = "mdl-button mdl-button--raised mdl-button--colored hover-effects close-dialog-button" >
    OK <
    /span> <
    /div> <
    /section>



<
div id = "preview-large"
class = "protected-id " >
    <
    div class = "label" > Theme preview < /div> <
    img src = ""
alt = "Large preview image" >
    <
    /div>



<!-- gulp-replace: js start -->

<!-- Namespace, modules, window initialization -->
<
script src = "./js/modules.js" > < /script>

<!-- Libraries -->
<
script src = "./lib/mdl/material.js" > < /script> <
    script src = "./lib/getmdl-select/getmdl-select.min.js" > < /script> <
    script src = "./lib/versions-compare.js" > < /script> <
    script src = "./lib/foreach.min.js" > < /script> <
    script src = "./lib/LightRange.ES6.js" > < /script> <
    script src = "./lib/wysiwyg.min.js" > < /script> <
    script src = "./lib/Sortable.no-loader.min.js" > < /script> <
    script src = "./lib/mousetrap.min.js" > < /script> <
    script src = "./lib/mousetrap-global-bind.min.js" > < /script> <
    script src = "./lib/purify.no-loader.min.js" > < /script> <
    script src = "./lib/Countable.js" > < /script> <
    script src = "./lib/findAndReplaceDOMText.no-loader.js" > < /script> <
    script src = "./lib/emojify.min.js" > < /script> <
    script src = "./lib/zenscroll.no-loader.min.js" > < /script> <
    script src = "./lib/reqwest.no-loader.min.js" > < /script> <
    script src = "./lib/to-markdown.custom.js" > < /script> <
    script src = "./lib/marked.min.js" > < /script> <
    script src = "./lib/jsVideoUrlParser.min.js" > < /script>

<!-- Functions -->
<
script src = "./js/functions/IO.functions.js" > < /script> <
    script src = "./js/functions/Window.functions.js" > < /script> <
    script src = "./js/functions/Utils.functions.js" > < /script> <
    script src = "./js/functions/Documents.functions.js" > < /script> <
    script src = "./js/functions/Content.functions.js" > < /script> <
    script src = "./js/functions/Toolbar.functions.js" > < /script> <
    script src = "./js/functions/Dialogs.functions.js" > < /script> <
    script src = "./js/functions/Remote.functions.js" > < /script>

<!-- Classes -->
<
script src = "./js/classes/Document.class.js" > < /script>

<!-- Scripts -->
<
script src = "./js/init.js" > < /script> <
    script src = "./js/window.js" > < /script> <
    script src = "./js/tabs.js" > < /script> <
    script src = "./js/toolbar.js" > < /script> <
    script src = "./js/context-info.js" > < /script> <
    script src = "./js/dialogs.js" > < /script> <
    script src = "./js/save.js" > < /script> <
    script src = "./js/search.js" > < /script> <
    script src = "./js/settings.js" > < /script> <
    script src = "./js/remote-check.js" > < /script>

<!-- gulp-replace: js end -->
<
/body>

<
/html>