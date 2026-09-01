# ChatCut Widget Media

Public preview-only media for ChatCut Claude widget cards.

This repository intentionally contains only public catalog thumbnails, compact
official-avatar previews, short voice audition samples, and scenario preview
images. Do not add user or project media.

Published layout:

- `widget-media/design-styles/<presetId>.jpg`
- `widget-media/avatars/<mediaKey>/poster.jpg`
- `widget-media/avatars/<mediaKey>/preview.mp4`
- `widget-media/voice-samples/<provider>-<voiceId>.mp3`
- `widget-media/scenarios/<name>.jpg`

Use immutable jsDelivr URLs, for example:

`https://cdn.jsdelivr.net/gh/ChatCut-Inc/chatcut-widget-media@<tag>/widget-media/voice-samples/doubao-vivi.mp3`

Avatar media keys are opaque public-repository keys, not ChatCut identity IDs.
The backend maps stable provider look IDs to these keys because identity IDs can
differ across dev, beta, and production.
