# Project Rules

## 1. File Freshness
- If we are doing a surgical edit on a file, check the conversation context. 
- If the file state is unknown or stale, ask for a fresh `cat` of the file before providing an edit.

## 2. Edit Method
- Decide whether a surgical edit is best done via terminal (`sed`, `echo`) or by the user in the editor.
- Large files or complex changes = Editor.

## 3. Surgical Edit Format
When instructing the user to edit directly in the editor, always provide:
- **Regex/Target**: What to search for (Ctrl+F).
- **Anchor Before**: The line(s) immediately above the insertion point.
- **New Code**: The code to insert.
- **Anchor After**: The line(s) immediately below the insertion point.

## 4. Milestone Updates
- Every time a milestone is completed, update `README.md`.

## 5. README State
- `README.md` must always reflect: What is done, where we are right now, and what is upcoming.