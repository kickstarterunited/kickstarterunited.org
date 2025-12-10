---
title: "[DEV] Markdown Feature Showcase"
pubDate: 2025-10-14
tags: ["fun", "educational"]
hidden: false
---

<!-- markdownlint-disable MD033 -->

<div class="prose prose-table:table-fixed">

# Markdown Feature Showcase (for authors)

This is a _fake but functional_ blog post that lists **all common Markdown
features**. Everything here is fully copy-pasteable and ready for your own
projects!

This page is reachable at [/blog/\_readme/](/blog/_readme/), but is not linked from anywhere else
on the site.

---

<details open>

<summary>Table of Contents</summary>

- [Markdown Feature Showcase (for authors)](#markdown-feature-showcase-for-authors)
  - [Headings](#headings)
  - [Text Formatting](#text-formatting)
  - [Lists](#lists)
    - [Unordered List](#unordered-list)
    - [Ordered List](#ordered-list)
  - [Links \& Images](#links--images)
  - [Blockquotes](#blockquotes)
    - [Nested quotes](#nested-quotes)
  - [Code Blocks](#code-blocks)
  - [Tables](#tables)
  - [Task Lists](#task-lists)
  - [Horizontal Rules](#horizontal-rules)
  - [Inline HTML](#inline-html)
  - [Footnotes](#footnotes)
  - [Paragraphs and Line Breaks](#paragraphs-and-line-breaks)
  - [Escaping Characters](#escaping-characters)
  - [](#)
  - [Conclusion](#conclusion)

</details>

---

## Headings

<div class="prose prose-headings:m-0">

| Markdown         | Output           |
| ---------------- | ---------------- |
| `# Level 1`      | <h1>Level 1</h1> |
| `## Level 2`     | <h2>Level 2</h2> |
| `### Level 3`    | <h3>Level 3</h3> |
| `#### Level 4`   | <h4>Level 4</h4> |
| `##### Level 5`  | <h5>Level 5</h5> |
| `###### Level 6` | <h6>Level 6</h6> |

</div>

---

## Text Formatting

| Markdown                               | Output                               |
| -------------------------------------- | ------------------------------------ |
| `Normal text`                          | Normal text                          |
| `_Italic_`                             | _Italic_                             |
| `**Bold**`                             | **Bold**                             |
| `**_Bold + Italic_**`                  | **_Bold + Italic_**                  |
| `~~Strikethrough~~`                    | ~~Strikethrough~~                    |
| `<ins>Inserted text (HTML)</ins>`      | <ins>Inserted text (HTML)</ins>      |
| `<mark>Highlighted text (HTML)</mark>` | <mark>Highlighted text (HTML)</mark> |
| `Inline code for tiny snippets`        | `Inline code for tiny snippets`      |
| `Superscript: 10<sup>3</sup>`          | Superscript: 10<sup>3</sup>          |
| `Subscript: H<sub>2</sub>O`            | Subscript: H<sub>2</sub>O            |

---

## Lists

### Unordered List

<table class="prose prose-ul:m-0 prose-li:m-0">
<thead>
  <th>Markdown
  <th>Output

<tbody>
<td>

```markdown
- Notebook
  - Pens
    - Gel pens
- Stickers
```

<td>

- Notebook
  - Pens
    - Gel pens
- Stickers

</table>

### Ordered List

<table class="prose prose-ol:m-0 prose-li:m-0">
<col class="w-[10ch]">
<tr>
<th>Markdown
<td>

```markdown
1. Browse Kickstarter
2. Find a project
   1. Pick a reward
   2. Hit pledge
3. Celebrate
```

<tr>
<th>Output
<td>

1. Browse Kickstarter
2. Find a project
   1. Pick a reward
   2. Hit pledge
3. Celebrate

</table>

---

## Links & Images

<table>
<col class="w-[10ch]">

<tr>
<th>Markdown
<td>

```markdown
Check out [Kickstarter](https://www.kickstarter.com), a platform
for creative projects.

![A simple placeholder rectangle](https://placecats.com/100/100)
```

<tr>
<th>Output
<td>

Check out [Kickstarter](https://www.kickstarter.com), a platform
for creative projects.

![A simple placeholder rectangle](https://placecats.com/100/100)

</table>

## Blockquotes

<table class="prose prose-blockquote:m-0">
<col class="w-[10ch]">

<tr>
<th>Markdown
<td>

```markdown
> Star Trek was an attempt to say that humanity
> will reach maturity and wisdom on the day that
> it begins not just to tolerate, but take a
> special delight in differences in ideas and
> differences in life forms. […] If we cannot
> learn to actually enjoy those small differences,
> to take a positive delight in those small
> differences between our own kind, here on this
> planet, then we do not deserve to go out into
> space and meet the diversity that is almost
> certainly out there.

-- Gene Roddenberry
```

<tr>
<th>Output
<td>

> Star Trek was an attempt to say that humanity
> will reach maturity and wisdom on the day that
> it begins not just to tolerate, but take a
> special delight in differences in ideas and
> differences in life forms. […] If we cannot
> learn to actually enjoy those small differences,
> to take a positive delight in those small
> differences between our own kind, here on this
> planet, then we do not deserve to go out into
> space and meet the diversity that is almost
> certainly out there.

-- Gene Roddenberry

</table>

### Nested quotes

<table class="prose prose-blockquote:m-0">
<col class="w-[10ch]">

<tr>
<th>Markdown
<td>

```markdown
> Comment
>
> > Response to comment
>
> > > Reply to response.
```

<tr>
<th>Output
<td>

> Comment
>
> > Response to comment
>
> > > Reply to response

</table>

---

## Code Blocks

<table class="prose prose-code:m-0">
<col class="w-[10ch]">

<tr>
<th>Markdown
<td>

````markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

<tr>
<th>Output
<td>

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

</table>

---

## Tables

<table>
<col class="w-[10ch]">

<tr>
<th>Markdown
<td>

```markdown
|       Feature |   Status   | Notes             |
| ------------: | :--------: | ----------------- |
| Accessibility |  ✅ Done   | Keyboard-friendly |
|   Performance | ⚠️ Medium  | Needs profiling   |
|        Polish | ❌ Not yet | Coming soon       |
```

<tr>
<th>Output
<td>

|       Feature |   Status   | Notes             |
| ------------: | :--------: | ----------------- |
| Accessibility |  ✅ Done   | Keyboard-friendly |
|   Performance | ⚠️ Medium  | Needs profiling   |
|        Polish | ❌ Not yet | Coming soon       |

</table>

---

## Task Lists

<table class="prose prose-ul:m-0 prose-li:m-0">
<col class="w-[10ch]">

<tr>
<th>Markdown
<td>

```markdown
- [x] Show multiple Markdown features
- [x] Add helpful commentary
- [ ] Publish next post
- [ ] Drink coffee ☕
```

<tr>
<th>Output
<td>

- [x] Show multiple Markdown features
- [x] Add helpful commentary
- [ ] Publish next post
- [ ] Drink coffee ☕

</table>

## Horizontal Rules

<table>
<col class="w-[10ch]">
<tr>
<th>Markdown
<td>

Below are three ways to create horizontal rules (that all render the same):

```text
---
***
___
```

<tr>
<th>Output
<td>

---

</table>

## Inline HTML

<table>
<col class="w-[10ch]">
<tr>
<th>Markdown
<td>

```markdown
<div
  class="p-4 border-2 border-orange-400 rounded-2xl bg-orange-100 text-orange-900"
>
**This is a custom HTML block used for a note or callout.**

</div>
```

<tr>
<th>Output
<td>

<div class="p-4 border-2 border-orange-400 rounded-2xl bg-orange-100">

**This is a custom HTML block used for a note or callout.**

</div>

</table>

---

## Footnotes

<table>
<col class="w-[10ch]">
<tr>
<th>Markdown
<td>

```markdown
This sentence has a fun fact attached.[^funfact]

[^funfact]: Markdown footnotes help keep content clean and references organized.
```

<tr>
<th>Output
<td>

This sentence has a fun fact attached.[^funfact]

[^funfact]: Markdown footnotes help keep content clean and references organized.

</table>

---

## Paragraphs and Line Breaks

Paragraphs are created by leaving a blank line between blocks of text, whereas
line breaks within a paragraph can be created by ending a line with two or more
spaces.

<table>
<col class="w-[10ch]">
<tr>
<th>Markdown
<td>

```markdown
This is the first paragraph.

This is the second paragraph, after a blank line.\
This is the same paragraph, but after a line break.
```

<tr>
<th>Output
<td>
This is the first paragraph.
This is the second paragraph, after a blank line.\
This is the same paragraph, but after a line break.
</table>

---

## Escaping Characters

Use a backslash if you need literal Markdown syntax:

<table>
<tr>
<th>Markdown
<td>

```markdown
\# Not a heading\
\*Not italic\*\
1\. Not a list item
```

<tr>
<th>Output
<td>

\# Not a heading\
\*Not italic\*\
1\. Not a list item

## </table>

## Conclusion

You’ve now seen a broad tour of Markdown’s expressive formatting, which can help
you create rich content with minimal effort.

Thanks for reading — go write something awesome! ✨
