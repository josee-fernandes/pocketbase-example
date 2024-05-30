/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateRequest((e) => {
  if (!e?.record) return

  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: e.record.email(), name: '' }],
    // subject: 'PocketBase Example App Email Verification',
    // html: 'Verify your email on PocketBase Example App',
  })

  $app.newMailClient().send(message)
}, 'users')
