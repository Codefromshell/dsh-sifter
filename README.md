# Sifter

> Pick chats. Archive in bulk. Undo anytime.

Sifter is a local-first plugin for **DeepSeek Harness** that will let you
multi-select conversations and archive them in one go.

## Status

**Preview.** The Sifter panel uses a two-column layout: a scrollable
workspace-grouped chat list on the left and selection controls on the right.
Groups can be collapsed; a flat list view is available. Selection, bulk archive,
active-work confirmation, and undo work. When selection mode is on, idle chat
rows in the native sidebar show a checkbox too. Successful archive runs clear
the selection and hide those checkboxes automatically.

The desktop **Workspaces header icons are not extensible**: DeepSeek Harness has
no slot for a fourth header action, so Sifter uses its own panel button to turn
on sidebar checkboxes. Splitting the Sifter sidebar entry into two controls is
also not possible through the slot API; this needs an upstream slot. The
`Ctrl/Cmd+Shift+E` shortcut toggles selection mode as a keyboard alternative.

This repository is early and unpublished. The npm package is not released.

## Install (development)

Requires DeepSeek Harness `0.2.1-rc.2` or a compatible `0.2.x` build, and
Node.js 24+ for local tooling.

### DeepSeek Harness Desktop

The desktop profile is managed by the Electron application, and
`dsh plugin --profile desktop ...` is refused by design. Install the local
bundle through the app instead:

1. Open the **Plugins** page from the sidebar.
2. Choose **Add**.
3. Enter the absolute package path: `C:\Sifter\dsh-sifter`.
4. Review and install. The page activates the bundle through HMR.
5. Click the **Sifter** icon in the sidebar rail. If it does not appear,
   reload the page, then restart DeepSeek Harness.

### Web profile (CLI)

```powershell
# from this repository root
dsh plugin --profile web add .
```

For the Web profile only, remove the local install with:

```powershell
dsh plugin --profile web remove dsh-sifter
```

For the Desktop app, remove the bundle from the Plugins page.


## Why

Archiving chats one by one is tedious. Sifter adds a selection panel, a
keyboard-friendly flow, and a real undo path. It archives through DeepSeek
Harness's own archive API; it never deletes chats and never writes to `~/.dsh`
directly.

## Safety

- No network requests. No telemetry.
- Reads only catalog metadata (title, workspace, timestamps, status).
- Uses the host's archive command; it never deletes chats.
- Never writes to `~/.dsh` directly.

## Roadmap

- Day 1: bundle scaffold, sidebar icon, empty panel (done)
- Day 2: workspace-grouped chat list with status (done)
- Day 3: selection, bulk archive, active-work confirmation, undo (done)
- Day 4: two-column layout, collapsible groups, flat view, auto-hide selection (done)
- Next: keyboard range selection, accessibility pass, archive view
- Later: native header/select split (needs an upstream slot), rule-based suggestions

## License

MIT. Not affiliated with or endorsed by DeepSeek.

See [LICENSE](LICENSE).
