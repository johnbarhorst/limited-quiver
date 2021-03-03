// How should I handle ensuring admin is only available to the proper people?

// is doing a check on the admin array of an event for the users ID enough?

// Can the user ID of ther persone submitting be faked?

// Probably pull it out of the session, not have it submitted from the front end.
// At least that way they'd have to fake the whole session/log in creds, right?

// TODO: Build this entire functiobn:

// Set up admin tasks:
// Update an event
// Add participants
// Change various event options like date/time/participant cap
// Add/remove other admins?
// Disallow removal of the event creator, unless ok'd by the event creator themself.
// Probably some seriously endgame stuff there. Even if folks use this app, that's an edge case, right?
// Delete an event
// Only allow creator to delete an event
// How to handle deleting events that have taken place? Participants may still want to have access to viewing the scores etc


// Functional requirements:
// Verify user has credentials to perform tasks.
// Multiple levels of admin? What should people be allowed to change?
// Owner only can change most things? Others can add users?
// Perform tasks.
// Confirm tasks were performed.
// Save back up in case someone wants to revert changes?
