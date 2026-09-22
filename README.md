# ChatCut Widget Media

Public preview-only media for ChatCut Claude widget cards.

This repository intentionally contains only catalog thumbnails, short voice audition samples, and scenario preview images. Do not add user or project media.

Published layout:

- `widget-media/design-styles/<presetId>.jpg`
- `widget-media/voice-samples/<provider>-<voiceId>.mp3`
- `widget-media/scenarios/<name>.jpg`

Use immutable jsDelivr URLs, for example:

`https://cdn.jsdelivr.net/gh/ChatCut-Inc/chatcut-widget-media@<tag>/widget-media/voice-samples/doubao-vivi.mp3`

Japanese auditions use `widget-media/voice-samples/doubao-<voiceId>-ja.mp3` (23 documented presets). All read the same text: 「こんにちは。この声を気に入っていただけるとうれしいです。」 Existing voice names and original Chinese/English samples are unchanged. Synthesized with seed-tts-2.0 and explicit Japanese, 24 kHz MP3.
