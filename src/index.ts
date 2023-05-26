import { events } from "bdsx/event";
import { LogyanMainClass } from "./events";
events.serverOpen.on(()=>{
    new LogyanMainClass();
    console.log("[logyan]".yellow,"log-yan is launching...".blue);
})