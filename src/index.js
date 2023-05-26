"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const events_1 = require("./events");
event_1.events.serverOpen.on(() => {
    new events_1.LogyanMainClass();
    console.log("[logyan]".yellow, "log-yan is launching...".blue);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvQztBQUNwQyxxQ0FBMkM7QUFDM0MsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ3JCLElBQUksd0JBQWUsRUFBRSxDQUFDO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUMsQ0FBQSJ9