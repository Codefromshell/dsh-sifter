# AGENTS.md

This repository is the product repository for Sifter, a DeepSeek Harness plugin.

## Language

All repo-facing artifacts are English: code, comments, JSDoc, commit messages,
branch names, tests, docs, issue and pull request text, and release notes.

The only exceptions are the Turkish runtime dictionary and `locale/tr.json`.
User-facing strings live in the runtime locale dictionaries or in
`locale/*.json` metadata; never inline them in components.

## Scope discipline

Implement only the current milestone. Do not add archive, delete, rule-based
selection, TypeScript, or build tooling before the roadmap reaches them.

## DSH compatibility

The plugin targets DeepSeek Harness 0.2.x. Do not import Harness client packages
such as `@deepseek-ai/dsh-client-ui-primitives`. Use React from the module loader
(`require('react')`) and the host's `--dsw-alias-*` theme tokens.

## Safety

Never write to `~/.dsh` directly, never edit profile package files by hand, and
never delete sessions. Archive operations must go through the host services.
