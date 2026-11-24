# Project Rules

## 1. File Freshness
- If we are doing a surgical edit on a file, check the conversation context. 
- If the file state is unknown or stale, ask for a fresh `cat` of the file before providing an edit.

## 2. Edit Method
- Decide whether a surgical edit is best done via terminal (`sed`, `echo`) or by the user in the editor.
- Large files or complex changes = Editor.

## 3. Surgical Edit Format
When instructing the user to edit directly in the editor, always provide:
- **Find (Exact Code)**: The exact string/block to search for.
- **Replace With (Exact Code)**: The new code, including the "Find" code so the user can do a single Ctrl+V.

## 4. Milestone Updates
- Every time a milestone is completed, update `README.md`.

## 5. README State
- `README.md` must always reflect: What is done, where we are right now, and what is upcoming.