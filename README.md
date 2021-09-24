# HTML Split

The HTML Split extension takes an HTML document from the active editor, and splits it into HTML, CSS, and JavaScript files by extracting any CSS content from between `<style>` tags and inserting it into a `style.css` file, extracting any JavaScript content from between `<script>` tags and inserting it into a `script.js` file, and replacing the original file's contents with the remaining HTML. It will also add relevant `<link>` and `<script>` tags to the HTML that point to the newly created files. The command will only run if the active editor is a non-empty HTML file/buffer.

I created this extension mainly for use with [GitHub Copilot](https://copilot.github.com). Since Copilot can only gain context from the file you're currently working in, I decided to start my creative coding projects in a single HTML file, putting all CSS styling and JavaScript code in respective `<style>` and `<script>` tags. I then decided I'd like to be able to "split" that content out into separate files later on, once the project was complete. This extension allows me to do that.

## Extension Settings

No settings currently exist for this extension.

## Known Issues

- HTML Split does not currently work if you have the [Vim]() extension installed, because it actually "inserts" the text into the editor, so if you're in normal mode, the text won't be sent to the editor correctly. This is something I just discovered for myself after publishing the initial version of the extension. I'll be looking into this as soon as I have the time.

---

## Release Notes

## [1.0.0] - 2021-09-24

### Added

- Initial release

For a full list of changes, see [CHANGELOG.md](CHANGELOG.md).
