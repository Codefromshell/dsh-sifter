# Sifter

> Pick chats. Archive in bulk. Undo anytime.

Sifter is a local-first plugin for **DeepSeek Harness** that will let you
multi-select conversations and archive them in one go.

## Status

**Day 1 scaffold.** The Web profile loads the bundle, shows a Sifter icon in the
sidebar rail, and opens an empty Sifter panel. The chat list, selection, bulk
archive, and undo are not implemented yet.

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

- Day 1: bundle scaffold, sidebar icon, empty panel (current)
- Next: session list, selection, bulk archive, undo
- Later: inline selection, archive view, rule-based suggestions

## License

MIT. Not affiliated with or endorsed by DeepSeek.

See [LICENSE](LICENSE).
