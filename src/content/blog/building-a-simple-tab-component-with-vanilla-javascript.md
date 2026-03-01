---
title: Building a Simple Tab Component with Vanilla JavaScript
description: Create a clean, functional tabbed interface using only vanilla JavaScript — no libraries or dependencies needed.
date: 2025-04-10
tag: "#javascript"
readTime: "3 min"
---

Creating tabbed interfaces without frameworks is simpler than many developers assume. This guide demonstrates a clean, functional implementation using only vanilla JavaScript.

## What Are Tabs?

Tabs are UI components that allow you to switch between different views or content blocks without leaving the page. They function as mini-navigation systems, ideal for dashboards, settings panels, and grouped content organization.

## Data Structure

The foundation uses a straightforward array of objects:

```javascript
let tabList = [
  { id: "tab-1", title: "Tab 1", content: "Content 1" },
  { id: "tab-2", title: "Tab 2", content: "Content 2" },
  { id: "tab-3", title: "Tab 3", content: "Content 3" },
];
```

Each tab object contains:
- A unique `id` identifier
- A `title` for the button label
- The `content` displayed when active

## HTML Structure

Your markup requires two container elements with specific IDs:

```html
<div id="tabs"></div>
<div id="tab-contents"></div>
```

## The renderTabs Function

This core function performs three essential tasks:

1. Clears previous HTML to prevent duplicates
2. Dynamically generates tab buttons and content sections
3. Manages click event handlers for tab switching

### Clearing Containers

```javascript
tabs.innerHTML = "";
tabContents.innerHTML = "";
```

### Looping Through Tabs

```javascript
function renderTabs(activeTabNum = "tab-1") {
    tabs.innerHTML = "";
    tabContents.innerHTML = "";
    tabList.forEach(({ id, title, content }) => {
        let tab = document.createElement("button");
        tab.innerText = title;
        tab.setAttribute("id", id);
        tab.addEventListener("click", () => {
            let activeTab = document.getElementById(activeTabNum);
            let activeContent = document.getElementById(`content-${activeTabNum}`);
            activeTab.style.backgroundColor = "white";
            activeContent.style.display = "none";
            activeTabNum = id;
            tab.style.backgroundColor = "lightgray";
            let contentDiv = document.getElementById(`content-${id}`);
            contentDiv.style.display = "block";
        });
        tabs.appendChild(tab);

            
        let contentDiv= document.createElement("div");
        contentDiv.innerText = content;
        contentDiv.setAttribute("id", `content-${id}`);
        contentDiv.style.display = "none";
        if (activeTabNum === id) {
            contentDiv.style.display = "block";
        }
        
        tabContents.appendChild(contentDiv);
    
    })

}
renderTabs();
```

### Handling Clicks

When a tab is clicked, the function resets the currently active tab, updates the active state, changes background color for visual feedback, and displays the associated content.

### Active Tab Highlighting

By default, only the content of the initially active tab is visible. When a tab is selected, its background color changes and the corresponding content is shown.

```javascript
tab.style.backgroundColor = "lightgray";
contentDiv.style.display = "block";
```

## Initialization

Calling the function on page load activates the interface:

```javascript
renderTabs();
```

## Enhancement Opportunities

- **Styling:** Add CSS for hover effects and improved spacing
- **Accessibility:** Implement `aria-*` attributes and keyboard navigation
- **Animations:** Include smooth fade or slide transitions
- **Reusability:** Convert to a class or module for multiple implementations

## Conclusion

This code is a great example of how you can build interactive UI components using plain JavaScript. No libraries. No dependencies. Just core DOM manipulation. The approach proves both educational and performant for lightweight interfaces requiring minimal dependencies.
